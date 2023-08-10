/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Center, Grid, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineTrophy } from "react-icons/ai";
import CardImg from "./Components/CardImg";

type Item = {
  type: string;
  image: string;
};

function App() {
  let items: Item[] = [
    {
      type: "Grape",
      image: "/img/grape.jpg",
    },
    {
      type: "GreenGrape",
      image: "/img/greenGrape.jpg",
    },
    {
      type: "RedGrape",
      image: "/img/redGrape.jpg",
    },
    {
      type: "Rambutan",
      image: "/img/Rambutan.jpg",
    },
  ];

  const [openCard, setOpenCards] = useState<number[]>([]);
  const [deck, setDeck] = useState<Item[]>([]);
  const [match, setMatch] = useState<{ type: string; image: string }[]>([]);
  const [wait, setWait] = useState(false);
  const [move, setMove] = useState(0);
  function sleep(s: number) {
    return new Promise((resolve) => setTimeout(resolve, s * 1000));
  }

  function shuffleArray(array: Item[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  const initial = async () => {
    setOpenCards([]);
    setMatch([]);
    setWait(false);
    setMove(0);
    await sleep(0.5);
    setDeck(shuffleArray([...items, ...items]));
  };

  useEffect(() => {
    initial();
  }, []);

  const handleClick = (index: number) => {
    if (!wait) {
      if (!match.some((a) => a.type === deck[index].type)) {
        setOpenCards((prev) => [...prev, index]);
      }
    }
  };

  const checkCards = async () => {
    const [first, second] = openCard;
    if (openCard.length === 2) {
      if (first === second) {
        setOpenCards([first]);
      } else {
        setWait(true);
        if (deck[first].type === deck[second].type) {
          setMatch((prev) => [...prev, deck[first]]);
        } else {
          await sleep(1);
        }
        setMove(move + 1);
        setWait(false);
        setOpenCards([]);
      }
    }
  };

  useEffect(() => {
    checkCards();
  }, [openCard]);

  const complete = async () => {
    await sleep(0.5);
    const best = localStorage.getItem("best");
    if (best === null || best > move.toString()) {
      localStorage.setItem("best", move.toString());
    }
    alert("Complete!");
  };

  useEffect(() => {
    if (items.length === match.length) {
      complete();
    }
  }, [match]);

  return (
    <Box w="100vw" minH="100dvh" bg="#36454F" color="#fff" p="1rem">
      <Box w="100%">
        <Heading textAlign={"center"}>Matching Game</Heading>
      </Box>
      <Center mt="1rem">
        <Button onClick={initial} m="auto">
          Restart
        </Button>
      </Center>
      <Grid
        templateColumns={"repeat(4,1fr)"}
        gap="1rem"
        w="fit-content"
        m="auto"
        my="1rem"
      >
        {deck.map((i, index) => {
          return (
            <CardImg
              imageFront={i.image}
              key={index}
              isMatch={match.some((a) => a.type === i.type)}
              isOpen={openCard.includes(index)}
              onClick={() => {
                handleClick(index);
              }}
            />
          );
        })}
      </Grid>
      <Center gap={"1rem"}>
        <Text>Move:{move}</Text>
        <Text display="flex" alignItems={"center"}>
          <AiOutlineTrophy />
          Best Move:{localStorage.getItem("best") || 0}
        </Text>
      </Center>
    </Box>
  );
}

export default App;
