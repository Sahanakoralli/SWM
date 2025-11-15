import React, { useEffect, useState } from "react";

import {
  Button,
  CloseButton,
  Dialog,
  Field,
  IconButton,
  Input,
  Portal,
  Stack,
  Text,
  useDialog,
} from "@chakra-ui/react";
import { MdAdd, MdEdit } from "react-icons/md";
import { toaster } from "../ui/toaster";
import { addDustbin, updateDustbin } from "../api/dustbinApi";
const CustomDialog = ({
  ma,
  title = "testTItle",
  label = "test",
  variant = "outline",
  iconSize = "md",
  iconColor = "green",
  bin = null,
  onSave,
}) => {
  const isEdit = !!bin;

  const dialog = useDialog();

  const [form, setForm] = useState({
    binId: "",
    fillLevel: "",
    gasLevel: "",
    latitude: "",
    longitude: "",
    address: "",
  });

  useEffect(() => {
    if (isEdit && bin) {
      setForm({
        binId: bin.binId,
        fillLevel: bin.fillLevel,
        gasLevel: bin.gasLevel,
        latitude: bin.location?.latitude || "",
        longitude: bin.location?.longitude || "",
        address: bin.location?.address || "",
      });
    }
  }, [bin]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updateDustbin(bin.binId, form);
        toaster.create({
          title: "Dustbin updated successfully",
          type: "success",
        });
      } else {
        await addDustbin(form);
        console.log("added ");

        toaster.create({
          title: "Dustbin added successfully",
          type: "success",
        });
        setForm({
          binId: "",
          fillLevel: "",
          gasLevel: "",
          latitude: "",
          longitude: "",
          address: "",
        });
      }
      dialog.setOpen(false);
      onSave?.(); // refresh table after success
    } catch (err) {
      console.error("Error saving dustbin:", err);
      toaster.create({
        title: "Error saving dustbin",
        type: "error",
      });
    }
  };

  return (
    <>
      <Dialog.RootProvider placement={"center"} value={dialog}>
        <Dialog.Trigger asChild>
          <IconButton
            aria-label={label}
            variant={variant}
            size={iconSize}
            colorPalette={iconColor}
            marginLeft={!isEdit ? ma : ""}
            padding={!isEdit ? ma : ""}
          >
            {isEdit ? <MdEdit /> : <MdAdd />}
            {!isEdit && <Text>Add Dustbin</Text>}
          </IconButton>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap="4">
                  <Field.Root>
                    <Field.Label>BinId</Field.Label>
                    <Input
                      placeholder="Dustbin ID"
                      name="binId"
                      value={form.binId}
                      onChange={handleChange}
                      disabled={isEdit}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Address</Field.Label>
                    <Input
                      placeholder="Enter address of bin"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Latitude</Field.Label>
                    <Input
                      placeholder="Enter the Latitude of dustbin"
                      name="latitude"
                      value={form.latitude}
                      onChange={handleChange}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Longitude</Field.Label>
                    <Input
                      placeholder="Enter the Latitude of dustbin"
                      name="longitude"
                      value={form.longitude}
                      onChange={handleChange}
                    />
                  </Field.Root>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button onClick={handleSubmit}>
                  {!isEdit ? "Add Dustbin" : "Update"}
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>
    </>
  );
};

export default CustomDialog;
