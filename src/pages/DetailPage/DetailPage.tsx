import {
  Image,
  Text,
  Box,
  Flex,
  Button,
  VStack,
  Divider,
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
import { Loading } from "../../components/Loading/Loading";
import { MapComponent } from "../../components/Map/Map";

interface Hotel {
  id?: string;
  name?: string;
  price?: string;
  owner?: string;
  image?: string;
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
                  latitude: Number(rawData.locations.latitude),
                  longitude: Number(rawData.locations.longitude),
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

  const handleClickPhoneNumber = () => {
    setShowPhoneNumber(true);
  };

  // Sadece geçerli koordinatlar varsa position oluştur
  const validPosition: [number, number] | null = data.locations
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

      <Flex gap={8} alignItems="flex-start">
        <Box flex="1" maxW="600px">
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

          <Box
            bg="white"
            border="1px solid #e8e8e8"
            borderRadius="8px"
            p={6}
            mb={6}
          >
            <VStack spacing={4} align="stretch">
              <Flex justify="space-between" py={2}>
                <Text color="gray.600" fontSize="14px">
                  Şəhər
                </Text>
                <Text fontWeight="500" fontSize="14px">
                  {data?.address ?? ""}
                </Text>
              </Flex>
            </VStack>
          </Box>

          {data?.desc && (
            <Box bg="white" border="1px solid #e8e8e8" borderRadius="8px" p={6}>
              <Text fontSize="16px" color="#1a1a1a" lineHeight="1.6">
                <strong>Açıqlama:</strong> {data?.desc}
              </Text>
            </Box>
          )}
        </Box>

        <Box width="320px" flexShrink={0}>
          <Box
            bg="white"
            border="1px solid #e8e8e8"
            borderRadius="8px"
            p={6}
            position="sticky"
            top="20px"
          >
            <Text fontSize="32px" fontWeight="bold" color="#1a1a1a" mb={6}>
              {data?.price} AZN / günü
            </Text>
            <Divider />

            {showPhoneNumber && (
              <Box mt={5}>
                <Flex align="center" justify="center">
                  <PhoneIcon />
                  <Text
                    fontSize="14px"
                    color="black"
                    fontWeight="600"
                    textAlign="center"
                    ml={2}
                  >
                    {data?.phone}
                  </Text>
                </Flex>
              </Box>
            )}

            <VStack mt={10}>
              <Button
                bgColor="#3A7E7B"
                size="lg"
                color="white"
                width="80%"
                borderRadius="12px"
                fontSize="16px"
                fontWeight="600"
                onClick={handleClickPhoneNumber}
              >
                Nömrəni göstər
              </Button>
            </VStack>
          </Box>
        </Box>
      </Flex>

      {validPosition && (
        <Box mt={6}>
          <Text fontSize="18px" fontWeight="600" mb={4}>
            📍
          </Text>
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
