import { Card, CardBody, Image, Text, Box, Link } from "@chakra-ui/react";
import React from "react";
// import { useNavigate } from "react-router-dom";

interface CardProps {
  title: string;
  price: string;
  imageUrl: string;
  city: string;
  id: string;
  createdAt: string | null;
  isDaily: boolean;
}

export const Cards: React.FC<CardProps> = ({
  title,
  price,
  imageUrl,
  city,
  id,
  createdAt,
  isDaily,
}) => {
  // console.log("🚀 ~ daily:", isDaily);
  // const navigate = useNavigate();

  return (
    <Card
      bg="white"
      borderRadius="12px"
      overflow="hidden"
      boxShadow="0 2px 8px rgba(0,0,0,0.1)"
      _hover={{
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        transform: "translateY(-2px)",
        cursor: "pointer",
      }}
      transition="all 0.3s ease"
      border="none"
    >
      <CardBody p={6} height={90}>
        <Box
          bg="#d4d4d8"
          borderRadius="8px"
          p={6}
          mb={6}
          minH="100px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
        >
          <Image
            src={imageUrl || "/images/test.jpg"}
            alt={title}
            maxW="100%"
            maxH="160px"
            objectFit="contain"
            _hover={{ transform: "scale(1.02)" }}
            transition="transform 0.3s ease"
            fallback={
              <Box
                w="160px"
                h="160px"
                bg="gray.300"
                borderRadius="8px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="gray.500" fontSize="sm" textAlign="center">
                  {title}
                </Text>
              </Box>
            }
          />
        </Box>

        <Box>
          <Text
            as="h3"
            fontSize="20px"
            fontWeight="bold"
            color="gray.800"
            mb={3}
            lineHeight="1.2"
          >
            {title}
          </Text>

          <Text
            color="gray.600"
            fontSize="14px"
            lineHeight="1.5"
            mb={4}
            minHeight="42px"
          >
            Service starting from {price} AZN.
            {isDaily && " Available for daily bookings."}
            Professional and reliable service in your area.
          </Text>

          <Link
            href="#"
            color="gray.700"
            fontSize="14px"
            fontWeight="medium"
            textDecoration="underline"
            _hover={{
              color: "gray.900",
              textDecoration: "none",
            }}
            display="flex"
            alignItems="center"
            gap={1}
          >
            Find pros in {city}
          </Link>

          <Text
            fontSize="12px"
            color="gray.500"
            mt={2}
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            Listed on {createdAt ?? "Recently"}
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
};
