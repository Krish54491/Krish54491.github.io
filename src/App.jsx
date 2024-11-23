import { TicTacToe } from "./TicTacToe";
import { Countdown } from "./Countdown";

function App() {
  let mode = "Tic-Tac-Toe";

  if (mode === "Tic-Tac-Toe") return <TicTacToe />;
  else if (mode === "Countdown") return <Countdown />;
  else {
    return <button></button>;
  }
}

export default App;
