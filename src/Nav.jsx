import { useState } from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav onMouseLeave={() => setMenuOpen(false)}>
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
        <div 
        className={`flex-row justify-center md:hidden ${menuOpen ? "flex flex-col" : "hidden space-x-2"} p-2 space-y-2 md:space-y-0 absolute md:static bg-sky-500 dark:bg-indigo-800 left-0 w-full md:w-auto  md:top-auto z-10 md:items-center`}
        
        >
          <button className={"bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1 px-4 hover:text-white dark:hover:text-black hover:bg-cyan-600 dark:hover:bg-blue-700"}>
              <Link to="/" className={`${menuOpen ? "block w-full" : ""}`}>Home</Link>
            </button>
          <button className="bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1 hover:text-white dark:hover:text-black hover:bg-cyan-600 dark:hover:bg-blue-700">
              <Link to="/tictactoe" className={`${menuOpen ? "block w-full" : ""}`}>Tic-Tac-Toe</Link>
            </button>
          <button className="bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1 hover:text-white dark:hover:text-black hover:bg-cyan-600 dark:hover:bg-blue-700">
              <Link to="/countdown" className={`${menuOpen ? "block w-full" : ""}`}>Countdown</Link>
            </button>
          <button className="bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1 hover:text-white dark:hover:text-black hover:bg-cyan-600 dark:hover:bg-blue-700">
              <Link to="/todo" className={`${menuOpen ? "block w-full" : ""}`}>To-Do</Link>
            </button>
          <button className="bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1 hover:text-white dark:hover:text-black hover:bg-cyan-600 dark:hover:bg-blue-700">
              <Link to="/sidewayssam" className={`${menuOpen ? "block w-full" : ""}`}>Sideways Sam</Link>
            </button>                
          <button className="bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1 hover:text-white dark:hover:text-black hover:bg-cyan-600 dark:hover:bg-blue-700">
          <a
              href="https://krish54491.github.io/Krish54491-chipmunk/"
              className={`${menuOpen ? "block w-full" : ""}`}
              target="_blank"
            >
            
              Chipmunk
            
          </a>
          </button>
          <button className="bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1 hover:text-white dark:hover:text-black hover:bg-cyan-600 dark:hover:bg-blue-700">
            <a
                href="/Krish Bharal - Resume.pdf"
                className={`${menuOpen ? "block w-full" : ""}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                My Resume
            </a>
          </button>

        </div>
        
        <div className={`flex-row justify-center hidden md:flex ${menuOpen ? "flex flex-col" : "hidden space-x-2"} p-2 space-y-2 md:space-y-0 absolute md:static bg-cyan-500 dark:bg-blue-800 left-0 w-full md:w-auto  md:top-auto z-10 md:items-center`}>
          <Link to="/">
          <button className={"bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1 px-4 hover:text-white dark:hover:text-black hover:bg-cyan-600 dark:hover:bg-blue-700"}>
              Home
            </button>
          </Link>
          <Link to="/tictactoe">
          <button className="bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1 hover:text-white dark:hover:text-black hover:bg-cyan-600 dark:hover:bg-blue-700">
              Tic-Tac-Toe
            </button>
          </Link>
          <Link to="/countdown">
          <button className="bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1 hover:text-white dark:hover:text-black hover:bg-cyan-600 dark:hover:bg-blue-700">
              Countdown
            </button>
          </Link>
          <Link to="/todo">
          <button className="bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1 hover:text-white dark:hover:text-black hover:bg-cyan-600 dark:hover:bg-blue-700">
              To-Do
            </button>
          </Link>
          <Link to="/mouse">
          <button className={`${menuOpen ? "hidden" : "hidden md:flex bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1 hover:text-white dark:hover:text-black hover:bg-cyan-600 dark:hover:bg-blue-700"}`}>
              Mouse Game
            </button>
          </Link>
          <Link to="/sidewayssam">
          <button className={`${menuOpen ? "hidden" : "hidden md:flex bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1 hover:text-white dark:hover:text-black hover:bg-cyan-600 dark:hover:bg-blue-700"}`}>
              Sideways Sam
            </button>
          </Link>
          <a
            href="https://krish54491.github.io/Krish54491-chipmunk/"
            target="_blank"
            >
          <button className="bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1 hover:text-white dark:hover:text-black hover:bg-cyan-600 dark:hover:bg-blue-700"> 
            Chipmunk
          </button>
          </a>
          <a
            href="/Krish Bharal - Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
          <button className="bg-cyan-500 dark:bg-blue-800 p-2 rounded-md m-1 hover:text-white dark:hover:text-black hover:bg-cyan-600 dark:hover:bg-blue-700">
             My Resume
          </button>
          </a>
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
