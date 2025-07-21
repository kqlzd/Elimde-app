import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Link,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Phone, MapPin, Heart } from "lucide-react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isScrolled, setIsScrolled] = useState(false);

  const bgColor = useColorModeValue(
    isScrolled ? "rgba(243, 241, 235, 0.95)" : "rgba(243, 241, 235, 1)",
    isScrolled ? "rgba(26, 32, 44, 0.95)" : "rgba(26, 32, 44, 1)"
  );

  const shadowValue = isScrolled ? "0 4px 20px rgba(0,0,0,0.1)" : "none";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Ana Səhifə", path: "/", isActive: location.pathname === "/" },
    {
      label: "Otellər",
      path: "/services/hotels",
      isActive: location.pathname === "/services/hotels",
    },
    {
      label: "Klinikalar",
      path: "/services/doctors",
      isActive: location.pathname === "/services/doctors",
    },
    {
      label: "Grooming",
      path: "/services/grooming",
      isActive: location.pathname === "/services/grooming",
    },
    {
      label: "Təlim",
      path: "/services/training",
      isActive: location.pathname === "/services/training",
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <MotionBox
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg={bgColor}
      backdropFilter="blur(10px)"
      borderBottom="1px solid"
      borderColor={useColorModeValue(
        "rgba(255,255,255,0.2)",
        "rgba(255,255,255,0.1)"
      )}
      boxShadow={shadowValue}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <Container maxW="7xl">
        <Flex
          as="header"
          width="100%"
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack spacing={3}>
            <MotionBox
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              cursor="pointer"
              onClick={() => navigate("/")}
            >
              <HStack spacing={2}>
                <Box
                  w="40px"
                  h="40px"
                  bg="linear-gradient(135deg, #3A7E7B, #F4A261)"
                  borderRadius="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="lg"
                >
                  <Heart color="white" size={20} />
                </Box>
                <Text
                  color="#1C3A38"
                  fontSize="2xl"
                  fontWeight="800"
                  letterSpacing="-0.5px"
                >
                  Miyav.az
                </Text>
              </HStack>
            </MotionBox>
          </HStack>

          <HStack spacing={8} display={{ base: "none", lg: "flex" }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                cursor="pointer"
                position="relative"
                color={item.isActive ? "#3A7E7B" : "#4A5568"}
                fontWeight={item.isActive ? "600" : "500"}
                fontSize="md"
                _hover={{
                  color: "#3A7E7B",
                  transform: "translateY(-1px)",
                }}
                transition="all 0.2s ease"
              >
                <HStack spacing={2}>
                  <Text>{item.label}</Text>
                </HStack>

                {item.isActive && (
                  <Box
                    position="absolute"
                    bottom="-4px"
                    left="50%"
                    transform="translateX(-50%)"
                    w="20px"
                    h="2px"
                    bg="#3A7E7B"
                    borderRadius="full"
                  />
                )}
              </Link>
            ))}
          </HStack>

          <HStack spacing={4}>
            <IconButton
              icon={isOpen ? <X /> : <Menu />}
              aria-label="Toggle Navigation"
              variant="ghost"
              color="#1C3A38"
              size="md"
              onClick={isOpen ? onClose : onOpen}
              display={{ base: "flex", lg: "none" }}
              _hover={{
                bg: "rgba(58, 126, 123, 0.1)",
              }}
            />
          </HStack>
        </Flex>
      </Container>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay backdropFilter="blur(4px)" />
        <DrawerContent bg="#F3F1EB">
          <DrawerCloseButton
            color="#1C3A38"
            size="lg"
            _hover={{ bg: "rgba(58, 126, 123, 0.1)" }}
          />
          <DrawerHeader
            borderBottomWidth="1px"
            borderColor="rgba(58, 126, 123, 0.2)"
            pb={4}
          >
            <HStack spacing={2}>
              <Box
                w="32px"
                h="32px"
                bg="linear-gradient(135deg, #3A7E7B, #F4A261)"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Heart color="white" size={16} />
              </Box>
              <Text color="#1C3A38" fontSize="xl" fontWeight="700">
                Miyav.az
              </Text>
            </HStack>
          </DrawerHeader>

          <DrawerBody p={6}>
            <VStack spacing={6} align="stretch">
              {navItems.map((item, index) => (
                <MotionBox
                  key={item.path}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="ghost"
                    justifyContent="space-between"
                    color={item.isActive ? "#3A7E7B" : "#4A5568"}
                    fontWeight={item.isActive ? "600" : "500"}
                    size="lg"
                    w="full"
                    bg={
                      item.isActive ? "rgba(58, 126, 123, 0.1)" : "transparent"
                    }
                    _hover={{
                      bg: "rgba(58, 126, 123, 0.1)",
                      color: "#3A7E7B",
                    }}
                    onClick={() => handleNavigation(item.path)}
                    leftIcon={item.isActive ? <MapPin size={18} /> : undefined}
                  >
                    {item.label}
                  </Button>
                </MotionBox>
              ))}

              <Box
                mt={8}
                p={4}
                bg="rgba(58, 126, 123, 0.05)"
                borderRadius="lg"
                border="1px solid rgba(58, 126, 123, 0.1)"
              >
                <Text fontSize="sm" fontWeight="600" color="#1C3A38" mb={3}>
                  Bizimlə əlaqə
                </Text>
                <VStack spacing={3} align="flex-start">
                  <HStack>
                    <Phone size={16} color="#3A7E7B" />
                    <Text fontSize="sm" color="#4A5568">
                      +994 XX XXX XX XX
                    </Text>
                  </HStack>
                  <HStack>
                    <MapPin size={16} color="#3A7E7B" />
                    <Text fontSize="sm" color="#4A5568">
                      Bakı, Azərbaycan
                    </Text>
                  </HStack>
                </VStack>
              </Box>

              <Button
                bg="#1C3A38"
                color="white"
                size="lg"
                borderRadius="lg"
                onClick={() => {
                  navigate("/login");
                  onClose();
                }}
                _hover={{
                  bg: "#2F6B68",
                }}
                mt={4}
              >
                Admin Girişi
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </MotionBox>
  );
};
