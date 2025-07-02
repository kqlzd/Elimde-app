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

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Ümumi");

  const categories = [
    "Ümumi",
    "Hotel",
    "Klinika",
    "Grooming",
    "Təlim",
    "Ödəniş",
  ];

  const faqData: FAQItem[] = [
    {
      id: "1",
      question: "Miyav.az nədir və necə işləyir?",
      answer:
        "Miyav.az Azərbaycanda ev heyvanları üçün müxtəlif xidmətləri bir platformada birləşdirən rəqəmsal həlldir. Siz burada hotel, klinika, grooming və təlim xidmətlərini tapa, müqayisə edə və rezerv edə bilərsiniz.",
      category: "Ümumi",
    },
    {
      id: "2",
      question: "Qeydiyyat pulsuzmu?",
      answer:
        "Bəli, platformada qeydiyyat tamamilə pulsuz və sadədir. Yalnız e-mail ünvanınız və parol ilə daxil ola bilərsiniz.",
      category: "Ümumi",
    },
    {
      id: "3",
      question: "Hotel rezervasiyasını necə edə bilərəm?",
      answer:
        "Hotel səhifəsindən seçdiyiniz otelin kartına klikləyin, tarixi seçin və 'Rezerv Et' düyməsinə basın. Sonra əlaqə məlumatlarınızı daxil edərək rezervasiyanızı tamamlayın.",
      category: "Hotel",
    },
    {
      id: "4",
      question: "Hotel qiymətlərinə nə daxildir?",
      answer:
        "Hotel qiymətlərinə adətən günlük qalma, yemək və əsas baxım xidmətləri daxildir. Əlavə xidmətlər (grooming, oyun vaxtı və s.) ayrıca ödənilir.",
      category: "Hotel",
    },
    {
      id: "5",
      question: "Təcili hallarda klinikaya necə müraciət edə bilərəm?",
      answer:
        "Təcili hallarda klinika səhifəsindən 24/7 xidmət göstərən klinika kartlarını seçin və dərhal əlaqə nömrəsinə zəng edin. Bəzi klinikalar təcili yardım üçün xüsusi xətt təqdim edir.",
      category: "Klinika",
    },
    {
      id: "6",
      question: "Vaksinasiya qeydlərimi necə izləyə bilərəm?",
      answer:
        "Hər klinika ziyarətindən sonra vaksinasiya və müalicə qeydləri profilinizə əlavə olunur. Bu məlumatları profil bölməsindən izləyə bilərsiniz.",
      category: "Klinika",
    },
    {
      id: "7",
      question: "Grooming xidməti nə qədər çəkir?",
      answer:
        "Grooming müddəti heyvanın növü və seçilən xidmətdən asılıdır. Orta hesabla: köpəklər üçün 1-3 saat, pişiklər üçün 30-90 dəqiqə.",
      category: "Grooming",
    },
    {
      id: "8",
      question: "Grooming-dən əvvəl nələrə diqqət etməliyəm?",
      answer:
        "Heyvanınızın stressini azaltmaq üçün əvvəlcədən tanışlıq planlaşdırın. Xəstə və ya yeni vaksinasiya olunmuş heyvanları gətirməyin.",
      category: "Grooming",
    },
    {
      id: "9",
      question: "Təlim proqramları neçə müddət davam edir?",
      answer:
        "Təlim proqramları növdən və səviyyədən asılı olaraq 2 həftədən 6 aya qədər davam edə bilər. Əsas itaət təlimi adətən 8-12 həftə çəkir.",
      category: "Təlim",
    },
    {
      id: "10",
      question: "Fərdi təlim mövcuddurmu?",
      answer:
        "Bəli, əksər təlim mərkəzləri fərdi və qrup dərsləri təklif edir. Fərdi dərslər daha sürətli nəticə verir, amma daha bahalıdır.",
      category: "Təlim",
    },
    {
      id: "11",
      question: "Hansı ödəniş üsulları mövcuddur?",
      answer:
        "Nağd, bank kartı, bank köçürməsi və bəzi hallarda mərhələli ödəniş imkanları mövcuddur. Hər xidmət göstərəni fərqli ödəniş üsulları təklif edə bilər.",
      category: "Ödəniş",
    },
    {
      id: "12",
      question: "Rezervasiyanı ləğv edə bilərəmmi?",
      answer:
        "Bəli, rezervasiyanızı 24 saat əvvəlcədən ləğv edə bilərsiniz. Ləğvetmə qaydaları xidmət növündən asılı olaraq fərqli ola bilər.",
      category: "Ödəniş",
    },
  ];

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
      {/* Hero Section */}
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
        {/* Search */}
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

          {/* Categories */}
          <HStack spacing={4} flexWrap="wrap" justify="center">
            {categories.map((category) => (
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

        {/* FAQ Items */}
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

        {/* Contact Support */}
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
                      +994 50 123 45 67
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
};

const FAQItem: React.FC<{ faq: FAQItem }> = ({ faq }) => {
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
