// this component will be the main page for games, it will show all of games and a search bar to filter them
// a square that shows a thumbnail of the game and its name, clicking on it will take you to the game page
// hovering over the thumbnail will show a preview video of the game
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import UltimateTicTacToe from "../assets/games/thumbnails/Ultimate Tic-Tac-Toe.png";
import TicTacToe from "../assets/games/thumbnails/Tic-Tac-Toe.png";
import MouseGame from "../assets/games/thumbnails/Mouse Game.png";
import SidewaysSam from "../assets/games/thumbnails/Sideways Sam.png";

const games = [
  {
    id: "ultimatetictactoe",
    name: "Ultimate Tic Tac Toe",
    description:
      "A more complex version of tic tac toe where you have to win 3 boards to win the game.",
    path: "ultimatetictactoe",
    thumbnail: UltimateTicTacToe,
    video: "/game/videos/ultimate-tic-tac-toe.mp4",
  },
  {
    id: "tictactoe",
    name: "Tic Tac Toe",
    description: "The classic tic tac toe game. Get three in a row to win!",
    path: "/tictactoe",
    thumbnail: TicTacToe,
    video: "/game/videos/tic-tac-toe.mp4",
  },
  {
    id: "mouse",
    name: "Mouse Game",
    description:
      "Control a mouse and try to eat the cheese while avoiding the cat!",
    path: "/mouse",
    thumbnail: MouseGame,
    video: "/game/videos/mouse-game.mp4",
  },
  {
    id: "sidewayssam",
    name: "Sideways Sam",
    description:
      "Help Sam navigate through a sideways world and reach the end of the level!",
    path: "/sidewayssam",
    thumbnail: SidewaysSam,
    video: "/game/videos/sideways-sam.mp4",
  },
];

function GameCard({ game }) {
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .catch((err) => console.error("Video play failed:", err));
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link
      to={game.path}
      className="group relative overflow-hidden rounded-lg bg-cyan-500 dark:bg-blue-800 hover:bg-cyan-600 dark:hover:bg-blue-700 transition-colors duration-200"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-400 dark:bg-gray-700">
        {/* Thumbnail - shown by default */}
        <img
          src={game.thumbnail}
          alt={game.name}
          className={`h-full w-full object-cover transition-opacity duration-200 ${
            isHovering ? "opacity-0" : "opacity-100"
          }`}
        />
        {/* Video - shown on hover */}
        <video
          ref={videoRef}
          src={game.video}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
          muted
          loop
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-black dark:text-white">
          {game.name}
        </h2>
        <p className="text-sm text-black dark:text-gray-200">
          {game.description}
        </p>
      </div>
    </Link>
  );
}

export default function GamesMain() {
  return (
    <div className="text-black dark:text-white">
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
        Games
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
