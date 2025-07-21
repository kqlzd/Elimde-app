import styled from "@emotion/styled";
import { Image } from "@chakra-ui/react";

export const SpinningImage = styled(Image)`
    animation: spin 2.5s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
    transition {
      ease: 'linear',
      duration: 4,
      repeat: infinity,
      delay: 0.1
    }
  }
`;
