import React from "react";
import { Text, Box, Flex, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Flex
      as="header"
      width="100%"
      py={4}
      px={6}
      justifyContent="center"
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
            Miyav.az
          </Text>
        </HStack>
      </Box>
    </Flex>
  );
};
