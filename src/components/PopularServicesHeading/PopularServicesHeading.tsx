import { Box, Container, Text } from "@chakra-ui/react";
import React from "react";

export const PopularServicesHeading = React.memo(() => {
  return (
    <Box bg="gray.50">
      <Container maxW="6xl">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box maxW="60%">
            <Text
              fontSize="42px"
              fontFamily="inherit"
              fontWeight="bold"
              color="#1C3A38"
              mt={10}
            >
              Məşhur Xidmətlər
            </Text>
            <Text fontSize="20px" color="#1C3A38" lineHeight="1.6">
              Siz harada olursunuz olun, heyvan dostunuz üçün lazım olan bütün
              xidmətlər burada sizi gözləyir!
            </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  );
});
