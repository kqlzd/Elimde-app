import { Card, Image, CardBody, Heading, VStack, Text } from "@chakra-ui/react";
import { CircleArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const DoctorCards = ({ doctor }: { doctor: any }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hospitals/${doctor.id}`);
  };

  return (
    <Card
      shadow="lg"
      borderRadius="xl"
      cursor="pointer"
      transition="all 0.3s"
      _hover={{ shadow: "2xl", transform: "translateY(-2px)" }}
      overflow="hidden"
      onClick={handleClick}
    >
      <Image
        src={doctor.image}
        alt={doctor.name}
        h="200px"
        w="100%"
        objectFit="cover"
      />
      <CardBody bg="#F3F1EB">
        <VStack align="start" spacing={2}>
          <Heading size="md" color="#1C3A38">
            {doctor?.name}
          </Heading>
          <Text color="gray.600" fontSize="sm">
            {doctor?.address}
          </Text>
          <Text color="#2D797B" fontWeight="bold" fontSize="lg">
            {doctor?.price} ₼ / gecə
          </Text>
          <CircleArrowRight />
        </VStack>
      </CardBody>
    </Card>
  );
};
