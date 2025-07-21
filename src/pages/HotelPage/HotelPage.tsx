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
  Flex,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Select,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Badge,
} from "@chakra-ui/react";
import React, { useCallback, useMemo, useState } from "react";
import { HotelCards } from "../../components/HotelCards/HotelCards";
import { useGetHotelsData } from "../../hooks/useGetHotelsData";
import { Search, MapPin, SlidersHorizontal, Grid, List } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { Loading } from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { bakuDistricts } from "../../utils/constants/constants";
import { ErrorTryAgain } from "../../components/ErrorTryAgain/ErrorTryAgain";
import { SEOHead } from "../../components/Seo/SeoHead";
// import { useFavorites } from "../../hooks/useFavoritesHooks";π

export const HotelPage = React.memo(() => {
  const navigate = useNavigate();

  const { hotels, isLoading, error } = useGetHotelsData();
  // const { isFavorite, toggleFavorite } = useFavorites();
  const { register, watch } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("name");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);

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

  const clearFilters = useCallback(() => {
    setPriceRange([0, 500]);
    setSortBy("name");
    setSelectedDistricts([]);
  }, []);

  const sortOptions = [
    { value: "name", label: "Seçin" },
    { value: "price-low", label: "Qiymət: Aşağıdan yuxarı" },
    { value: "price-high", label: "Qiymət: Yuxarıdan aşağı" },
  ];

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortBy(e.target.value);
    },
    []
  );

  const filteredCards = useMemo(() => {
    return hotels
      .filter((item) => {
        const address = item.address?.toLowerCase() ?? "";
        const name = item.name?.toLowerCase() ?? "";
        const searchValue = debouncedArea?.toLowerCase() ?? "";
        const price = parseFloat(item.price?.toString() || "0");

        const matchesSearch =
          address.includes(searchValue) || name.includes(searchValue);
        const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

        const matchesDistrict =
          selectedDistricts.length === 0 ||
          selectedDistricts.some((district) =>
            address.includes(district.toLowerCase())
          );

        return matchesSearch && matchesPrice && matchesDistrict;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low": {
            const priceA = parseFloat(a.price?.toString() || "0");
            const priceB = parseFloat(b.price?.toString() || "0");
            return priceA - priceB;
          }
          case "price-high": {
            const priceA = parseFloat(a.price?.toString() || "0");
            const priceB = parseFloat(b.price?.toString() || "0");
            return priceB - priceA;
          }
          default:
            return (a.name || "").localeCompare(b.name || "");
        }
      });
  }, [hotels, debouncedArea, priceRange, selectedDistricts, sortBy]);

  if (error) return <ErrorTryAgain error={error} />;
  if (isLoading) return <Loading />;

  return (
    <Box bg="gray.50" minH="100vh" pt={24} pb={8}>
      <SEOHead
        title="Pet Otelləri - Ev Heyvanınız üçün Rahat Qalma"
        description="Bakıda ev heyvanınız üçün ən yaxşı pet otellərini tapın. Təhlükəsiz, rahat və peşəkar qulluq."
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
              <BreadcrumbLink>Pet Otelləri</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <VStack spacing={6} align="center" textAlign="center">
            <VStack spacing={3}>
              <Heading
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="700"
                color="#1C3A38"
                lineHeight="1.2"
              >
                Otellər
              </Heading>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.600"
                maxW="600px"
                lineHeight="1.6"
              >
                Ev heyvanınız üçün ən yaxşı qulluq və rahat qalma şəraitini
                təmin edən professional otelləri kəşf edin.
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
                    placeholder="Otel adı və ya ərazi üzrə axtarın..."
                    bg={cardBg}
                    border="2px solid"
                    borderColor={borderColor}
                    borderRadius="xl"
                    h="56px"
                    fontSize="md"
                    fontWeight="medium"
                    _hover={{
                      borderColor: "#3A7E7B",
                      boxShadow: "0 0 0 1px rgba(58, 126, 123, 0.3)",
                    }}
                    _focus={{
                      borderColor: "#3A7E7B",
                      boxShadow: "0 0 0 3px rgba(58, 126, 123, 0.1)",
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
                <MapPin size={16} color="#3A7E7B" />
                <Text fontSize="md" fontWeight="600" color="#1C3A38">
                  {filteredCards.length} otel tapıldı
                </Text>
              </HStack>

              {selectedDistricts.length > 0 && (
                <HStack spacing={2} flexWrap="wrap">
                  {selectedDistricts.map((district) => (
                    <Badge
                      key={district}
                      colorScheme="teal"
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
                onChange={handleSortChange}
                bg={cardBg}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>

              <HStack spacing={2}>
                <Button
                  size="sm"
                  variant={viewMode === "grid" ? "solid" : "outline"}
                  colorScheme="teal"
                  onClick={() => setViewMode("grid")}
                  borderRadius="lg"
                >
                  <Grid size={16} />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === "list" ? "solid" : "outline"}
                  colorScheme="teal"
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
                {filteredCards.map((hotel: any) => (
                  <HotelCards key={hotel.id} hotel={hotel} />
                ))}
              </SimpleGrid>
            ) : (
              <VStack spacing={6} py={16} textAlign="center">
                <Box fontSize="4xl">🔍</Box>
                <VStack spacing={2}>
                  <Heading size="md" color="gray.600">
                    Heç bir otel tapılmadı
                  </Heading>
                  <Text color="gray.500">
                    Axtarış kriteriyalarınızı dəyişərək yenidən cəhd edin
                  </Text>
                </VStack>
                <Button
                  colorScheme="teal"
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
        </DrawerContent>
      </Drawer>
    </Box>
  );
});
