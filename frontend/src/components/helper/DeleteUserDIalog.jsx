import React from "react";
import { deleteUser } from "../api/userApi";
import {
  Button,
  CloseButton,
  Dialog,
  IconButton,
  Portal,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

const DeleteUserDIalog = ({ _id, onSave }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async (_id) => {
    if (!_id) return;
    try {
      await deleteUser(_id);
      onSave?.();
    } catch (error) {
      console.log("error while deleting user in frontend ", error);
    }
  };

  return (
    <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <IconButton
          aria-label="Search database"
          variant="outline"
          size={"md"}
          colorPalette={"red"}
        >
          <MdDelete />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete User {_id}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text>Are you sure you want to delete. </Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button
                  bg="red"
                  onClick={() => {
                    handleDelete(_id);
                  }}
                >
                  Delete
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DeleteUserDIalog;
