import { Text, Card, Heading, CardBody, VStack, Image } from "@chakra-ui/react";
import { CircleArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const PetTrainingCards = ({ trainings }: any) => {
  const navigate = useNavigate();

  const handleNavigateTrainingDetailPage = () => {
    navigate(`/trainingcenters/${trainings.id}`);
  };

  return (
    <Card
      shadow="lg"
      borderRadius="xl"
      cursor="pointer"
      transition="all 0.3s"
      _hover={{ shadow: "2xl", transform: "translateY(-2px)" }}
      overflow="hidden"
      onClick={handleNavigateTrainingDetailPage}
    >
      <Image
        src={trainings.imageUrl}
        alt={trainings.name}
        h="200px"
        w="100%"
        objectFit="cover"
      />
      <CardBody bg="#F3F1EB">
        <VStack align="start" spacing={2}>
          <Heading size="md" color="gray.800">
            {trainings.name}
          </Heading>
          <Text color="gray.600" fontSize="sm">
            {trainings.address}
          </Text>
          <Text color="#2D797B" fontWeight="bold" fontSize="lg">
            <CircleArrowRight />
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
};
