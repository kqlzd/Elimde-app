import {
  Button,
  Input,
  Box,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (data: any) => {
    try {
      const resp = await loginUser(data.email, data.password);
      if (resp) navigate("/");
    } catch (error) {
      toast({
        title: "Xəta!",
        description: "Email və ya parol yanlış",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const handleNavigateRegister = () => {
    navigate("/register");
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
            Daxil ol
          </Heading>

          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input type="email" {...register("email")} />
              </FormControl>

              <FormControl>
                <FormLabel>Şifrə</FormLabel>
                <Input type="password" {...register("password")} />
              </FormControl>

              <Button
                type="submit"
                bgColor="#4428D2"
                color="white"
                colorScheme="none"
                width="100%"
                mt={4}
              >
                Daxil ol
              </Button>

              <Button
                variant="outline"
                width="100%"
                onClick={handleNavigateRegister}
              >
                Qeydiyyatdan keç
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Box>
  );
};
