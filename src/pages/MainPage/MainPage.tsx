import React from "react";
import {
  Box,
  Heading,
  Image,
  Container,
  Button,
  VStack,
  Grid,
  GridItem,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { PopularServicesHeading } from "../../components/PopularServicesHeading/PopularServicesHeading";
import { PetCards } from "../../components/PetCards/PetCards";
import { ArrowRight } from "lucide-react";
import { stats } from "../../utils/constants/constants";
import { SEOHead } from "../../components/Seo/SeoHead";

const MotionBox = motion(Box);
const MotionGridItem = motion(GridItem);

export const MainPage = React.memo(() => {
  const bgGradient = useColorModeValue(
    "linear(45deg, #f4f1ec 0%, #e8f4f3 50%, #f0f8f5 100%)",
    "linear(45deg, #1a202c 0%, #2d3748 50%, #4a5568 100%)"
  );

  const cardBg = useColorModeValue(
    "rgba(255, 255, 255, 0.8)",
    "rgba(255, 255, 255, 0.1)"
  );

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services-section");
    if (servicesSection) {
      servicesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box bg="gray.50" overflow="hidden">
      <SEOHead
        title="Ana Səhifə | Miyav.az"
        description="Azərbaycanda ev heyvanları üçün ən yaxşı xidmətlər. Hotel, klinika, grooming və təlim"
      />
      <Box
        minH="100vh"
        bgGradient={bgGradient}
        position="relative"
        overflow="hidden"
      >
        <MotionBox
          position="absolute"
          top="-50%"
          left="-50%"
          width="200%"
          height="200%"
          bgGradient="radial(circle at center, rgba(26, 58, 56, 0.1) 0%, transparent 70%)"
          backgroundSize="400% 400%"
          animate="animate"
        />

        <MotionBox
          position="absolute"
          top="20%"
          right="10%"
          w="80px"
          h="80px"
          bg="rgba(244, 162, 97, 0.2)"
          borderRadius="full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <MotionBox
          position="absolute"
          bottom="20%"
          left="5%"
          w="60px"
          h="60px"
          bg="rgba(58, 126, 123, 0.2)"
          borderRadius="full"
          animate={{
            y: [0, 15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <Container maxW="7xl" py={20} position="relative" zIndex={2}>
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="center"
            minH="80vh"
            gap={12}
          >
            <VStack
              flex={1}
              align={{ base: "center", lg: "flex-start" }}
              spacing={8}
              textAlign={{ base: "center", lg: "left" }}
            >
              <MotionBox
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Text
                  fontSize="lg"
                  color="#3A7E7B"
                  fontWeight="600"
                  mb={4}
                  letterSpacing="wider"
                >
                  PET PLATFORMASI
                </Text>
                <Heading
                  fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                  fontWeight="800"
                  color="#1C3A38"
                  lineHeight="1.1"
                  mb={6}
                >
                  Ev heyvanınız üçün{" "}
                  <Box
                    as="span"
                    bgGradient="linear(45deg, #3A7E7B, #F4A261)"
                    bgClip="text"
                    display="inline-block"
                  >
                    peşəkar qulluq
                  </Box>
                </Heading>
                <Text
                  fontSize="xl"
                  color="gray.600"
                  lineHeight="1.6"
                  maxW="500px"
                >
                  Heyvan xidmətlərinizi pulsuz siyahıya əlavə edin və yeni
                  müştərilər sizi tapsın. Peşəkar qulluq, etibarlı xidmət.
                </Text>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <HStack
                  spacing={4}
                  flexWrap="wrap"
                  justify={{ base: "center", lg: "flex-start" }}
                >
                  <Button
                    size="lg"
                    bg="#1C3A38"
                    color="white"
                    px={8}
                    py={6}
                    borderRadius="xl"
                    fontSize="lg"
                    fontWeight="600"
                    rightIcon={<ArrowRight size={20} />}
                    onClick={scrollToServices}
                    _hover={{
                      bg: "#2F6B68",
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                    transition="all 0.3s ease"
                  >
                    Xidmətləri Kəşf Et
                  </Button>
                </HStack>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                w="full"
              >
                <SimpleGrid columns={{ base: 2, lg: 4 }} spacing={6} mt={8}>
                  {stats.map((stat, index) => (
                    <VStack
                      key={index}
                      spacing={2}
                      p={4}
                      bg={cardBg}
                      borderRadius="lg"
                      backdropFilter="blur(10px)"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                    >
                      <IconButton
                        icon={<stat.icon />}
                        aria-label={stat.label}
                        variant="ghost"
                        color="#3A7E7B"
                        size="sm"
                        isRound
                      />
                      <Text fontSize="2xl" fontWeight="bold" color="#1C3A38">
                        {stat.value}
                      </Text>
                      <Text fontSize="sm" color="gray.600" textAlign="center">
                        {stat.label}
                      </Text>
                    </VStack>
                  ))}
                </SimpleGrid>
              </MotionBox>
            </VStack>

            <Box flex={1} position="relative">
              <Grid
                templateColumns="repeat(2, 1fr)"
                gap={6}
                maxW="500px"
                mx="auto"
              >
                <MotionGridItem
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <MotionBox
                    borderRadius="2xl"
                    overflow="hidden"
                    boxShadow="2xl"
                    bg="white"
                    p={3}
                    transform="rotate(-5deg)"
                    _hover={{
                      transform: "rotate(-2deg) scale(1.05)",
                    }}
                    animate="animate"
                  >
                    <Image
                      src="/assets/img01.webp"
                      alt="Cat"
                      w="full"
                      h="200px"
                      objectFit="cover"
                      borderRadius="xl"
                    />
                  </MotionBox>
                </MotionGridItem>

                <MotionGridItem
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  mt={8}
                >
                  <MotionBox
                    borderRadius="2xl"
                    overflow="hidden"
                    boxShadow="2xl"
                    bg="white"
                    p={3}
                    transform="rotate(3deg)"
                    _hover={{
                      transform: "rotate(1deg) scale(1.05)",
                    }}
                    animate={{
                      y: [0, -20, 0],
                    }}
                  >
                    <Image
                      src="/assets/img02.webp"
                      alt="Dog"
                      w="full"
                      h="200px"
                      objectFit="cover"
                      borderRadius="xl"
                    />
                  </MotionBox>
                </MotionGridItem>

                <MotionGridItem
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  mt={4}
                >
                  <MotionBox
                    borderRadius="2xl"
                    overflow="hidden"
                    boxShadow="2xl"
                    bg="white"
                    p={3}
                    transform="rotate(2deg)"
                    _hover={{
                      transform: "rotate(0deg) scale(1.05)",
                    }}
                    animate={{
                      y: [0, -20, 0],
                    }}
                  >
                    <Image
                      src="/assets/img03.webp"
                      alt="Bird"
                      w="full"
                      h="200px"
                      objectFit="cover"
                      borderRadius="xl"
                    />
                  </MotionBox>
                </MotionGridItem>

                <MotionGridItem
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <MotionBox
                    borderRadius="2xl"
                    overflow="hidden"
                    boxShadow="2xl"
                    bg="white"
                    p={3}
                    transform="rotate(-3deg)"
                    _hover={{
                      transform: "rotate(-1deg) scale(1.05)",
                    }}
                  >
                    <Image
                      src="/assets/img04.webp"
                      alt="Rabbit"
                      w="full"
                      h="200px"
                      objectFit="cover"
                      borderRadius="xl"
                    />
                  </MotionBox>
                </MotionGridItem>
              </Grid>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Box id="services-section">
        <PopularServicesHeading />
        <PetCards />
      </Box>
    </Box>
  );
});
