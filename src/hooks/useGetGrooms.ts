import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

export const useGetGroomsData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [grooms, setGrooms] = useState<any[]>([]);

  useEffect(() => {
    const fetchGrooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "grooms"));
        const groomList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<any, "id">),
        }));
        setGrooms(groomList);
      } catch (error) {
        console.error("Xəta baş verdi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGrooms();
  }, []);

  return { isLoading, grooms };
};
