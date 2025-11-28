import {
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdNotifications } from "react-icons/md";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
const MenuBar = () => {
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    socket.on("bin_alert", (data) => {
      console.log("ALERT:", data);
      setNotification((pre) => [...pre, data]);
    });

    socket.on("dustbin_collected", (data) => {
      console.log("COLLECTED:", data);
      setNotification((pre) => [...pre, data]);
    });
    return () => {
      socket.off("bin_alert");
      socket.off("dustbin_collected");
    };
  }, []);

  const handleClear = () => {
    setNotification([]);
  };
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Box position={"relative"} marginRight={"2rem"}>
          <Badge position={"absolute"} top="0" right={"0"} variant={"solid"}>
            {notification?.length}
          </Badge>
          <IconButton variant="outline">
            <MdNotifications />
          </IconButton>
        </Box>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {notification?.map((data, index) => (
              <>
                <Menu.ItemGroup>
                  <Box>
                    <Text>BinId: {data.binId}</Text>
                    {data.fillLevel ? (
                      <Text>Fill Level: {data.fillLevel}%</Text>
                    ) : (
                      ""
                    )}

                    <Text>Message: {data.message}</Text>
                  </Box>
                </Menu.ItemGroup>
                <Menu.Separator />
              </>
            ))}
            <Button bg="red" onClick={handleClear}>
              Clear
            </Button>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default MenuBar;
