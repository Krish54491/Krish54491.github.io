import { useState,useEffect } from "react";

export const Pokedex = () => {
    const [pokedexCompletion, setPokedexCompletion] = useState(Array(1026).fill(0));
    const [pokeCheck, setPokeCheck] = useState(true);
    const [pokemonFound, setPokemonFound] = useState(0);
    const [pokemonNames, setPokemonNames] = useState(Array(1026).fill(""));
    const [sorting, setSorting] = useState("all"); // all, found, shiny, not found - might add alphabetical ordering one day
    if(localStorage.getItem("pokedexCompletion") != null && pokeCheck) {
        setPokedexCompletion(JSON.parse(localStorage.getItem("pokedexCompletion")));
        setPokemonFound(pokedexCompletion.reduce((amount, val) => ((val === 1 || val === 2) ? amount + 1 : amount), 0));
        //console.log("Pokedex Completion Loaded");
        setPokemonNames(new Array(pokedexCompletion.length).fill(""));
        setPokeCheck(false);
    }
    
    const getPokemonPic = async (id, item) => {
        const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonData = await pokemonRes.json();
        setPokemonNames(prevNames => {
            prevNames[id] = pokemonData.name;
            return prevNames;
        });
        setPokemonFound(pokedexCompletion.reduce((amount, val) => ((val === 1 || val === 2) ? amount + 1 : amount), 0));
        if(item === 2) {
        const shinypic = pokemonData.sprites.front_shiny;
        return shinypic;
        }
        const defaultpic = pokemonData.sprites.front_default;
        return defaultpic;
      }
    //console.log(pokemonFound, pokedexCompletion);
    function PokemonImage({ pokemonId, getPokemonPic }) {
        const [imgUrl, setImgUrl] = useState(null);
        
        useEffect(() => {
            let isMounted = true;
            getPokemonPic(pokemonId).then(url => {
              if (isMounted) setImgUrl(url);
            });
            return () => { isMounted = false; };
        }, [pokemonId, getPokemonPic]);
        
        if (!imgUrl) return <div>Loading...</div>;
        return <a href={`https://bulbapedia.bulbagarden.net/wiki/${pokemonNames[pokemonId]}_(Pokemon)`} target="_blank"><img src={imgUrl} className={`${pokedexCompletion[pokemonId] === 0 ? "brightness-0" : ""}`} alt={pokemonNames[pokemonId]} /></a>;
    }
    return (
        <>
        <div className="flex flex-row justify-center items-start m-4 ">
            <h1 className="flex justify-center items-start my-4 text-xl"> {pokemonFound === 0 ? "No Pokémon found" : pokemonFound === pokedexCompletion ? "YOU FOUND EVERY POKEMON!" : `${pokemonFound-1} out of ${pokedexCompletion.length - 1} Pokémon found - Sorting Method:`} </h1>
            <select value={sorting} onChange={(e) => setSorting(e.target.value)} className="m-2 p-2 bg-neutral-200 text-slate-900 dark:bg-slate-900 dark:text-neutral-200 border rounded">
                <option value="all">All</option>
                <option value="found">Found</option>
                <option value="shiny">Shiny</option>
                <option value="not found">Not Found</option>
            </select>
        </div>
        <div className="flex flex-row flex-wrap">
            {sorting === "all" ?
            pokedexCompletion.map((item, idx) =>
                idx === 0 ? null :
                item === 0 ? <PokemonImage key={idx} pokemonId={idx} getPokemonPic={() => getPokemonPic(idx, item)} /> :
                item === 2 ? <PokemonImage key={idx} pokemonId={idx} getPokemonPic={() => getPokemonPic(idx, item)} /> : item === 1 ? <PokemonImage key={idx} pokemonId={idx} getPokemonPic={() => getPokemonPic(idx, item)} /> : null
            ) : sorting === "found" ? pokedexCompletion.map((item, idx) =>
                idx === 0 ? null :
                item === 2 ? <PokemonImage key={idx} pokemonId={idx} getPokemonPic={() => getPokemonPic(idx, item)} /> : item === 1 ? <PokemonImage key={idx} pokemonId={idx} getPokemonPic={() => getPokemonPic(idx, item)} /> : null
            ) : sorting === "shiny" ? pokedexCompletion.map((item, idx) =>
                idx === 0 ? null :
                item === 2 ? <PokemonImage key={idx} pokemonId={idx} getPokemonPic={() => getPokemonPic(idx, item)} /> : null
            ) : sorting === "not found" ? pokedexCompletion.map((item, idx) =>
                idx === 0 ? null :
                item === 0 ? <PokemonImage key={idx} pokemonId={idx} getPokemonPic={() => getPokemonPic(idx, item)} /> : null
            ) : null}
        </div>
    </>
    );
}