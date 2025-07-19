import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import { THotelData } from "../models/api";

export const useGetHotelsData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hotels, setHotels] = useState<THotelData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, "hotels"));
        const hotelList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<THotelData, "id">),
        }));
        setHotels(hotelList);
      } catch (error) {
        setError("Otellər yüklənərkən xəta baş verdi");
        console.error("Xəta baş verdi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotels();
  }, []);

  return { isLoading, hotels, error };
};
