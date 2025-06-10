import {
  Image,
  Text,
  Box,
  Flex,
  Button,
  VStack,
  Avatar,
  Divider,
  Container,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { PhoneIcon } from "lucide-react";

interface Listing {
  id?: string;
  title?: string;
  price?: string;
  fullName?: string;
  imageUrl?: string;
  category?: string;
  phone?: string;
  desc?: string;
  city?: string;
  createdAt?: any;
  isDaily?: boolean;
  isWeekly?: boolean;
  isMonthly?: boolean;
}

dayjs.extend(relativeTime);

export const DetailPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState<Listing>({});
  const [showPhoneNumber, setShowPhoneNumber] = useState<boolean>(false);

  const formatDate = (dateValue: any) => {
    if (!dateValue) {
      return "";
    }

    try {
      if (dateValue?.toDate) {
        return dayjs(dateValue.toDate()).format("DD.MM.YYYY HH:mm");
      } else if (typeof dateValue === "string") {
        const parsedDate = dayjs(dateValue);
        if (parsedDate.isValid()) {
          return parsedDate.format("DD.MM.YYYY HH:mm");
        } else {
          console.error("Invalid date string:", dateValue);
          return "";
        }
      } else if (dateValue instanceof Date) {
        return dayjs(dateValue).format("DD.MM.YYYY HH:mm");
      }
    } catch (error) {
      return "";
    }

    return "";
  };

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) {
        return;
      }

      try {
        const docRef = doc(db, "listings", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          const formattedData: Listing = {
            id: docSnap.id,
            title: data.title ?? "",
            price: data.price ?? "",
            fullName: data.fullName ?? "",
            imageUrl: data.imageUrl ?? "",
            category: data.category ?? "",
            phone: data.phone ?? "",
            desc: data.desc ?? "",
            city: data.city ?? "",
            createdAt: formatDate(data.createdAt),
            isDaily: data.isDaily ?? false,
            isWeekly: data.isWeekly ?? false,
            isMonthly: data.isMonthly ?? false,
          };

          setListing(formattedData);
        } else {
          console.log("No document found with ID:", id);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchListing();
  }, [id]);

  const handleClickPhoneNumber = () => {
    setShowPhoneNumber(true);
  };

  return (
    <Container maxW="1200px" py={6}>
      <Divider />
      <Flex justifyContent="space-between" alignItems="flex-start" mb={6}>
        <Box flex="1">
          <Text fontSize="24px" fontWeight="600" color="#1a1a1a" mb={2}>
            {listing?.title}
          </Text>
        </Box>
      </Flex>

      <Flex gap={8} alignItems="flex-start">
        <Box flex="1" maxW="600px">
          <Box position="relative" mb={4}>
            <Image
              src={listing.imageUrl ?? "/images/test.jpg"}
              borderRadius="8px"
              width="100%"
              height="400px"
              objectFit="cover"
              border="1px solid #e8e8e8"
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
                  {listing?.city ?? "Bakı"}
                </Text>
              </Flex>

              <Divider />

              <Flex justify="space-between" py={2}>
                <Text color="gray.600" fontSize="14px">
                  Kateqoriya
                </Text>
                <Text fontWeight="500" fontSize="14px">
                  {listing?.category ?? ""}
                </Text>
              </Flex>

              <Divider />
            </VStack>
          </Box>

          {listing?.desc && (
            <Box bg="white" border="1px solid #e8e8e8" borderRadius="8px" p={6}>
              <Text fontSize="16px" color="#1a1a1a" lineHeight="1.6">
                <strong>Açıqlama:</strong> {listing?.desc}
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
              {listing?.price} AZN
            </Text>
            <Divider />

            <Flex alignItems="center" mt={4}>
              <Avatar
                size="md"
                name={listing?.fullName}
                src="/api/placeholder/50/50"
                mr={3}
              />
              <Box>
                <Text fontWeight="600" fontSize="16px" color="#1a1a1a">
                  {listing?.fullName}
                </Text>
              </Box>
            </Flex>

            <VStack mt={10}>
              <Button
                colorScheme="none"
                bgColor="#4428D2"
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

              {showPhoneNumber && (
                <Box>
                  <Flex alignItems="center" mb={2}>
                    <PhoneIcon />
                    <Text fontSize="14px" color="black" fontWeight="600">
                      {listing?.phone}
                    </Text>
                  </Flex>

                  <Text border="1px solid red" bgColor="#FFF4F1" p={3}>
                    <strong>Diqqət!</strong> Beh göndərməmişdən öncə
                    sövdələşmənin təhlükəsiz olduğuna əmin olun!
                  </Text>
                </Box>
              )}
            </VStack>

            <Flex alignItems="center" mt={5}>
              <Text fontSize="14px" color="#8d94ad" ml={2}>
                <strong>Elan tarixi:</strong> {listing?.createdAt}
              </Text>
            </Flex>

            <Flex alignItems="flex-start" mt={4}>
              <Box ml={2}>
                <Text fontSize="14px" color="blue.600" cursor="pointer">
                  {listing?.city}
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};
