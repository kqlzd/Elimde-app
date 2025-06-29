import { Card, Image, CardBody, Heading, VStack, Text } from "@chakra-ui/react";
import { CircleArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TDoctorData } from "../../../models/api";

export const DoctorCards = ({ doctor }: { doctor: TDoctorData }) => {
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
          <CircleArrowRight />
        </VStack>
      </CardBody>
    </Card>
  );
};
