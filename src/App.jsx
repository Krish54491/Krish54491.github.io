import { TicTacToe } from "./pages/TicTacToe";
import { Countdown } from "./pages/Countdown";
import { MouseGame } from "./pages/MouseGame.jsx";
import { Clicker } from "./pages/Clicker.jsx";
import { useState,useEffect } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import { Nav } from "./Nav.jsx";
import { ToDoList } from "./pages/TodoList";
import { SidewaysSam } from "./pages/SidewaysSam.jsx"
import { UltimateTicTacToe} from "./pages/UltimateTicTacToe.jsx"
import Ampharos from "./assets/Ampharos.png"
import Krish544 from "./assets/Krish544 Icon.png"
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
  const [pic, setPic] = useState(Krish544);
  const [pokemonName, setPokemonName] = useState("Krish544 Icon");
  const [pokemonFound, setPokemonFound] = useState(1);
  const [pokeCheck, setPokeCheck] = useState(true);
  if(localStorage.getItem("pokedexCompletion") != null && pokeCheck) {
    setPokedexCompletion(JSON.parse(localStorage.getItem("pokedexCompletion")));
    setPokemonFound(pokedexCompletion.reduce((amount, val) => ((val === 1 || val === 2) ? amount + 1 : amount), 0));
    //console.log("Pokedex Completion Loaded");
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
      //console.log("No Previous Pokedex Completion Found");
      setPokeCheck(false);
    }
    if(randomId === 0) {  
      if(Math.floor(Math.random() * 2) === 0) {
        setPic(Krish544);
      } else{
        setPic(Ampharos);
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
  //console.log(pokedexCompletion[0]);
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
              <div className="absolute bottom-10 left-0 right-0 hidden lg:flex flex-row flex-wrap items-center justify-center space-x-0">
                  {pokedexCompletion ? (
                  pokedexCompletion.map((item, idx) =>
                    item === 2 ? <PokemonImage key={idx} pokemonId={idx} getPokemonPic={getPokemonPic} /> : null
                  )) : (
                    <div>No data</div>
                  )}
                </div>
              <div className="absolute bottom-1 left-0 right-0 flex flex-row items-center justify-center space-x-5">
                  <a href="https://github.com/Krish54491" aria-label="GitHub" className="hover:opacity-80" target="_blank">
                  <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
                  </svg>
                  </a>
                  
                  <a href="https://www.linkedin.com/in/krish-bharal-389105296/" aria-label="LinkedIn" className="hover:opacity-80" target="_blank" rel="noopener noreferrer">
                    <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/>
                    </svg>
                  </a>
                  {Math.floor(Math.random() * 10) == 0 ?(
                    <Link to="/clicker" aria-label="Cookie" className="hover:opacity-80" rel="noopener noreferrer">
                      <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21.94 13.06a1 1 0 0 0-1.13-.21 1 1 0 0 1-1.31-1.31 1 1 0 0 0-.21-1.13l-1.42-1.42a1 1 0 0 0-1.13-.21 1 1 0 0 1-1.31-1.31 1 1 0 0 0-.21-1.13l-1.42-1.42a1 1 0 0 0-1.13-.21 1 1 0 0 1-1.31-1.31 1 1 0 0 0-.21-1.13A9 9 0 1 0 21.94 13.06ZM7 14a1 1 0 1 1 1 1 1 1 0 0 1-1-1Zm2 4a1 1 0 1 1 1 1 1 1 0 0 1-1-1Zm2-8a1 1 0 1 1 1 1 1 1 0 0 1-1-1Zm4 6a1 1 0 1 1 1 1 1 1 0 0 1-1-1Z"/>
                      </svg>
                    </Link>
                  ):
                  <></>
                }
              </div>
            </>
          }
        />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/countdown" element={<Countdown />} />
        <Route path="/todo" element={<ToDoList />} />
        <Route path="/mouse" element={<MouseGame />} />
        <Route path="/clicker" element={<Clicker />}/>
        <Route path="/ultimatetictactoe" element={<UltimateTicTacToe />}/>
        <Route path="/sidewayssam" element={<SidewaysSam />}/>
      </Routes>
      
    </>
  );
}

export default App;
