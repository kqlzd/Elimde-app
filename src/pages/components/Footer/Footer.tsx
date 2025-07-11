import React from "react";
import {
  Box,
  Container,
  Flex,
  VStack,
  HStack,
  Heading,
  Link,
  Text,
  SimpleGrid,
  useColorModeValue,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { Heart, Mail, Phone, MapPin, Send } from "lucide-react";
import {
  quickLinks,
  services,
  socialLinks,
  stats,
} from "../../../utils/constants/constants";

export const Footer = () => {
  const bgColor = useColorModeValue("#F3F1EB", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("#1C3A38", "white");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box
      as="footer"
      bg={bgColor}
      borderTop="1px solid"
      borderColor={borderColor}
    >
      <Box py={8} borderBottom="1px solid" borderColor={borderColor}>
        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
            {stats.map((stat, index) => (
              <VStack key={index} spacing={2} textAlign="center">
                <Box
                  p={3}
                  bg="rgba(58, 126, 123, 0.1)"
                  borderRadius="full"
                  color="#3A7E7B"
                >
                  <stat.icon size={24} />
                </Box>
                <Text fontSize="2xl" fontWeight="bold" color={headingColor}>
                  {stat.value}
                </Text>
                <Text fontSize="sm" color={textColor}>
                  {stat.label}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Box py={12}>
        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            <VStack align="flex-start" spacing={6}>
              <Box>
                <HStack spacing={2} mb={4}>
                  <Box
                    w="40px"
                    h="40px"
                    bg="linear-gradient(135deg, #3A7E7B, #F4A261)"
                    borderRadius="xl"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Heart color="white" size={20} />
                  </Box>
                  <Text fontSize="2xl" fontWeight="800" color={headingColor}>
                    Miyav.az
                  </Text>
                </HStack>
                <Text color={textColor} lineHeight="1.6" mb={4}>
                  Azərbaycanda ən böyük pet care platforması. Ev heyvanlarınız
                  üçün bütün lazımlı xidmətləri bir yerdə tapın.
                </Text>
                <Badge
                  colorScheme="teal"
                  variant="subtle"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  🏆 #1 Pet Care Platform
                </Badge>
              </Box>

              <Box w="full">
                <Text
                  fontSize="sm"
                  fontWeight="600"
                  color={headingColor}
                  mb={3}
                >
                  Xəbərlərdən xəbərdar olun
                </Text>
                <form onSubmit={handleNewsletterSubmit}>
                  <InputGroup size="md">
                    <Input
                      placeholder="E-mail ünvanınız"
                      borderRadius="lg"
                      bg="white"
                      border="1px solid"
                      borderColor="gray.300"
                      _focus={{
                        borderColor: "#3A7E7B",
                        boxShadow: "0 0 0 1px #3A7E7B",
                      }}
                    />
                    <InputRightElement>
                      <IconButton
                        icon={<Send size={16} />}
                        aria-label="Göndər"
                        size="sm"
                        bg="#3A7E7B"
                        color="white"
                        borderRadius="md"
                        _hover={{ bg: "#2F6B68" }}
                        type="submit"
                      />
                    </InputRightElement>
                  </InputGroup>
                </form>
              </Box>
            </VStack>

            <VStack align="flex-start" spacing={4}>
              <Heading size="md" color={headingColor} fontWeight="bold">
                Xidmətlərimiz
              </Heading>
              <VStack align="flex-start" spacing={3}>
                {services.map((service, index) => (
                  <Link
                    key={index}
                    href={service.link}
                    color={textColor}
                    fontSize="sm"
                    _hover={{
                      color: "#3A7E7B",
                      textDecoration: "none",
                      transform: "translateX(4px)",
                    }}
                    transition="all 0.2s ease"
                  >
                    • {service.name}
                  </Link>
                ))}
              </VStack>
            </VStack>

            <VStack align="flex-start" spacing={4}>
              <Heading size="md" color={headingColor} fontWeight="bold">
                Sürətli Keçidlər
              </Heading>
              <VStack align="flex-start" spacing={3}>
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.link}
                    color={textColor}
                    fontSize="sm"
                    _hover={{
                      color: "#3A7E7B",
                      textDecoration: "none",
                      transform: "translateX(4px)",
                    }}
                    transition="all 0.2s ease"
                  >
                    {link.name}
                  </Link>
                ))}
              </VStack>
            </VStack>

            <VStack align="flex-start" spacing={4}>
              <Heading size="md" color={headingColor} fontWeight="bold">
                Əlaqə
              </Heading>

              <VStack align="flex-start" spacing={3}>
                <HStack spacing={3}>
                  <Box color="#3A7E7B">
                    <Phone size={18} />
                  </Box>
                  <VStack align="start" spacing={0}>
                    <Text fontSize="sm" fontWeight="600" color={headingColor}>
                      +994 55 806 66 16
                    </Text>
                    <Text fontSize="xs" color={textColor}>
                      24/7 Dəstək xətti
                    </Text>
                  </VStack>
                </HStack>

                <HStack spacing={3}>
                  <Box color="#3A7E7B">
                    <Mail size={18} />
                  </Box>
                  <VStack align="start" spacing={0}>
                    <Text fontSize="sm" fontWeight="600" color={headingColor}>
                      info@miyav.az
                    </Text>
                    <Text fontSize="xs" color={textColor}>
                      Ümumi sorğular
                    </Text>
                  </VStack>
                </HStack>

                <HStack spacing={3}>
                  <Box color="#3A7E7B">
                    <MapPin size={18} />
                  </Box>
                  <VStack align="start" spacing={0}>
                    <Text fontSize="sm" fontWeight="600" color={headingColor}>
                      Bakı, Azərbaycan
                    </Text>
                  </VStack>
                </HStack>
              </VStack>

              <Box>
                <Text
                  fontSize="sm"
                  fontWeight="600"
                  color={headingColor}
                  mb={3}
                >
                  Sosial Mediada Bizi İzləyin
                </Text>
                <HStack spacing={3}>
                  {socialLinks.map((social, index) => (
                    <IconButton
                      key={index}
                      icon={<social.icon size={18} />}
                      aria-label={social.name}
                      size="md"
                      variant="ghost"
                      color={textColor}
                      borderRadius="lg"
                      _hover={{
                        bg: "rgba(58, 126, 123, 0.1)",
                        color: social.hoverColor,
                        transform: "translateY(-2px)",
                      }}
                      transition="all 0.2s ease"
                      as="a"
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ))}
                </HStack>
              </Box>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      <Box py={6} borderTop="1px solid" borderColor={borderColor}>
        <Container maxW="7xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            gap={4}
          >
            <Text
              fontSize="sm"
              color={textColor}
              textAlign={{ base: "center", md: "left" }}
            >
              © 2024 Miyav.az. Bütün hüquqlar qorunur.
              <Text as="span" color="#3A7E7B" ml={1}>
                🐾 Made with ❤️ for pets
              </Text>
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};
