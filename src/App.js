import { Button, Box, Flex, Text } from "theme-ui";
import { useEffect, useState } from "react";
import { useTimer } from "use-timer";
import isArrayInArray from "@pelevesque/is-array-in-array";
import theme from "./theme";

const gridSize = 2;
const grassRows = 4;
const grassRowWidth = 100 / (gridSize / 2) / grassRows;

const patchValue = 3.5;

const dirtInit = [[1, 1]];

const patchStyles = {
  width: `${100 / gridSize}vw`,
  height: `${100 / gridSize}vh`,
  position: "fixed"
};

const getCoordinates = value => value * (100 / gridSize);

const App = () => {
  // Cursor
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  // Track dirt patches, end the game
  const [dirtPatches, setDirtPatches] = useState(dirtInit);
  const keyCodeListener = keyCode => {
    switch (keyCode) {
      case 37: // left
        setX(x > 0 ? x - 1 : 0);
        break;
      case 38: // up
        setY(Math.max(0, y - 1));
        break;
      case 39: // right
        setX(x < gridSize - 1 ? x + 1 : gridSize - 1);
        break;
      case 40: // down
        setY(y < gridSize - 1 ? y + 1 : gridSize - 1);
        break;
      case 13: // enter
        const newPatch = [x, y];
        isArrayInArray(newPatch, dirtPatches) ||
          setDirtPatches([...dirtPatches, newPatch]);
        break;
      default:
        return false;
    }
  };

  // Timer
  const { time, start, reset, pause } = useTimer();
  useEffect(() => start(), [start]);

  // Game over
  const [gameOver, setGameOver] = useState(false);
  useEffect(() => setGameOver(dirtPatches.length === gridSize * gridSize));

  const resetGame = () => {
    setGameOver(false);
    setDirtPatches(dirtInit);
    setX(0);
    setY(0);
    reset();
  };

  return gameOver ? (
    <Flex
      sx={{
        bg: "dirt",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        gap: 3,
        flexDirection: "column",
        p: 5
      }}
    >
      <Text sx={{ fontWeight: "bold" }}>Hasta la vista, baby!</Text>
      <Text sx={{ fontSize: 4 }}>
        At such speed, you must be a true <b>TerfTerminator</b>!
      </Text>
      <Button sx={{ mt: 4 }} onClick={() => resetGame()}>
        Try again
      </Button>
    </Flex>
  ) : (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundSize: `${grassRowWidth}vw`,
        backgroundImage: `repeating-linear-gradient(
          90deg,
          ${theme.colors.grass},
          ${theme.colors.grass} ${grassRowWidth / 2}vw,
          ${theme.colors.grassAlt} ${grassRowWidth / 2}vw,
          ${theme.colors.grassAlt} ${grassRowWidth}vw
        )`
      }}
    >
      <input
        autoFocus
        onKeyDown={event => keyCodeListener(event.keyCode)}
        style={{
          opacity: 0,
          pointerEvents: "none",
          zIndex: 1,
          position: "fixed"
        }}
      />

      {dirtPatches.map((patch, i) => (
        <Box
          key={i}
          sx={{
            ...patchStyles,
            bg: "dirt",
            top: `${getCoordinates(patch[1])}vh`,
            left: `${getCoordinates(patch[0])}vw`
          }}
        />
      ))}

      <Box
        sx={{
          ...patchStyles,
          top: `${getCoordinates(y)}vh`,
          left: `${getCoordinates(x)}vw`,
          border: "5px solid",
          borderColor: "white"
        }}
      />
      <Flex
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          p: 4,
          gap: 4,
          color: "text"
        }}
      >
        <Text sx={{ fontWeight: "bold" }}>
          ${(dirtPatches.length * patchValue).toFixed(2)}
        </Text>
        <Text>{time}</Text>
      </Flex>
    </Box>
  );
};

export default App;
