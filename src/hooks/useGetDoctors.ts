import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import { TDoctorData } from "../models/api";

export const useGetDoctorsData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [doctors, setDoctors] = useState<TDoctorData[]>([]);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, "hospitals"));
        const doctorList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<TDoctorData, "id">),
        }));
        setDoctors(doctorList);
      } catch (error) {
        setError("Klinikalar yüklənərkən xəta baş verdi");
        console.error("Xəta baş verdi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return { isLoading, doctors, error };
};
