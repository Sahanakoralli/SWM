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
import { addUser, updateUser } from "../api/userApi";
import { PasswordInput } from "../ui/password-input";
import { MdAdd, MdEdit } from "react-icons/md";
import { toaster } from "../ui/toaster";

const UserDialog = ({
  ma = "1rem",
  title = "testTItle",
  label = "test",
  variant = "outline",
  iconSize = "md",
  iconColor = "green",
  user = null,
  onSave,
}) => {
  const isEdit = !!user;
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    repassword: "",
  });
  const dialog = useDialog();
  useEffect(() => {
    if (isEdit && user) {
      setForm({
        name: user.name,
        email: user.email,
        role: user.role,
        password: "",
        repassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updateUser(user._id, form);
        console.log("user updated succuessfully");
        toaster.create({
          description: "User updated successfully",
          type: "success",
          duration: 6000,
        });
      } else {
        await addUser(form);
        console.log("added user succuessfully");
        toaster.create({
          description: "User created successfully",
          type: "success",
          duration: 6000,
        });
      }
      setForm({
        name: "",
        email: "",
        role: "",
        password: "",
        repassword: "",
      });
      dialog.setOpen(false);
      onSave?.();
    } catch (error) {
      console.error("Error saving user", error);
    }
  };

  return (
    <>
      <Dialog.RootProvider value={dialog}>
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
            {!isEdit && <Text>Add User</Text>}
          </IconButton>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>
                  {isEdit ? <Text>Update User</Text> : <Text>Add User</Text>}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap="4">
                  <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Input
                      placeholder="Enter user name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Input
                      placeholder="Enter user email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </Field.Root>
                  {!isEdit && (
                    <>
                      <Field.Root>
                        <Field.Label>Password</Field.Label>
                        <PasswordInput
                          placeholder="Enter User Password"
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Re-enterPassword</Field.Label>
                        <PasswordInput
                          placeholder="Enter User Re-Password"
                          name="repassword"
                          value={form.repassword}
                          onChange={handleChange}
                        />
                      </Field.Root>
                    </>
                  )}
                  <Field.Root>
                    <Field.Label>Role</Field.Label>
                    <Input
                      placeholder="Enter user role"
                      name="role"
                      value={form.role}
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
                  {isEdit ? "Update" : "Add User"}
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

export default UserDialog;
