import { useState } from "react";
import { Box, Text } from "theme-ui";
import theme from "./theme";
import isArrayInArray from "@pelevesque/is-array-in-array";

const gridSize = 5;
const grassRows = 4;
const grassRowWidth = 100 / (gridSize / 2) / grassRows;

const patchValue = 3.5;

const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [dirtPatches, setDirtPatches] = useState([[1, 1]]);

  const patchStyles = {
    width: `${100 / gridSize}vw`,
    height: `${100 / gridSize}vh`,
    position: "fixed"
  };

  const getCoordinates = value => value * (100 / gridSize);

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

  return (
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
            left: `${getCoordinates(patch[0])}vw`,
            bg: "dirt"
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

      <Text
        sx={{
          position: "fixed",
          bottom: 4,
          left: 4,
          color: "text",
          fontWeight: "bold",
          fontSize: 5
        }}
      >
        ${(dirtPatches.length * patchValue).toFixed(2)}
      </Text>
    </Box>
  );
};

export default App;
