import { Center, Box } from "@chakra-ui/react";
import React from "react";
import { SpinningImage } from "../../utils/helpers/helpers";

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
          w="60px"
          h="60px"
        />
      </Center>
    </Box>
  );
};
