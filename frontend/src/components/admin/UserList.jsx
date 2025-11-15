import {
  Box,
  HStack,
  IconButton,
  Table,
  Text,
  useDialog,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { allUser } from "../api/userApi";
import { MdEdit } from "react-icons/md";
import UserDialog from "../helper/UserDialog";
import Navigation from "./Navigation";
import { Navigate, useNavigate } from "react-router-dom";
import DeleteUserDIalog from "../helper/DeleteUserDIalog";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const updateUserDialog = useDialog();
  const nav = useNavigate();
  const fetchData = async () => {
    try {
      const response = await allUser();
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(`error while fetching data: `, error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    updateUserDialog.setOpen(!updateUserDialog.open);
    nav(`/admin/user/${_id}`);
  };
  return (
    <>
      {/* <Navigation /> */}
      <HStack m="1rem">
        <Box margin={"auto"}>
          <Text color={"blue.700"} textStyle="3xl" fontWeight={"bold"}>
            User List
          </Text>
        </Box>
        <UserDialog title="Add New User" ma="1rem" onSave={fetchData} />
      </HStack>
      <Table.ScrollArea borderWidth="1px" rounded="md">
        <Table.Root variant={"outline"} size="lg" stickyHeader interactive>
          <Table.Header>
            <Table.Row bg="blue.200">
              <Table.ColumnHeader> S No</Table.ColumnHeader>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Email</Table.ColumnHeader>
              <Table.ColumnHeader>Role</Table.ColumnHeader>
              <Table.ColumnHeader>Action</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((item, index) => (
              <Table.Row key={item._id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  <Box display={"flex"} alignItems={"center"}>
                    <Text marginLeft={"1rem"}>{item.name} </Text>
                  </Box>
                </Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>{item.role}</Table.Cell>
                <Table.Cell>
                  <HStack wrap={"wrap"} gap={"2"}>
                    <UserDialog
                      onSave={fetchData}
                      title="User Details"
                      label="Edit"
                      variant="outline"
                      iconColor="green"
                      iconSize="md"
                      user={item}
                    />
                    <DeleteUserDIalog _id={item._id} onSave={fetchData} />
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

export default UserList;
