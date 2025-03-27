import React, { useState } from "react";

interface TsumegoData {
  C: string;
  AB: string[];
  AW: string[];
  SZ: string;
  SOL: string[][];
}

interface TsumegoBoardProps {
  data: TsumegoData;
  onSolve?: (correct: boolean) => void;
}

const sgfToIndices = (coord: string): [number, number] => {
  if (coord.length !== 2) return [-1, -1];

  const x = coord.charCodeAt(0) - "a".charCodeAt(0);
  const y = coord.charCodeAt(1) - "a".charCodeAt(0);

  return [x, y];
};

const indicesToSgf = (x: number, y: number): string => {
  return (
    String.fromCharCode("a".charCodeAt(0) + x) +
    String.fromCharCode("a".charCodeAt(0) + y)
  );
};

const TsumegoBoard: React.FC<TsumegoBoardProps> = ({ data, onSolve }) => {
  const boardSize = Number.parseInt(data.SZ) || 19;
  const [board, setBoard] = useState<Array<Array<string>>>(
    Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(""))
  );
  const [message, setMessage] = useState<string>("");
  const [userMoves, setUserMoves] = useState<string[]>([]);
  const [gameState, setGameState] = useState<"playing" | "solved" | "failed">(
    "playing"
  );

  React.useEffect(() => {
    const newBoard = Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(""));

    data.AB.forEach((coord) => {
      const [x, y] = sgfToIndices(coord);
      if (x >= 0 && y >= 0 && x < boardSize && y < boardSize) {
        newBoard[y][x] = "B";
      }
    });

    data.AW.forEach((coord) => {
      const [x, y] = sgfToIndices(coord);
      if (x >= 0 && y >= 0 && x < boardSize && y < boardSize) {
        newBoard[y][x] = "W";
      }
    });

    setBoard(newBoard);
    setMessage(data.C || "Black to play");
    setUserMoves([]);
    setGameState("playing");
  }, [data, boardSize]);

  const handleCellClick = (x: number, y: number) => {
    if (gameState !== "playing" || board[y][x] !== "") return;

    const moveCoord = indicesToSgf(x, y);
    const isCorrectMove = data.SOL.some((sol) => sol[1] === moveCoord);

    if (isCorrectMove) {
      const newBoard = [...board];
      newBoard[y][x] = "B";
      setBoard(newBoard);

      // Add to user moves
      const newUserMoves = [...userMoves, moveCoord];
      setUserMoves(newUserMoves);

      if (newUserMoves.length === data.SOL.length) {
        setMessage("Correct! Problem solved.");
        setGameState("solved");
        onSolve && onSolve(true);
      } else {
        setMessage("Correct move! Continue...");
      }
    } else {
      setMessage("Incorrect move. Try again.");
      setGameState("failed");
      onSolve && onSolve(false);
    }
  };

  const resetBoard = () => {
    const newBoard = [...board];

    userMoves.forEach((move) => {
      const [x, y] = sgfToIndices(move);
      if (x >= 0 && y >= 0 && x < boardSize && y < boardSize) {
        newBoard[y][x] = "";
      }
    });

    setBoard(newBoard);
    setUserMoves([]);
    setGameState("playing");
    setMessage(data.C || "Black to play");
  };

  const renderCoordinates = () => {
    const letters = "ABCDEFGHJKLMNOPQRST";

    return (
      <>
        <div className="flex ml-6">
          {Array(boardSize)
            .fill(null)
            .map((_, i) => (
              <div
                key={`top-${i}`}
                className="w-6 h-6 flex items-center justify-center text-xs"
              >
                {letters[i]}
              </div>
            ))}
        </div>

        <div className="flex">
          <div className="flex flex-col">
            {Array(boardSize)
              .fill(null)
              .map((_, i) => (
                <div
                  key={`left-${i}`}
                  className="w-6 h-6 flex items-center justify-center text-xs"
                >
                  {boardSize - i}
                </div>
              ))}
          </div>

          <div className="relative">{renderBoard()}</div>

          <div className="flex flex-col">
            {Array(boardSize)
              .fill(null)
              .map((_, i) => (
                <div
                  key={`right-${i}`}
                  className="w-6 h-6 flex items-center justify-center text-xs"
                >
                  {boardSize - i}
                </div>
              ))}
          </div>
        </div>

        <div className="flex ml-6">
          {Array(boardSize)
            .fill(null)
            .map((_, i) => (
              <div
                key={`bottom-${i}`}
                className="w-6 h-6 flex items-center justify-center text-xs"
              >
                {letters[i]}
              </div>
            ))}
        </div>
      </>
    );
  };

  const renderBoard = () => {
    return (
      <div
        className="grid bg-amber-200"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, 1.5rem)`,
          gridTemplateRows: `repeat(${boardSize}, 1.5rem)`,
        }}
      >
        {board.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`
                w-6 h-6 flex items-center justify-center
                relative
                ${x < boardSize - 1 ? "border-r border-black" : ""}
                ${y < boardSize - 1 ? "border-b border-black" : ""}
              `}
              onClick={() => handleCellClick(x, y)}
            >
              {isHoshiPoint(x, y, boardSize) && cell === "" && (
                <div className="absolute w-1.5 h-1.5 bg-black rounded-full"></div>
              )}

              {cell && (
                <div
                  className={`
                    w-5 h-5 rounded-full 
                    ${
                      cell === "B" ? "bg-black" : "bg-white border border-black"
                    }
                    shadow-md
                  `}
                ></div>
              )}
            </div>
          ))
        )}
      </div>
    );
  };

  const isHoshiPoint = (x: number, y: number, size: number): boolean => {
    if (size === 19) {
      const hoshiPoints = [
        [3, 3],
        [3, 9],
        [3, 15],
        [9, 3],
        [9, 9],
        [9, 15],
        [15, 3],
        [15, 9],
        [15, 15],
      ];
      return hoshiPoints.some(([hx, hy]) => hx === x && hy === y);
    } else if (size === 13) {
      const hoshiPoints = [
        [3, 3],
        [3, 9],
        [6, 6],
        [9, 3],
        [9, 9],
      ];
      return hoshiPoints.some(([hx, hy]) => hx === x && hy === y);
    } else if (size === 9) {
      const hoshiPoints = [
        [2, 2],
        [2, 6],
        [4, 4],
        [6, 2],
        [6, 6],
      ];
      return hoshiPoints.some(([hx, hy]) => hx === x && hy === y);
    }
    return false;
  };

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4">{message}</p>

      <div className="mb-4">{renderCoordinates()}</div>

      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={resetBoard}
        >
          Reset
        </button>

        {gameState === "failed" && (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => {
              if (data.SOL.length > 0) {
                const [_, firstMove] = data.SOL[0];
                const [x, y] = sgfToIndices(firstMove);
                setMessage(
                  `Hint: Try playing at ${String.fromCharCode(
                    "A".charCodeAt(0) + x
                  )}${boardSize - y}`
                );
              }
            }}
          >
            Hint
          </button>
        )}
      </div>
    </div>
  );
};

export default TsumegoBoard;
