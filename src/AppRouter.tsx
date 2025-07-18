import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminPage } from "./Admin/AdminPage/AdminPage";
import { Login } from "./pages/Login/Login";
import { AdminHotelPage } from "./Admin/AdminHotelPage/AdminHotelPage";
import AdminGroomsPage from "./Admin/AdminGroomsPage/AdminGroomsPage";
import { AdminTrainingPage } from "./Admin/AdminTrainingPage/AdminTraningPage";
import { AdminClinicsPage } from "./Admin/AdminClinicsPage/AdminClinicsPage";
import { AdminRoute } from "./Admin/components/AdminRoute/AdminRoute";
import {
  AboutUsPage,
  ContactPage,
  DetailPage,
  DoctorsPage,
  FAQPage,
  GroomingPage,
  HotelPage,
  MainPage,
  PetTrainings,
} from "./router/lazyComponents";
import { Header } from "./components/Header/Header";
import { Loading } from "./components/Loading/Loading";
import { Footer } from "./components/Footer/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";

export const AppRouter: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/"
              element={
                <ErrorBoundary>
                  <MainPage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/about"
              element={
                <ErrorBoundary>
                  <AboutUsPage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/faq"
              element={
                <ErrorBoundary>
                  <FAQPage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/contact"
              element={
                <ErrorBoundary>
                  <ContactPage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/services/grooming"
              element={
                <ErrorBoundary>
                  <GroomingPage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/services/hotels"
              element={
                <ErrorBoundary>
                  <HotelPage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/services/doctors"
              element={
                <ErrorBoundary>
                  <DoctorsPage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/services/training"
              element={
                <ErrorBoundary>
                  <PetTrainings />
                </ErrorBoundary>
              }
            />
            <Route
              path="/:type/:id"
              element={
                <ErrorBoundary>
                  <DetailPage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/login"
              element={
                <ErrorBoundary>
                  <Login />
                </ErrorBoundary>
              }
            />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/add-hotels"
              element={
                <AdminRoute>
                  <ErrorBoundary>
                    <AdminHotelPage />
                  </ErrorBoundary>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/add-groom"
              element={
                <AdminRoute>
                  <ErrorBoundary>
                    <AdminGroomsPage />
                  </ErrorBoundary>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/add-training-centers"
              element={
                <AdminRoute>
                  <ErrorBoundary>
                    <AdminTrainingPage />
                  </ErrorBoundary>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/add-doctor"
              element={
                <AdminRoute>
                  <ErrorBoundary>
                    <AdminClinicsPage />
                  </ErrorBoundary>
                </AdminRoute>
              }
            />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </ErrorBoundary>
  );
};
