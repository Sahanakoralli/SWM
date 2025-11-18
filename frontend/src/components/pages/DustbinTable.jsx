import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdHistory, MdLocationPin } from "react-icons/md";
import {
  AbsoluteCenter,
  Box,
  HStack,
  IconButton,
  ProgressCircle,
  Table,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import CustomDialog from "../helper/CustomDialog";
import DeleteDustbinDialog from "../helper/DeleteDustbinDialog";
import { Link } from "react-router-dom";
const items = [
  {
    id: 1,
    address: "Sirasi",
    latitude: 17.121212121,
    longitude: 17.121212121,
    fillLevel: 12,
  },
  {
    id: 2,
    address: "Sirasi",
    latitude: 17.121212121,
    longitude: 17.121212121,
    fillLevel: 12,
  },
  {
    id: 3,
    address: "Sirasi",
    latitude: 17.121212121,
    longitude: 17.121212121,
    fillLevel: 81,
  },
  {
    id: 5,
    address: "Sirasi",
    latitude: 17.121212121,
    longitude: 17.121212121,
    fillLevel: 12,
  },
];
const DustbinTable = () => {
  const [data, setData] = useState([]);
  const [binLocation, setBinLocation] = useState({});
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/dustbin/current`);
      console.log(response.data);
      const arrData = response.data;
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // const handelLocation = ({latitude,longitude}) =>{
  //     setBinLocation({
  //       latitude:latitude
  //       latitude:latitude
  //     });
  // }
  console.log("Data :", data);

  return (
    <>
      <HStack m="1rem">
        <Box margin={"auto"}>
          <Text color={"blue.700"} textStyle="3xl" fontWeight={"bold"}>
            Dustbin List
          </Text>
        </Box>
        <CustomDialog ma="1rem" onSave={fetchData} />
      </HStack>
      <Table.ScrollArea borderWidth="1px" rounded="md">
        <Table.Root variant={"outline"} size="lg" stickyHeader interactive>
          <Table.Header>
            <Table.Row bg="blue.200">
              <Table.ColumnHeader>Dustbin ID</Table.ColumnHeader>
              <Table.ColumnHeader>Address</Table.ColumnHeader>
              <Table.ColumnHeader>Latitude</Table.ColumnHeader>
              <Table.ColumnHeader>Logitude</Table.ColumnHeader>
              <Table.ColumnHeader>Fill Level</Table.ColumnHeader>
              <Table.ColumnHeader>Action</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((item) => (
              <Table.Row key={item.binId}>
                <Table.Cell>
                  <Box display={"flex"} alignItems={"center"}>
                    <ProgressCircle.Root
                      colorPalette={item.fillLevel > 80 ? "red" : "blue"}
                      size={"sm"}
                      value={item.fillLevel}
                    >
                      <ProgressCircle.Circle>
                        <ProgressCircle.Track />
                        <ProgressCircle.Range />
                      </ProgressCircle.Circle>
                      <AbsoluteCenter>
                        <ProgressCircle.ValueText />
                      </AbsoluteCenter>
                    </ProgressCircle.Root>
                    <Text marginLeft={"1rem"}>{item.binId} </Text>
                  </Box>
                </Table.Cell>
                <Table.Cell>{item.location.address}</Table.Cell>
                <Table.Cell>{item.location.latitude}</Table.Cell>
                <Table.Cell>{item.location.longitude}</Table.Cell>
                <Table.Cell>{item.fillLevel}%</Table.Cell>
                <Table.Cell>
                  <HStack wrap={"wrap"} gap={"2"}>
                    <CustomDialog
                      bin={item}
                      title={"Update Dustbin"}
                      label="updateBin"
                      variant="outline"
                      iconColor="green"
                      iconSize="md"
                      onSave={fetchData}
                    />
                    {/* <IconButton
                      colorPalette={"cyan"}
                      aria-label="Search database"
                      variant="outline"
                      size={"md"}
                    >
                      <MdLocationPin />
                    </IconButton> */}
                    <DeleteDustbinDialog
                      binId={item.binId}
                      onSave={fetchData}
                    />
                    {/* <Link to={`/admin/history/${item.binId}`}>
                      <IconButton
                        aria-label="Search database"
                        variant="outline"
                        size={"md"}
                        colorPalette={"red"}
                      >
                        <MdHistory />
                      </IconButton>
                    </Link> */}
                  </HStack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </>
  );
};

export default DustbinTable;
