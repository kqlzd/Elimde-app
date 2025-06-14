import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ShowAds } from "./pages/ShowAds/ShowAds";
import { DetailPage } from "./pages/DetailPage/DetailPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { Header } from "./components/Header/Header";
import { GroomingPage } from "./pages/GroomingPage/GroomingPage";
import { HotelPage } from "./pages/HotelPage/HotelPage";
import { DoctorsPage } from "./pages/DoctorsPage/DoctorsPage";
import PetDetailPage from "./pages/PetDetailPage/PetDetailPage";
import { PetTrainings } from "./pages/PetTrainings/PetTrainings";
import { Footer } from "./components/Footer/Footer";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
