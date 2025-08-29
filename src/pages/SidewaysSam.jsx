import { useState, useEffect, useRef } from "react";

const Sam = ({x, y, w, h}) => {
    // Sam's character model
    const headSize = w * 0.5;
    const hairHeight = headSize * 0.5;
    const torsoWidth = w * 0.5;
    const torsoHeight = h * 0.25;
    const armWidth = w * 0.15;
    const armHeight = torsoHeight;
    const pantsHeight = h * 0.25;


    return (
    <div className="relative" style={{left: x, top: y }}>
    {/* Hair (brown square) */}
    <div
    className="bg-orange-500 dark:bg-yellow-900 mx-auto"
    style={{ width: headSize, height: hairHeight }}
    ></div>


    {/* Head (skin tone square) */}
    <div
    className="bg-orange-900 dark:bg-yellow-200  mx-auto"
    style={{ width: headSize, height: headSize }}
    ></div>


    {/* Shirt with arms */}
    <div className="flex justify-center items-start">
    {/* Left Arm */}
    <div
    className="bg-orange-900 dark:bg-yellow-200"
    style={{ width: armWidth, height: armHeight }}
    ></div>
    {/* Torso (green shirt) */}
    <div
    className="bg-green-600"
    style={{ width: torsoWidth, height: torsoHeight }}
    ></div>
    {/* Right Arm */}
    <div
    className="bg-orange-900 dark:bg-yellow-200"
    style={{ width: armWidth, height: armHeight }}
    ></div>
    </div>


    {/* Pants */}
    <div
    className="bg-blue-600 mx-auto"
    style={{ width: torsoWidth, height: pantsHeight }}
    ></div>
    </div>
    );
}

