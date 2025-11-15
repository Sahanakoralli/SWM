import { Button, Input, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { PasswordInput } from "../ui/password-input";
import { Navigate, useNavigate } from "react-router-dom";

const backend = `http://localhost:5000`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClick = () => setShow(!show);
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      alert("enter the details");
      setLoading(false);
      return;
    }

    try {
      const data = await axios.post(`/api/auth/login`, {
        email: email,
        password: password,
      });

      setEmail("");
      setPassword("");
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      alert("login success ");
      console.log(data.data);
      console.log(data.data.role);
      if (data.data.role === "admin") {
        nav("/admin/");
      } else if (data.data.role === "user") {
        nav("/user");
      } else if (data.data.role === "collector") {
        nav("/collector");
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
          placeholder="Enter your Email ID"
          _placeholder={{ opacity: 1, color: "gray.500" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          color={"black"}
          placeholder="Enter your password"
          size="md"
          _placeholder={{ opacity: 1, color: "gray.500" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          color={"white"}
          bg="blue"
          width={"100%"}
          style={{ marginTop: 15 }}
        >
          Login
        </Button>
      </VStack>
    </form>
  );
};

export default Login;
