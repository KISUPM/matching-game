import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import classes from "./CardImg.module.css";

interface Props {
  size?: number;
  imageFront: string;
  imageBack?: string;
  isOpen: boolean;
  isMatch: boolean;
  onClick: () => void;
}

const CardImg: React.FC<Props> = (props) => {
  return (
    <Box
      w={`${props.size || 100}px`}
      h={`${props.size! * 1.5 || 150}px`}
      cursor={"pointer"}
      userSelect={"none"}
      // display={props.isMatch ? "none" : "block"}
      onClick={() => {
        props.onClick();
      }}
    >
      <Box
        position={"relative"}
        w="100%"
        h="100%"
        transition={"all 0.3s"}
        className={classes.cardContent}
        transform={
          props.isOpen || props.isMatch ? "rotateY(180deg)" : "rotateY(0deg)"
        }
        border="1px solid black"
      >
        <Box
          className={classes.card}
          transform={"rotateY(180deg)"}
          bg="#fff"
          color="#000"
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          p="0.25rem"
        >
          <Image src={props.imageFront} maxW="100%" maxH="100%" />
        </Box>
        <Box
          className={classes.card}
          bg="#ddd"
          color="#000"
          transition={"transform 0.5s"}
          _hover={{ opacity: "0.8" }}
        >
          {props.imageBack ? (
            <Image src={props.imageFront} maxW="100%" maxH="100%" />
          ) : (
            <Text>back</Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CardImg;
