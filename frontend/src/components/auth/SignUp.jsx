import React, { useState } from "react";
import { PasswordInput } from "../ui/password-input";
import { Button, Input, VStack } from "@chakra-ui/react";
import axios from "axios";
import { toaster } from "../ui/toaster";

const backend = `http://localhost:5000`;

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== rePassword) {
      alert("Both the password must be same");
      setLoading(false);
      return;
    }

    if (!name || !email || !password || !rePassword) {
      alert("Enter all the data");
      return;
    }

    try {
      const data = await axios.post(`/api/auth/register`, {
        name: name,
        email: email,
        password: password,
        user: "user",
      });

      // localStorage("userInfo", JSON.stringify(data));
      if (data.status === 201) {
        // alert("Success");
        toaster.create({
          description: "User Created sucessfuly",
          type: "success",
          duration: 5000,
        });
        setEmail("");
        setName("");
        setPassword("");
        setRePassword("");
      } else if (data.status === 400) {
        toaster.create({
          description: "User exist",
          type: "error",
          duration: 5000,
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack gap={"1.5rem"}>
        <Input
          color={"black"}
          outlineColor={"blue"}
          placeholder="Enter your name"
          _placeholder={{ opacity: 1, color: "gray.500" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          color={"black"}
          outlineColor={"blue"}
          placeholder="Enter your Email ID"
          _placeholder={{ opacity: 1, color: "gray.500" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          color={"black"}
          outlineColor={"blue"}
          placeholder="Enter your password"
          size="md"
          _placeholder={{ opacity: 1, color: "gray.500" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordInput
          outlineColor={"blue"}
          color={"black"}
          placeholder="Enter your password"
          size="md"
          _placeholder={{ opacity: 1, color: "gray.500" }}
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />
        <Button
          type="submit"
          color={"white"}
          bg="blue"
          width={"100%"}
          style={{ marginTop: 15 }}
          _hover={{
            bg: "blue.800",
            cursor: "pointer",
          }}
        >
          Sign Up
        </Button>
      </VStack>
    </form>
  );
};

export default SignUp;
