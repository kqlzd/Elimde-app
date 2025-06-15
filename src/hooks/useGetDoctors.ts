import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

export const useGetDoctorsData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [doctors, setDoctors] = useState<any[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, "hospitals"));
        const doctorList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<any, "id">),
        }));
        setDoctors(doctorList);
      } catch (error) {
        console.error("Xəta baş verdi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return { isLoading, doctors };
};
