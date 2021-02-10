import { Flex, Text } from "theme-ui";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes({
  "0%": { opacity: 1, transform: "translateY(10px)" },
  "70%": { opacity: 1, transform: "translateY(-70px)" },
  "100%": { opacity: 0, transform: "translateY(-150px)" }
});

const DirtPatch = props => {
  return (
    <Flex
      sx={{
        size: props.size,
        position: "absolute",
        bg: "dirt",
        left: `${props.x}%`,
        top: `${props.y}%`,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {props.index > 0 && (
        <Text
          sx={{
            animationName: fadeIn,
            animationDuration: "1.2s",
            animationFillMode: "forwards",
            fontWeight: "bold"
          }}
        >
          +${props.value.toFixed(2)}
        </Text>
      )}
    </Flex>
  );
};

export default DirtPatch;
