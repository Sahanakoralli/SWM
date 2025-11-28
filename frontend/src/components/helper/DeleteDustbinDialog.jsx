import React from "react";
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
import { deleteDustbin } from "../api/dustbinApi";
import { toaster } from "../ui/toaster";

const DeleteDustbinDialog = ({ binId, onSave }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async (binId) => {
    if (!binId) return;
    try {
      await deleteDustbin(binId);
      toaster.create({
        description: "Dustbin deleted succesfully",
        type: "success",
      });
      onSave?.();
    } catch (error) {
      toaster.create({
        description: "error deleting dustbin",
        type: "error",
      });
      console.log("error while deleting ", error);
    }
  };

  return (
    <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <IconButton
          aria-label="Delete Dustin"
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
              <Dialog.Title>Delete Dustbin {binId}</Dialog.Title>
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
                    handleDelete(binId);
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

export default DeleteDustbinDialog;
