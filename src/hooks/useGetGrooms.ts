import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import { TGroomsData } from "../models/api";

export const useGetGroomsData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [grooms, setGrooms] = useState<TGroomsData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrooms = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, "grooms"));
        const groomList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<TGroomsData, "id">),
        }));
        setGrooms(groomList);
      } catch (error) {
        setError("Groomlar yüklənərkən xəta baş verdi");
        console.error("Xəta baş verdi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGrooms();
  }, []);

  return { isLoading, grooms, error };
};
