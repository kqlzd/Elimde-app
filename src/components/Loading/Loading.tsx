import { Center, Image, Box } from "@chakra-ui/react";
import React from "react";
import styled from "@emotion/styled";

const SpinningImage = styled(Image)`
  animation: spin 2s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg); // Fix: Complete rotation
    }
  }
`;

export const Loading = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100vw"
      h="100vh"
      bg="white"
      zIndex="999"
    >
      <Center h="100vh">
        <SpinningImage
          src="/assets/cat-logo.png"
          alt="Loading"
          w="50px"
          h="50px"
        />
      </Center>
    </Box>
  );
};
