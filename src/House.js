import { Flex } from "theme-ui";
import { useContext } from "react";
import Context from "./Context";
import theme from "./theme";

const House = props => {
  const { patch, housePosition, getCoordinates } = useContext(Context);

  return (
    <Flex
      sx={{
        size: patch.size,
        position: "absolute",
        backgroundImage: `linear-gradient(to right, ${theme.colors.roof} 50%, ${theme.colors.roofAlt} 50%)`,
        top: getCoordinates(housePosition[1]),
        left: getCoordinates(housePosition[0])
      }}
    />
  );
};

export default House;
