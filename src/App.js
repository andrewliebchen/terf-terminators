import { Button, Box, Flex, Text } from "theme-ui";
import { useContext } from "react";
import theme from "./theme";
import TimeFormat from "hh-mm-ss";
import DirtPatch from "./DirtPatch";
import House from "./House";
import KeyCodeListener from "./KeyCodeListener";
import Context from "./Context";

const App = () => {
  const {
    gridSize,
    grassRowWidth,
    patchSize,
    getCoordinates,
    x,
    y,
    setX,
    setY,
    dirtPatches,
    setDirtPatches,
    revenue,
    time,
    gameOver,
    resetGame
  } = useContext(Context);

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
          <DirtPatch key={i} index={i} patch={patch} />
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
