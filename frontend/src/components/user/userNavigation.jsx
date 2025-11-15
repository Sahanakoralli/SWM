import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import dustbinImage from "../../assets/dustbin.png";
import { Link, useNavigate } from "react-router-dom";
import MenuBar from "../helper/MenuBar";

const UserNavigator = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const role = user.role;
  const navL = useNavigate();
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
          <Link to={"/user/dustbin-location"}>
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
          <Link to={"/user/dustbin"}>
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
          {role == "collector" ? (
            <>
              <Link to={"/user/route"}>
                <Button
                  size={"2xl"}
                  variant={"ghost"}
                  _hover={{
                    bg: "blue.500",
                    color: "white",
                  }}
                >
                  Route
                </Button>
              </Link>
            </>
          ) : (
            <></>
          )}
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

export default UserNavigator;
