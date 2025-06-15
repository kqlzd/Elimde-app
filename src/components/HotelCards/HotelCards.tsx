import React from "react";
import { Card, CardBody, Image, Text, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CircleArrowRight } from "lucide-react";

export const HotelCards = ({ hotel }: any) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hotels/${hotel.id}`);
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
        src={hotel.image}
        alt={hotel.name}
        h="200px"
        w="100%"
        objectFit="cover"
      />
      <CardBody bg="#F3F1EB">
        <VStack align="start" spacing={2}>
          <Heading size="md" color="#1C3A38">
            {hotel.name}
          </Heading>
          <Text color="gray.600" fontSize="sm">
            {hotel.address}
          </Text>
          <Text color="#2D797B" fontWeight="bold" fontSize="lg">
            {hotel.price} ₼ / günü
          </Text>
          <CircleArrowRight />
        </VStack>
      </CardBody>
    </Card>
  );
};
