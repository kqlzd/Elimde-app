import React from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  Heading,
  useColorModeValue,
  Container,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorFallbackProps {
  error?: Error;
  resetError: () => void;
  goHome: () => void;
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
  goHome,
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Container maxW="md" py={20}>
      <Box
        bg={bgColor}
        p={8}
        borderRadius="xl"
        boxShadow="lg"
        border="1px solid"
        borderColor={borderColor}
        textAlign="center"
      >
        <VStack spacing={6}>
          <Box
            w="80px"
            h="80px"
            bg="red.100"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="red.500"
          >
            <AlertTriangle size={40} />
          </Box>

          <VStack spacing={3}>
            <Heading size="lg" color="#1C3A38">
              Xəta baş verdi
            </Heading>
            <Text color="gray.600" fontSize="md" lineHeight="1.6">
              Təəssüf ki, bu səhifədə xəta baş verdi. Səhifəni yeniləyərək və ya
              ana səhifəyə qayıdaraq davam edə bilərsiniz.
            </Text>
          </VStack>

          {process.env.NODE_ENV === "development" && error && (
            <Alert status="error" borderRadius="md" textAlign="left">
              <AlertIcon />
              <Box>
                <AlertTitle>Debug Məlumatı:</AlertTitle>
                <AlertDescription>
                  <Text fontSize="sm" fontFamily="mono">
                    {error.message}
                  </Text>
                </AlertDescription>
              </Box>
            </Alert>
          )}

          <VStack spacing={3} w="full">
            <Button
              leftIcon={<RefreshCw size={18} />}
              bg="#1C3A38"
              color="white"
              size="lg"
              w="full"
              onClick={resetError}
              _hover={{ bg: "#2F6B68" }}
            >
              Səhifəni yenilə
            </Button>

            <Button
              leftIcon={<Home size={18} />}
              variant="outline"
              size="md"
              w="full"
              onClick={goHome}
              _hover={{ bg: "gray.50" }}
            >
              Ana səhifəyə qayıt
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Container>
  );
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("🚨 Error Boundary caught an error:", error);
    console.error("📋 Error Info:", errorInfo);

    if (process.env.NODE_ENV === "production") {
    }

    this.setState({
      error,
      errorInfo,
    });
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };

  goHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;

      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
          goHome={this.goHome}
        />
      );
    }

    return this.props.children;
  }
}
