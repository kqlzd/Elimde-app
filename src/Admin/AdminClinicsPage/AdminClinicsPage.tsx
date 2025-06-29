import { FormControl, Box, FormLabel, Input, Button } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

export default function AdminClinicsPage() {
  const { register } = useForm();

  return (
    <form>
      <Box width="50%" alignContent="center" margin="auto" mt={50}>
        <FormControl>
          <FormLabel>Klinikanin adi</FormLabel>
          <Input type="text" {...register("clinicName")} />
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
  );
}
