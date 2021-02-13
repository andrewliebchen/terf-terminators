import { Flex } from "theme-ui";
import { useContext } from "react";
import Context from "./Context";
import theme from "./theme";

// Don't allow the cursor to cross the driveway either...

const House = props => {
  const { patch, housePosition, getCoordinates } = useContext(Context);

  return (
    <Flex
      sx={{
        position: "absolute",
        top: getCoordinates(housePosition[1]),
        left: getCoordinates(housePosition[0]),
        width: patch.size
      }}
    >
      <Flex
        sx={{
          position: "absolute",
          top: "100%",
          height: 9999,
          bg: "driveway",
          width: "50%"
        }}
      />
      <Flex
        sx={{
          size: patch.size,
          position: "absolute",
          top: 0,
          backgroundImage: `linear-gradient(to right, ${theme.colors.roof} 50%, ${theme.colors.roofAlt} 50%)`
        }}
      />
    </Flex>
  );
};

export default House;
