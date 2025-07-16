import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { usePostDataToDbGrooms } from "../../hooks/usePostDataToDbGrooms";
import { AdminNavbar } from "../components/AdminNavbar/AdminNavbar";

export default function AdminGroomsPage() {
  const { register, handleSubmit } = usePostDataToDbGrooms();
  return (
    <Box>
      <AdminNavbar />

      <form onSubmit={handleSubmit}>
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
            <FormLabel>Longtitude</FormLabel>
            <Input type="text" {...register("longitude")} />
          </FormControl>

          <FormControl>
            <FormLabel>Lattidude</FormLabel>
            <Input type="text" {...register("latitude")} />
          </FormControl>

          <FormControl>
            <FormLabel>Telephone</FormLabel>
            <Input type="text" {...register("phone")} />
          </FormControl>

          <FormControl>
            <FormLabel>Qiymet</FormLabel>
            <Input type="text" {...register("price")} />
          </FormControl>

          <FormControl>
            <FormLabel>Ortalama muddet</FormLabel>
            <Input type="text" {...register("averageTime")} />
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

          <Button type="submit">Elave et</Button>
        </Box>
      </form>
    </Box>
  );
}
