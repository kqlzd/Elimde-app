import React from "react";
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
import {
  MapPin,
  Calendar,
  Clock,
  Heart,
  Stethoscope,
  Video,
} from "lucide-react";
import { TDoctorData } from "../../../models/api";

const MotionCard = motion(Card);

interface DoctorCardsProps {
  doctor: TDoctorData;
}

export const DoctorCards: React.FC<DoctorCardsProps> = ({ doctor }) => {
  const navigate = useNavigate();
  const cardBg = useColorModeValue("white", "gray.800");
  const shadowColor = useColorModeValue("rgba(0,0,0,0.1)", "rgba(0,0,0,0.3)");

  const handleClick = () => navigate(`/hospitals/${doctor.id}`);

  const services = [
    { icon: Video, label: "Video zəng" },
    { icon: Stethoscope, label: "Müayinə" },
    { icon: Clock, label: "24/7" },
  ];

  return (
    <MotionCard
      shadow="none"
      borderRadius="2xl"
      cursor="pointer"
      onClick={handleClick}
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
          src={doctor.image || "/assets/default-doctor.jpg"}
          alt={doctor.name}
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
                Dr. {doctor.name}
              </Heading>
              <Badge
                colorScheme="green"
                variant="subtle"
                fontSize="xs"
                px={2}
                py={1}
                borderRadius="md"
              >
                Mövcud
              </Badge>
            </HStack>

            <HStack spacing={1} color="gray.600">
              <Icon as={MapPin} w="14px" h="14px" />
              <Text fontSize="sm" noOfLines={1}>
                {doctor.address}
              </Text>
            </HStack>
          </Box>

          <HStack spacing={2} w="full" justify="space-around">
            {services.map((service, index) => (
              <VStack key={index} spacing={1} flex="1" align="center">
                <Box
                  w="36px"
                  h="36px"
                  bg="rgba(58, 126, 123, 0.1)"
                  borderRadius="lg"
                  color="#3A7E7B"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  transition="all 0.2s ease"
                  _hover={{ bg: "rgba(58, 126, 123, 0.2)" }}
                >
                  <Icon as={service.icon} w="16px" h="16px" />
                </Box>
                <Text
                  fontSize="xs"
                  color="gray.600"
                  textAlign="center"
                  lineHeight="1.2"
                  noOfLines={1}
                >
                  {service.label}
                </Text>
              </VStack>
            ))}
          </HStack>

          <Box w="full">
            <HStack justify="space-between" align="center" mb={3}>
              <VStack align="start" spacing={0}>
                <Text fontSize="2xl" fontWeight="bold" color="#1C3A38">
                  {doctor?.consultation} - azn
                </Text>
                <Text fontSize="sm" color="gray.600">
                  konsultasiya
                </Text>
              </VStack>

              <VStack align="end" spacing={0}>
                <Text fontSize="sm" color="gray.600">
                  Təcrübə
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {doctor?.experience} il
                </Text>
              </VStack>
            </HStack>

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
              Görüş Təyin Et
            </Button>
          </Box>
        </VStack>
      </CardBody>
    </MotionCard>
  );
};
