import { useState, useEffect } from "react";

export const MouseGame = () => {
    const [gameStarted, setGameStarted] = useState(false)
    const [timeSurvived, setTimeSurvived] = useState(0)
    const [position, setPosition] = useState({ x: 0, y: 0 });
    //const [gameSize, setGameSize] = useState({ width: 96, height: 96 });
    //const [check, setCheck] = useState(true); // used to check if the game size has been changed
    // first we need a start button, when pushed begin the game
    const start = () => {
        if(!gameStarted){
            setGameStarted(true)
            setTimeSurvived(0);
            // put commands to set up game environment
        }
    }
    const handleMouseMove = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
    };
    const handleMouseLeave = () => {
        if(gameStarted){
            setGameStarted(false);
        }
    };
    useEffect(() => {
    let timerInterval;
    if (!gameStarted) return;

    timerInterval = setInterval(() => {
      setTimeSurvived((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerInterval); // Cleanup interval on unmount
    }, [gameStarted]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        // scrapped idea to change game size based on time survived
        //if (minutes >= 1 && check) {
        //    setGameSize({ width: 128, height: 128 });
        //    setCheck(false);
        //}
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    // after game starts we need to make a box that you lose if your mouse exits it

    // have projectiles try to hit mouse and if it hits end game

    // have restart button and potentially high score(score will be time survived)

    return (
        <>
        <div className="flex flex-col items-center justify-normal mt-4">
            <h1 className="text-4xl font-bold mb-4">Mouse Game</h1>
            <p className="text-xl mb-2">Avoid the projectiles and survive as long as you can! (WIP)</p>
            <p className="text-lg mb-4">{gameStarted ? "Time Survived: " + formatTime(timeSurvived) : "Click Start to begin!"}</p>
        <div
          className={`flex flex-col items-center justify-center mt-10 ${gameStarted ? `w-96 h-96 border-4 dark:border-neutral-200 border-slate-900 lg relative` : ""}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`${!gameStarted ? "p-2 bg-green-500 dark:bg-green-600 rounded-md m-2" : "hidden"}`}
            onClick={start}
          >
            Start
        </button>
        
        </div>
        <p>${position.x}, ${position.y}</p>
        </div>

        </>
    )
}