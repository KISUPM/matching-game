import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import classes from "./CardImg.module.css";

interface Props {
  size?: number;
}

const CardImg: React.FC<Props> = (props) => {
  const [isRotate, setIsRotate] = useState(false);

  const toggleCard = () => {
    // if (!isRotate) {
    setIsRotate(!isRotate);
    // }
  };

  return (
    <Box
      w={`${props.size || 100}px`}
      h={`${props.size! * 1.5 || 150}px`}
      cursor={"pointer"}
      userSelect={"none"}
      onClick={toggleCard}
    >
      <Box
        position={"relative"}
        w="100%"
        h="100%"
        transition={"all 0.5s"}
        transform={isRotate ? "rotateY(180deg)" : "rotateY(0deg)"}
        border="1px solid black"
      >
        <Box
          className={classes.card}
          transform={"rotateY(180deg)"}
          bg="red"
          color="#fff"
        >
          front
        </Box>
        <Box
          className={classes.card}
          bg="#ddd"
          color="#000"
          transition={"transform 0.5s"}
          top="1rem"
        >
          back
        </Box>
      </Box>
    </Box>
  );
};

export default CardImg;
