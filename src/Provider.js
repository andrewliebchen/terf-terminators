import { useEffect, useState } from "react";
import { useTimer } from "use-timer";
import Context from "./Context";

const Provider = props => {
  const gridSize = 5;
  const grassRows = 2;
  const grassRowWidth = 100 / (gridSize / 2) / grassRows;

  const patchSize = `${100 / gridSize}vh`;
  const patchValue = 3.5;

  const dirtInit = [[1, 1]];

  const getCoordinates = value => value * (100 / gridSize);

  // Cursor
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  // Track dirt patches, end the game
  const [dirtPatches, setDirtPatches] = useState(dirtInit);
  const revenue = (dirtPatches.length * patchValue).toFixed(2);

  // Timer
  const { time, start, reset } = useTimer({
    interval: 1000
  });
  useEffect(() => start(), [start]);

  // Game over
  const [gameOver, setGameOver] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setGameOver(dirtPatches.length === gridSize * gridSize));

  const resetGame = () => {
    setGameOver(false);
    setDirtPatches(dirtInit);
    setX(0);
    setY(0);
    reset();
  };

  return (
    <Context.Provider
      value={{
        ...props,
        dirtPatches,
        gameOver,
        getCoordinates,
        grassRowWidth,
        gridSize,
        patchSize,
        patchValue,
        resetGame,
        revenue,
        setDirtPatches,
        setX,
        setY,
        time,
        x,
        y
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
