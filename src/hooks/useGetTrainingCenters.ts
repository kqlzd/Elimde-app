import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

export const useGetTrainingsData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trainingCenters, setTrainingCenters] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrainingsData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "trainingcenters"));
        const trainingCenters = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<any, "id">),
        }));
        setTrainingCenters(trainingCenters);
      } catch (error) {
        console.error("Xəta baş verdi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrainingsData();
  }, []);

  return { isLoading, trainingCenters };
};
