import React from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { register, watch } = useForm();

  const email = watch("email");
  const password = watch("password");

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Box>Giris</Box>
      <Box as="form">
        <Input type="email" {...register("email")} />
        <Input type="password" {...register("password")} />
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </>
  );
};
