import React from "react";
import {
  Box,
  Container,
  Flex,
  VStack,
  Heading,
  Link,
  Text,
  HStack,
} from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box
      as="footer"
      bg="gray.50"
      borderTop="1px solid"
      borderColor="gray.200"
      py={8}
    >
      <Container maxW="1200px">
        <Flex
          justify="space-evenly"
          align="flex-start"
          direction={{ base: "column", md: "row" }}
          gap={8}
        >
          <VStack align="flex-start" spacing={4}>
            <Heading color="#1C3A38" fontWeight="bold" size="md">
              Haqqimizda
            </Heading>
            <VStack align="flex-start" spacing={2}>
              <Link href="#" color="#1C3A38" _hover={{ color: "blue.500" }}>
                Missiyamız
              </Link>
            </VStack>
          </VStack>

          <VStack align="flex-start" spacing={4}>
            <Heading size="md" color="#1C3A38" fontWeight="bold">
              Sosyal Mediya
            </Heading>
            <VStack align="flex-start" spacing={2}>
              <Link href="#" color="gray.600" _hover={{ color: "green.500" }}>
                <HStack spacing={2}>
                  <Text>📱</Text>
                  <Text>WhatsApp</Text>
                </HStack>
              </Link>
              <Link href="#" color="gray.600" _hover={{ color: "pink.500" }}>
                <HStack spacing={2}>
                  <Text>📷</Text>
                  <Text>Instagram</Text>
                </HStack>
              </Link>
              <Link href="#" color="gray.600" _hover={{ color: "blue.400" }}>
                <HStack spacing={2}>
                  <Text>🐦</Text>
                  <Text>Twitter</Text>
                </HStack>
              </Link>
            </VStack>
          </VStack>

          <VStack align="flex-start" spacing={4}>
            <Heading size="md" color="#1C3A38" fontWeight="bold">
              Əlaqə
            </Heading>
            <VStack align="flex-start" spacing={2}>
              <Link href="#" color="gray.600" _hover={{ color: "blue.500" }}>
                <HStack spacing={2}>
                  <Text>📧</Text>
                  <Text>E-mail</Text>
                </HStack>
              </Link>
              <Link href="#" color="gray.600" _hover={{ color: "blue.500" }}>
                <HStack spacing={2}>
                  <Text>📞</Text>
                  <Text>Telefon</Text>
                </HStack>
              </Link>
              <Link href="#" color="gray.600" _hover={{ color: "blue.500" }}>
                <HStack spacing={2}>
                  <Text>📍</Text>
                  <Text>Ünvan</Text>
                </HStack>
              </Link>
            </VStack>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};
