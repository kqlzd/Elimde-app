import {
  Box,
  Card,
  Container,
  SimpleGrid,
  Image,
  CardBody,
  Text,
  Button,
  VStack,
  HStack,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { cardData, colorSchemes } from "../../utils/constants/constants";

export const PetCards = React.memo(() => {
  const navigate = useNavigate();
  const cardBg = useColorModeValue("white", "gray.800");
  const shadowColor = useColorModeValue("rgba(0,0,0,0.08)", "rgba(0,0,0,0.3)");
  const borderColor = useColorModeValue("gray.100", "gray.700");

  const handleClickCardServices = (slug: string) => {
    navigate(`/services/${slug}`);
  };

  return (
    <Box py={20} px={8} bg="gray.50" position="relative" overflow="hidden">
      <Box
        position="absolute"
        top="10%"
        left="-5%"
        w="200px"
        h="200px"
        bg="rgba(244, 162, 97, 0.05)"
        borderRadius="full"
        filter="blur(60px)"
      />
      <Box
        position="absolute"
        bottom="20%"
        right="-5%"
        w="300px"
        h="300px"
        bg="rgba(58, 126, 123, 0.05)"
        borderRadius="full"
        filter="blur(80px)"
      />

      <Container maxW="7xl" position="relative" zIndex={2}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={8}
          justifyItems="center"
          w="full"
        >
          {cardData.map((item, index) => {
            const colorScheme = colorSchemes[index] || colorSchemes[0];

            return (
              <Card
                key={item.id}
                shadow="lg"
                borderRadius="2xl"
                cursor="pointer"
                onClick={() => handleClickCardServices(item.slug)}
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
                overflow="hidden"
                position="relative"
                maxW="300px"
                w="full"
                transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                _hover={{
                  transform: "translateY(-8px)",
                  boxShadow: `0 20px 40px ${shadowColor}`,
                  borderColor: colorScheme.accentColor,
                }}
              >
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  h="4px"
                  bgGradient={colorScheme.gradient}
                />

                <Box position="relative" overflow="hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    h="200px"
                    w="full"
                    objectFit="cover"
                    transition="transform 0.4s ease"
                    _hover={{ transform: "scale(1.08)" }}
                  />
                </Box>

                <CardBody p={6} pt={8}>
                  <VStack align="start" spacing={4}>
                    <Text
                      fontSize="xl"
                      fontWeight="700"
                      color="gray.800"
                      lineHeight="1.2"
                    >
                      {item.title}
                    </Text>

                    <HStack spacing={4} w="full" justify="space-between">
                      <VStack spacing={1} align="start">
                        <HStack spacing={1}>
                          <Text fontSize="lg">⭐</Text>
                        </HStack>
                        <Text fontSize="xs" color="gray.500">
                          Reytinq
                        </Text>
                      </VStack>

                      <VStack spacing={1} align="center">
                        <Text fontSize="sm" fontWeight="600" color="gray.700">
                          {20 + index * 10}+
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          Xidmət
                        </Text>
                      </VStack>

                      <VStack spacing={1} align="end">
                        <Text fontSize="sm" fontWeight="600" color="gray.700">
                          {100 + index * 50}+
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          Müştəri
                        </Text>
                      </VStack>
                    </HStack>

                    <Text
                      color="gray.600"
                      fontSize="sm"
                      lineHeight="1.5"
                      noOfLines={3}
                    >
                      {item.description}
                    </Text>

                    <VStack align="start" spacing={2} w="full">
                      <HStack spacing={2}>
                        <Box
                          w="6px"
                          h="6px"
                          bg={colorScheme.accentColor}
                          borderRadius="full"
                        />
                        <Text fontSize="xs" color="gray.600">
                          Peşəkar xidmət
                        </Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Box
                          w="6px"
                          h="6px"
                          bg={colorScheme.accentColor}
                          borderRadius="full"
                        />
                        <Text fontSize="xs" color="gray.600">
                          24/7 dəstək
                        </Text>
                      </HStack>
                    </VStack>

                    <Button
                      w="full"
                      size="md"
                      bgGradient={colorScheme.gradient}
                      color="white"
                      borderRadius="xl"
                      fontWeight="600"
                      _hover={{
                        transform: "translateY(-1px)",
                        boxShadow: "lg",
                      }}
                      transition="all 0.2s ease"
                      mt={2}
                    >
                      <Flex align="center" gap={2}>
                        <Text>Kəşf Et</Text>
                        <Text>→</Text>
                      </Flex>
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
});
