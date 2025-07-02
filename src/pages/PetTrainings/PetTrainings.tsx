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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { PetTrainingCards } from "../components/PetTrainingCards/PetTrainingCards";
import { useGetTrainingsData } from "../../hooks/useGetTrainingCenters";
import { Search, Grid, List, GraduationCap } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { Loading } from "../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export const PetTrainings = () => {
  const navigate = useNavigate();
  const { trainingCenters, isLoading } = useGetTrainingsData();
  const { register, watch } = useForm();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");

  const area = watch("area-search");
  const [debouncedArea] = useDebounce(area, 500);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Filter and sort training centers
  const filteredCards = trainingCenters
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
          return (a.name ?? "").localeCompare(b.name ?? "");
      }
    });

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
                <GraduationCap size={16} color="#9F7AEA" />
                <Text fontSize="md" fontWeight="600" color="#1C3A38">
                  {filteredCards.length} təlim mərkəzi tapıldı
                </Text>
              </HStack>
              {debouncedArea && (
                <Badge
                  colorScheme="purple"
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
                <option value="price">Qiymətə görə</option>
                <option value="experience">Təcrübəyə görə</option>
              </Select>

              {/* View Mode Toggle */}
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
              </VStack>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};
