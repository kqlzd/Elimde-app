import { Card, CardBody, Image, Text, Box } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

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
  console.log("🚀 ~ daily:", isDaily);
  const navigate = useNavigate();

  return (
    <Card
      width="240px"
      height="auto"
      _hover={{
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transform: "translateY(-2px)",
      }}
      onClick={() => navigate(`/details/${id}`)}
      position="relative"
      transition="all 0.2s ease"
      borderRadius="8px"
      overflow="hidden"
      bg="white"
      border="1px solid #e8e8e8"
      boxShadow="0 1px 3px rgba(0,0,0,0.1)"
    >
      <CardBody p={0}>
        <Box position="relative" overflow="hidden">
          <Image
            src={imageUrl || "/images/test.jpg"}
            alt={title}
            height="160px"
            width="100%"
            objectFit="cover"
            _hover={{ transform: "scale(1.02)" }}
            transition="transform 0.3s ease"
          />
        </Box>

        <Box p={3}>
          <Text
            fontSize="18px"
            fontWeight="bold"
            color="#1a1a1a"
            mb={2}
            lineHeight="1.2"
          >
            {price} AZN
          </Text>
          {isDaily}

          <Text
            fontSize="14px"
            fontWeight="400"
            color="#1a1a1a"
            lineHeight="1.3"
            overflow="hidden"
            textOverflow="ellipsis"
            sx={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            mb={2}
            minHeight="36px"
          >
            {title}
          </Text>

          <Text
            fontSize="14px"
            color="#8d94ad"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {city}, {createdAt}
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
};
