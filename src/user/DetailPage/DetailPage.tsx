/* eslint-disable react-hooks/exhaustive-deps */
import {
  Text,
  Box,
  Flex,
  Button,
  VStack,
  Divider,
  Image,
  Container,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { PhoneIcon } from "lucide-react";
import { useGetDoctorsData } from "../../hooks/useGetDoctors";
import { Loading } from "../components/Loading/Loading";
import { MapComponent } from "../components/Map/Map";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { differenceInDays } from "date-fns";

interface Hotel {
  id?: string;
  name?: string;
  price?: string;
  owner?: string;
  image?: string;
  images?: string[];
  phone?: string;
  desc?: string;
  address?: string;
  createdAt?: any;
  locations?: {
    latitude: number;
    longitude: number;
  };
}

dayjs.extend(relativeTime);

export const DetailPage = () => {
  const { id, type } = useParams();
  const [data, setData] = useState<Hotel>({});
  const [showPhoneNumber, setShowPhoneNumber] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [numberOfDays, setNumberOfDays] = useState<number>(0);

  const isHotelType = type === "hotels";
  // const hotelImages = data?.images ?? [data.image];

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const { isLoading } = useGetDoctorsData();

  useEffect(() => {
    const fetchHotel = async () => {
      if (!id || !type) return;

      try {
        const docRef = doc(db, type, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const rawData = docSnap.data();

          const formattedHotel: Hotel = {
            id: docSnap.id,
            name: rawData.name ?? "",
            price: rawData.price ?? "",
            owner: rawData.owner ?? "",
            image: rawData.image ?? "",
            phone: rawData.phone ?? "",
            desc: rawData.desc ?? "",
            address: rawData.address ?? "",

            locations: rawData.locations
              ? {
                  latitude: Number(rawData?.locations?.latitude),
                  longitude: Number(rawData?.locations?.longitude),
                }
              : undefined,

            createdAt: rawData.createdAt ?? null,
          };

          setData(formattedHotel);
        } else {
          console.log("Hotel tapılmadı");
        }
      } catch (error) {
        console.error("Xəta baş verdi:", error);
      }
    };

    fetchHotel();
  }, [id, type]);

  useEffect(() => {
    if (data?.price) {
      calculateTotalPrice();
    }
  }, [data, selectionRange]);

  const calculateTotalPrice = () => {
    const startDate = selectionRange.startDate;
    const endDate = selectionRange.endDate;

    const days = differenceInDays(endDate, startDate);

    const dailyPrice = parseFloat(data?.price ?? "0");

    const total = days * dailyPrice;

    setNumberOfDays(days);
    setTotalPrice(total);

    return { days, total };
  };

  const handleSelect = (ranges: any) => {
    setSelectionRange(ranges.selection);
    calculateTotalPrice();
  };

  const handleClickPhoneNumber = () => setShowPhoneNumber(true);

  const validPosition: [number, number] | null =
    data.locations &&
    !isNaN(data.locations.latitude) &&
    !isNaN(data.locations.longitude) &&
    data.locations.latitude >= -90 &&
    data.locations.latitude <= 90 &&
    data.locations.longitude >= -180 &&
    data.locations.longitude <= 180
      ? [data.locations.latitude, data.locations.longitude]
      : null;

  if (isLoading) return <Loading />;

  return (
    <Container maxW="1200px" py={6}>
      <Flex justifyContent="space-between" alignItems="flex-start" mb={6}>
        <Box flex="1">
          <Text fontSize="24px" fontWeight="600" color="#1a1a1a" mb={2}>
            {data?.name}
          </Text>
        </Box>
      </Flex>

      <Flex direction={{ base: "column", lg: "row" }} gap={8} mb={6}>
        <Box flex="1" minW={{ lg: "400px" }}>
          <Box position="relative" mb={4}>
            <Image
              src={data.image}
              borderRadius="8px"
              width="100%"
              height="400px"
              objectFit="cover"
              border="1px solid #e8e8e8"
              alt={data.name}
            />
          </Box>

          {data?.desc && (
            <Box bg="white" border="1px solid #e8e8e8" borderRadius="8px" p={6}>
              <Text fontSize="16px" color="#1a1a1a" lineHeight="1.6">
                <strong>Adres:</strong> {data?.address ?? ""}
              </Text>
              <Text fontSize="16px" color="#1a1a1a" lineHeight="1.6">
                <strong>Açıqlama:</strong> {data?.desc}
              </Text>
            </Box>
          )}
        </Box>

        <VStack
          flex="0 0 350px"
          spacing={6}
          align="stretch"
          position={{ lg: "sticky" }}
          top={{ lg: "20px" }}
          height="fit-content"
        >
          {isHotelType && (
            <Box
              bg="white"
              border="1px solid #e8e8e8"
              borderRadius="8px"
              p={6}
              boxShadow="sm"
            >
              <Text fontSize="32px" fontWeight="bold" color="#1a1a1a" mb={6}>
                {data?.price} AZN / günü
              </Text>
              <Divider />

              {showPhoneNumber && (
                <Box mt={5}>
                  <Flex align="center" justify="left">
                    <PhoneIcon />
                    <Text
                      fontSize="14px"
                      color="black"
                      fontWeight="600"
                      textAlign="left"
                      ml={2}
                    >
                      {data?.phone}
                    </Text>
                  </Flex>

                  {isHotelType && numberOfDays > 0 && (
                    <>
                      <Box mt={5}>
                        <Flex justify="space-between" mb={2}>
                          <Text fontSize="14px" color="gray.600">
                            Seçilən günlər:
                          </Text>
                          <Text fontSize="14px" fontWeight="500">
                            {numberOfDays} gün
                          </Text>
                        </Flex>

                        <Flex justify="space-between" mb={4}>
                          <Text
                            fontSize="16px"
                            fontWeight="600"
                            color="#1a1a1a"
                          >
                            Ümumi qiymət:
                          </Text>
                          <Text
                            fontSize="20px"
                            fontWeight="bold"
                            color="#3A7E7B"
                          >
                            {totalPrice.toLocaleString()} AZN
                          </Text>
                        </Flex>
                      </Box>
                    </>
                  )}
                </Box>
              )}

              <VStack mt={10}>
                <Button
                  bgColor="#3A7E7B"
                  size="lg"
                  color="white"
                  width="100%"
                  borderRadius="12px"
                  fontSize="16px"
                  fontWeight="600"
                  onClick={handleClickPhoneNumber}
                  _hover={{ bgColor: "#2F6B68" }}
                >
                  Nömrəni göstər
                </Button>
              </VStack>
            </Box>
          )}

          {isHotelType && (
            <Box
              bg="white"
              border="1px solid #e8e8e8"
              borderRadius="8px"
              p={5}
              boxShadow="sm"
              sx={{
                ".rdrDefinedRangesWrapper": {
                  display: "none",
                },
                ".rdrCalendarWrapper": {
                  position: "relative",
                },
                ".rdrDateRangePickerWrapper": {
                  position: "relative",
                },
              }}
            >
              <DateRangePicker
                ranges={[selectionRange]}
                rangeColors={["#3A7E7B"]}
                showPreview={false}
                onChange={handleSelect}
              />
            </Box>
          )}
        </VStack>
      </Flex>

      {validPosition && (
        <Box mt={6}>
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
      )}
    </Container>
  );
};
