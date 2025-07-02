import {
  Box,
  Container,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Flex,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Select,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { DoctorCards } from "../components/DoctorsCards/DoctorCards";
import { useGetDoctorsData } from "../../hooks/useGetDoctors";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Grid,
  List,
  Stethoscope,
  Clock,
  Shield,
  Zap,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { Loading } from "../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export const DoctorsPage = () => {
  const navigate = useNavigate();
  const { doctors, isLoading } = useGetDoctorsData();
  const { register, watch } = useForm();
  const { isOpen, onClose } = useDisclosure();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [emergencyOnly, setEmergencyOnly] = useState(false);

  const area = watch("area-search");
  const [debouncedArea] = useDebounce(area, 500);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const filteredCards = doctors
    .filter((item) => {
      const address = item.address?.toLowerCase() ?? "";
      const name = item.name?.toLowerCase() ?? "";
      const searchValue = debouncedArea?.toLowerCase() ?? "";

      const matchesSearch =
        address.includes(searchValue) || name.includes(searchValue);

      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
        default:
          return (a.name || "").localeCompare(b.name || "");
      }
    });

  const medicalSpecialties = [
    { id: "general", name: "Ümumi Müayinə", icon: "🩺" },
    { id: "surgery", name: "Cərrahi", icon: "🏥" },
    { id: "dentistry", name: "Diş həkimliği", icon: "🦷" },
    { id: "vaccination", name: "Peyvənd", icon: "💉" },
    { id: "emergency", name: "Təcili yardım", icon: "🚑" },
    { id: "dermatology", name: "Dəri xəstəlikləri", icon: "🔬" },
  ];

  if (isLoading) return <Loading />;

  return (
    <Box bg="gray.50" minH="100vh" pt={24} pb={8}>
      <Container maxW="7xl">
        <VStack spacing={8} align="stretch">
          <Breadcrumb fontSize="sm" color="gray.600">
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate("/")}>
                Ana Səhifə
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>Veterinar Klinikalar</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <VStack spacing={6} align="center" textAlign="center">
            <VStack spacing={3}>
              <HStack spacing={3} justify="center">
                <Box
                  p={3}
                  bg="linear-gradient(135deg, #4299E1, #63B3ED)"
                  borderRadius="xl"
                  color="white"
                >
                  <Stethoscope size={28} />
                </Box>
                <Heading
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  fontWeight="700"
                  color="#1C3A38"
                  lineHeight="1.2"
                >
                  Veterinar Klinikalar
                </Heading>
              </HStack>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.600"
                maxW="600px"
                lineHeight="1.6"
              >
                Ev heyvanınızın sağlamlığı üçün təcrübəli veterinar həkimləri və
                müasir klinikalarla əlaqə saxlayın.
              </Text>
            </VStack>

            <Box w="100%" maxW="800px">
              <VStack spacing={4}>
                <InputGroup size="lg" width="100%">
                  <InputLeftElement pointerEvents="none" h="full">
                    <Icon as={Search} color="gray.400" size={20} />
                  </InputLeftElement>
                  <Input
                    {...register("area-search")}
                    placeholder="Klinika adı, həkim adı və ya ərazi üzrə axtarın..."
                    bg={cardBg}
                    border="2px solid"
                    borderColor={borderColor}
                    borderRadius="xl"
                    h="56px"
                    fontSize="md"
                    fontWeight="medium"
                    _hover={{
                      borderColor: "#4299E1",
                      boxShadow: "0 0 0 1px rgba(66, 153, 225, 0.3)",
                    }}
                    _focus={{
                      borderColor: "#4299E1",
                      boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.1)",
                      bg: "white",
                    }}
                    transition="all 0.3s ease"
                  />
                </InputGroup>
              </VStack>
            </Box>
          </VStack>

          <Flex
            justify="space-between"
            align="center"
            bg={cardBg}
            p={4}
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            flexWrap="wrap"
            gap={4}
          >
            <HStack spacing={4}>
              <HStack spacing={2}>
                <Stethoscope size={16} color="#4299E1" />
                <Text fontSize="md" fontWeight="600" color="#1C3A38">
                  {filteredCards.length} klinika tapıldı
                </Text>
              </HStack>
              {debouncedArea && (
                <Badge
                  colorScheme="blue"
                  variant="subtle"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  "{debouncedArea}" üçün nəticələr
                </Badge>
              )}
            </HStack>

            <HStack spacing={4}>
              <Select
                size="md"
                width="200px"
                borderRadius="lg"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                bg={cardBg}
              >
                <option value="name">Ada görə</option>
                <option value="rating">Reytinqə görə</option>
                <option value="distance">Məsafəyə görə</option>
                <option value="availability">Mövcudluğa görə</option>
              </Select>

              <HStack spacing={2}>
                <Button
                  size="sm"
                  variant={viewMode === "grid" ? "solid" : "outline"}
                  colorScheme="blue"
                  onClick={() => setViewMode("grid")}
                  borderRadius="lg"
                >
                  <Grid size={16} />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === "list" ? "solid" : "outline"}
                  colorScheme="blue"
                  onClick={() => setViewMode("list")}
                  borderRadius="lg"
                >
                  <List size={16} />
                </Button>
              </HStack>
            </HStack>
          </Flex>

          {/* Results Grid */}
          <Box w="100%">
            {filteredCards.length > 0 ? (
              <SimpleGrid
                columns={{
                  base: 1,
                  sm: viewMode === "grid" ? 2 : 1,
                  md: viewMode === "grid" ? 3 : 1,
                  lg: viewMode === "grid" ? 4 : 2,
                }}
                spacing={6}
              >
                {filteredCards.map((doctor) => (
                  <DoctorCards key={doctor.id} doctor={doctor} />
                ))}
              </SimpleGrid>
            ) : (
              <VStack spacing={6} py={16} textAlign="center">
                <Box fontSize="4xl">🩺</Box>
                <VStack spacing={2}>
                  <Heading size="md" color="gray.600">
                    Heç bir klinika tapılmadı
                  </Heading>
                  <Text color="gray.500">
                    Axtarış kriteriyalarınızı dəyişərək yenidən cəhd edin
                  </Text>
                </VStack>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => {
                    setSelectedSpecialties([]);
                    setEmergencyOnly(false);
                    setSortBy("name");
                  }}
                >
                  Filterləri Sıfırla
                </Button>
              </VStack>
            )}
          </Box>
        </VStack>
      </Container>

      {/* Advanced Filters Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <HStack spacing={2}>
              <SlidersHorizontal size={20} />
              <Text>Ətraflı Filterlər</Text>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={8} align="stretch" pt={6}>
              {/* Specialty Filter */}
              <Box>
                <Text fontSize="md" fontWeight="600" mb={4} color="#1C3A38">
                  İxtisas Sahələri
                </Text>
                <SimpleGrid columns={2} spacing={3}>
                  {medicalSpecialties.map((specialty) => (
                    <Button
                      key={specialty.id}
                      variant={
                        selectedSpecialties.includes(specialty.id)
                          ? "solid"
                          : "outline"
                      }
                      colorScheme="blue"
                      size="md"
                      borderRadius="lg"
                      onClick={() => {
                        if (selectedSpecialties.includes(specialty.id)) {
                          setSelectedSpecialties(
                            selectedSpecialties.filter(
                              (s) => s !== specialty.id
                            )
                          );
                        } else {
                          setSelectedSpecialties([
                            ...selectedSpecialties,
                            specialty.id,
                          ]);
                        }
                      }}
                      leftIcon={<Text>{specialty.icon}</Text>}
                    >
                      {specialty.name}
                    </Button>
                  ))}
                </SimpleGrid>
              </Box>

              {/* Location Filter */}
              <Box>
                <Text fontSize="md" fontWeight="600" mb={4} color="#1C3A38">
                  Rayon
                </Text>
                <VStack spacing={2} align="stretch">
                  {[
                    "Nəsimi",
                    "Yasamal",
                    "Nərimanov",
                    "Binəqədi",
                    "Sabunçu",
                  ].map((district) => (
                    <Button
                      key={district}
                      variant="outline"
                      justifyContent="flex-start"
                      size="md"
                      borderRadius="lg"
                      _hover={{ bg: "blue.50", borderColor: "blue.300" }}
                    >
                      <HStack>
                        <MapPin size={16} />
                        <Text>{district}</Text>
                      </HStack>
                    </Button>
                  ))}
                </VStack>
              </Box>

              {/* Availability Filter */}
              <Box>
                <Text fontSize="md" fontWeight="600" mb={4} color="#1C3A38">
                  Mövcudluq
                </Text>
                <VStack spacing={2} align="stretch">
                  <Button
                    variant="outline"
                    justifyContent="flex-start"
                    size="md"
                    borderRadius="lg"
                    _hover={{ bg: "blue.50", borderColor: "blue.300" }}
                  >
                    <HStack>
                      <Clock size={16} />
                      <Text>İndi açıqdır</Text>
                    </HStack>
                  </Button>
                  <Button
                    variant="outline"
                    justifyContent="flex-start"
                    size="md"
                    borderRadius="lg"
                    _hover={{ bg: "blue.50", borderColor: "blue.300" }}
                  >
                    <HStack>
                      <Zap size={16} />
                      <Text>24/7 Təcili Xidmət</Text>
                    </HStack>
                  </Button>
                  <Button
                    variant="outline"
                    justifyContent="flex-start"
                    size="md"
                    borderRadius="lg"
                    _hover={{ bg: "blue.50", borderColor: "blue.300" }}
                  >
                    <HStack>
                      <Shield size={16} />
                      <Text>Sığorta qəbul edir</Text>
                    </HStack>
                  </Button>
                </VStack>
              </Box>

              {/* Apply Filters Button */}
              <Button
                colorScheme="blue"
                size="lg"
                borderRadius="xl"
                onClick={onClose}
                leftIcon={<Stethoscope size={18} />}
              >
                Filterləri Tətbiq Et
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
