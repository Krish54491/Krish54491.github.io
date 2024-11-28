import { useState, useEffect } from "react";

export const Countdown = () => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [endPoint, setEndPoint] = useState(null);
  const [timerActive, setTimerActive] = useState(false);

  const updateCountdown = () => {
    const timeLeft = new Date(endPoint.getTime() - new Date().getTime());
    if (timeLeft <= 0) {
      setMinutes(0);
      setSeconds(0);
      setTimerActive(false);
      return;
    }
    setMinutes(timeLeft.getMinutes());
    setSeconds(timeLeft.getSeconds());
  };

  const startTimer = () => {
    if (!timerActive) {
      setEndPoint(
        new Date(
          new Date().getTime() + minutes * 60 * 1000 + (seconds + 1) * 1000
        )
      );
      setTimerActive(true);
    }
  };
  useEffect(() => {
    let timerInterval;
    if (!timerActive || !endPoint) return;

    if (timerActive) {
      timerInterval = setInterval(() => {
        updateCountdown();
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval); // Cleanup interval on unmount
  }, [timerActive, endPoint]);
  const Reset = () => {
    setTimerActive(false);
    setMinutes(1);
    setSeconds(0);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1
          className={`flex justify-center items-center text-5xl lg:text-9xl m-5 ${
            seconds == 0 && minutes == 0 ? "animate-pulse" : ""
          }`}
        >
          {seconds == 0 && minutes == 0
            ? "Congrats!"
            : minutes + ":" + (seconds < 10 ? `0${seconds}` : seconds)}
        </h1>
        <div className="flex flex-row m-2">
          <button
            className="p-2 bg-green-500 dark:bg-green-600 rounded-md m-2"
            onClick={() => startTimer()}
          >
            Start
          </button>
          <button
            className="p-2 bg-yellow-500 dark:bg-yellow-600 rounded-md m-2"
            onClick={() => Reset()}
          >
            Reset
          </button>
          <button
            className="p-2 bg-red-500 dark:bg-red-600 rounded-md m-2"
            onClick={() => setTimerActive(false)}
          >
            Stop
          </button>
        </div>
      </div>
      <p className="flex relative bottom-0 justify-center items-center m-2">
        Still working on it! The changes left are inputtable times, and
        fireworks and sound effects playing when timer is done
      </p>
    </>
  );
};
