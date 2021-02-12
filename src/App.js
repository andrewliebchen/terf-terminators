import { Button, Box, Flex, Text } from "theme-ui";
import { useEffect, useState } from "react";
import { useTimer } from "use-timer";
import theme from "./theme";
import TimeFormat from "hh-mm-ss";
import DirtPatch from "./DirtPatch";
import House from "./House";
import KeyCodeListener from "./KeyCodeListener";

const gridSize = 5;
const grassRows = 2;
const grassRowWidth = 100 / (gridSize / 2) / grassRows;

const patchSize = `${100 / gridSize}vh`;
const patchValue = 3.5;

const dirtInit = [[1, 1]];

const getCoordinates = value => value * (100 / gridSize);

const App = () => {
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
    <Flex
      sx={{
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        backgroundPosition: "50% 50%",
        backgroundSize: `${grassRowWidth}vh`,
        backgroundImage: `repeating-linear-gradient(
          90deg,
          ${theme.colors.grass},
          ${theme.colors.grass} ${grassRowWidth / 2}vh,
          ${theme.colors.grassAlt} ${grassRowWidth / 2}vh,
          ${theme.colors.grassAlt} ${grassRowWidth}vh
        )`
      }}
    >
      <Box
        sx={{
          size: "100vh",
          position: "relative",
          boxShadow: "0 0 0 1000px rgba(0, 0, 0, 0.2)"
        }}
      >
        {dirtPatches.map((patch, i) => (
          <DirtPatch
            key={i}
            size={patchSize}
            x={getCoordinates(patch[0])}
            y={getCoordinates(patch[1])}
            index={i}
            value={patchValue}
          />
        ))}

        <Box
          sx={{
            size: patchSize,
            position: "absolute",
            border: "5px solid",
            borderColor: "white",
            left: `${getCoordinates(x)}%`,
            top: `${getCoordinates(y)}%`
          }}
        />
      </Box>
      <House />
      <Flex
        sx={{
          bottom: 0,
          color: "text",
          gap: 4,
          left: 0,
          right: 0,
          p: 4,
          position: "fixed",
          justifyContent: "center",
          fontVariantNumeric: "tabular-nums"
        }}
      >
        <Text sx={{ fontWeight: "bold" }}>${revenue}</Text>
        <Text>{TimeFormat.fromS(time, "mm:ss")}</Text>
      </Flex>
      <KeyCodeListener
        x={x}
        y={y}
        setX={setX}
        setY={setY}
        dirtPatches={dirtPatches}
        gridSize={gridSize}
        setDirtPatches={setDirtPatches}
      />
    </Flex>
  );
};

export default App;
