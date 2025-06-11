import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  Box,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const Header = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const handleClickLogin = () => navigate("/login");
  // const handleClickCreateAd = () => navigate("/create");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Çıxış zamanı xəta baş verdi:", error);
    }
  };

  return (
    <Flex
      as="header"
      width="100%"
      py={4}
      px={6}
      justifyContent="space-evenly"
      alignItems="center"
      boxShadow="sm"
      bg="#F3F1EB"
    >
      <Box>
        <HStack spacing={9}>
          <Text
            color="#1C3A38"
            fontSize={"43px"}
            fontWeight="bold"
            _hover={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            PetCare.az
          </Text>
        </HStack>
      </Box>

      <Box>
        <HStack spacing={6}>
          {!isLoggedIn && (
            <Button
              _hover={{ color: "gray.300" }}
              colorScheme="none"
              fontWeight="bold"
              fontSize={20}
              color="#1C3A38"
              borderRadius={12}
              onClick={handleClickLogin}
            >
              Giriş
            </Button>
          )}
          {isLoggedIn && (
            <Button
              fontWeight="medium"
              fontSize={14}
              color="white"
              bgColor="#4428D2"
              borderRadius={12}
              onClick={handleLogout}
            >
              Çıxış
            </Button>
          )}

          {/* <Button
            _hover={{ color: "gray.200" }}
            bgColor="#D23651"
            colorScheme="none"
            color="white"
            borderRadius={12}
            onClick={handleClickCreateAd}
          >
            Yeni Elan
          </Button> */}
        </HStack>
      </Box>
    </Flex>
  );
};
