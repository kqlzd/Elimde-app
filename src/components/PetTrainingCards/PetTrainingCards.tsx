import React, { useCallback } from "react";
import {
  Card,
  CardBody,
  Image,
  Text,
  Heading,
  VStack,
  HStack,
  Box,
  Badge,
  Button,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Calendar, Heart } from "lucide-react";
import { TTrainingData } from "../../models/api";
import { petTrainingServices } from "../../utils/constants/constants";

const MotionCard = motion(Card);

interface PetTrainingCardsProps {
  trainings: TTrainingData;
}

export const PetTrainingCards: React.FC<PetTrainingCardsProps> = React.memo(
  ({ trainings }) => {
    const navigate = useNavigate();

    const cardBg = useColorModeValue("white", "gray.800");
    const shadowColor = useColorModeValue("rgba(0,0,0,0.1)", "rgba(0,0,0,0.3)");

    const handleNavigateTrainingDetailPage = useCallback(() => {
      try {
        if (!trainings.id) {
          console.log("training id tapilmadi");
          return;
        }
      } catch (error) {
        console.log("navigation xetasi", error);
      }
      navigate(`/trainingcenters/${trainings.id}`);
    }, [navigate, trainings.id]);

    return (
      <MotionCard
        shadow="none"
        borderRadius="2xl"
        cursor="pointer"
        onClick={handleNavigateTrainingDetailPage}
        bg={cardBg}
        border="1px solid"
        borderColor="rgba(255,255,255,0.2)"
        overflow="hidden"
        position="relative"
        maxW="350px"
        w="full"
        whileHover={{
          scale: 1.02,
          y: -8,
          boxShadow: `0 20px 40px ${shadowColor}`,
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        <Box position="relative" overflow="hidden">
          <Image
            src={trainings.imageUrl ?? "/assets/default-training.jpg"}
            alt={trainings.name}
            h="220px"
            w="full"
            objectFit="cover"
            transition="transform 0.4s ease"
            _hover={{ transform: "scale(1.1)" }}
          />

          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient="linear(to-b, transparent 0%, transparent 60%, rgba(0,0,0,0.3) 100%)"
          />

          <Box
            position="absolute"
            top={4}
            right={4}
            w="40px"
            h="40px"
            bg="rgba(255,255,255,0.9)"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            backdropFilter="blur(10px)"
            cursor="pointer"
            transition="all 0.2s ease"
            _hover={{
              bg: "rgba(255,255,255,1)",
              transform: "scale(1.1)",
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Heart size={18} color="#666" />
          </Box>
        </Box>

        <CardBody p={6}>
          <VStack align="start" spacing={4}>
            <Box w="full">
              <HStack justify="space-between" align="start" mb={2}>
                <Heading size="md" color="#1C3A38" noOfLines={1}>
                  {trainings.name}
                </Heading>
                <Badge
                  colorScheme="green"
                  variant="subtle"
                  fontSize="xs"
                  px={2}
                  py={1}
                  borderRadius="md"
                >
                  Aktiv
                </Badge>
              </HStack>

              <HStack spacing={1} color="gray.600">
                <Icon as={MapPin} size="14" />
                <Text fontSize="sm" noOfLines={1}>
                  {trainings.address}
                </Text>
              </HStack>
            </Box>

            <HStack>
              {petTrainingServices.slice(0, 4).map((service, index) => (
                <VStack key={index} spacing={1}>
                  <Box
                    p={2}
                    bg="rgba(58, 126, 123, 0.1)"
                    borderRadius="lg"
                    color="#3A7E7B"
                  >
                    <Icon as={service.icon} size="16" />
                  </Box>
                  <Text fontSize="xs" color="gray.600" textAlign="center">
                    {service.label}
                  </Text>
                </VStack>
              ))}
            </HStack>

            <Box w="full">
              <HStack justify="space-between" align="center" mb={3}>
                <VStack align="start" spacing={0}>
                  <Text fontSize="2xl" fontWeight="bold" color="#1C3A38">
                    {trainings.monthlySubscription ?? ""}₼
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    aylıq paket
                  </Text>
                </VStack>

                <VStack align="end" spacing={0}>
                  <Text fontSize="sm" color="gray.600">
                    Kurs müddəti
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {trainings?.trainingDuration}
                  </Text>
                </VStack>
              </HStack>

              <VStack spacing={2} w="full">
                <Button
                  w="full"
                  bg="#1C3A38"
                  color="white"
                  size="md"
                  borderRadius="lg"
                  fontWeight="600"
                  leftIcon={<Calendar size={16} />}
                  transition="all 0.2s ease"
                  _hover={{
                    bg: "#2F6B68",
                    transform: "translateY(-1px)",
                  }}
                >
                  Kursa Yazıl
                </Button>
              </VStack>
            </Box>
          </VStack>
        </CardBody>

        {trainings?.isCertificated && (
          <Box
            position="absolute"
            top={4}
            left={4}
            bg="linear-gradient(135deg, #48BB78, #38A169)"
            color="white"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="xs"
            fontWeight="600"
            transform="rotate(-12deg)"
          >
            🏆 Sertifikalı
          </Box>
        )}
      </MotionCard>
    );
  }
);
