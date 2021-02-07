import { useState } from "react";
import { Box } from "theme-ui";

const gridSize = 5;

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
        setDirtPatches([...dirtPatches, [x, y]]);
        break;
      default:
        return false;
    }
  };

  console.log(dirtPatches);

  return (
    <Box sx={{ bg: "grass", width: "100vw", height: "100vh" }}>
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
    </Box>
  );
};

export default App;
