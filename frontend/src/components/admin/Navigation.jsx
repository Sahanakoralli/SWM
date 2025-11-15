import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import dustbinImage from "../../assets/dustbin.png";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import MenuBar from "../helper/MenuBar";

const socket = io("https://localhost:5000");

const Navigation = () => {
  const navL = useNavigate();

  const [alerts, setAlerts] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navL("/login");
  };
  return (
    <Box
      position={"static"}
      top={"1px"}
      zIndex={10}
      width={"100vw"}
      height="4rem"
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      bg={"orange.200"}
      shadow={"lg"}
    >
      <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
        <Image src={dustbinImage} alt="Logo" height="5rem" />
        <Text fontSize="3xl" fontWeight="bold" color="blue.600">
          Smart Waste Management
        </Text>
        {/* Or use an actual image */}
      </Box>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-start"}>
        <HStack display={"flex"} justifyContent={"flex-start"}>
          <Link to={"/admin/dustbin-location"}>
            <Button
              variant={"ghost"}
              size={"2xl"}
              _hover={{
                bg: "blue.500",
                color: "white",
              }}
            >
              Dustbin Location
            </Button>
          </Link>
          <Link to={"/admin/dustbin"}>
            <Button
              size={"2xl"}
              variant={"ghost"}
              _hover={{
                bg: "blue.500",
                color: "white",
              }}
            >
              Dustbin
            </Button>
          </Link>
          <Link to={"/admin/user"}>
            <Button
              size={"2xl"}
              variant={"ghost"}
              _hover={{
                bg: "blue.500",
                color: "white",
              }}
            >
              Users
            </Button>
          </Link>
        </HStack>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        marginRight={"1rem"}
        width={"12vw"}
        justifyContent={"space-between"}
      >
        {/* <IconButton
          size="2xl"
          variant={"ghost"}
          _hover={{
            bg: "blue.500",
          }}
        >
          <Avatar.Root size={"xl"}>
            <Avatar.Fallback name="User detail" />
          </Avatar.Root>
        </IconButton> */}
        <MenuBar />
        <Button onClick={handleLogout} size={"2xl"} bg={"red.500"}>
          Logut
        </Button>
      </Box>
    </Box>
  );
};

export default Navigation;
