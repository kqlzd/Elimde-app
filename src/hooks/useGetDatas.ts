import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export const useGetDatas = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "listings"));
        const data = snapshot.docs.map((doc) => {
          const docData = doc.data();

          const formatCreatedAt = (dateValue: any) => {
            if (!dateValue) return "";

            try {
              if (dateValue?.toDate) {
                return dayjs(dateValue.toDate()).format("YYYY-MM-DD HH:mm");
              } else if (typeof dateValue === "string") {
                const parsedDate = dayjs(dateValue);
                if (parsedDate.isValid()) {
                  return parsedDate.format("YYYY-MM-DD HH:mm");
                } else {
                  return "";
                }
              } else if (dateValue instanceof Date) {
                return dayjs(dateValue).format("YYYY-MM-DD HH:mm");
              }
            } catch (error) {
              return "";
            }

            return "";
          };

          return {
            id: doc.id,
            title: docData.title ?? "",
            desc: docData.desc ?? "",
            price: docData.price ?? "",
            city: docData.city ?? "",
            category: docData.category ?? "",
            phone: docData.phone ?? "",
            fullName: docData.fullName ?? "",
            imageUrl: docData.imageUrl ?? "",
            createdAt: formatCreatedAt(docData.createdAt),
          };
        });

        setCards(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { cards, isLoading };
};
