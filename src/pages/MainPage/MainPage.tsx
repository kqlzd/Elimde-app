import React from "react";
import {
  Box,
  Heading,
  Image,
  Container,
  Button,
  VStack,
  Grid,
  HStack,
  GridItem,
} from "@chakra-ui/react";
import { PopularServicesHeading } from "../../components/PopularServicesHeading/PopularServicesHeading";
import { PetCards } from "../../components/PetCards/PetCards";

export const MainPage = () => {
  return (
    <>
      <Box bg="gray.50">
        {/* Hero Section */}
        <Box bg="#f4f1ec" py={24} px={8}>
          <Container maxW="6xl" centerContent>
            <VStack spacing={8} textAlign="center">
              <Heading
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="bold"
                color="#1C3A38"
                lineHeight="1.1"
                textAlign="center"
              >
                Ev heyvanınız üçün yaxınlıqdakı peşəkarları kəşf edin
              </Heading>

              {/* Navigation Tabs */}
              <HStack spacing={0} bg="white" rounded="lg" p={1} shadow="sm">
                <Button
                  variant="ghost"
                  px={6}
                  py={2}
                  color="gray.600"
                  _hover={{ color: "gray.800" }}
                  fontWeight="normal"
                >
                  Find Local Pet Care
                </Button>
                <Button
                  bg="gray.800"
                  color="white"
                  px={6}
                  py={2}
                  rounded="md"
                  fontWeight="medium"
                  _hover={{ bg: "gray.700" }}
                >
                  Find Customers
                </Button>
              </HStack>

              <Heading
                fontSize="2xl"
                color="gray.700"
                fontWeight="medium"
                textAlign="center"
              >
                Find new customers with a free Local Pet Care listing!
              </Heading>

              <Button
                bg="teal.600"
                color="white"
                px={8}
                py={6}
                rounded="lg"
                fontSize="lg"
                fontWeight="semibold"
                shadow="lg"
                _hover={{ bg: "teal.700" }}
              >
                Get My Free Listing
              </Button>
            </VStack>
          </Container>
        </Box>

        {/* Pet Cards Section */}
        <Box py={16} px={8}>
          <Container maxW="6xl">
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={6}
            >
              {/* Cat Card */}
              <GridItem>
                <Box
                  borderRadius={12}
                  bg="red.500"
                  overflow="hidden"
                  shadow="lg"
                  transform="scale(1)"
                  transition="transform 0.3s"
                  _hover={{ transform: "scale(1.05)" }}
                  cursor="pointer"
                >
                  <Box
                    bgGradient="linear(to-br, teal.400, teal.600)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      src="/assets/img01.jpg"
                      alt="Cat"
                      w="full"
                      h="full"
                      objectFit="cover"
                      rounded="xl"
                    />
                  </Box>
                </Box>
              </GridItem>

              {/* Dog Card */}
              <GridItem>
                <Box
                  mt={35}
                  borderRadius={12}
                  bg="red.500"
                  overflow="hidden"
                  shadow="lg"
                  transform="scale(1)"
                  transition="transform 0.3s"
                  _hover={{ transform: "scale(1.05)" }}
                  cursor="pointer"
                >
                  <Box
                    bgGradient="linear(to-br, red.400, red.600)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      src="/assets/img02.jpg"
                      alt="Dog"
                      w="full"
                      h="full"
                      objectFit="cover"
                      rounded="xl"
                    />
                  </Box>
                </Box>
              </GridItem>

              {/* Bird Card */}
              <GridItem>
                <Box
                  borderRadius={12}
                  bg="orange.500"
                  overflow="hidden"
                  shadow="lg"
                  transform="scale(1)"
                  transition="transform 0.3s"
                  _hover={{ transform: "scale(1.05)" }}
                  cursor="pointer"
                >
                  <Box
                    bgGradient="linear(to-br, orange.400, orange.600)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      src="/assets/img03.jpg"
                      alt="Bird"
                      w="full"
                      h="full"
                      objectFit="cover"
                      rounded="xl"
                    />
                  </Box>
                </Box>
              </GridItem>

              {/* Rabbit Card */}
              <GridItem>
                <Box
                  bg="teal.400"
                  rounded="2xl"
                  overflow="hidden"
                  shadow="lg"
                  transform="scale(1)"
                  transition="transform 0.3s"
                  _hover={{ transform: "scale(1.05)" }}
                  cursor="pointer"
                  mt={35}
                >
                  <Box
                    bgGradient="linear(to-br, teal.300, teal.500)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      src="/assets/img04.jpg"
                      alt="Rabbit"
                      w="full"
                      h="full"
                      objectFit="cover"
                      rounded="xl"
                    />
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </Container>
        </Box>
      </Box>

      <PopularServicesHeading />
      <PetCards />
    </>
  );
};
