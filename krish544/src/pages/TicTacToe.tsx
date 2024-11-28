import { useState } from "react";

type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
};

type BoardProps = {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
};

type TicTacToeProps = {};

const Square = ({ value, onSquareClick }: SquareProps) => {
  return (
    <button
      className={`border-2 dark:border-neutral-200 border-slate-900 p-2 lg:p-20 text-8xl rounded-md lg:w-[16.25rem] lg:h-[16.25rem] ${
        value ? "" : "hover:animate-scale"
      }`}
      onClick={onSquareClick}
    >
      {value ?? "⠀"}
    </button>
  );
};

const Board = ({ xIsNext, squares, onPlay }: BoardProps) => {
  const handleClick = (i: number) => {
    const nextSquares = squares.slice();
    if (!squares[i] && !calculateWinner(squares)) {
      if (xIsNext) {
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }
      onPlay(nextSquares);
    }
  };

  return (
    <>
      <div>
        <div className="grid gap-4 grid-cols-3 grid-rows-3 px-3">
          {squares.map((square, index) => (
            <Square key={index} value={square} onSquareClick={() => handleClick(index)} />
          ))}
        </div>
      </div>
    </>
  );
};

function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export const TicTacToe = ({}: TicTacToeProps) => {
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  const winner = calculateWinner(currentSquares);
  let status: string;
  if (winner) {
    status = "Winner: " + winner;
  } else if (currentMove === 9) {
    status = "It's a Tie!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const moves = history.map((_, move) => {
    if (move > 0) {
      return (
        <li key={move}>
          <button
            onClick={() => jumpTo(move)}
            className="bg-cyan-500 dark:bg-indigo-800 p-2 rounded-md my-1"
          >
            Go to move # {move}
          </button>
        </li>
      );
    }
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          className={`bg-cyan-500 dark:bg-indigo-800 p-2 rounded-md my-1 ${
            !status.includes("Next player:")
              ? "animate-bounce"
              : "hover:animate-wiggle"
          }`}
        >
          Go to game start
        </button>
      </li>
    );
  });

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center mt-2 ">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <ol className="flex items-start justify-center flex-col m-3 ">
          {status}
          {moves}
        </ol>
      </div>
    </>
  );
};
