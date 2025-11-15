import {
  Avatar,
  Box,
  Button,
  Card,
  Icon,
  Image,
  ProgressCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { ImBin } from "react-icons/im";
import "react-circular-progressbar/dist/styles.css";
import dustbin from "../../assets/dustbin.png";

const Dustbin = () => {
  return (
    <Box position={"relative"} overflowX={"hidden"} gradientFrom={"bg.success"}>
      <Card.Root variant={"elevated"} width="320px">
        <Card.Body gap="2">
          <Box
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box
              style={{ width: "8rem", height: "8rem", position: "relative" }}
            >
              <CircularProgressbarWithChildren strokeWidth={5} value={66}>
                <Box position={"relative"}>
                  <Avatar.Root
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    size="2xl"
                    shape="full"
                    bg={"white"}
                  >
                    <Box>
                      <Image boxSize="100px" src={dustbin}></Image>
                    </Box>
                  </Avatar.Root>
                </Box>
                <Text position={"absolute"} bottom="0.5rem">
                  80%
                </Text>
              </CircularProgressbarWithChildren>
            </Box>
          </Box>
          <Card.Title mt="2">Bin</Card.Title>
          <Card.Description>
            <Text>
              Address: <b>Sirasgi</b>
            </Text>
            <Text>Logituted</Text>
            <Text>Logituted</Text>
          </Card.Description>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button
            variant="outline"
            _hover={{
              bg: "blue.500",
              color: "white",
            }}
          >
            History
          </Button>
          <Button
            variant="outline"
            color={"white"}
            bg={"blue.500"}
            _hover={{
              bg: "blue.400",
            }}
          >
            View on Map
          </Button>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
};

export default Dustbin;
/*
  <Box
        width={"320px"}
        height={"320PX"}
        shadow={"lg"}
        borderRadius={"1rem"}
        position={"relative"}
      >
        <Box
          position={"absolute"}
          height={"50%"}
          bg={"blue.200"}
          zIndex={10}
          bottom={"0px"}
          width={"inherit"}
          opacity={0.5}
        />
        <Box height={"full"} padding={"1rem"}>
          <VStack gap="1rem">
            <Box
              width={"100%"}
              display={"flex"}
              alignItems={"flex-start"}
              justifyContent={"center"}
            >
              <Box
                style={{ width: "8rem", height: "8rem", position: "relative" }}
              >
                <CircularProgressbarWithChildren strokeWidth={5} value={66}>
                  <Box position={"relative"}>
                    <Avatar.Root
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      size="2xl"
                      shape="full"
                      bg={"white"}
                    >
                      <Box>
                        <Image boxSize="100px" src={dustbin}></Image>
                      </Box>
                    </Avatar.Root>
                  </Box>
                  <Text position={"absolute"} bottom="0.5rem">
                    80%
                  </Text>
                </CircularProgressbarWithChildren>
              </Box>
            </Box>
          </VStack>
        </Box>
      </Box>
*/
