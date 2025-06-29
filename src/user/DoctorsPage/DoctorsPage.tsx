import {
  Box,
  Container,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { DoctorCards } from "../components/DoctorsCards/DoctorCards";
import { useGetDoctorsData } from "../../hooks/useGetDoctors";
import { SearchIcon } from "lucide-react";
import { Loading } from "../components/Loading/Loading";

export const DoctorsPage = () => {
  const { doctors, isLoading } = useGetDoctorsData();

  if (isLoading) return <Loading />;

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8}>
          <Box w="100%" display="flex" justifyContent="center">
            <InputGroup size="lg" width="50%">
              <InputLeftElement pointerEvents="none">
                <Icon as={SearchIcon} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Ərazi üzrə axtar..."
                bg="#F7FAFC"
                border="2px solid"
                borderColor="#1C3A38"
                borderRadius="full"
                _hover={{
                  borderColor: "blue.300",
                  boxShadow: "0 0 0 1px rgba(66, 153, 225, 0.6)",
                }}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.1)",
                  bg: "white",
                }}
                fontSize="md"
                fontWeight="medium"
                transition="all 0.3s ease"
              />
            </InputGroup>
          </Box>

          <Box w="100%">
            <Heading
              size="xl"
              mb={6}
              color="gray.700"
              textAlign="center"
              fontWeight="semibold"
            ></Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
              {doctors.map((doctor) => (
                <DoctorCards key={doctor.id} doctor={doctor} />
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};
