import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
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
import { PetTrainingCards } from "../../components/PetTrainingCards/PetTrainingCards";
import { useGetTrainingsData } from "../../hooks/useGetTrainingCenters";
import {
  Search,
  Grid,
  List,
  GraduationCap,
  SlidersHorizontal,
  MapPin,
  Award,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { Loading } from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { bakuDistricts } from "../../utils/constants/constants";

export const PetTrainings = React.memo(() => {
  const navigate = useNavigate();
  const { trainingCenters, isLoading } = useGetTrainingsData();
  const { register, watch } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300]);

  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [showCertifiedOnly, setShowCertifiedOnly] = useState(false);

  const area = watch("area-search");
  const [debouncedArea] = useDebounce(area, 500);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const districts = bakuDistricts;

  const durations = [
    { id: "1-2weeks", label: "1-2 həftə" },
    { id: "1month", label: "1 ay" },
    { id: "2-3months", label: "2-3 ay" },
    { id: "6months", label: "6 ay" },
    { id: "1year", label: "1 il və daha çox" },
  ];

  const toggleDistrict = useCallback((district: string) => {
    setSelectedDistricts((prev) =>
      prev.includes(district)
        ? prev.filter((d) => d !== district)
        : [...prev, district]
    );
  }, []);

  const toggleDuration = useCallback((durationId: string) => {
    setSelectedDurations((prev) =>
      prev.includes(durationId)
        ? prev.filter((d) => d !== durationId)
        : [...prev, durationId]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedDistricts([]);
    setPriceRange([0, 300]);
    setSelectedDurations([]);
    setShowCertifiedOnly(false);
    setSortBy("name");
  }, []);

  const filteredCards = useMemo(() => {
    return trainingCenters
      .filter((item) => {
        const address = item.address?.toLowerCase() ?? "";
        const name = item.name?.toLowerCase() ?? "";
        const searchValue = debouncedArea?.toLowerCase() ?? "";
        const price = parseFloat(item.monthlySubscription?.toString() || "0");

        const matchesSearch =
          address.includes(searchValue) || name.includes(searchValue);

        const matchesDistrict =
          selectedDistricts.length === 0 ||
          selectedDistricts.some((district) =>
            address.includes(district.toLowerCase())
          );

        const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
        const matchesCertification = !showCertifiedOnly || item.isCertificated;
        return (
          matchesSearch &&
          matchesDistrict &&
          matchesPrice &&
          matchesCertification
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low": {
            const priceA = parseFloat(a.monthlySubscription?.toString() || "0");
            const priceB = parseFloat(b.monthlySubscription?.toString() || "0");
            return priceA - priceB;
          }
          case "price-high": {
            const priceA = parseFloat(a.monthlySubscription?.toString() || "0");
            const priceB = parseFloat(b.monthlySubscription?.toString() || "0");
            return priceB - priceA;
          }
          case "certified":
            return (b.isCertificated ? 1 : 0) - (a.isCertificated ? 1 : 0);
          case "duration":
            return 0;
          default:
            return (a.name || "").localeCompare(b.name || "");
        }
      });
  }, [
    debouncedArea,
    priceRange,
    selectedDistricts,
    showCertifiedOnly,
    sortBy,
    trainingCenters,
  ]);

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
              <BreadcrumbLink>Təlim Mərkəzləri</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <VStack spacing={6} align="center" textAlign="center">
            <VStack spacing={3}>
              <HStack spacing={3} justify="center">
                <Box
                  p={3}
                  bg="linear-gradient(135deg, #9F7AEA, #B794F6)"
                  borderRadius="xl"
                  color="white"
                >
                  <GraduationCap size={28} />
                </Box>
                <Heading
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  fontWeight="700"
                  color="#1C3A38"
                  lineHeight="1.2"
                >
                  Təlim Mərkəzləri
                </Heading>
              </HStack>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.600"
                maxW="600px"
                lineHeight="1.6"
              >
                Ev heyvanınızın davranışını yaxşılaşdırmaq və yeni bacarıqlar
                öyrətmək üçün peşəkar təlimçilərlə işləyin.
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
                    placeholder="Təlim mərkəzi adı, təlimçi adı və ya ərazi üzrə axtarın..."
                    bg={cardBg}
                    border="2px solid"
                    borderColor={borderColor}
                    borderRadius="xl"
                    h="56px"
                    fontSize="md"
                    fontWeight="medium"
                    _hover={{
                      borderColor: "#9F7AEA",
                      boxShadow: "0 0 0 1px rgba(159, 122, 234, 0.3)",
                    }}
                    _focus={{
                      borderColor: "#9F7AEA",
                      boxShadow: "0 0 0 3px rgba(159, 122, 234, 0.1)",
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
                <GraduationCap size={16} color="#9F7AEA" />
                <Text fontSize="md" fontWeight="600" color="#1C3A38">
                  {filteredCards.length} təlim mərkəzi tapıldı
                </Text>
              </HStack>

              {selectedDistricts.length > 0 && (
                <HStack spacing={2} flexWrap="wrap">
                  {selectedDistricts.map((district) => (
                    <Badge
                      key={district}
                      colorScheme="purple"
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

              {selectedDurations.length > 0 && (
                <HStack spacing={2} flexWrap="wrap">
                  {selectedDurations.map((durationId) => {
                    const duration = durations.find((d) => d.id === durationId);
                    return (
                      <Badge
                        key={durationId}
                        colorScheme="green"
                        variant="subtle"
                        px={3}
                        py={1}
                        borderRadius="full"
                        cursor="pointer"
                        onClick={() => toggleDuration(durationId)}
                      >
                        {duration?.label} ✕
                      </Badge>
                    );
                  })}
                </HStack>
              )}

              {showCertifiedOnly && (
                <Badge
                  colorScheme="yellow"
                  variant="subtle"
                  px={3}
                  py={1}
                  borderRadius="full"
                  cursor="pointer"
                  onClick={() => setShowCertifiedOnly(false)}
                >
                  🏆 Sertifikatlı ✕
                </Badge>
              )}

              {(priceRange[0] > 0 || priceRange[1] < 300) && (
                <Badge
                  colorScheme="orange"
                  variant="subtle"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {priceRange[0]}₼ - {priceRange[1]}₼
                </Badge>
              )}

              {debouncedArea && (
                <Badge
                  colorScheme="cyan"
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
                <option value="certified">Sertifikatlı əvvəl</option>
                <option value="duration">Müddətə görə</option>
              </Select>

              <HStack spacing={2}>
                <Button
                  size="sm"
                  variant={viewMode === "grid" ? "solid" : "outline"}
                  colorScheme="purple"
                  onClick={() => setViewMode("grid")}
                  borderRadius="lg"
                >
                  <Grid size={16} />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === "list" ? "solid" : "outline"}
                  colorScheme="purple"
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
                {filteredCards.map((trainingData) => (
                  <PetTrainingCards
                    key={trainingData.id}
                    trainings={trainingData}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <VStack spacing={6} py={16} textAlign="center">
                <Box fontSize="4xl">🎓</Box>
                <VStack spacing={2}>
                  <Heading size="md" color="gray.600">
                    Heç bir təlim mərkəzi tapılmadı
                  </Heading>
                  <Text color="gray.500">
                    Axtarış kriteriyalarınızı dəyişərək yenidən cəhd edin
                  </Text>
                </VStack>
                <Button
                  colorScheme="purple"
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
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={8} align="stretch" pt={6}>
              <Box>
                <Text fontSize="md" fontWeight="600" mb={4} color="#1C3A38">
                  Aylıq Abunə Qiyməti
                </Text>
                <VStack spacing={4}>
                  <RangeSlider
                    value={priceRange}
                    onChange={setPriceRange}
                    min={0}
                    max={300}
                    step={10}
                    colorScheme="purple"
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
                        selectedDistricts.includes(district) ? "blue" : "gray"
                      }
                      justifyContent="space-between"
                      size="md"
                      borderRadius="lg"
                      onClick={() => toggleDistrict(district)}
                      _hover={{
                        bg: selectedDistricts.includes(district)
                          ? "blue.600"
                          : "purple.50",
                        borderColor: "purple.300",
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
                <Text fontSize="md" fontWeight="600" mb={4} color="#1C3A38">
                  Sertifikasiya
                </Text>
                <Button
                  variant={showCertifiedOnly ? "solid" : "outline"}
                  colorScheme={showCertifiedOnly ? "yellow" : "gray"}
                  justifyContent="space-between"
                  size="md"
                  borderRadius="lg"
                  onClick={() => setShowCertifiedOnly(!showCertifiedOnly)}
                  w="full"
                  _hover={{
                    bg: showCertifiedOnly ? "yellow.600" : "purple.50",
                    borderColor: "purple.300",
                  }}
                >
                  <HStack>
                    <Award size={16} />
                    <Text>Yalnız sertifikatlı mərkəzlər</Text>
                  </HStack>
                  {showCertifiedOnly && <Text fontSize="sm">✓</Text>}
                </Button>
              </Box>

              <VStack spacing={4}>
                <Button
                  colorScheme="purple"
                  size="lg"
                  borderRadius="xl"
                  onClick={onClose}
                  leftIcon={<GraduationCap size={18} />}
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
