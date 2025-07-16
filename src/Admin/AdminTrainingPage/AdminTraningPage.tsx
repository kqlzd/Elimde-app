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
import { usePostDataToDbTrainingCenter } from "../../hooks/usePostDataToDbTrainingCenter";

export const AdminTrainingPage = () => {
  const { register, handleSubmit } = usePostDataToDbTrainingCenter();

  return (
    <Box>
      <AdminNavbar />

      <form onSubmit={handleSubmit}>
        <Box width="50%" alignContent="center" margin="auto" mt={50}>
          <FormControl>
            <FormLabel>Telim Merkezi adi</FormLabel>
            <Input type="text" {...register("name")} />
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
            <FormLabel>Latitude</FormLabel>
            <Input type="text" {...register("latitude")} />
          </FormControl>

          <FormControl>
            <FormLabel>Telephone</FormLabel>
            <Input type="text" {...register("phone")} />
          </FormControl>

          <FormControl>
            <FormLabel>Qiymet</FormLabel>
            <Input type="text" {...register("monthlySubscription")} />
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
            <FormLabel>Telim muddeti</FormLabel>
            <Input type="text" {...register("traningDuration")} />
          </FormControl>

          <FormControl>
            <FormLabel>Desc</FormLabel>
            <Textarea {...register("desc")} />
          </FormControl>

          <FormControl>
            <FormLabel>Foto</FormLabel>
            <Input type="file" accept="image/*" {...register("imageFile")} />
          </FormControl>

          <Button type="submit">Elave et</Button>
        </Box>
      </form>
    </Box>
  );
};
