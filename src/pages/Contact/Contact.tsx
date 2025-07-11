import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Icon,
  SimpleGrid,
  Card,
  CardBody,
  Button,
  Badge,
} from "@chakra-ui/react";
import { HeadphonesIcon } from "lucide-react";
import { contactMethods } from "../../utils/constants/constants";

export const ContactPage = () => {
  return (
    <Box bg="gray.50" minH="100vh">
      <Box bg="linear-gradient(135deg, #1C3A38 0%, #2F6B68 100%)" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center" color="white">
            <Icon as={HeadphonesIcon} w={16} h={16} />
            <Heading size="2xl" fontWeight="bold">
              Bizimlə Əlaqə
            </Heading>
            <Text fontSize="xl" maxW="600px" lineHeight="1.6">
              Suallarınız, təklifləriniz və ya yardıma ehtiyacınız var?
            </Text>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={16}>
        <VStack spacing={12}>
          <Box textAlign="center">
            <Heading size="xl" color="#1C3A38" mb={4}>
              Bizimlə Necə Əlaqə Saxlaya Bilərsiniz
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Sizə ən uyğun üsulu seçin və dərhal əlaqə saxlayın
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="100%">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                cursor="pointer"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-4px)",
                  shadow: "xl",
                  borderColor: method.color,
                }}
                border="2px solid transparent"
                onClick={() => window.open(method.action, "_blank")}
              >
                <CardBody textAlign="center" p={6}>
                  <Box
                    w={16}
                    h={16}
                    borderRadius="full"
                    bg={`${method.color}15`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mx="auto"
                    mb={4}
                  >
                    <Icon as={method.icon} w={8} h={8} color={method.color} />
                  </Box>
                  <Heading size="md" mb={2} color="#1C3A38">
                    {method.title}
                  </Heading>
                  <Text color="gray.600" mb={3} fontSize="sm">
                    {method.description}
                  </Text>
                  <Text fontWeight="bold" color={method.color} mb={2}>
                    {method.contact}
                  </Text>
                  <Badge colorScheme="gray" size="sm">
                    {method.availability}
                  </Badge>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          <Card bg="#1C3A38" color="white" w="100%">
            <CardBody p={8} textAlign="center">
              <VStack spacing={4}>
                <Icon as={HeadphonesIcon} w={12} h={12} />
                <Heading size="lg">Sualınızın cavabını tapmadınız?</Heading>
                <Text fontSize="lg" opacity={0.9}>
                  Tez-tez verilən suallar bölməsində daha çox məlumat əldə edin
                </Text>
                <Button
                  variant="outline"
                  color="white"
                  borderColor="white"
                  _hover={{ bg: "white", color: "#1C3A38" }}
                  onClick={() => (window.location.href = "/faq")}
                >
                  FAQ-ya baxın
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};
