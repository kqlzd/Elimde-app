import React from "react";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Image,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

const CategoriesSection = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");

  const categories = [
    {
      name: "Elektronika",
      img: "/assets/elektronik.jpeg",
      color: "blue.500",
    },
    {
      name: "Geyim",
      img: "/assets/geyimm.webp",
      color: "cyan.500",
    },

    {
      name: "Şəxsi əşyalar",
      color: "orange.500",
      img: "/assets/personal.jpeg",
    },
    {
      name: "Ev",
      color: "yellow.500",
      img: "/assets/house.webp",
    },
    {
      name: "Nəqliyyat",
      img: "/assets/car.webp",
      color: "purple.500",
    },
    {
      name: "Instrumental",
      img: "/assets/instrumental.jpeg",
      color: "purple.500",
    },
    {
      name: "Xidmət",
      img: "/assets/service.webp",
      color: "green.500",
    },
  ];

  return (
    <Container maxW="6xl" mt={10}>
      <Box
        bg={bgColor}
        borderRadius="2xl"
        p={8}
        shadow="xl"
        border="1px"
        borderColor={borderColor}
      >
        <Heading
          textAlign="center"
          size="xl"
          mb={8}
          color={"#4428D2"}
          fontWeight="600"
        >
          Ən məşhur kateqoriyalar
        </Heading>

        <SimpleGrid columns={{ base: 2, md: 4, lg: 4 }} spacing={6} mb={8}>
          {categories.map((category, index) => (
            <VStack
              key={index}
              p={6}
              borderRadius="xl"
              transition="all 0.3s ease"
              cursor="pointer"
              _hover={{
                transform: "translateY(-4px)",
                shadow: "lg",
                border: "0.7px solid #4428D2",
              }}
              spacing={4}
            >
              <Box
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image src={category.img} />
              </Box>
              <Text
                fontSize="sm"
                fontWeight="500"
                textAlign="center"
                color="black"
                lineHeight="1.2"
              >
                {category.name}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>

        <Box textAlign="center">
          <Link
            color="blue.500"
            fontSize="md"
            fontWeight="500"
            _hover={{
              textDecoration: "underline",
              color: "blue.600",
            }}
          >
            Bütün kateqoriyalara bax
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default CategoriesSection;
