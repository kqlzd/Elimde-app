import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import { IDetailPageData } from "../models/api";

const formatDetailData = (id: string, rawData: any): IDetailPageData => {
  return {
    id,
    name: rawData.name ?? "",
    price: rawData.price ?? "",
    relevantPerson: rawData.relevantPerson ?? "",
    relevantPersonPhone: rawData.relevantPersonPhone ?? "",
    image: rawData.image ?? rawData.imageUrl ?? "",
    phone: rawData.phone ?? "",
    desc: rawData.desc ?? "",
    address: rawData.address ?? "",
    workHours: rawData.workHours ?? "",
    locations: rawData.locations
      ? {
          latitude: Number(rawData?.locations?.latitude),
          longitude: Number(rawData?.locations?.longitude),
        }
      : undefined,
    createdAt: rawData.createdAt ?? null,
  };
};

export const useDetailData = (id?: string, type?: string) => {
  const [data, setData] = useState<IDetailPageData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!id || !type) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const docRef = doc(db, type, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const rawData = docSnap.data();
        const formattedData = formatDetailData(docSnap.id, rawData);
        setData(formattedData);
      } else {
        setError("Məlumat tapılmadı");
        console.log("Məlumat tapılmadı");
      }
    } catch (err) {
      setError("Xəta baş verdi");
      console.error("Xəta baş verdi:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    fetchData,
  };
};
