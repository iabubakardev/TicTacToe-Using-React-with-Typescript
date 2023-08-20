import React, { useEffect, useState } from "react";
import Square from "./Square";

const Board: React.FC = (): JSX.Element => {
  const initialState = Array(9).fill(null);
  const [state, setState] = useState<(string | null)[]>(initialState);
  const [isXturn, setIsXTurn] = useState<boolean>(true);

  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
      if (
        !state.includes(null) &&
        state[a] !== state[b] &&
        state[a] !== state[c]
      ) {
        return `Game Draw`;
      }
    }

    return false;
  };

  const isWinner = checkWinner();
  const handleClick = (index: number) => {
    if (state[index] !== null) {
      return;
    }
    const copyState = [...state];
    copyState[index] = isXturn ? "X" : "O";
    setState(copyState);
    setIsXTurn(!isXturn);
  };

  const resetHandle = () => {
    setState(initialState);
  };

  return (
    <div className="board-container">
      {isWinner ? (
        <>
          {isWinner} Winner <button onClick={resetHandle}>Play Again</button>{" "}
        </>
      ) : (
        <>
          <div className="board-row">
            <Square onClick={() => handleClick(0)} value={state[0]} />
            <Square onClick={() => handleClick(1)} value={state[1]} />
            <Square onClick={() => handleClick(2)} value={state[2]} />
          </div>
          <div className="board-row">
            <Square onClick={() => handleClick(3)} value={state[3]} />
            <Square onClick={() => handleClick(4)} value={state[4]} />
            <Square onClick={() => handleClick(5)} value={state[5]} />
          </div>
          <div className="board-row">
            <Square onClick={() => handleClick(6)} value={state[6]} />
            <Square onClick={() => handleClick(7)} value={state[7]} />
            <Square onClick={() => handleClick(8)} value={state[8]} />
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
