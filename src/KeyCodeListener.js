import { useContext } from "react";
import Context from "./Context";
import isArrayInArray from "@pelevesque/is-array-in-array";

const KeyCodeListener = props => {
  const { dirtPatches, gridSize, setDirtPatches, cursor } = useContext(Context);

  const keyCodeListener = keyCode => {
    switch (keyCode) {
      case 37: // left
        cursor.setX(cursor.x > 0 ? cursor.x - 1 : 0);
        break;
      case 38: // up
        cursor.setY(Math.max(0, cursor.y - 1));
        break;
      case 39: // right
        cursor.setX(cursor.x < gridSize - 1 ? cursor.x + 1 : gridSize - 1);
        break;
      case 40: // down
        cursor.setY(cursor.y < gridSize - 1 ? cursor.y + 1 : gridSize - 1);
        break;
      case 13: // enter
        const newPatch = [cursor.x, cursor.y];
        isArrayInArray(newPatch, dirtPatches) ||
          setDirtPatches([...dirtPatches, newPatch]);
        break;
      default:
        return false;
    }
  };

  return (
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
  );
};

export default KeyCodeListener;
