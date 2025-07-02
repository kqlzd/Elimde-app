import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  Container,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { db } from "../../lib/firebaseConfig";

interface LoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError("");

    try {
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Check if user is admin
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      const userData = userDoc.data();

      const isAdmin = userData?.role === "admin" || userData?.isAdmin === true;

      if (isAdmin) {
        toast({
          title: "Giriş uğurlu",
          description: "Admin panelinə yönləndirilirsiniz",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/admin");
      } else {
        // Sign out non-admin user
        await auth.signOut();
        setError("Bu hesabın admin icazəsi yoxdur.");
      }
    } catch (err: any) {
      console.error("Login error:", err);

      let errorMessage = "Giriş zamanı xəta baş verdi";

      switch (err.code) {
        case "auth/user-not-found":
          errorMessage = "Bu email ilə istifadəçi tapılmadı";
          break;
        case "auth/wrong-password":
          errorMessage = "Yanlış şifrə";
          break;
        case "auth/invalid-email":
          errorMessage = "Yanlış email formatı";
          break;
        case "auth/too-many-requests":
          errorMessage = "Çox cəhd edildi. Sonra yenidən cəhd edin";
          break;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="md" py={20}>
      <Box
        bg="white"
        p={8}
        borderRadius="xl"
        boxShadow="lg"
        border="1px solid"
        borderColor="gray.200"
      >
        <VStack spacing={6}>
          <Heading color="#1C3A38" textAlign="center">
            Admin Girişi
          </Heading>

          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Box as="form" onSubmit={handleSubmit(onSubmit)} w="100%">
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  {...register("email", {
                    required: "Email tələb olunur",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Yanlış email formatı",
                    },
                  })}
                  bg="gray.50"
                  border="1px solid"
                  borderColor="gray.300"
                  _focus={{
                    borderColor: "#1C3A38",
                    boxShadow: "0 0 0 1px #1C3A38",
                  }}
                />
                {errors.email && (
                  <Box color="red.500" fontSize="sm" mt={1}>
                    {errors.email.message}
                  </Box>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Şifrə</FormLabel>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Şifrə tələb olunur",
                    minLength: {
                      value: 6,
                      message: "Şifrə ən azı 6 simvol olmalıdır",
                    },
                  })}
                  bg="gray.50"
                  border="1px solid"
                  borderColor="gray.300"
                  _focus={{
                    borderColor: "#1C3A38",
                    boxShadow: "0 0 0 1px #1C3A38",
                  }}
                />
                {errors.password && (
                  <Box color="red.500" fontSize="sm" mt={1}>
                    {errors.password.message}
                  </Box>
                )}
              </FormControl>

              <Button
                type="submit"
                bg="#1C3A38"
                color="white"
                size="lg"
                w="100%"
                isLoading={loading}
                loadingText="Giriş edilir..."
                _hover={{ bg: "#2F6B68" }}
                _active={{ bg: "#1A332F" }}
              >
                Daxil ol
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
};
