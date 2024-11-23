import { TicTacToe } from "./TicTacToe";
import { Countdown } from "./Countdown";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState("");
  const modeShift = (shifter) => {
    setMode(shifter);
  };
  //let mode;
  if (mode === "Tic-Tac-Toe") return <TicTacToe />;
  else if (mode === "Countdown") return <Countdown />;
  else {
    return (
      <>
        <div className="flex items-start justify-center mt-2">
          <img
            src="Krish544 Icon.png"
            alt="Krish544 Logo"
            className="w-10 hover:animate-bounce"
          ></img>
          <h2 className="text-3xl">Krish Bharal's Portfolio:</h2>
        </div>
        <a
          href="https://drive.google.com/file/d/14UwY0AH2w9QE-HEedoqScHLyFy7U8P-H/view?usp=sharing"
          className="flex items-start justify-center mt-2"
        >
          <button className="text-2xl bg-cyan-500 dark:bg-indigo-800 rounded-md p-2">
            My Resume
          </button>
        </a>
        <ol className="auto-cols-auto m-4">
          <li className="m-2">
            <button
              onClick={() => modeShift("Tic-Tac-Toe")}
              className="text-2xl bg-cyan-500 dark:bg-indigo-800 rounded-md p-2"
            >
              Tic-Tac-Toe
            </button>
          </li>
          <li className="m-2">
            <button
              onClick={() => modeShift("Countdown")}
              className="text-2xl bg-cyan-500 dark:bg-indigo-800 rounded-md p-2"
            >
              Countdown
            </button>
          </li>
        </ol>
      </>
    );
  }
}

export default App;
