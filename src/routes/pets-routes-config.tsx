import { RouteObject } from "react-router-dom";
import {
  MainPage,
  AboutUsPage,
  FAQPage,
  ContactPage,
  GroomingPage,
  HotelPage,
  DoctorsPage,
  PetTrainings,
  DetailPage,
  Login,
  AdminPage,
  AdminHotelPage,
  AdminGroomsPage,
  AdminTrainingPage,
  AdminClinicsPage,
  NotFoundPage,
} from "../pages";
import { AdminLayout, MainLayout } from "../layouts";
import { AdminRoute } from "../Admin/components/AdminRoute/AdminRoute";

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
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: "add-hotels",
        element: <AdminHotelPage />,
      },
      {
        path: "add-groom",
        element: <AdminGroomsPage />,
      },
      {
        path: "add-training-centers",
        element: <AdminTrainingPage />,
      },
      {
        path: "add-doctor",
        element: <AdminClinicsPage />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
];
