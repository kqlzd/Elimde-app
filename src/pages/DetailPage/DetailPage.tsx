/* eslint-disable react-hooks/exhaustive-deps */
import {
  Text,
  Box,
  Flex,
  Button,
  VStack,
  HStack,
  Divider,
  Image,
  Container,
  IconButton,
  Badge,
  Card,
  CardBody,
  useColorModeValue,
  Skeleton,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  Phone,
  ArrowLeft,
  MapPin,
  Star,
  Calendar,
  Clock,
  Share2,
  CheckCircle,
  Award,
  Shield,
} from "lucide-react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { Loading } from "../../components/Loading/Loading";
import { MapComponent } from "../../components/Map/Map";
import { getServiceTypeName } from "../../utils/helpers/helpers";
import { useDetailData } from "../../hooks/useDetailPage";
import { useLinkShare } from "../../hooks/useLinkShare";
import { useDateRange } from "../../hooks/useDateRange";
import { useValidPositon } from "../../hooks/useValidPositon";

export const DetailPage = React.memo(() => {
  const navigate = useNavigate();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");

  const { id, type } = useParams();
  const isHotelType = type === "hotels";

  const { showCopiedTooltip, handleShare } = useLinkShare();
  const { data, isLoading: dataLoading, fetchData } = useDetailData(id, type);
  const { totalPrice, numberOfDays, selectionRange, handleSelect } =
    useDateRange(isHotelType ? data?.price : null);
  const { validPosition } = useValidPositon(data);

  const [showPhoneNumber, setShowPhoneNumber] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [id, type]);

  const getPhoneNumber = () => setShowPhoneNumber(true);

  if (dataLoading) return <Loading />;

  return (
    <Box bg="gray.50" minH="100vh" pt={20}>
      <Container maxW="7xl" py={8}>
        <VStack align="start" spacing={6} mb={8}>
          <Breadcrumb fontSize="sm" color={textColor}>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate("/")}>
                Ana Səhifə
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate(`/services/${type}`)}>
                {getServiceTypeName(type ?? "")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>{data?.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Flex justify="space-between" align="center" w="full">
            <HStack spacing={4}>
              <IconButton
                icon={<ArrowLeft />}
                aria-label="Geri qayıt"
                variant="ghost"
                size="lg"
                onClick={() => navigate(-1)}
                _hover={{ bg: "gray.100" }}
              />
              <VStack align="start" spacing={1}>
                <Heading
                  fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                  fontWeight="700"
                  color="#1C3A38"
                  lineHeight="1.2"
                >
                  {data?.name}
                </Heading>
                <HStack spacing={2}>
                  <Badge
                    colorScheme="teal"
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {getServiceTypeName(type ?? "")}
                  </Badge>
                  <HStack spacing={1} color={textColor}>
                    <MapPin size={14} />
                    <Text fontSize="sm">{data?.address}</Text>
                  </HStack>
                </HStack>
              </VStack>
            </HStack>

            <HStack spacing={2}>
              <Tooltip
                label={
                  <Box p={2} bg="green.500" borderRadius="md" color="white">
                    <Text fontSize="sm" fontWeight="600">
                      Kopyalandı!
                    </Text>
                  </Box>
                }
                isOpen={showCopiedTooltip}
                placement="top"
                hasArrow
                bg="transparent"
                borderRadius="md"
              >
                <IconButton
                  icon={<Share2 />}
                  aria-label="Paylaş"
                  variant="outline"
                  size="md"
                  onClick={handleShare}
                  _hover={{ bg: "gray.100" }}
                  position="relative"
                />
              </Tooltip>
            </HStack>
          </Flex>
        </VStack>

        <Flex direction={{ base: "column", lg: "row" }} gap={8} mb={8}>
          <Box flex="1" minW={{ lg: "400px" }}>
            <Card
              bg={cardBg}
              borderRadius="2xl"
              overflow="hidden"
              mb={6}
              border="1px solid"
              borderColor={borderColor}
            >
              <Box position="relative">
                {isImageLoading && (
                  <Skeleton width="100%" height="500px" borderRadius="xl" />
                )}
                <Image
                  src={data.image}
                  borderRadius="xl"
                  width="100%"
                  height="500px"
                  objectFit="cover"
                  alt={data.name}
                  onLoad={() => setIsImageLoading(false)}
                  style={{ display: isImageLoading ? "none" : "block" }}
                  fallback={
                    <Box
                      width="100%"
                      height="500px"
                      bg="gray.100"
                      borderRadius="xl"
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      border="2px dashed"
                      borderColor="gray.300"
                    >
                      <Text color="gray.500" fontSize="lg" mb={2}>
                        📷
                      </Text>
                      <Text color="gray.500">Şəkil yoxdur</Text>
                    </Box>
                  }
                />

                <Box
                  position="absolute"
                  top={4}
                  left={4}
                  bg="rgba(255,255,255,0.95)"
                  px={3}
                  py={2}
                  borderRadius="lg"
                  backdropFilter="blur(10px)"
                >
                  <HStack spacing={1}>
                    <Star size={16} fill="#F6AD55" color="#F6AD55" />
                    <Text fontSize="sm" fontWeight="600" color="gray.800">
                      4.{Math.floor(Math.random() * 5) + 5}
                    </Text>
                  </HStack>
                </Box>

                <Box
                  position="absolute"
                  top={4}
                  right={4}
                  bg="rgba(72, 187, 120, 0.95)"
                  color="white"
                  px={3}
                  py={2}
                  borderRadius="lg"
                  backdropFilter="blur(10px)"
                >
                  <HStack spacing={1}>
                    <CheckCircle size={16} />
                    <Text fontSize="sm" fontWeight="600">
                      Mövcud
                    </Text>
                  </HStack>
                </Box>
              </Box>
            </Card>

            {(data?.desc ?? data?.address) && (
              <Card
                bg={cardBg}
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
              >
                <CardBody p={6}>
                  <VStack align="start" spacing={6}>
                    <VStack align="start" spacing={4} w="full">
                      <Heading size="md" color="#1C3A38">
                        Haqqında Məlumat
                      </Heading>

                      {data?.desc && (
                        <Text color={textColor} lineHeight="1.6" fontSize="md">
                          {data.desc}
                        </Text>
                      )}

                      <Divider />

                      <VStack align="start" spacing={3} w="full">
                        <HStack spacing={3}>
                          <MapPin size={18} color="#3A7E7B" />
                          <VStack align="start" spacing={0}>
                            <Text
                              fontSize="sm"
                              fontWeight="600"
                              color="#1C3A38"
                            >
                              Ünvan
                            </Text>
                            <Text fontSize="sm" color={textColor}>
                              {data?.address ?? "Ünvan məlumatları yoxdur"}
                            </Text>
                          </VStack>
                        </HStack>

                        <HStack spacing={3}>
                          <Phone size={18} color="#3A7E7B" />
                          <VStack align="start" spacing={0}>
                            <Text
                              fontSize="sm"
                              fontWeight="600"
                              color="#1C3A38"
                            >
                              Əlaqə nömrəsi
                            </Text>
                            <Text fontSize="sm" color={textColor}>
                              {data?.phone}
                            </Text>
                          </VStack>
                        </HStack>

                        <HStack spacing={3}>
                          <Clock size={18} color="#3A7E7B" />
                          <VStack align="start" spacing={0}>
                            <Text
                              fontSize="sm"
                              fontWeight="600"
                              color="#1C3A38"
                            >
                              İş Saatları
                            </Text>
                            <Text fontSize="sm" color={textColor}>
                              {data?.workHours}
                            </Text>
                          </VStack>
                        </HStack>

                        {data?.createdAt && (
                          <HStack spacing={3}>
                            <Calendar size={18} color="#3A7E7B" />
                            <VStack align="start" spacing={0}>
                              <Text
                                fontSize="sm"
                                fontWeight="600"
                                color="#1C3A38"
                              >
                                Qeydiyyat Tarixi
                              </Text>
                              <Text fontSize="sm" color={textColor}>
                                {dayjs(data.createdAt.toDate?.()).format(
                                  "DD MMM YYYY"
                                ) || "Məlumat yoxdur"}
                              </Text>
                            </VStack>
                          </HStack>
                        )}
                      </VStack>
                    </VStack>

                    <VStack align="start" spacing={3} w="full">
                      <Text fontSize="md" fontWeight="600" color="#1C3A38">
                        Xüsusiyyətlər
                      </Text>
                      <VStack align="start" spacing={2}>
                        <HStack spacing={2}>
                          <Shield size={16} color="#48BB78" />
                          <Text fontSize="sm" color={textColor}>
                            Təhlükəsiz və etibarlı xidmət
                          </Text>
                        </HStack>
                        <HStack spacing={2}>
                          <Award size={16} color="#48BB78" />
                          <Text fontSize="sm" color={textColor}>
                            Peşəkar personal
                          </Text>
                        </HStack>
                        <HStack spacing={2}>
                          <CheckCircle size={16} color="#48BB78" />
                          <Text fontSize="sm" color={textColor}>
                            24/7 müştəri dəstəyi
                          </Text>
                        </HStack>
                      </VStack>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            )}
          </Box>

          <VStack
            flex="0 0 380px"
            spacing={6}
            align="stretch"
            position={{ lg: "sticky" }}
            top={{ lg: "100px" }}
            height="fit-content"
          >
            <Card
              bg={cardBg}
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              overflow="hidden"
              boxShadow="lg"
            >
              <CardBody p={6}>
                <VStack spacing={6}>
                  {isHotelType && data?.price && (
                    <Box w="full">
                      <HStack justify="space-between" align="baseline">
                        <VStack align="start" spacing={1}>
                          <Text
                            fontSize="3xl"
                            fontWeight="bold"
                            color="#1C3A38"
                          >
                            {data.price} ₼
                          </Text>
                          <Text fontSize="sm" color={textColor}>
                            günlük
                          </Text>
                        </VStack>
                        <Badge
                          colorScheme="green"
                          variant="subtle"
                          px={3}
                          py={1}
                          borderRadius="full"
                        >
                          Əlçatan qiymət
                        </Badge>
                      </HStack>
                      <Divider mt={4} />
                    </Box>
                  )}

                  {showPhoneNumber ? (
                    <VStack spacing={4} w="full">
                      <Box
                        p={4}
                        bg="gray.50"
                        borderRadius="xl"
                        w="full"
                        border="1px solid"
                        borderColor="gray.200"
                      >
                        <VStack spacing={3}>
                          <Avatar
                            name={data?.relevantPerson}
                            size="md"
                            bg="#3A7E7B"
                          />
                          <VStack spacing={1}>
                            <Text
                              fontSize="md"
                              fontWeight="600"
                              color="#1C3A38"
                            >
                              {data?.relevantPerson ?? "Məsul şəxs"}
                            </Text>
                            <HStack spacing={2}>
                              <Phone size={16} color="#3A7E7B" />
                              <Text
                                fontSize="md"
                                fontWeight="600"
                                color="#1C3A38"
                              >
                                {data?.relevantPersonPhone}
                              </Text>
                            </HStack>
                          </VStack>
                        </VStack>
                      </Box>

                      {isHotelType && numberOfDays > 0 && (
                        <Box p={4} bg="gray.50" borderRadius="xl" w="full">
                          <VStack spacing={3}>
                            <HStack justify="space-between" w="full">
                              <Text fontSize="sm" color={textColor}>
                                {data?.price} ₼ × {numberOfDays} gün
                              </Text>
                              <Text fontSize="sm" fontWeight="500">
                                {totalPrice.toLocaleString()} ₼
                              </Text>
                            </HStack>

                            <Divider />

                            <HStack justify="space-between" w="full">
                              <Text
                                fontSize="lg"
                                fontWeight="700"
                                color="#1C3A38"
                              >
                                Ümumi məbləğ
                              </Text>
                              <Text
                                fontSize="xl"
                                fontWeight="bold"
                                color="#3A7E7B"
                              >
                                {totalPrice.toLocaleString()} ₼
                              </Text>
                            </HStack>
                          </VStack>
                        </Box>
                      )}
                    </VStack>
                  ) : (
                    <Button
                      bg="#1C3A38"
                      size="lg"
                      color="white"
                      width="100%"
                      borderRadius="xl"
                      fontSize="md"
                      fontWeight="600"
                      onClick={getPhoneNumber}
                      _hover={{ bg: "#2F6B68", transform: "translateY(-1px)" }}
                      transition="all 0.2s ease"
                      leftIcon={<Phone size={18} />}
                      py={6}
                    >
                      {isHotelType ? "Məlumatları Göstər" : "Əlaqə Məlumatları"}
                    </Button>
                  )}
                </VStack>
              </CardBody>
            </Card>

            {isHotelType && (
              <Card
                bg={cardBg}
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
                overflow="hidden"
              >
                <CardBody p={4}>
                  <VStack spacing={4}>
                    <Text
                      fontSize="md"
                      fontWeight="600"
                      color="#1C3A38"
                      alignSelf="start"
                    >
                      Tarix Seçin
                    </Text>
                    <Box
                      w="full"
                      sx={{
                        ".rdrDefinedRangesWrapper": { display: "none" },
                        ".rdrCalendarWrapper": { position: "relative" },
                        ".rdrDateRangePickerWrapper": { position: "relative" },
                        ".rdrMonth": { padding: "0" },
                        ".rdrDateRangeWrapper": { fontSize: "14px" },
                      }}
                    >
                      <DateRangePicker
                        ranges={[selectionRange]}
                        rangeColors={["#3A7E7B"]}
                        showPreview={false}
                        onChange={handleSelect}
                      />
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
            )}
          </VStack>
        </Flex>

        {validPosition && (
          <Card
            bg={cardBg}
            borderRadius="2xl"
            overflow="hidden"
            border="1px solid"
            borderColor={borderColor}
          >
            <CardBody p={0}>
              <VStack spacing={4}>
                <Box p={6} w="full">
                  <Heading size="md" color="#1C3A38">
                    Ünvan
                  </Heading>
                </Box>
                <Box w="full" h="400px">
                  <MapComponent
                    locations={[
                      {
                        id: data.id ?? "",
                        name: data.name ?? "",
                        position: validPosition,
                      },
                    ]}
                  />
                </Box>
              </VStack>
            </CardBody>
          </Card>
        )}
      </Container>
    </Box>
  );
});
