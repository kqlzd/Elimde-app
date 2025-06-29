import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { usePostDataToDbGrooms } from "../../hooks/usePostDataToDbGrooms";
import { AdminNavbar } from "../components/AdminNavbar/AdminNavbar";

export default function AdminGroomsPage() {
  const { register } = usePostDataToDbGrooms();
  return (
    <Box>
      <AdminNavbar />
      <form>
        <Box width="50%" alignContent="center" margin="auto" mt={50}>
          <FormControl>
            <FormLabel>Groom Salon adi</FormLabel>
            <Input type="text" {...register("groomName")} />
          </FormControl>

          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input type="text" {...register("address")} />
          </FormControl>

          <FormControl>
            <FormLabel>Telephone</FormLabel>
            <Input type="text" {...register("telephone")} />
          </FormControl>

          <FormControl>
            <FormLabel>Longtitude</FormLabel>
            <Input type="text" {...register("longitude")} />
          </FormControl>

          <FormControl>
            <FormLabel>Lattidude</FormLabel>
            <Input type="text" {...register("latitude")} />
          </FormControl>

          <FormControl>
            <FormLabel>Sekil</FormLabel>
            <Input type="file" />
          </FormControl>

          <Button>Elave et</Button>
        </Box>
      </form>
    </Box>
  );
}
