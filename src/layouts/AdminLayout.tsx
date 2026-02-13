import { Box } from "@chakra-ui/react";
import React from "react";
import { AdminNavbar } from "../Admin/components/AdminNavbar/AdminNavbar";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <Box>
      <AdminNavbar />
      <Outlet />
    </Box>
  );
};
