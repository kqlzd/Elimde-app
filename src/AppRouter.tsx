import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ShowAds } from "./pages/ShowAds/ShowAds";
import { CreateAd } from "./pages/CreateAd/CreateAd";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { DetailPage } from "./pages/DetailPage/DetailPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { Header } from "./components/Header/Header";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/ShowAda" element={<ShowAds />} />
        <Route path="/create" element={<CreateAd />} />
        <Route path="/details/:id" element={<DetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
