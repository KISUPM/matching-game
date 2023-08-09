import { Box, Text } from "@chakra-ui/react";
import React from "react";
import CardImg from "./Components/CardImg";

function App() {
  return (
    <Box w="100vw" minH="100dvh" bg="#36454F" color="#fff" p="1rem">
      <Text>Hello</Text>
      <CardImg size={150} />
    </Box>
  );
}

export default App;
