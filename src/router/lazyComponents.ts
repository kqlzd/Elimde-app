import { lazy } from "react";

export const MainPage = lazy(() =>
  import("../pages/MainPage/MainPage").then((module) => ({
    default: module.MainPage
  }))
);

export const NotFoundPage = lazy(() =>
  import("../pages/NotFound/NotFound").then((module) => ({
    default: module.NotFoundPage,
  }))
);

export const AboutUsPage = lazy(() =>
  import("../pages/AboutUsPage/AboutUsPage").then((module) => ({
    default: module.AboutUsPage,
  }))
);

export const FAQPage = lazy(() =>
  import("../pages/Faq/Faq").then((module) => ({
    default: module.FAQPage,
  }))
);

export const ContactPage = lazy(() =>
  import("../pages/Contact/Contact").then((module) => ({
    default: module.ContactPage,
  }))
);

export const GroomingPage = lazy(() =>
  import("../pages/GroomingPage/GroomingPage").then((module) => ({
    default: module.GroomingPage,
  }))
);

export const HotelPage = lazy(() =>
  import("../pages/HotelPage/HotelPage").then((module) => ({
    default: module.HotelPage,
  }))
);

export const DoctorsPage = lazy(() =>
  import("../pages/DoctorsPage/DoctorsPage").then((module) => ({
    default: module.DoctorsPage,
  }))
);

export const PetTrainings = lazy(() =>
  import("../pages/PetTrainings/PetTrainings").then((module) => ({
    default: module.PetTrainings,
  }))
);

export const DetailPage = lazy(() =>
  import("../pages/DetailPage/DetailPage").then((module) => ({
    default: module.DetailPage,
  }))
);
