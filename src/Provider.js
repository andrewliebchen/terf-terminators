import { useEffect, useState } from "react";
import { useTimer } from "use-timer";
import Context from "./Context";
import { randomSync } from "pure-random-number";
import { shallowEqualArrays } from "shallow-equal";

const gridSize = 5;
const patchValue = 3.5;

const randomCoordinates = (exclude = [0, 0], min = 0, max = gridSize - 1) => {
  const generate = () => randomSync(min, max);
  const generateCoordinates = () => [generate(), generate()];
  const coordinates = generateCoordinates();

  return !shallowEqualArrays(coordinates, exclude)
    ? coordinates
    : generateCoordinates();
};

console.log(randomCoordinates());

const Provider = props => {
  // Cursor
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  // Track dirt patches, end the game
  const dirtInit = [[1, 1]];
  const [dirtPatches, setDirtPatches] = useState(dirtInit);

  // House
  const [housePosition] = useState(randomCoordinates(dirtInit, 1));

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
        gridSize,
        housePosition,
        setDirtPatches,
        setGameOver,
        time,
        patch: {
          size: `${100 / gridSize}vh`,
          value: patchValue
        },
        cursor: { x, setX, y, setY },
        revenue: (dirtPatches.length * patchValue).toFixed(2),
        getCoordinates: value => `${value * (100 / gridSize)}%`,
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
