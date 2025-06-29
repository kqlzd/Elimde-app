import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ShowAds } from "./user/ShowAds/ShowAds";
import { DetailPage } from "./user/DetailPage/DetailPage";
import { MainPage } from "./user/MainPage/MainPage";
import { Header } from "./user/components/Header/Header";
import { GroomingPage } from "./user/GroomingPage/GroomingPage";
import { HotelPage } from "./user/HotelPage/HotelPage";
import { DoctorsPage } from "./user/DoctorsPage/DoctorsPage";
import PetDetailPage from "./user/PetDetailPage/PetDetailPage";
import { PetTrainings } from "./user/PetTrainings/PetTrainings";
// import { Footer } from "./components/Footer/Footer";
import { ScrollToTop } from "./user/components/ScrollToTop/ScrollToTop";
import { AdminPage } from "./Admin/AdminPage/AdminPage";
import { Login } from "./user/Login/Login";
import { AdminHotelPage } from "./Admin/AdminHotelPage/AdminHotelPage";
import AdminGroomsPage from "./Admin/AdminGroomsPage/AdminGroomsPage";
import { AdminTrainingPage } from "./Admin/AdminTrainingPage/AdminTraningPage";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/ShowAda" element={<ShowAds />} />
        <Route path="/services/grooming" element={<GroomingPage />} />
        <Route path="/detail/categories/:id" element={<PetDetailPage />} />
        <Route path="/services/hotels" element={<HotelPage />} />
        <Route path="/services/doctors" element={<DoctorsPage />} />
        <Route path="/services/training" element={<PetTrainings />} />
        <Route path="/:type/:id" element={<DetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/add-hotels" element={<AdminHotelPage />} />
        <Route path="/admin/add-groom" element={<AdminGroomsPage />} />
        <Route
          path="/admin/add-training-centers"
          element={<AdminTrainingPage />}
        />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};
