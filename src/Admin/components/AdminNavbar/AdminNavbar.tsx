import { Flex, Button } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate("/");
  };

  return (
    <Flex
      height={400}
      bg="#1C3A38"
      p="4"
      color="white"
      justify="space-between"
      align="center"
    >
      <Flex gap="4">
        <Link to="/admin/add-hotels">Oteller</Link>
        <Link to="/admin/add-doctor">Klinikalar</Link>
        <Link to="/admin/add-groom">Grooming Salonlar </Link>
        <Link to="/admin/add-training-centers">Telim merkezleri </Link>
      </Flex>

      <Button colorScheme="red" size="sm" onClick={handleLogout}>
        Çıxış
      </Button>
    </Flex>
  );
};
