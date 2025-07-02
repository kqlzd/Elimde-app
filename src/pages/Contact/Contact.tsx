import React, { useState } from "react";
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
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  useToast,
  Badge,
  Flex,
  Image,
} from "@chakra-ui/react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Instagram,
  Users,
  HeadphonesIcon,
  MapPinIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  category: string;
  message: string;
}

export const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const contactMethods = [
    {
      icon: Phone,
      title: "Telefon Dəstəyi",
      description: "Dərhal kömək üçün zəng edin",
      contact: "+994 50 123 45 67",
      availability: "Hər gün 09:00-22:00",
      color: "#25D366",
      action: "tel:+994501234567",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Sürətli mesajlaşma",
      contact: "+994 50 123 45 67",
      availability: "24/7 mövcud",
      color: "#25D366",
      action: "https://wa.me/994501234567",
    },
    {
      icon: Mail,
      title: "E-mail Dəstəyi",
      description: "Ətraflı suallar üçün",
      contact: "info@miyav.az",
      availability: "24 saat ərzində cavab",
      color: "#EA4335",
      action: "mailto:info@miyav.az",
    },
    {
      icon: Instagram,
      title: "Instagram",
      description: "Sosial mediada izləyin",
      contact: "@miyav.az",
      availability: "Gündəlik yeniliklər",
      color: "#E4405F",
      action: "https://instagram.com/miyav.az",
    },
  ];

  const officeInfo = [
    {
      icon: MapPin,
      title: "Ünvan",
      details: ["Nizami rayonu", "28 May küçəsi", "Bakı, Azərbaycan"],
    },
    {
      icon: Clock,
      title: "İş Saatları",
      details: [
        "Bazar ertəsi - Cümə: 09:00-18:00",
        "Şənbə: 10:00-16:00",
        "Bazar: Bağlı",
      ],
    },
    {
      icon: Users,
      title: "Komanda",
      details: ["15+ Peşəkar", "5+ İl təcrübə", "24/7 Dəstək"],
    },
  ];

  const categories = [
    "Ümumi sual",
    "Hotel rezervasiyası",
    "Klinika xidmətləri",
    "Grooming",
    "Təlim mərkəzləri",
    "Texniki dəstək",
    "Şikayət",
    "Təklif",
    "Əməkdaşlıq",
  ];

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Mesaj göndərildi!",
      description: "Tezliklə sizinlə əlaqə saxlayacağıq.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    reset();
    setIsSubmitting(false);
  };

  return (
    <Box bg="gray.50" minH="100vh">
      {/* Hero Section */}
      <Box bg="linear-gradient(135deg, #1C3A38 0%, #2F6B68 100%)" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center" color="white">
            <Icon as={HeadphonesIcon} w={16} h={16} />
            <Heading size="2xl" fontWeight="bold">
              Bizimlə Əlaqə
            </Heading>
            <Text fontSize="xl" maxW="600px" lineHeight="1.6">
              Suallarınız, təklifləriniz və ya yardıma ehtiyacınız var? Biz
              həmişə sizin yanınızdayıq!
            </Text>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={16}>
        {/* Contact Methods */}
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

          {/* Contact Form and Office Info */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} w="100%">
            {/* Contact Form */}
            <Card>
              <CardBody p={8}>
                <VStack spacing={6} align="start">
                  <Box>
                    <Heading size="lg" color="#1C3A38" mb={2}>
                      Mesaj Göndərin
                    </Heading>
                    <Text color="gray.600">
                      Formu doldurun və biz 24 saat ərzində sizinlə əlaqə
                      saxlayaq
                    </Text>
                  </Box>

                  <Box as="form" onSubmit={handleSubmit(onSubmit)} w="100%">
                    <VStack spacing={4}>
                      <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        spacing={4}
                        w="100%"
                      >
                        <FormControl isRequired isInvalid={!!errors.name}>
                          <FormLabel>Ad Soyad</FormLabel>
                          <Input
                            {...register("name", {
                              required: "Ad soyad tələb olunur",
                            })}
                            placeholder="Adınızı daxil edin"
                            focusBorderColor="#1C3A38"
                          />
                        </FormControl>

                        <FormControl isRequired isInvalid={!!errors.phone}>
                          <FormLabel>Telefon</FormLabel>
                          <Input
                            {...register("phone", {
                              required: "Telefon nömrəsi tələb olunur",
                            })}
                            placeholder="+994 50 123 45 67"
                            focusBorderColor="#1C3A38"
                          />
                        </FormControl>
                      </SimpleGrid>

                      <FormControl isRequired isInvalid={!!errors.email}>
                        <FormLabel>E-mail</FormLabel>
                        <Input
                          {...register("email", {
                            required: "E-mail tələb olunur",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Düzgün e-mail daxil edin",
                            },
                          })}
                          type="email"
                          placeholder="email@example.com"
                          focusBorderColor="#1C3A38"
                        />
                      </FormControl>

                      <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        spacing={4}
                        w="100%"
                      >
                        <FormControl isRequired>
                          <FormLabel>Kateqoriya</FormLabel>
                          <Select
                            {...register("category", {
                              required: "Kateqoriya seçin",
                            })}
                            placeholder="Kateqoriya seçin"
                            focusBorderColor="#1C3A38"
                          >
                            {categories.map((cat, index) => (
                              <option key={index} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl isRequired>
                          <FormLabel>Mövzu</FormLabel>
                          <Input
                            {...register("subject", {
                              required: "Mövzu tələb olunur",
                            })}
                            placeholder="Mesajın mövzusu"
                            focusBorderColor="#1C3A38"
                          />
                        </FormControl>
                      </SimpleGrid>

                      <FormControl isRequired isInvalid={!!errors.message}>
                        <FormLabel>Mesaj</FormLabel>
                        <Textarea
                          {...register("message", {
                            required: "Mesaj tələb olunur",
                          })}
                          placeholder="Mesajınızı ətraflı yazın..."
                          rows={5}
                          focusBorderColor="#1C3A38"
                        />
                      </FormControl>

                      <Button
                        type="submit"
                        bg="#1C3A38"
                        color="white"
                        size="lg"
                        w="100%"
                        leftIcon={<Send size={20} />}
                        isLoading={isSubmitting}
                        loadingText="Göndərilir..."
                        _hover={{ bg: "#2F6B68" }}
                      >
                        Mesaj Göndər
                      </Button>
                    </VStack>
                  </Box>
                </VStack>
              </CardBody>
            </Card>

            {/* Office Information */}
            <VStack spacing={6} align="start">
              <Card w="100%">
                <CardBody p={8}>
                  <VStack spacing={6} align="start">
                    <Heading size="lg" color="#1C3A38">
                      Ofis Məlumatları
                    </Heading>

                    {officeInfo.map((info, index) => (
                      <HStack key={index} spacing={4} align="start">
                        <Box
                          w={12}
                          h={12}
                          borderRadius="lg"
                          bg="#1C3A3815"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          flexShrink={0}
                        >
                          <Icon as={info.icon} w={6} h={6} color="#1C3A38" />
                        </Box>
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="bold" color="#1C3A38">
                            {info.title}
                          </Text>
                          {info.details.map((detail, idx) => (
                            <Text key={idx} color="gray.600" fontSize="sm">
                              {detail}
                            </Text>
                          ))}
                        </VStack>
                      </HStack>
                    ))}
                  </VStack>
                </CardBody>
              </Card>

              {/* Map placeholder */}
              <Card w="100%">
                <CardBody p={0}>
                  <Box
                    h="300px"
                    bg="gray.200"
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    overflow="hidden"
                  >
                    <VStack spacing={3} textAlign="center" color="gray.500">
                      <Icon as={MapPinIcon} w={12} h={12} />
                      <Text fontWeight="bold">Xəritə</Text>
                      <Text fontSize="sm">Bakı, Nizami rayonu</Text>
                    </VStack>
                    <Box
                      position="absolute"
                      top={4}
                      right={4}
                      bg="white"
                      px={3}
                      py={1}
                      borderRadius="md"
                      shadow="md"
                    >
                      <Text fontSize="xs" color="gray.600">
                        Google Maps
                      </Text>
                    </Box>
                  </Box>
                </CardBody>
              </Card>
            </VStack>
          </SimpleGrid>

          {/* FAQ CTA */}
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
