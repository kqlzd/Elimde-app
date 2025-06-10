import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const Header = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const handleClickLogin = () => navigate("/login");
  const handleClickCreateAd = () => navigate("/create");

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
      justifyContent="space-between"
      alignItems="center"
      boxShadow="sm"
    >
      <Box>
        <HStack spacing={9}>
          <Text
            color="#4428D2"
            fontSize={"23px"}
            fontWeight="bold"
            _hover={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Kiraye.az
          </Text>
          <Button
            fontWeight="Bold"
            color="#D23651"
            borderRadius="12px"
            fontSize={20}
            border={"1px solid #D23651"}
            bgColor="white"
            colorScheme="none"
            ml="20px"
          >
            Kataloq
          </Button>
        </HStack>
      </Box>

      <Box width="40%">
        <InputGroup size="md">
          <InputLeftElement pointerEvents="none">
            <Text color="gray.400"></Text>
          </InputLeftElement>
          <Input
            placeholder="Axtarış..."
            borderRadius="12px"
            borderColor="#4428D2"
            colorScheme="none"
          />

          {/* <InputRightElement width="4.5rem">
            <Button
              h="2.25rem"
              size="sm"
              bgColor="#D23651"
              colorScheme="none"
              color="white"
              borderRadius="12px"
              border="none"
              p={3}
            >
              Əldə et
            </Button>
          </InputRightElement> */}
        </InputGroup>
      </Box>

      <Box>
        <HStack spacing={6}>
          {!isLoggedIn && (
            <Button
              _hover={{ color: "gray.300" }}
              colorScheme="none"
              fontWeight="medium"
              fontSize={14}
              color="white"
              bgColor="#4428D2"
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

          <Button
            _hover={{ color: "gray.200" }}
            bgColor="#D23651"
            colorScheme="none"
            color="white"
            borderRadius={12}
            onClick={handleClickCreateAd}
          >
            Yeni Elan
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};
