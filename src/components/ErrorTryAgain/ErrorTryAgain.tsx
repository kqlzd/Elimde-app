import { Box, Button, Text } from "@chakra-ui/react";

interface ErrorTryAgainProps {
  error?: string | null;
}

export const ErrorTryAgain: React.FC<ErrorTryAgainProps> = ({ error }) => {
  if (!error) return null;

  return (
    <Box textAlign="center" py={20}>
      <Text color="red.500" mb={4}>
        {error}
      </Text>
      <Button onClick={() => window.location.reload()}>Yenidən cəhd et</Button>
    </Box>
  );
};
