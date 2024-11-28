import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <>
      <nav>
        <ul className="flex justify-center">
          <li>
            <button className="bg-cyan-500 dark:bg-indigo-800 p-2 rounded-md m-1">
              <Link to="/">Home</Link>
            </button>
          </li>
          <li>
            <button className="bg-cyan-500 dark:bg-indigo-800 p-2 rounded-md m-1">
              <Link to="/TicTacToe">Tic-Tac-Toe</Link>
            </button>
          </li>
          <li>
            <button className="bg-cyan-500 dark:bg-indigo-800 p-2 rounded-md m-1">
              <Link to="/Countdown">Countdown</Link>
            </button>
          </li>
          <li>
            <a
              href="https://drive.google.com/file/d/14UwY0AH2w9QE-HEedoqScHLyFy7U8P-H/view?usp=sharing"
              className=""
              target="_blank"
            >
              <button className="bg-cyan-500 dark:bg-indigo-800 rounded-md p-2 m-1">
                My Resume
              </button>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