export const SidewaysSam = () =>{
    const [bounds, setBounds] = useState({ left: 0, right: 0, top: 0, bottom: 1000 });
    const borderRef = useRef(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [width, setWidth] = useState(20);
    const [height, setHeight] = useState(50);
    const [mouseDown, setMouseDown] = useState({left: false, right: false});
    const [period, setPeriod] = useState(100); // how often rocks are thrown
    const [rockSpeed, setRockSpeed] = useState(5); // how fast rocks move
    const [highscore, setHighscore] = useState(0);
    const [score, setScore] = useState(0);
    const [check, setCheck] = useState(true);
    const [adjustment, setAdjustment] = useState(2); // adjustment for sam position
    const [sizeAdjustment, setSizeAdjustment] = useState(50); // adjustment for sam size 
    if(localStorage.getItem("SamHighScore") != null && check) {
        setHighscore(parseInt(localStorage.getItem("SamHighScore")));
        setCheck(false);
    }
    // increase difficulty every 10 seconds
    const startGame = () => {
        setGameStarted(true);
        setX(0);
        setY(900);
        setWidth(40);
        setHeight(100);
        setAdjustment(10)
    }
    const resetHighScore = () => {
        setHighscore(0);
        localStorage.setItem("SamHighScore", "0");
    };
    const endGame = () => {
        setGameStarted(false);
        if(score > highscore) {
            setHighscore(score);
            localStorage.setItem("SamHighScore", score.toString());
        }
        setScore(0);
        setPeriod(100);
        setRockSpeed(5);
    }

    //console.log(x, y);
    console.log(bounds);
    useEffect(() => {
        let scoreInterval;
        if (!gameStarted) return;
        
        scoreInterval = setInterval(() => {
            setScore(score => score + 1);
        }, 1000);
        return () => clearInterval(scoreInterval);
        
    }, [gameStarted]);
    useEffect(() => {
        if (!gameStarted) return;
        let newX = x;
        let newY = y;
        if (x < bounds.left) newX = bounds.left;
        if (x > bounds.right) newX = bounds.right;
        if (y < bounds.top) newY = bounds.top;

        if(bounds.bottom - sizeAdjustment <= 270){ 
            setHeight(50);
            setWidth(20);
            setAdjustment(2);
            setSizeAdjustment(50);
        } else if(bounds.bottom > 320){
            setHeight(100);
            setWidth(40);
            setAdjustment(10);
            setY(bounds.bottom);
            setSizeAdjustment(0);
        }
        setX(newX);
        setY(bounds.bottom);
        //console.log("Bounds:", bounds);
        //console.log("Position:", {x, y});
    }, [x,y,bounds,gameStarted]);
    useEffect(() => {
        if (!gameStarted) return;
        const interval = setInterval(() => {
            setPeriod(period => Math.max(50, period - 10));
            setRockSpeed(speed => speed + 1);
        }, 10000);
        return () => clearInterval(interval);
    }, [gameStarted]);
    useEffect(() => {
        if (!gameStarted) return;
        function updateBounds() {
            if (borderRef.current) {
                const rect = borderRef.current.getBoundingClientRect();
                setBounds({
                    left: -1 * (rect.width - width) / 2,
                    right: (rect.width - width) / 2, // width of Sam
                    top: 0,
                    bottom: rect.height - height + adjustment // height of Sam
                });
            }
        }
        updateBounds();
        window.addEventListener("resize", updateBounds);
        return () => window.removeEventListener("resize", updateBounds);
    }, [width, height, gameStarted]);
    useEffect(() => {
        if (!gameStarted) return;
        const handleKeyDown = (event) => {
            if(event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
                setX(x =>x <= bounds.left ? bounds.left : x - 5);
            } else if(event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
                setX(x=> (x >= bounds.right) ? bounds.right : x + 5);
            } console.log("Key pressed:", event.key);
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [bounds,gameStarted]);
    useEffect(() => {
        //console.log(mouseDown);
        let leftInterval, rightInterval;
        if (mouseDown.left) {
            leftInterval = setInterval(() => {
            setX(x => x <= bounds.left ? bounds.left : x - 5);
        }, 50);
        }
        if (mouseDown.right) {
            rightInterval = setInterval(() => {
            setX(x => (x >= bounds.right) ? bounds.right : x + 5);
        }, 50);
        }
        return () => {
            clearInterval(leftInterval);
            clearInterval(rightInterval);
        };
    },[mouseDown, bounds]);
    // all thats left is to add rocks and collision detection
    // add touch controls - done
    // add high score - done
    // sam can glitch out if they use inspect element, so track location of the border, and endgame if sam goes out of bounds. - solved
    // weird glitch where if you click the the left button it will jet you left and stay going to left - solved
    return(
        <>
        <div className="flex flex-col items-center justify-normal mt-4">
        <h1>Sideways Sam</h1>
        <p>In this game sam has to dodge the rocks that I'm throwing at him. Yes me. WIP</p>
        <p>High Score: {highscore}</p>
        <p className={`${!gameStarted ? "hidden" : ""}`}>Score: {score}</p>
        <button className={`${!gameStarted ? "mt-10 p-2 bg-green-500 dark:bg-green-600 rounded-md m-2" : "hidden"}`} onClick={startGame}>
                Start Game
        </button>
        <button
            className={"mt-4 p-2 bg-yellow-500 dark:bg-yellow-600 rounded-md m-2"}
            onClick={resetHighScore}
          >
            Reset High Score
        </button>
        </div>
        <div className={`${!gameStarted ? "hidden" : "flex flex-col items-center justify-normal mt-4"}`}>
            <div className="border-4 dark:border-neutral-200 border-slate-900 w-1/2 h-[40vh]" ref={borderRef}>
                <Sam x={x} y={y} w={width} h={height} />
            </div> 
            <div className="flex flex-row justify-center items-center mt-4">
                <button className="bg-cyan-500 dark:bg-blue-800 p-4 mt-1 mx-4 rounded-md hover:text-white dark:hover:text-black hover:bg-cyan-600 dark:hover:bg-blue-700"
                onMouseDown={() => setMouseDown({left: true, right: mouseDown.right})}
                onMouseUp={() => setMouseDown({left: false, right: mouseDown.right})}
                onMouseLeave={() => setMouseDown({left: false, right: mouseDown.right})}
                onTouchStart={() => setMouseDown({left: true, right: mouseDown.right})}
                onTouchEnd={() => setMouseDown({left: false, right: mouseDown.right})}
                >
                    {"<-"}
                    </button>
                <button className="bg-cyan-500 dark:bg-blue-800 p-4 mt-1 mx-4 rounded-md hover:text-white dark:hover:text-black hover:bg-cyan-600 dark:hover:bg-blue-700"
                onMouseDown={() => setMouseDown({left: mouseDown.left, right: true})}
                onMouseUp={() => setMouseDown({left: mouseDown.left, right: false})}
                onMouseLeave={() => setMouseDown({left: mouseDown.left, right: false})}
                onTouchStart={() => setMouseDown({left: mouseDown.left, right: true})}
                onTouchEnd={() => setMouseDown({left: mouseDown.left, right: false})}
                >
                    {"->"}
                </button>
            </div>
            
        </div>
        </>
    )
}