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
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import React, { useCallback, useMemo, useState } from "react";
import { DoctorCards } from "../../components/DoctorsCards/DoctorCards";
import { useGetDoctorsData } from "../../hooks/useGetDoctors";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Grid,
  List,
  Stethoscope,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { Loading } from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import {
  availabilityOptions,
  bakuDistricts,
} from "../../utils/constants/constants";
import { ErrorTryAgain } from "../../components/ErrorTryAgain/ErrorTryAgain";
import { SEOHead } from "../../components/Seo/SeoHead";

export const DoctorsPage = React.memo(() => {
  const navigate = useNavigate();

  const { doctors, isLoading, error } = useGetDoctorsData();
  const { register, watch } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    []
  );

  const area = watch("area-search");
  const [debouncedArea] = useDebounce(area, 500);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const districts = bakuDistricts;

  const toggleDistrict = useCallback((district: string) => {
    setSelectedDistricts((prev) =>
      prev.includes(district)
        ? prev.filter((d) => d !== district)
        : [...prev, district]
    );
  }, []);

  const toggleAvailability = useCallback((availabilityId: string) => {
    setSelectedAvailability((prev) =>
      prev.includes(availabilityId)
        ? prev.filter((a) => a !== availabilityId)
        : [...prev, availabilityId]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedSpecialties([]);
    setSelectedDistricts([]);
    setSelectedAvailability([]);
    setPriceRange([0, 500]);
    setSortBy("name");
  }, []);

  const filteredCards = useMemo(() => {
    return doctors
      .filter((item) => {
        const address = item.address?.toLowerCase() ?? "";
        const name = item.name?.toLowerCase() ?? "";
        const searchValue = debouncedArea?.toLowerCase() ?? "";
        const price = parseFloat(item.consultation?.toString() || "0");

        const matchesSearch =
          address.includes(searchValue) || name.includes(searchValue);
        const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

        const matchesDistrict =
          selectedDistricts.length === 0 ||
          selectedDistricts.some((district) =>
            address.includes(district.toLowerCase())
          );

        const matchesSpecialty = selectedSpecialties.length === 0;

        const matchesAvailability =
          selectedAvailability.length === 0 ||
          selectedAvailability.every((availabilityId) => {
            switch (availabilityId) {
              case "isNowOpened":
                return item.isNowOpened === true;

              default:
                return true;
            }
          });

        return (
          matchesSearch &&
          matchesDistrict &&
          matchesSpecialty &&
          matchesAvailability &&
          matchesPrice
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            const priceLowA = a?.consultation || 0;
            const priceLowB = b?.consultation || 0;
            return priceLowA - priceLowB;

          case "price-high":
            const priceHighA = a?.consultation || 0;
            const priceHighB = b?.consultation || 0;
            return priceHighB - priceHighA;

          case "experience-low":
            const experienceLowA = a?.experience || 0;
            const experienceLowB = b?.experience || 0;
            return experienceLowA - experienceLowB;

          case "experience-high":
            const experiencHighA = a?.experience || 0;
            const experiencHighB = b?.experience || 0;
            return experiencHighB - experiencHighA;

          case "consultation":
            const consultationA = a?.consultation || 0;
            const consultationB = b?.consultation || 0;
            return consultationA - consultationB;

          case "name":
          default:
            return (a.name || "").localeCompare(b.name || "");
        }
      });
  }, [
    doctors,
    debouncedArea,
    selectedDistricts,
    selectedSpecialties.length,
    selectedAvailability,
    priceRange,
    sortBy,
  ]);

  if (error) return <ErrorTryAgain error={error} />;
  if (isLoading) return <Loading />;

  return (
    <Box bg="gray.50" minH="100vh" pt={24} pb={8}>
      <SEOHead
        title="Veterinar Klinikalar - Peşəkar Tibbi Qulluq"
        description="Bakıda ən yaxşı veterinar klinikalarını tapın. Təcrübəli həkimlər, müasir avadanlıq və 24/7 təcili xidmət."
      />
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

                <Flex
                  w="100%"
                  gap={4}
                  align="center"
                  justify="center"
                  flexWrap="wrap"
                >
                  <Button
                    leftIcon={<SlidersHorizontal size={16} />}
                    variant="outline"
                    size="md"
                    borderRadius="lg"
                    onClick={onOpen}
                    _hover={{ bg: "gray.100" }}
                  >
                    Filterlər
                  </Button>
                </Flex>
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
            <HStack spacing={4} flexWrap="wrap">
              <HStack spacing={2}>
                <Stethoscope size={16} color="#4299E1" />
                <Text fontSize="md" fontWeight="600" color="#1C3A38">
                  {filteredCards.length} klinika tapıldı
                </Text>
              </HStack>

              {selectedDistricts.length > 0 && (
                <HStack spacing={2} flexWrap="wrap">
                  {selectedDistricts.map((district) => (
                    <Badge
                      key={district}
                      colorScheme="green"
                      variant="subtle"
                      px={3}
                      py={1}
                      borderRadius="full"
                      cursor="pointer"
                      onClick={() => toggleDistrict(district)}
                    >
                      {district} ✕
                    </Badge>
                  ))}
                </HStack>
              )}

              {selectedAvailability.length > 0 && (
                <HStack spacing={2} flexWrap="wrap">
                  {selectedAvailability.map((availabilityId) => {
                    const availability = availabilityOptions.find(
                      (a) => a.id === availabilityId
                    );
                    return (
                      <Badge
                        key={availabilityId}
                        colorScheme="purple"
                        variant="subtle"
                        px={3}
                        py={1}
                        borderRadius="full"
                        cursor="pointer"
                        onClick={() => toggleAvailability(availabilityId)}
                      >
                        {availability?.label} ✕
                      </Badge>
                    );
                  })}
                </HStack>
              )}

              {debouncedArea && (
                <Badge
                  colorScheme="orange"
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
                <option value="name">Seçin</option>
                <option value="price-low">Qiymət: Aşağıdan yuxarı</option>
                <option value="price-high">Qiymət: Yuxarıdan aşağı</option>
                <option value="experience-low">Təcrübə: Aşağıdan yuxarı</option>
                <option value="experience-high">
                  Təcrübə: Yuxarıdan aşağı
                </option>
                <option value="consultation">Konsultasiyaya görə</option>
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
                  onClick={clearFilters}
                >
                  Filterləri Sıfırla
                </Button>
              </VStack>
            )}
          </Box>
        </VStack>
      </Container>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <HStack spacing={2}>
              <SlidersHorizontal size={20} />
              <Text>Ətraflı Filterlər</Text>
            </HStack>

            <DrawerBody>
              <VStack spacing={8} align="stretch" pt={6}>
                <Box>
                  <Text fontSize="md" fontWeight="600" mb={4} color="#1C3A38">
                    Qiymət Aralığı
                  </Text>
                  <VStack spacing={4}>
                    <RangeSlider
                      value={priceRange}
                      onChange={setPriceRange}
                      min={0}
                      max={500}
                      step={10}
                      colorScheme="teal"
                    >
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                      <RangeSliderThumb index={1} />
                    </RangeSlider>
                    <HStack justify="space-between" w="full">
                      <Text fontSize="sm" color="gray.600">
                        {priceRange[0]} ₼
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {priceRange[1]} ₼
                      </Text>
                    </HStack>
                  </VStack>
                </Box>

                <Box>
                  <HStack justify="space-between" align="center" mb={4}>
                    <Text fontSize="md" fontWeight="600" color="#1C3A38">
                      Rayon ({selectedDistricts.length} seçildi)
                    </Text>
                    {selectedDistricts.length > 0 && (
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => setSelectedDistricts([])}
                      >
                        Təmizlə
                      </Button>
                    )}
                  </HStack>
                  <VStack spacing={2} align="stretch">
                    {districts.map((district) => (
                      <Button
                        key={district}
                        variant={
                          selectedDistricts.includes(district)
                            ? "solid"
                            : "outline"
                        }
                        colorScheme={
                          selectedDistricts.includes(district) ? "teal" : "gray"
                        }
                        justifyContent="space-between"
                        size="md"
                        borderRadius="lg"
                        onClick={() => toggleDistrict(district)}
                        _hover={{
                          bg: selectedDistricts.includes(district)
                            ? "teal.600"
                            : "teal.50",
                          borderColor: "teal.300",
                        }}
                      >
                        <HStack>
                          <MapPin size={16} />
                          <Text>{district}</Text>
                        </HStack>
                        {selectedDistricts.includes(district) && (
                          <Text fontSize="sm">✓</Text>
                        )}
                      </Button>
                    ))}
                  </VStack>
                </Box>

                <VStack spacing={4}>
                  <Button
                    colorScheme="teal"
                    size="lg"
                    borderRadius="xl"
                    onClick={onClose}
                    w="full"
                  >
                    Filterləri Tətbiq Et
                  </Button>

                  <Button
                    variant="outline"
                    size="md"
                    borderRadius="xl"
                    onClick={clearFilters}
                    w="full"
                  >
                    Bütün Filterləri Sıfırla
                  </Button>
                </VStack>
              </VStack>
            </DrawerBody>
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={8} align="stretch" pt={6}>
              <Box>
                <HStack justify="space-between" align="center" mb={4}>
                  {selectedSpecialties.length > 0 && (
                    <Button
                      size="xs"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => setSelectedSpecialties([])}
                    >
                      Təmizlə
                    </Button>
                  )}
                </HStack>
              </Box>

              <Box>
                <HStack justify="space-between" align="center" mb={4}>
                  <Text fontSize="md" fontWeight="600" color="#1C3A38">
                    Rayon ({selectedDistricts.length} seçildi)
                  </Text>
                  {selectedDistricts.length > 0 && (
                    <Button
                      size="xs"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => setSelectedDistricts([])}
                    >
                      Təmizlə
                    </Button>
                  )}
                </HStack>
                <VStack spacing={2} align="stretch">
                  {districts?.map((district) => (
                    <Button
                      key={district}
                      variant={
                        selectedDistricts.includes(district)
                          ? "solid"
                          : "outline"
                      }
                      colorScheme={
                        selectedDistricts.includes(district) ? "green" : "gray"
                      }
                      justifyContent="space-between"
                      size="md"
                      borderRadius="lg"
                      onClick={() => toggleDistrict(district)}
                      _hover={{
                        bg: selectedDistricts.includes(district)
                          ? "green.600"
                          : "blue.50",
                        borderColor: "blue.300",
                      }}
                    >
                      <HStack>
                        <MapPin size={16} />
                        <Text>{district}</Text>
                      </HStack>
                      {selectedDistricts.includes(district) && (
                        <Text fontSize="sm">✓</Text>
                      )}
                    </Button>
                  ))}
                </VStack>
              </Box>

              <Box>
                <HStack justify="space-between" align="center" mb={4}>
                  <Text fontSize="md" fontWeight="600" color="#1C3A38">
                    Mövcudluq ({selectedAvailability.length} seçildi)
                  </Text>
                  {selectedAvailability.length > 0 && (
                    <Button
                      size="xs"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => setSelectedAvailability([])}
                    >
                      Təmizlə
                    </Button>
                  )}
                </HStack>
                <VStack spacing={2} align="stretch">
                  {availabilityOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={
                        selectedAvailability.includes(option.id)
                          ? "solid"
                          : "outline"
                      }
                      colorScheme={
                        selectedAvailability.includes(option.id)
                          ? "purple"
                          : "gray"
                      }
                      justifyContent="space-between"
                      size="md"
                      borderRadius="lg"
                      onClick={() => toggleAvailability(option.id)}
                      _hover={{
                        bg: selectedAvailability.includes(option.id)
                          ? "purple.600"
                          : "blue.50",
                        borderColor: "blue.300",
                      }}
                    >
                      <HStack>
                        <option.icon size={16} />
                        <Text>{option.label}</Text>
                      </HStack>
                      {selectedAvailability.includes(option.id) && (
                        <Text fontSize="sm">✓</Text>
                      )}
                    </Button>
                  ))}
                </VStack>
              </Box>

              <VStack spacing={4}>
                <Button
                  colorScheme="blue"
                  size="lg"
                  borderRadius="xl"
                  onClick={onClose}
                  leftIcon={<Stethoscope size={18} />}
                  w="full"
                >
                  Filterləri Tətbiq Et
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  borderRadius="xl"
                  onClick={clearFilters}
                  w="full"
                >
                  Bütün Filterləri Sıfırla
                </Button>
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
});
