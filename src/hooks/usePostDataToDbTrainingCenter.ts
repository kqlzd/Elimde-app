import { addDoc, collection } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../lib/firebaseConfig";
import { useForm } from "react-hook-form";

interface TrainingCenterData {
  address: string;
  longitude: string;
  latitude: string;
  imageFile: FileList;
  phone: string;
  workHours: string;
  relevantPerson: string;
  relevantPersonPhone: string;
  desc: string;
  monthlySubscription: number;
  traningDuration: string;
  name: string;
}

export const usePostDataToDbTrainingCenter = () => {
  const toast = useToast();

  const { register, handleSubmit, watch, reset } =
    useForm<TrainingCenterData>();

  const watchedValues = watch();

  const uploadImage = async (file: File): Promise<string> => {
    const storage = getStorage();
    const imageRef = ref(storage, `trainingcenters/${Date.now()}_${file.name}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data: TrainingCenterData) => {
    try {
      let imageUrl = "";

      if (data.imageFile && data.imageFile.length > 0) {
        const file = data.imageFile[0];
        imageUrl = await uploadImage(data.imageFile[0]);

        if (file.size > 1024 * 1024) {
          throw new Error("Şəkil ölçüsü 1MB-dan böyük ola bilməz");
        }

        imageUrl = await convertToBase64(file);
      }

      await addDoc(collection(db, "trainingcenters"), {
        address: data.address,
        phone: data.phone,
        workHours: data.workHours,
        relevantPerson: data.relevantPerson,
        relevantPersonPhone: data.relevantPersonPhone,
        desc: data.desc,
        monthlySubscription: data.monthlySubscription,
        traningDuration: data.traningDuration,
        name: data.name,
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
