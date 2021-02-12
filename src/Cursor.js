import { Box } from "theme-ui";
import { useContext } from "react";
import Context from "./Context";

const Cursor = props => {
  const { patch, getCoordinates, cursor } = useContext(Context);
  return (
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
  );
};

export default Cursor;
