import React from "react";
import { useGetDatas } from "../../hooks/useGetDatas";
import { Container, SimpleGrid } from "@chakra-ui/react";
import { Cards } from "../../components/Cards/Cards";

export const ShowAds = () => {
  const { cards } = useGetDatas();

  return (
    // <Box>
    //   {/* <CategoriesSection /> */}
    //   <SimpleGrid columns={[1, 2, 3]} gap={10} mt={20}>
    //     {cards.map((ilan: any) => (
    //       <Cards
    //         key={ilan.id}
    //         id={ilan.id}
    //         title={ilan.title}
    //         price={ilan.price}
    //         imageUrl={ilan.imageUrl}
    //         city={ilan.city}
    //         createdAt={ilan.createdAt}
    //         isDaily={ilan.isDaily}
    //       />
    //     ))}
    //   </SimpleGrid>
    // </Box>
    <Container>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {cards.map((ilan: any) => (
          <Cards
            key={ilan.id}
            id={ilan.id}
            title={ilan.title}
            price={ilan.price}
            imageUrl={ilan.imageUrl}
            city={ilan.city}
            createdAt={ilan.createdAt}
            isDaily={ilan.isDaily}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};
