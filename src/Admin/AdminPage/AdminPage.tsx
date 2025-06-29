import React, { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AdminNavbar } from "../components/AdminNavbar/AdminNavbar";

export const AdminPage = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  return (
    <>
      <Box mt={5}>
        <AdminNavbar />
      </Box>

      <Heading mt={20} textAlign="center">
        Welcome to Admin Page!
      </Heading>
    </>
  );
};
