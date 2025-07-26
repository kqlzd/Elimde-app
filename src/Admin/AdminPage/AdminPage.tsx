import React from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { AdminNavbar } from "../components/AdminNavbar/AdminNavbar";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { Loading } from "../../components/Loading/Loading";

export const AdminPage = () => {
  const { user, loading } = useAdminAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Box>
      <AdminNavbar />

      <Box p={8}>
        <VStack spacing={8} align="start">
          <Box>
            <Heading size="xl" color="#1C3A38" mb={2}>
              Admin Panel
            </Heading>
            <Text color="gray.600" fontSize="lg">
              Xoş gəlmisiniz, {user?.email}
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="100%">
            <Stat
              bg="white"
              p={6}
              borderRadius="xl"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.200"
            >
              <StatLabel color="gray.600">Otellər</StatLabel>
              <StatNumber color="#1C3A38">24</StatNumber>
            </Stat>

            <Stat
              bg="white"
              p={6}
              borderRadius="xl"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.200"
            >
              <StatLabel color="gray.600">Klinikalar</StatLabel>
              <StatNumber color="#1C3A38">18</StatNumber>
            </Stat>

            <Stat
              bg="white"
              p={6}
              borderRadius="xl"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.200"
            >
              <StatLabel color="gray.600">Grooming Salonları</StatLabel>
              <StatNumber color="#1C3A38">12</StatNumber>
            </Stat>

            <Stat
              bg="white"
              p={6}
              borderRadius="xl"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.200"
            >
              <StatLabel color="gray.600">Təlim Mərkəzləri</StatLabel>
              <StatNumber color="#1C3A38">8</StatNumber>
            </Stat>
          </SimpleGrid>
        </VStack>
      </Box>
    </Box>
  );
};
