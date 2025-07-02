// // components/ProtectedRoute.tsx
// import React, { useEffect, useState } from "react";
// import { Box, Spinner, Text } from "@chakra-ui/react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../../lib/firebaseConfig";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   requireAdmin?: boolean;
// }

// export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   children,
//   requireAdmin = false,
// }) => {
//   const auth = getAuth();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   const checkAdminStatus = async (user: any) => {
//     if (!requireAdmin) return true;

//     try {
//       const userDoc = await getDoc(doc(db, "users", user.uid));
//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         return userData.role === "admin" || userData.isAdmin === true;
//       }
//       return false;
//     } catch (error) {
//       console.error("Admin kontrolü hatası:", error);
//       return false;
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (!user) {
//         navigate("/login");
//         return;
//       }

//       if (requireAdmin) {
//         const adminStatus = await checkAdminStatus(user);
//         if (!adminStatus) {
//           alert("Bu sayfaya erişim yetkiniz yok!");
//           navigate("/");
//           return;
//         }
//       }

//       setIsAuthorized(true);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [auth, navigate, requireAdmin]);

//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         height="100vh"
//       >
//         <Spinner size="xl" />
//         <Text ml={4}>
//           {requireAdmin
//             ? "Yetki kontrolü yapılıyor..."
//             : "Giriş kontrol ediliyor..."}
//         </Text>
//       </Box>
//     );
//   }

//   if (!isAuthorized) {
//     return null;
//   }

//   return <>{children}</>;
// };

export {};
