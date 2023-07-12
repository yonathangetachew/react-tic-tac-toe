import { useState } from "react";
import "./App.css";

function Square({ value, onSquareClick }) {
  // function Square({ value }) indicates the Square component can be passed a prop called value.
  return (
    // The return JavaScript keyword means whatever comes after is returned as a value to the caller of the function.
    // className="square" is a button property or prop that tells CSS how to style the button.
    <button className="square" onClick={onSquareClick}>
      {value}
    </button> // <button> is a JSX element. A JSX element is a combination of JavaScript code and HTML tags that describes what you’d like to display.
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // The handleClick function creates a copy of the squares array (nextSquares) with the JavaScript slice() Array method. Then, handleClick updates the nextSquares array to add X to the first ([0] index) square.
    if (calculateWinner(squares) || squares[i]) {
      // You’ll check to see if the square already has a X or an O. If the square is already filled, you will return in the handleClick function early—before it tries to update the board state.
      // You will call calculateWinner(squares) in the Board component’s handleClick function to check if a player has won. You can perform this check at the same time you check if a user has clicked a square that already has a X or and O.
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      // Each time a player moves, xIsNext (a boolean) will be flipped to determine which player goes next and the game’s state will be saved. You’ll update the Board’s handleClick function to flip the value of xIsNext
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    // To let the players know when the game is over, you can display text such as “Winner: X” or “Winner: O”. To do that you’ll add a status section to the Board component. The status will display the winner if the game is over and if the game is ongoing you’ll display which player’s turn is next
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {
          <Square
            value={squares[0]}
            onSquareClick={() => handleClick(0)}
          /> /*  Here, () => handleClick(0) is an arrow function, which is a shorter way to define functions. When the square is clicked, the code after the => “arrow” will run, calling handleClick(0). */
        }
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  // The export JavaScript keyword makes this function accessible outside of this file.
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    // create a handlePlay function inside the Game component that will be called by the Board component to update the game. Pass xIsNext, currentSquares and handlePlay as props to the Board component
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  // you’ll add a helper function called calculateWinner that takes an array of 9 squares, checks for a winner and returns 'X', 'O', or null as appropriate.
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