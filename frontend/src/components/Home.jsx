import React from "react";
import {
  Box,
  Button,
  Container,
  Field,
  Input,
  Stack,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";

const Home = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="0.5rem"
        borderWidth="1px"
        shadow={"md"}
      >
        <Text fontSize={"4xl"} fontFamily={"Work sans"} color={"black"}>
          Smart Waste Management
        </Text>
      </Box>

      <Box
        bg={"white"}
        w="100%"
        p={4}
        borderRadius={"0.5rem"}
        borderWidth={"1px"}
        color={"black"}
        shadow={"md"}
      >
        <Tabs.Root
          css={{
            "--tabs-indicator-bg": "colors.blue.100",
          }}
          defaultValue="login"
          variant={"enclosed"}
        >
          <Tabs.List width="full" bg="blue.100">
            <Tabs.Trigger width={"50%"} borderRadius={"1rem"} value="login">
              Login
            </Tabs.Trigger>
            <Tabs.Trigger width={"50%"} borderRadius={"1rem"} value="signup">
              Sign Up
            </Tabs.Trigger>
            <Tabs.Indicator borderRadius={"1rem"} />
          </Tabs.List>
          <Tabs.Content value="login">
            <Login />
          </Tabs.Content>
          <Tabs.Content value="signup">
            <SignUp />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Container>
  );
};

export default Home;
