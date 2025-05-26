import { TicTacToe } from "./pages/TicTacToe";
import { Countdown } from "./pages/Countdown";
import { useState,useEffect } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import { Nav } from "./Nav.jsx";
import { ToDoList } from "./pages/TodoList";


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

  return <img src={imgUrl} alt="Pokemon" />;
}


function App() {
  const [pokedexCompletion, setPokedexCompletion] = useState(Array(1026).fill(0));
  const [pic, setPic] = useState("Krish544 Icon.png");
  const [pokemonName, setPokemonName] = useState("Krish544 Icon");
  const [pokemonFound, setPokemonFound] = useState(1);
  const [pokeCheck, setPokeCheck] = useState(true);
  if(localStorage.getItem("pokedexCompletion") != null && pokeCheck) {
    setPokedexCompletion(JSON.parse(localStorage.getItem("pokedexCompletion")));
    setPokemonFound(pokedexCompletion.reduce((amount, val) => ((val === 1 || val === 2) ? amount + 1 : amount), 0));
    console.log("Pokedex Completion Loaded");
    setPokeCheck(false);
  }
  if(pokedexCompletion[0] === 0){
    pokedexCompletion[0] = 1;
  }
    const getPokemonPic = async (id) => {
    const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonData = await pokemonRes.json();
    const shinypic = pokemonData.sprites.front_shiny;
    return shinypic;
  }
  const changePic = async () => {
    const speciesRes = await fetch("https://pokeapi.co/api/v2/pokemon-species?limit=0");
    const speciesData = await speciesRes.json();
    const total = speciesData.count;
    const randomId = Math.floor(Math.random() * (total + 1));
    // this is a hot fix because the pokedex orginally could not hold 1026 pokemon and I want to keep the pokedex completion of previous users
    if(pokedexCompletion.length < 1026){
      pokedexCompletion.push(0);
      pokedexCompletion[0] = 1;
    }

    if (pokeCheck) {
      setPokedexCompletion(Array(total+1).fill(0));
      pokedexCompletion[0] = 1;
      console.log("No Previous Pokedex Completion Found");
      setPokeCheck(false);
    }
    if(randomId === 0) {  
      if(Math.floor(Math.random() * 2) === 0) {
        setPic("Krish544 Icon.png");
      } else{
        setPic("Ampharos.png");
      }
      return;
    }
    if (pokedexCompletion[randomId] === 0) {
      pokedexCompletion[randomId] = 1;
    }
    const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const pokemon = await pokemonRes.json();
    const shinyChance = Math.floor((Math.random() * 4096) + 1);
    if( shinyChance < 10 && pokemonFound === 1026) {
      const shinySpriteUrl = pokemon.sprites.front_shiny;
      setPic(shinySpriteUrl);
      console.log("Shiny!");
      pokedexCompletion[randomId] = 2;
    } else if (shinyChance === 1) {
      const shinySpriteUrl = pokemon.sprites.front_shiny;
      setPic(shinySpriteUrl);
      console.log("Shiny!");
      pokedexCompletion[randomId] = 2;
      //console.log(shinySpriteUrl);
    } else {
      const spriteUrl = pokemon.sprites.front_default;
      setPic(spriteUrl);
      //console.log(spriteUrl);
    }
    localStorage.setItem("pokedexCompletion", JSON.stringify(pokedexCompletion));
    setPokemonName(pokemon.name);
    setPokemonFound(pokedexCompletion.reduce((amount, val) => ((val === 1 || val === 2) ? amount + 1 : amount), 0));
  console.log(pokedexCompletion[0]);
    //if (pic === "Ampharos.png") {
    //  setPic("Krish544 Icon.png");
    //} else {
    //  setPic("Ampharos.png");
    //  console.log("Worse than jolteon!");
    //}
  };

  return (
    <>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="flex flex-col relative lg:absolute top-10 right-0 left-0 items-center justify-center mb-12 lg:mt-14">
                <img
                  src={`${pic}`}
                  onClick={changePic}
                  alt={pokemonName}
                  className="lg:w-[20svw] w-[80svw] hover:animate-smallspin"
                ></img>
                <h3 className="text-2xl">{pokemonFound === 0 ? "Pokedex Data Loaded" : `Amount of Pokemon Found: ${pokemonFound}`}</h3>
                <h2 className="text-3xl">Krish Bharal's Portfolio</h2>
              </div>
              <ol className="auto-cols-auto m-4 w-fit">
                <li className="m-2">
                  <button className="text-2xl bg-cyan-500 dark:bg-blue-800 rounded-md p-2">
                    <Link to="/tictactoe">Tic-Tac-Toe</Link>
                  </button>
                </li>
                <li className="m-2">
                  <button className="text-2xl bg-cyan-500 dark:bg-blue-800 rounded-md p-2">
                    <Link to="/countdown">Countdown</Link>
                  </button>
                </li>
              </ol>
              <div className=" absolute bottom-0 left-0 right-0 hidden lg:flex flex-row flex-wrap items-center justify-center space-x-0">
                  {pokedexCompletion ? (
                  pokedexCompletion.map((item, idx) =>
                    item === 2 ? <PokemonImage pokemonId={idx} getPokemonPic={getPokemonPic} /> : null
                  )) : (
                    <div>No data</div>
                  )}
                </div>
            </>
          }
        />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/countdown" element={<Countdown />} />
        <Route path="/todo" element={<ToDoList />} />
      </Routes>
      
    </>
  );
}

export default App;
