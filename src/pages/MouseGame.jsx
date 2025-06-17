import { useState, useEffect } from "react";

export const MouseGame = () => {
    const [gameStarted, setGameStarted] = useState(false)
    // first we need a start button, when pushed begin the game
    const start = () => {
        if(!gameStarted){
            setGameStarted(true)
            // put commands to set up game environment
        }
    }
    // after game starts we need to make a box that you lose if your mouse exits it

    // have projectiles try to hit mouse and if it hits end game

    // have restart button and potentially high score(score will be time survived)

    return (
        <>
        <button
        className={`${!gameStarted ? "p-2 bg-green-500 dark:bg-green-600 rounded-md m-2" : "hidden" }`}
        onClick={start}
        >
            Start
        </button>
        
        </>
    )
}