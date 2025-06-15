import { Card, Image, CardBody, VStack, Heading, Text } from "@chakra-ui/react";
import { CircleArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function GroomingCards({ groom }: any) {
  const navigate = useNavigate();

  const handleNavigateGroomDetail = () => {
    navigate(`/grooms/${groom.id}`);
  };

  return (
    <Card
      shadow="lg"
      borderRadius="xl"
      cursor="pointer"
      transition="all 0.3s"
      _hover={{ shadow: "2xl", transform: "translateY(-2px)" }}
      overflow="hidden"
      onClick={handleNavigateGroomDetail}
    >
      <Image
        src={groom.image}
        alt={groom.name}
        h="200px"
        w="100%"
        objectFit="cover"
      />
      <CardBody bg="#F3F1EB">
        <VStack align="start" spacing={2}>
          <Heading size="md" color="#1C3A38">
            {groom.name}
          </Heading>
          <Text color="gray.600" fontSize="sm">
            {groom.address}
          </Text>
          <CircleArrowRight />
        </VStack>
      </CardBody>
    </Card>
  );
}
