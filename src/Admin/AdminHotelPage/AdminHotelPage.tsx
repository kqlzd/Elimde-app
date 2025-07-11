import React from "react";
import { AdminNavbar } from "../components/AdminNavbar/AdminNavbar";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { usePostDataToDbHotels } from "../../hooks/usePostDataToDbHotels";

export const AdminHotelPage = () => {
  const { handleSubmit, register } = usePostDataToDbHotels();
  return (
    <Box>
      <AdminNavbar />

      <form onSubmit={handleSubmit}>
        <Box width="50%" alignContent="center" margin="auto" mt={50}>
          <FormControl>
            <FormLabel>Hotel adi</FormLabel>
            <Input type="text" {...register("hotelName")} />
          </FormControl>

          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input type="text" {...register("address")} />
          </FormControl>

          <FormControl>
            <FormLabel>Qiymet</FormLabel>
            <Input type="text" {...register("price")} />
          </FormControl>

          <FormControl>
            <FormLabel>Longtitude</FormLabel>
            <Input type="text" {...register("longitude")} />
          </FormControl>

          <FormControl>
            <FormLabel>Latitude</FormLabel>
            <Input type="text" {...register("latitude")} />
          </FormControl>

          <FormControl>
            <FormLabel>ortalama qiymet</FormLabel>
            <Input type="text" {...register("averageMarketPrice")} />
          </FormControl>

          <FormControl>
            <FormLabel>Is saatlari</FormLabel>
            <Input type="text" {...register("workHours")} />
          </FormControl>

          <FormControl>
            <FormLabel>Mesul shexs</FormLabel>
            <Input type="text" {...register("relevantPerson")} />
          </FormControl>

          <FormControl>
            <FormLabel>Mesul shexs tel no</FormLabel>
            <Input type="text" {...register("relevantPersonPhone")} />
          </FormControl>

          <FormControl>
            <FormLabel>Desc</FormLabel>
            <Textarea {...register("desc")} />
          </FormControl>

          <FormControl>
            <FormLabel>Foto</FormLabel>
            <Input type="file" accept="image/*" />
          </FormControl>

          <Button type="submit">Elave et</Button>
        </Box>
      </form>
    </Box>
  );
};
