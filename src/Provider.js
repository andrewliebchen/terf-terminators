import { useEffect, useState } from "react";
import { useTimer } from "use-timer";
import Context from "./Context";

const gridSize = 3;
const patchValue = 3.5;

const Provider = props => {
  // Cursor
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  // Track dirt patches, end the game
  const dirtInit = [[1, 1]];
  const [dirtPatches, setDirtPatches] = useState(dirtInit);

  // Timer
  const { time, start, reset } = useTimer({
    interval: 1000
  });
  useEffect(() => start(), [start]);

  // Game over
  const [gameOver, setGameOver] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setGameOver(dirtPatches.length === gridSize * gridSize));

  return (
    <Context.Provider
      value={{
        ...props,
        dirtPatches,
        gameOver,
        setDirtPatches,
        setGameOver,
        time,
        gridSize,
        patch: {
          size: `${100 / gridSize}vh`,
          value: patchValue
        },
        cursor: { x, setX, y, setY },
        revenue: (dirtPatches.length * patchValue).toFixed(2),
        getCoordinates: value => value * (100 / gridSize),
        resetGame: () => {
          setGameOver(false);
          setDirtPatches(dirtInit);
          setX(0);
          setY(0);
          reset();
        }
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
