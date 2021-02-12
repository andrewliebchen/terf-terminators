import { Flex, Text } from "theme-ui";
import { keyframes } from "@emotion/react";
import { useContext } from "react";
import Context from "./Context";

const DirtPatch = props => {
  const { patch, getCoordinates } = useContext(Context);

  return (
    <Flex
      sx={{
        size: patch.size,
        position: "absolute",
        bg: "dirt",
        left: getCoordinates(props.patch[0]),
        top: getCoordinates(props.patch[1]),
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {props.index > 0 && (
        <Text
          sx={{
            animationName: keyframes({
              "0%": { opacity: 1, transform: "translateY(10px)" },
              "70%": { opacity: 1, transform: "translateY(-70px)" },
              "100%": { opacity: 0, transform: "translateY(-150px)" }
            }),
            animationDuration: "1.2s",
            animationFillMode: "forwards",
            fontWeight: "bold"
          }}
        >
          +${patch.value.toFixed(2)}
        </Text>
      )}
    </Flex>
  );
};

export default DirtPatch;
