import { Box } from "theme-ui";
import { useContext } from "react";
import Context from "./Context";
import isArrayInArray from "@pelevesque/is-array-in-array";
import { shallowEqualArrays } from "shallow-equal";

const Cursor = props => {
  const {
    cursor,
    dirtPatches,
    getCoordinates,
    gridSize,
    housePosition,
    patch,
    setDirtPatches
  } = useContext(Context);

  const keyCodeListener = keyCode => {
    if (keyCode === 13) {
      // enter
      const newPatch = [cursor.x, cursor.y];
      isArrayInArray(newPatch, dirtPatches) ||
        setDirtPatches([...dirtPatches, newPatch]);
    } else {
      let newX = cursor.x;
      let newY = cursor.y;

      switch (keyCode) {
        case 37: // left
          newX = cursor.x > 0 ? cursor.x - 1 : 0;
          break;
        case 38: // up
          newY = Math.max(0, cursor.y - 1);
          break;
        case 39: // right
          newX = cursor.x < gridSize - 1 ? cursor.x + 1 : gridSize - 1;
          break;
        case 40: // down
          newY = cursor.y < gridSize - 1 ? cursor.y + 1 : gridSize - 1;
          break;
        default:
          return false;
      }
      if (!shallowEqualArrays([newX, newY], housePosition)) {
        cursor.setX(newX);
        cursor.setY(newY);
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          size: patch.size,
          position: "absolute",
          border: "5px solid",
          borderColor: "white",
          left: getCoordinates(cursor.x),
          top: getCoordinates(cursor.y)
        }}
      />
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
    </>
  );
};

export default Cursor;
