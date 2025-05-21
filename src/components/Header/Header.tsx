import React from "react";
import {
  Text,
  Button,
  Box,
  Flex,
  HStack,
  InputRightElement,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

export const Header = () => {
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
        <HStack spacing={6}>
          <Text
            color="#5F4AF4"
            fontSize={"23px"}
            width="74px"
            fontWeight="bold"
          >
            Elimde
          </Text>
          <Button
            fontWeight="Bold"
            color="#70D44B"
            borderRadius="12px"
            fontSize={20}
            bgColor="#5F4AF4"
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
            <Text color="gray.400">🔍</Text>
          </InputLeftElement>
          <Input
            placeholder="Axtarış..."
            borderRadius="12px"
            borderColor="gray.300"
            _hover={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "#5F4AF4", boxShadow: "0 0 0 1px #5F4AF4" }}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="2.35rem"
              size="sm"
              bgColor="#5F4AF4"
              color="white"
              _hover={{ bgColor: "#4F3AE4" }}
              borderRadius="8px"
              border="none"
            >
              Əldə et
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>

      <Box>
        <HStack spacing={6}>
          <Button
            fontWeight="medium"
            fontSize={14}
            color="blue.500"
            borderRadius={12}
          >
            Girişss
          </Button>
          <Button colorScheme="blue" fontWeight="bold" borderRadius={12}>
            Yeni Elan
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};
