import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Collapse,
  Card,
  CardBody,
  useDisclosure,
  Badge,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import { faqCategories, faqData } from "../../utils/constants/constants";

interface IFAQItem {
  id?: string;
  question?: string;
  answer?: string;
  category?: string;
}

export const FAQPage: React.FC<IFAQItem> = React.memo(() => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Ümumi");

  const filteredFAQs = faqData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "Ümumi" || item.category === activeCategory;
    return (
      matchesSearch && (activeCategory === "Ümumi" ? true : matchesCategory)
    );
  });

  return (
    <Box bg="gray.50" minH="100vh">
      <Box bg="linear-gradient(135deg, #1C3A38 0%, #2F6B68 100%)" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center" color="white">
            <Icon as={HelpCircle} w={16} h={16} />
            <Heading size="2xl" fontWeight="bold">
              Tez-tez Verilən Suallar
            </Heading>
            <Text fontSize="xl" maxW="600px" lineHeight="1.6">
              Miyav.az platforması haqqında ən çox soruşulan sualların cavabları
            </Text>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={12}>
        <VStack spacing={8}>
          <Box w={{ base: "100%", md: "60%" }}>
            <InputGroup size="lg">
              <InputLeftElement>
                <Icon as={Search} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Sualı axtarın..."
                bg="white"
                borderColor="gray.300"
                borderRadius="lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                _focus={{
                  borderColor: "#1C3A38",
                  boxShadow: "0 0 0 1px #1C3A38",
                }}
              />
            </InputGroup>
          </Box>

          <HStack spacing={4} flexWrap="wrap" justify="center">
            {faqCategories.map((category) => (
              <Badge
                key={category}
                variant={activeCategory === category ? "solid" : "outline"}
                colorScheme={activeCategory === category ? "green" : "gray"}
                px={4}
                py={2}
                borderRadius="full"
                cursor="pointer"
                fontSize="sm"
                onClick={() => setActiveCategory(category)}
                _hover={{
                  bg: activeCategory === category ? undefined : "gray.100",
                }}
              >
                {category}
              </Badge>
            ))}
          </HStack>
        </VStack>

        <Box mt={12}>
          {filteredFAQs.length === 0 ? (
            <Card>
              <CardBody textAlign="center" py={12}>
                <Icon as={Search} w={12} h={12} color="gray.400" mb={4} />
                <Text fontSize="lg" color="gray.500">
                  Axtardığınız suala uyğun nəticə tapılmadı
                </Text>
              </CardBody>
            </Card>
          ) : (
            <VStack spacing={4}>
              {filteredFAQs.map((faq) => (
                <FAQItem key={faq.id} faq={faq} />
              ))}
            </VStack>
          )}
        </Box>

        <Box mt={16}>
          <Card bg="white" border="2px solid" borderColor="#1C3A38">
            <CardBody p={8}>
              <VStack spacing={6} textAlign="center">
                <Heading size="lg" color="#1C3A38">
                  Cavab tapa bilmədiniz?
                </Heading>
                <Text fontSize="lg" color="gray.600">
                  Bizim dəstək komandamız sizə kömək etməyə hazırdır
                </Text>

                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="100%">
                  <VStack spacing={3} p={6} bg="gray.50" borderRadius="lg">
                    <Icon as={Phone} w={8} h={8} color="#1C3A38" />
                    <Text fontWeight="bold" color="#1C3A38">
                      Telefon Dəstəyi
                    </Text>
                    <Text color="gray.600" textAlign="center">
                      +994 55 699 20 00
                      <br />
                      <Text fontSize="sm">Hər gün 09:00-18:00</Text>
                    </Text>
                  </VStack>

                  <VStack spacing={3} p={6} bg="gray.50" borderRadius="lg">
                    <Icon as={Mail} w={8} h={8} color="#1C3A38" />
                    <Text fontWeight="bold" color="#1C3A38">
                      E-mail Dəstəyi
                    </Text>
                    <Text color="gray.600" textAlign="center">
                      support@miyav.az
                      <br />
                      <Text fontSize="sm">24 saat ərzində cavab</Text>
                    </Text>
                  </VStack>

                  <VStack spacing={3} p={6} bg="gray.50" borderRadius="lg">
                    <Icon as={MessageCircle} w={8} h={8} color="#1C3A38" />
                    <Text fontWeight="bold" color="#1C3A38">
                      Canlı Söhbət
                    </Text>
                    <Text color="gray.600" textAlign="center">
                      Dərhal kömək alın
                      <br />
                      <Text fontSize="sm">Hər gün 09:00-22:00</Text>
                    </Text>
                  </VStack>
                </SimpleGrid>
              </VStack>
            </CardBody>
          </Card>
        </Box>
      </Container>
    </Box>
  );
});

const FAQItem = ({ faq }: any) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Card w="100%" cursor="pointer" onClick={onToggle}>
      <CardBody>
        <HStack justify="space-between" align="start">
          <VStack align="start" spacing={2} flex="1">
            <HStack>
              <Badge colorScheme="blue" size="sm">
                {faq.category}
              </Badge>
            </HStack>
            <Text fontSize="lg" fontWeight="semibold" color="#1C3A38">
              {faq.question}
            </Text>
          </VStack>
          <Icon
            as={isOpen ? ChevronUp : ChevronDown}
            w={6}
            h={6}
            color="gray.500"
          />
        </HStack>

        <Collapse in={isOpen} animateOpacity>
          <Box mt={4} pt={4} borderTop="1px solid" borderColor="gray.200">
            <Text color="gray.700" lineHeight="1.6">
              {faq.answer}
            </Text>
          </Box>
        </Collapse>
      </CardBody>
    </Card>
  );
};
