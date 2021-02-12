import { Flex, Text, Button } from "theme-ui";
import { useContext } from "react";
import Context from "./Context";

const GameOver = props => {
  const { revenue, resetGame } = useContext(Context);

  return (
    <Flex
      sx={{
        alignItems: "center",
        bg: "dirt",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        p: 5,
        width: "100vw"
      }}
    >
      <Text sx={{ fontWeight: "bold" }}>Hasta la vista, baby!</Text>
      <Text sx={{ fontSize: 4 }}>
        You brought in <b>${revenue}</b> in no time! You must be a true{" "}
        <b>TerfTerminator</b>.
      </Text>
      <Button sx={{ mt: 4 }} onClick={resetGame}>
        Try again
      </Button>
    </Flex>
  );
};

export default GameOver;
