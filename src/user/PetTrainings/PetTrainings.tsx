import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { PetTrainingCards } from "../components/PetTrainingCards/PetTrainingCards";
import { useGetTrainingsData } from "../../hooks/useGetTrainingCenters";
import { Loading } from "../components/Loading/Loading";

export const PetTrainings = () => {
  const { trainingCenters, isLoading } = useGetTrainingsData();

  if (isLoading) return <Loading />;

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="container.xl" py={8}>
        <Heading size="xl" mb={6} color="gray.800">
          Təlim mərkəzləri
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {trainingCenters.map((trainingData) => (
            <PetTrainingCards key={trainingData.id} trainings={trainingData} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
