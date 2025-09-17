import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { SEOHead } from "../../components/Seo/SeoHead";

const MotionBox = motion(Box);

export const NotFoundPage = React.memo(() => {
  const navigate = useNavigate();

  return (
    <Box bg="gray.50" minH="100vh" pt={24}>
      <SEOHead
        title="404 - Səhifə Tapılmadı | Meow.az"
        description="Axtardığınız səhifə tapılmadı. Ana səhifəyə qayıdın və digər xidmətlərimizi kəşf edin."
      />

      <Container maxW="6xl" py={16}>
        <VStack spacing={12} textAlign="center">
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VStack spacing={6}>
              <MotionBox
                fontSize={{ base: "8xl", md: "12xl" }}
                fontWeight="900"
                bgGradient="linear(45deg, #1C3A38, #3A7E7B, #F4A261)"
                bgClip="text"
                lineHeight="1"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                404
              </MotionBox>

              <MotionBox
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Text fontSize="8xl">🐱</Text>
              </MotionBox>
            </VStack>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <VStack spacing={4} maxW="600px">
              <Heading
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                color="#1C3A38"
                fontWeight="700"
              >
                Meow! Bu səhifə tapılmadı🐾
              </Heading>

              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.600"
                lineHeight="1.6"
              >
                Axtardığınız səhifə mövcud deyil və ya başqa yerə köçürülüb.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <HStack spacing={4} flexWrap="wrap" justify="center">
              <Button
                leftIcon={<ArrowLeft size={18} />}
                onClick={() => navigate(-1)}
                variant="outline"
                size="lg"
                borderRadius="xl"
                borderColor="#3A7E7B"
                color="#3A7E7B"
                _hover={{
                  bg: "#3A7E7B",
                  color: "white",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.3s ease"
              >
                Geri Qayıt
              </Button>

              <Button
                leftIcon={<Home size={18} />}
                onClick={() => navigate("/")}
                bg="#1C3A38"
                color="white"
                size="lg"
                borderRadius="xl"
                _hover={{
                  bg: "#2F6B68",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.3s ease"
              >
                Ana Səhifə
              </Button>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
});
