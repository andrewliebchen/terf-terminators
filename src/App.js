import { useState } from "react";
import { Box } from "theme-ui";

const gridSize = 4;

const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

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
      default:
        return false;
    }
  };

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

      <Box
        sx={{
          position: "fixed",
          top: `${y * (100 / gridSize)}vh`,
          left: `${x * (100 / gridSize)}vw`,
          border: "5px solid",
          borderColor: "white",
          width: `${100 / gridSize}vw`,
          height: `${100 / gridSize}vh`
        }}
      />
    </Box>
  );
};

export default App;
