import { RouteObject } from "react-router-dom";
import {
  AboutUsPage,
  ContactPage,
  DetailPage,
  DoctorsPage,
  FAQPage,
  GroomingPage,
  HotelPage,
  MainPage,
  NotFoundPage,
  PetTrainings,
} from "../router/lazyComponents";
import { Login } from "../pages/Login/Login";
import { AdminPage } from "../Admin/AdminPage/AdminPage";
import { AdminHotelPage } from "../Admin/AdminHotelPage/AdminHotelPage";
import AdminGroomsPage from "../Admin/AdminGroomsPage/AdminGroomsPage";
import { AdminTrainingPage } from "../Admin/AdminTrainingPage/AdminTraningPage";
import { AdminClinicsPage } from "../Admin/AdminClinicsPage/AdminClinicsPage";
import { MainLayout } from "../layouts/MainLayout";

export const petRoutesConfig: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "about",
        element: <AboutUsPage />,
      },
      {
        path: "faq",
        element: <FAQPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "services/grooming",
        element: <GroomingPage />,
      },
      {
        path: "services/hotels",
        element: <HotelPage />,
      },
      {
        path: "services/doctors",
        element: <DoctorsPage />,
      },
      {
        path: "services/training",
        element: <PetTrainings />,
      },
      {
        path: ":type/:id",
        element: <DetailPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/admin/add-hotels",
    element: <AdminHotelPage />,
  },
  {
    path: "/admin/add-groom",
    element: <AdminGroomsPage />,
  },
  {
    path: "/admin/add-training-centers",
    element: <AdminTrainingPage />,
  },
  {
    path: "/admin/add-doctor",
    element: <AdminClinicsPage />,
  },
  {
    path: "/admin/add-training-centers",
    element: <AdminTrainingPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
