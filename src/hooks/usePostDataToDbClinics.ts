import { addDoc, collection } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../lib/firebaseConfig";
import { useForm } from "react-hook-form";

interface ClinicsData {
  experience: string;
  name: string;
  consultation: number;
  address: string;
  longitude: string;
  latitude: string;
  imageFile: FileList;
  phone: string;
  workHours: string;
  relevantPerson: string;
  relevantPersonPhone: string;
  desc: string;
}

export const usePostDataToDbClinics = () => {
  const toast = useToast();

  const { register, handleSubmit, watch, reset } = useForm<ClinicsData>({});

  const watchedValues = watch();

  const uploadImage = async (file: File): Promise<string> => {
    const storage = getStorage();
    const imageRef = ref(storage, `hospitals/${Date.now()}_${file.name}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  const onSubmit = async (data: ClinicsData) => {
    try {
      let imageUrl = "";

      if (data.imageFile && data.imageFile.length > 0) {
        imageUrl = await uploadImage(data.imageFile[0]);
      }

      await addDoc(collection(db, "hospitals"), {
        name: data.name,
        address: data.address,
        phone: data.phone,
        consultation: data.consultation,
        experience: data.experience,
        desc: data.desc,
        relevantPerson: data.relevantPerson,
        relevantPersonPhone: data.relevantPersonPhone,
        workHours: data.workHours,
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
