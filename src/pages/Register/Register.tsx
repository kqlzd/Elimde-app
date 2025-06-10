import {
  Button,
  VStack,
  Heading,
  Input,
  Box,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

export const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const res = await registerUser(data.email, data.password);
      if (res) navigate("/login");
    } catch (error) {}
  };

  return (
    <Box
      minHeight="100vh"
      bg="gray.50"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="md"
        width="100%"
        maxWidth="400px"
      >
        <VStack spacing={6}>
          <Heading size="lg" color="gray.700">
            Qeydiyyat
          </Heading>

          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Ad</FormLabel>
                <Input type="text" {...register("email")} />
              </FormControl>

              <FormControl>
                <FormLabel>Soyad</FormLabel>
                <Input type="text" {...register("email")} />
              </FormControl>

              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input type="email" {...register("email")} />
              </FormControl>

              <FormControl>
                <FormLabel>Telefon</FormLabel>
                <Input type="mobile" {...register("mobile")} />
              </FormControl>

              <FormControl>
                <FormLabel>Şifrə</FormLabel>
                <Input type="password" {...register("password")} />
              </FormControl>

              <Button type="submit" colorScheme="blue" width="100%" mt={4}>
                Qeydiyyatdan keç
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Box>
  );
};
