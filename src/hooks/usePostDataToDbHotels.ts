import { addDoc, collection } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../lib/firebaseConfig";
import { useForm } from "react-hook-form";

interface HotelData {
  hotelName: string;
  averageMarketPrice: number;
  address: string;
  longitude: string;
  latitude: string;
  imageFile: FileList;
  phone: string;
  price: number;
  trainingCenterName: string;
  workHours: string;
  relevantPerson: string;
  relevantPersonPhone: string;
  desc: string;
}

export const usePostDataToDbHotels = () => {
  const toast = useToast();

  const { register, handleSubmit, watch, reset } = useForm<HotelData>({});

  const watchedValues = watch();

  const uploadImage = async (file: File): Promise<string> => {
    const storage = getStorage();
    const imageRef = ref(storage, `hotels/${Date.now()}_${file.name}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  const onSubmit = async (data: HotelData) => {
    try {
      let imageUrl = "";

      if (data.imageFile && data.imageFile.length > 0) {
        imageUrl = await uploadImage(data.imageFile[0]);
      }

      await addDoc(collection(db, "hotels"), {
        name: data.hotelName,
        address: data.address,
        phone: data.phone,
        price: data.price,
        desc: data.desc,
        relevantPerson: data.relevantPerson,
        relevantPersonPhone: data.relevantPersonPhone,
        workHours: data.workHours,
        averageMarketPrice: data.averageMarketPrice,
        locations: {
          longitude: Number(data.longitude),
          latitude: Number(data.latitude),
        },
        imageUrl,
      });

      toast({
        title: "Uğurla əlavə edildi",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      reset();
    } catch (error) {
      console.error("Xəta:", error);
      toast({
        title: "Xəta baş verdi",
        description: "Məlumat əlavə edilmədi",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    watch: watchedValues,
    reset,
  };
};
