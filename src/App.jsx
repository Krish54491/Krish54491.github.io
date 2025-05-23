import { TicTacToe } from "./pages/TicTacToe";
import { Countdown } from "./pages/Countdown";
import { useState } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import { Nav } from "./Nav.jsx";
import { ToDoList } from "./pages/TodoList";

function App() {
  const [pic, setPic] = useState("Krish544 Icon.png");
  const changePic = () => {
    if (pic === "Ampharos.png") {
      setPic("Krish544 Icon.png");
    } else {
      setPic("Ampharos.png");
      console.log("Worse than jolteon!");
    }
  };

  return (
    <>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="flex flex-col relative lg:absolute top-0 right-0 items-center justify-start mt-14">
                <img
                  src={`${pic}`}
                  onClick={changePic}
                  alt="Krish544 Logo"
                  className="lg:w-[20svw] w-[80svw] hover:animate-smallspin"
                ></img>
                <h2 className="text-3xl m-4">Krish Bharal's Portfolio</h2>
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
