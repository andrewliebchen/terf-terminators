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
    cursor,
    gameOver,
    revenue,
    resetGame,
    dirtPatches,
    getCoordinates,
    patch,
    time,
    gridSize
  } = useContext(Context);

  const grassRowWidth = 100 / (gridSize / 2) / 2;

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
      <Button sx={{ mt: 4 }} onClick={resetGame}>
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
            size: patch.size,
            position: "absolute",
            border: "5px solid",
            borderColor: "white",
            left: `${getCoordinates(cursor.x)}%`,
            top: `${getCoordinates(cursor.y)}%`
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
      <KeyCodeListener />
    </Flex>
  );
};

export default App;
