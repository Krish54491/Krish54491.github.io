import { TicTacToe } from "./pages/TicTacToe.js";
import { Countdown } from "./pages/Countdown.js";
//import { useState } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import { Nav } from "./Nav.jsx";

function App() {
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
                  src="Krish544 Icon.png"
                  alt="Krish544 Logo"
                  className="lg:w-[20svw] w-[80svw] hover:animate-smallspin"
                ></img>
                <h2 className="text-3xl m-4">Krish Bharal's Portfolio</h2>
              </div>

              <ol className="auto-cols-auto m-4 w-fit">
                <li className="m-2">
                  <button className="text-2xl bg-cyan-500 dark:bg-indigo-800 rounded-md p-2">
                    <Link to="/TicTacToe">Tic-Tac-Toe</Link>
                  </button>
                </li>
                <li className="m-2">
                  <button className="text-2xl bg-cyan-500 dark:bg-indigo-800 rounded-md p-2">
                    <Link to="/Countdown">Countdown</Link>
                  </button>
                </li>
              </ol>
            </>
          }
        />
        <Route path="/TicTacToe" element={<TicTacToe />} />
        <Route path="/Countdown" element={<Countdown />} />
      </Routes>
    </>
  );
}

export default App;
