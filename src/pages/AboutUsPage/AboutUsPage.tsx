import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { Target, Eye } from "lucide-react";
import { aboutUsstats, values } from "../../utils/constants/constants";

export const AboutUsPage = React.memo(() => {
  return (
    <Box bg="gray.50" minH="100vh">
      <Box bg="linear-gradient(135deg, #1C3A38 0%, #2F6B68 100%)" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center" color="white">
            <Badge
              colorScheme="green"
              variant="solid"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
            >
              2025-ci İldən bərİ xİdmətİnİzdə
            </Badge>
            <Heading size="2xl" fontWeight="bold">
              Miyav.az - Heyvan Dostlarınızın Evi
            </Heading>
            <Text fontSize="xl" maxW="800px" lineHeight="1.6">
              Biz heyvan sevgisini və peşəkar qayğını birləşdirərək, ev
              heyvanlarınız üçün ən yaxşı xidmətləri təqdim edirik.
            </Text>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={16}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12}>
          <Card>
            <CardBody p={8}>
              <HStack spacing={4} mb={6}>
                <Icon as={Target} w={8} h={8} color="#1C3A38" />
                <Heading size="lg" color="#1C3A38">
                  Missiyamız
                </Heading>
              </HStack>
              <Text fontSize="lg" lineHeight="1.7" color="gray.700">
                Azərbaycanda heyvan sahələrinin inkişafına töhfə vermək, heyvan
                sahibləri ilə peşəkar xidmət göstərənləri arasında güvənli əlaqə
                yaratmaq və hər heyvanın layiqli qayğı almasını təmin etməkdir.
              </Text>
            </CardBody>
          </Card>

          <Card>
            <CardBody p={8}>
              <HStack spacing={4} mb={6}>
                <Icon as={Eye} w={8} h={8} color="#1C3A38" />
                <Heading size="lg" color="#1C3A38">
                  Vizyonumuz
                </Heading>
              </HStack>
              <Text fontSize="lg" lineHeight="1.7" color="gray.700">
                Azərbaycanda heyvan xidmətləri sahəsində lider platforma olmaq,
                innovativ həllər təqdim etmək və heyvan rifah halının
                yüksəldilməsinə davamlı töhfə vermək.
              </Text>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Container>

      <Box bg="white" py={16}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Box textAlign="center">
              <Heading size="xl" color="#1C3A38" mb={4}>
                Bizim Dəyərlərimiz
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="600px">
                Bu dəyərlər bizim hər gün etdiyimiz işin əsasını təşkil edir
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
              {values.map((value, index) => (
                <Card key={index} variant="outline" borderColor="gray.200">
                  <CardBody textAlign="center" p={8}>
                    <Box
                      w={16}
                      h={16}
                      borderRadius="full"
                      bg={`${value.color}15`}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mx="auto"
                      mb={4}
                    >
                      <Icon as={value.icon} w={8} h={8} color={value.color} />
                    </Box>
                    <Heading size="md" mb={3} color="#1C3A38">
                      {value.title}
                    </Heading>
                    <Text color="gray.600" lineHeight="1.6">
                      {value.description}
                    </Text>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      <Box bg="linear-gradient(135deg, #1C3A38 0%, #2F6B68 100%)" py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
            {aboutUsstats.map((stat, index) => (
              <VStack key={index} spacing={2} textAlign="center" color="white">
                <Text fontSize="4xl" fontWeight="bold">
                  {stat.number}
                </Text>
                <Text fontSize="lg" opacity={0.9}>
                  {stat.label}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Box bg="gray.100" py={16}>
        <Container maxW="container.xl">
          <Box textAlign="center">
            <Heading size="xl" color="#1C3A38" mb={4}>
              Bizimlə Əlaqə Saxlayın
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={8} maxW="600px" mx="auto">
              Suallarınız, təklifləriniz və ya əməkdaşlıq üçün bizimlə əlaqə
              saxlaya bilərsiniz
            </Text>
            <Flex justify="center" gap={8} flexWrap="wrap">
              <VStack spacing={2}>
                <Text fontWeight="bold" color="#1C3A38">
                  E-mail
                </Text>
                <Text color="gray.600">info@miyav.az</Text>
              </VStack>
              <VStack spacing={2}>
                <Text fontWeight="bold" color="#1C3A38">
                  Telefon
                </Text>
                <Text color="gray.600">+994 55 699 20 00</Text>
              </VStack>
              <VStack spacing={2}>
                <Text fontWeight="bold" color="#1C3A38">
                  Ünvan
                </Text>
                <Text color="gray.600">Bakı, Azərbaycan</Text>
              </VStack>
            </Flex>
          </Box>
        </Container>
      </Box>
    </Box>
  );
});
