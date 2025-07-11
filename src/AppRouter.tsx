import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DetailPage } from "./pages/DetailPage/DetailPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { Header } from "./pages/components/Header/Header";
import { GroomingPage } from "./pages/GroomingPage/GroomingPage";
import { HotelPage } from "./pages/HotelPage/HotelPage";
import { DoctorsPage } from "./pages/DoctorsPage/DoctorsPage";
import { PetTrainings } from "./pages/PetTrainings/PetTrainings";
import { AdminPage } from "./Admin/AdminPage/AdminPage";
import { Login } from "./pages/Login/Login";
import { AdminHotelPage } from "./Admin/AdminHotelPage/AdminHotelPage";
import AdminGroomsPage from "./Admin/AdminGroomsPage/AdminGroomsPage";
import { AdminTrainingPage } from "./Admin/AdminTrainingPage/AdminTraningPage";
import { AdminClinicsPage } from "./Admin/AdminClinicsPage/AdminClinicsPage";
import { AdminRoute } from "./Admin/components/AdminRoute/AdminRoute";
import { Footer } from "./pages/components/Footer/Footer";
import { AboutUsPage } from "./pages/AboutUsPage/AboutUsPage";
import { FAQPage } from "./pages/Faq/Faq";
import { ContactPage } from "./pages/Contact/Contact";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services/grooming" element={<GroomingPage />} />
        {/* <Route path="/detail/categories/:id" element={<PetDetailPage />} /> */}
        <Route path="/services/hotels" element={<HotelPage />} />
        <Route path="/services/doctors" element={<DoctorsPage />} />
        <Route path="/services/training" element={<PetTrainings />} />
        <Route path="/:type/:id" element={<DetailPage />} />
        <Route path="/login" element={<Login />} />

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
              <AdminHotelPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-groom"
          element={
            <AdminRoute>
              <AdminGroomsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-training-centers"
          element={
            <AdminRoute>
              <AdminTrainingPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-doctor"
          element={
            <AdminRoute>
              <AdminClinicsPage />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
