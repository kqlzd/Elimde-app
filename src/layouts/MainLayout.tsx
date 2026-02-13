import { Box } from "@chakra-ui/react";
import { Header } from "../components/Header/Header";
import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";
import { Suspense } from "react";
import { Loading } from "../components/Loading/Loading";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";

export const MainLayout = () => {
  return (
    <Box>
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </Box>
  );
};
