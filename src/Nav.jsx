import { useState } from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav>
        <button
          className={`${menuOpen ? "" :"md:hidden"} text-white focus:outline-none`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {/* Hamburger icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className={`flex-row justify-center md:flex ${menuOpen ? "flex flex-col" : "hidden space-x-2"} p-2 space-y-2 md:space-y-0 absolute md:static bg-cyan-500 dark:bg-indigo-800 left-0 w-full md:w-auto  md:top-auto z-10`}>
          <button className={" bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1 "}>
              <Link to="/" className={`${menuOpen ? "block w-full" : ""}`}>Home</Link>
            </button>
          <button className="bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1">
              <Link to="/tictactoe" className={`${menuOpen ? "block w-full" : ""}`}>Tic-Tac-Toe</Link>
            </button>
          <button className="bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1">
              <Link to="/countdown" className={`${menuOpen ? "block w-full" : ""}`}>Countdown</Link>
            </button>
          <button className="bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1">
              <Link to="/todo" className={`${menuOpen ? "block w-full" : ""}`}>To-Do</Link>
            </button>
          <button className="bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1">
          <a
              href="https://krish54491.github.io/Krish54491-chipmunk/"
              className={`${menuOpen ? "block w-full" : ""}`}
              target="_blank"
            >
            
              Chipmunk
            
          </a>
          </button>
          <button className="bg-cyan-500 dark:bg-blue-800 rounded-md p-2 m-1">
            <a
                href="https://drive.google.com/file/d/1Fzdb4QaAYYBDV-JkGhtMtlGTjvjRJB-e/view?usp=sharing"
                className={`${menuOpen ? "block w-full" : ""}`}
                target="_blank"
              >
                My Resume
            </a>
          </button>
        </div>





        {/*<ul className="flex justify-center  ">
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
        </ul>*/}
      </nav>
    </>
  );
};
