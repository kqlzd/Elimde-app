import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ShowAds } from "./pages/ShowAds/ShowAds";
import { CreateAd } from "./pages/CreateAd/CreateAd";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Header } from "./components/Header/Header";
import { DetailPage } from "./pages/DetailPage/DetailPage";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ShowAds />} />
        <Route path="/create" element={<CreateAd />} />
        <Route path="/details/:id" element={<DetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
