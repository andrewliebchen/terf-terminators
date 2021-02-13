import { Box, Flex, Text } from "theme-ui";
import { useContext } from "react";
import theme from "./theme";
import TimeFormat from "hh-mm-ss";
import DirtPatch from "./DirtPatch";
import House from "./House";
import Context from "./Context";
import Cursor from "./Cursor";
import GameOver from "./GameOver";

const App = () => {
  const { gameOver, revenue, dirtPatches, time, gridSize } = useContext(
    Context
  );

  const grassRowWidth = 100 / (gridSize / 2) / 2;
  const grassBackground = `repeating-linear-gradient(
    90deg,
    ${theme.colors.grass},
    ${theme.colors.grass} ${grassRowWidth / 2}vh,
    ${theme.colors.grassAlt} ${grassRowWidth / 2}vh,
    ${theme.colors.grassAlt} ${grassRowWidth}vh
  )`;

  return gameOver ? (
    <GameOver />
  ) : (
    <Flex
      sx={{
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        backgroundPosition: "50% 50%",
        backgroundSize: `${grassRowWidth}vh`,
        backgroundImage: grassBackground,
        overflow: "hidden"
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
        <House />
        <Cursor />
      </Box>
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
    </Flex>
  );
};

export default App;
