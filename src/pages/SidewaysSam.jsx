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
const Rock = ({x, y, w, h, secret}) => {
    return (
        <>
        <div
            className={`${secret ? "hidden" : "mx-auto bg-gray-600 dark:bg-gray-500 shadow-md"}`}
            style={{
                position: "relative",
                left: x,
                top: y,
                width: w,
                height: h,
                borderRadius: "50%",
            }}
        />
        <img src="/Rock.png" alt="rock" 
            className={`${!secret ? "hidden" : "mx-auto shadow-md"}`}
            style={{
                position: "relative",
                left: x,
                top: y,
                width: w,
                height: h,
                borderRadius: "100%",
            }}></img>
        </>
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
    //const [period, setPeriod] = useState(50); // how often rocks are thrown
    const [rockSpeed, setRockSpeed] = useState(5); // how fast rocks move
    const [rockAmount, setRockAmount] = useState(2); // how many rocks at a time
    const [highscore, setHighscore] = useState(0);
    const [score, setScore] = useState(0);
    const [check, setCheck] = useState(true);
    const [adjustment, setAdjustment] = useState(2); // adjustment for sam position
    const [sizeAdjustment, setSizeAdjustment] = useState(50); // adjustment for sam size 
    const [projectiles, setProjectiles] = useState([]);
    const [samSpeed, setSamSpeed] = useState(5); // speed of sam added because my friend complained
    const [rockSize, setRockSize] = useState(20); // size of rocks
    const [easterEgg, setEasterEgg] = useState(false); // easter egg counter
    const [prevSamSpeed, setPrevSamSpeed] = useState(samSpeed);
    const [armhit, setArmHit] = useState(false); // if sam's arm was hit
    if(localStorage.getItem("SamHighScore") != null && check) {
        setHighscore(parseInt(localStorage.getItem("SamHighScore")));
        setCheck(false);
    }
    //console.log(samSpeed);
    const startGame = () => {
        setGameStarted(true);
        setX(0);
        setY(900);
        setWidth(40);
        setHeight(100);
        setAdjustment(10)
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
        //setPeriod(900);
        setRockSpeed(5);
        setSamSpeed(5);
        setRockAmount(2);
        setProjectiles([]);
        setRockSize(20);
        setEasterEgg(false);
    }
    //console.log(projectiles);
    //console.log(period+" "+ rockSpeed);
    //console.log(x, y);
    //console.log(bounds);
    //console.log("RockAmount:", rockAmount, "Period:", period, "RockSpeed:", rockSpeed);
    useEffect(() => { // collision detection
        if (!gameStarted) return;
        // Collision detection
        projectiles.forEach(p => {
                //console.log(p);
                //console.log("Sam:", {x, y, width, height});
                const isColliding =
                (p.x >= x - width / 4 - 5 && // left side of rock to left side of sam
                p.x <= x + width / 4 + 5) &&
                p.y > 0 &&
                p.y <= y &&
                p.y > y - height - adjustment -(sizeAdjustment ? 10 : 0); // bottom of rock to top of sam (size adjustment for when sam is small)
                const armCollision =
                (p.x >= x - width / 2 - 5 && // left side of rock to left side of sam's arm
                p.x <= x + width / 2 + 5) &&
                p.y > 0 &&
                p.y <= y &&
                p.y > y - height - adjustment -(sizeAdjustment ? 10 : 0); // bottom of rock to top of sam's arm
                // hitbox is very generous when sam is small compared to when sam is big
                // arms are not included in hitbox nvm it's now included because my roomate said it wasn't realistic
                if (isColliding) {
                    //console.log("Collision detected");
                    endGame();
                } else if (armCollision && !armhit){
                    console.log("hit arm");
                    setPrevSamSpeed(samSpeed);
                    setSamSpeed(samSpeed * .8); // slow sam down if hit arm
                    setArmHit(true);
                }
            });
    }, [projectiles, x, width, height, gameStarted]);
    useEffect(() => { // score counter
        let scoreInterval;
        if (!gameStarted) return;
        
        scoreInterval = setInterval(() => {
            setScore(score => score + 1);
        }, 1000);
        return () => clearInterval(scoreInterval);
        
    }, [gameStarted]);
    useEffect(() => { // keep sam in bounds
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
    useEffect(() => { // move rocks
        if (!gameStarted) return;
        const interval = setInterval(() => { // increase difficulty every 10 seconds
            //setPeriod(period => Math.max(10, period - 5)); // cap period at 10ms
            setRockSpeed(rockSpeed => Math.min(rockSpeed + 1, 100)); // cap rock speed at 100
            setRockAmount(rockAmount => Math.min(rockAmount + 1, 10)); // cap rock amount at 10
            setSamSpeed(Math.min(prevSamSpeed + rockSpeed/2, 10)); // cap sam speed at 10
            setPrevSamSpeed(Math.min(prevSamSpeed + rockSpeed/2, 10));
            setArmHit(false); // reset arm hit
            //console.log("Increased difficulty: period =", period, "rockSpeed =", rockSpeed);
        }, 10000);

    
    const moveInterval = setInterval(() => {
        setProjectiles(prev => {
            //console.log(prev);
            let newProjectiles = prev
            .filter(p => {
                p.y += rockSpeed
                return p.y < bounds.bottom - 24 - adjustment //- rockSpeed
            });
            setProjectiles(prev => {
            const newProjectiles = [...prev];
            let rockNotOnSamCheck = true;
            while (newProjectiles.length < rockAmount) {
                if(rockNotOnSamCheck){
                    if(newProjectiles.filter(p => p.x === x).length === 0) {
                    newProjectiles.push({
                        x: x, 
                        y: bounds.top - 20 * rockAmount - adjustment
                    });
                    //console.log("Added rock at Sam's position because I got aim!");
                    continue;
                    }
                    rockNotOnSamCheck = false;
                }
                let newX = Math.random() * (bounds.right - bounds.left) + bounds.left
                newProjectiles.push({
                    x: newX,
                    y: bounds.top - rockSize * rockAmount - adjustment
                });
            }
            return newProjectiles;
            });
            return newProjectiles;
        });
    }, 30);
        return () => {
            clearInterval(moveInterval)
            clearInterval(interval)
        };
    }, [gameStarted, bounds, rockSpeed]);
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
                setX(x =>x <= bounds.left ? bounds.left : x - samSpeed);
            } else if(event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
                setX(x=> (x >= bounds.right) ? bounds.right : x + samSpeed);
            } else if(event.key === '`'){
                setRockSize(rockSize => rockSize + 1);
                // the hitbox doesn't change it's just funny to see big rocks
            } else if(event.key === 'Control'){
                setEasterEgg(easterEgg => !easterEgg);
            }

            //console.log("Key pressed:", event.key);
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [bounds,gameStarted, samSpeed]);
    useEffect(() => {
        //console.log(mouseDown);
        let leftInterval, rightInterval;
        if (mouseDown.left) {
            leftInterval = setInterval(() => {
            setX(x => x <= bounds.left ? bounds.left : x - samSpeed);
        }, 50);
        }
        if (mouseDown.right) {
            rightInterval = setInterval(() => {
            setX(x => (x >= bounds.right) ? bounds.right : x + samSpeed);
        }, 50);
        }
        return () => {
            clearInterval(leftInterval);
            clearInterval(rightInterval);
        };
    },[mouseDown, bounds]);
    // all thats left is to add rocks and collision detection - done
    // add touch controls - done
    // add high score - done
    // sam can glitch out if they use inspect element, so track location of the border, and endgame if sam goes out of bounds. - solved
    // weird glitch where if you click the the left button it will jet you left and stay going to left - solved
    return(
        <>
        <div className="flex flex-col items-center justify-normal mt-4">
        <h1>Sideways Sam</h1>
        <p>In this game sam has to dodge the rocks that I'm throwing at him. Yes me.</p>
        <br></br>
        <p>High Score: {highscore}</p>
        <p className={`${!gameStarted ? "hidden" : ""}`}>Score: {score}</p>
        <button className={`${!gameStarted ? "mt-10 p-2 bg-green-500 dark:bg-green-600 rounded-md m-2" : "hidden"}`} onClick={startGame}>
                Start Game
        </button>
        <button
            className={`${!gameStarted ? "mt-4 p-2 bg-yellow-500 dark:bg-yellow-600 rounded-md m-2" : "hidden"}`}
            onClick={resetHighScore}
          >
            Reset High Score
        </button>
        </div>
        <div className={`${!gameStarted ? "hidden" : "flex flex-col items-center justify-normal mt-4"}`}>
            <div className="border-4 dark:border-neutral-200 border-slate-900 w-1/2 h-[40vh]" ref={borderRef}>
                <Sam x={x} y={y} w={width} h={height} />
                {gameStarted && projectiles.map((p,i) => (
                    <Rock x={p.x} y={p.y} w={rockSize} h={rockSize} secret ={easterEgg} key={i} />
                ))}
            </div> 
            <div className="flex flex-row justify-center items-center mt-4">
                <button className="bg-cyan-500 dark:bg-blue-800 p-4 mt-1 mx-4 rounded-md hover:text-white dark:hover:text-black hover:bg-cyan-600 dark:hover:bg-blue-700"
                onMouseDown={() => setMouseDown({left: true, right: mouseDown.right})}
                onMouseUp={() => setMouseDown({left: false, right: mouseDown.right})}
                onMouseLeave={() => setMouseDown({left: false, right: mouseDown.right})}
                onTouchStart={() => setMouseDown({left: true, right: mouseDown.right})}
                onTouchEnd={() => setMouseDown({left: false, right: mouseDown.right})}
                draggable="false"
                >
                    {"<-"}
                    </button>
                <button className="bg-cyan-500 dark:bg-blue-800 p-4 mt-1 mx-4 rounded-md hover:text-white dark:hover:text-black hover:bg-cyan-600 dark:hover:bg-blue-700"
                onMouseDown={() => setMouseDown({left: mouseDown.left, right: true})}
                onMouseUp={() => setMouseDown({left: mouseDown.left, right: false})}
                onMouseLeave={() => setMouseDown({left: mouseDown.left, right: false})}
                onTouchStart={() => setMouseDown({left: mouseDown.left, right: true})}
                onTouchEnd={() => setMouseDown({left: mouseDown.left, right: false})}
                draggable="false"
                >
                    {"->"}
                </button>
            </div>
            
        </div>
        </>
    )
}