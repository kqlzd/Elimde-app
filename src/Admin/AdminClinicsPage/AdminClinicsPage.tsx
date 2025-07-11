import {
  FormControl,
  Box,
  FormLabel,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { AdminNavbar } from "../components/AdminNavbar/AdminNavbar";

export const AdminClinicsPage = () => {
  const { register } = useForm();

  return (
    <Box>
      <AdminNavbar />
      <form>
        <Box width="50%" alignContent="center" margin="auto" mt={50}>
          <FormControl>
            <FormLabel>Klinikanin adi</FormLabel>
            <Input type="text" {...register("name")} />
          </FormControl>

          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input type="text" {...register("address")} />
          </FormControl>

          <FormControl>
            <FormLabel>Telephone</FormLabel>
            <Input type="text" {...register("phone")} />
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
            <FormLabel>Konsultasiya</FormLabel>
            <Input type="text" {...register("consultation")} />
          </FormControl>

          <FormControl>
            <FormLabel>Tecrube</FormLabel>
            <Input type="text" {...register("experience")} />
          </FormControl>

          <FormControl>
            <FormLabel>Is saati</FormLabel>
            <Input type="text" {...register("workHours")} />
          </FormControl>

          <FormControl>
            <FormLabel>Mesul shexs</FormLabel>
            <Input type="text" {...register("relevantPerson")} />
          </FormControl>

          <FormControl>
            <FormLabel>Mesul shexs tel</FormLabel>
            <Input type="text" {...register("relevantPersonPhone")} />
          </FormControl>

          <FormControl>
            <FormLabel>Desc</FormLabel>
            <Textarea {...register("desc")} />
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
};
