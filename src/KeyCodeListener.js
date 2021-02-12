import isArrayInArray from "@pelevesque/is-array-in-array";

const KeyCodeListener = props => {
  const { x, y, gridSize, setDirtPatches, dirtPatches, setX, setY } = props;

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
