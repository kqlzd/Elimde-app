import {
  Box,
  Card,
  Container,
  SimpleGrid,
  Image,
  CardBody,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { cardData } from "../../consts/consts";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Loading/Loading";

export const PetCards = () => {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClickCardServices = (slug: string) => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate(`/services/${slug}`);
    }, 500);
  };

  if (isNavigating) {
    return <Loading />;
  }

  return (
    <Box py={16} px={8} bg="gray.50">
      <Container maxW="6xl" centerContent>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={12}
          justifyItems="center"
          w="full"
        >
          {cardData.map((item: any) => (
            <Card
              key={item.id}
              shadow="lg"
              borderRadius={12}
              cursor="pointer"
              onClick={() => handleClickCardServices(item.slug)}
            >
              <Image
                borderRadius={12}
                src={item.image}
                alt={item.alt}
                h="200px"
                objectFit="cover"
              />
              <CardBody>
                <Text fontSize="28px" fontWeight="bold" color="gray.800">
                  {item.title}
                </Text>
                <Text color="gray.600">{item.description}</Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
