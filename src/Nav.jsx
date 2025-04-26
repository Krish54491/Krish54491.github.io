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
              <Link to="/tictactoe">Tic-Tac-Toe</Link>
            </button>
          </li>
          <li>
            <button className="bg-cyan-500 dark:bg-indigo-800 p-2 rounded-md m-1">
              <Link to="/countdown">Countdown</Link>
            </button>
          </li>
          <li>
            <button className="bg-cyan-500 dark:bg-indigo-800 p-2 rounded-md m-1">
              <Link to="/todo">To-Do</Link>
            </button>
          </li>
          <li>
            <a
              href="https://krish54491.github.io/Krish54491-chipmunk/"
              className=""
              target="_blank"
            >
            <button className="bg-cyan-500 dark:bg-indigo-800 p-2 rounded-md m-1">
              Chipmunk
            </button>
            </a>
          </li>
          <li>
            <a
              href="https://drive.google.com/file/d/1Fzdb4QaAYYBDV-JkGhtMtlGTjvjRJB-e/view?usp=sharing"
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
