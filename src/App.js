import { Button, Box, Flex, Text } from "theme-ui";
import { useEffect, useState } from "react";
import { useTimer } from "use-timer";
import isArrayInArray from "@pelevesque/is-array-in-array";
import theme from "./theme";
import TimeFormat from "hh-mm-ss";

const gridSize = 5;
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

const DirtPatch = patch => {
  return (
    <Box
      sx={{
        ...patchStyles,
        bg: "dirt",
        left: `${getCoordinates(patch[0])}vw`,
        top: `${getCoordinates(patch[1])}vh`
      }}
    />
  );
};

const App = () => {
  // Cursor
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  // Track dirt patches, end the game
  const [dirtPatches, setDirtPatches] = useState(dirtInit);
  const revenue = (dirtPatches.length * patchValue).toFixed(2);
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

  return gameOver ? (
    <Flex
      sx={{
        alignItems: "center",
        bg: "dirt",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        p: 5,
        width: "100vw"
      }}
    >
      <Text sx={{ fontWeight: "bold" }}>Hasta la vista, baby!</Text>
      <Text sx={{ fontSize: 4 }}>
        You brought in <b>${revenue}</b> in no time! You must be a true{" "}
        <b>TerfTerminator</b>.
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
          position: "fixed",
          zIndex: 1
        }}
      />

      {dirtPatches.map((patch, i) => (
        <DirtPatch key={i} {...patch} />
      ))}

      <Box
        sx={{
          ...patchStyles,
          border: "5px solid",
          borderColor: "white",
          left: `${getCoordinates(x)}vw`,
          top: `${getCoordinates(y)}vh`
        }}
      />
      <Flex
        sx={{
          bottom: 0,
          color: "text",
          gap: 4,
          left: 0,
          p: 4,
          position: "fixed"
        }}
      >
        <Text sx={{ fontWeight: "bold" }}>${revenue}</Text>
        <Text>{TimeFormat.fromS(time, "mm:ss")}</Text>
      </Flex>
    </Box>
  );
};

export default App;
