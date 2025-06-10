import { useState } from "react";
import { db, auth } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import {
  Box,
  Text,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { categories } from "../../consts/consts";

export const CreateAd = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Mobilya");
  const [image, setImage] = useState<File | null>(null);
  const [city, setCity] = useState("Baku");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [isDaily, setIsDaily] = useState(false);
  const [isWeekly, setIsWeekly] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);
  const [loading, setLoading] = useState(false);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (!auth.currentUser) {
        toast({
          title: "Giriş tələbi!",
          description: "Elan yerləşdirmək üçün əvvəlcə giriş etməlisiniz.",
          status: "warning",
          position: "top-right",
          duration: 3000,
        });
        setLoading(false);
        navigate("/login");
        return;
      }

      let imageUrl = "";

      if (image) {
        try {
          imageUrl = await convertToBase64(image);
        } catch (uploadError) {
          toast({
            title: "Xəbərdarlıq!",
            description: "Şəkil yükləmə uğursuz oldu, amma elan yaradılacaq",
            status: "warning",
            position: "top-right",
            duration: 3000,
          });
          imageUrl = "";
        }
      }

      await addDoc(collection(db, "listings"), {
        title,
        desc,
        price,
        city,
        category,
        phone,
        fullName,
        imageUrl,
        isDaily,
        isWeekly,
        isMonthly,
        userId: auth.currentUser?.uid,
        createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      });

      toast({
        title: "Ugurlu!",
        description: "Elan yerleşdirildi",
        status: "success",
        position: "top-right",
        duration: 2000,
      });
      setTitle("");
      setDesc("");
      setPrice("");
      setCity("");
      setPhone("");
      setFullName("");
      setImage(null);
    } catch (err) {
      toast({
        title: "Xəta!",
        description: "Elan yerleşdirlmədi",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        maxW="800px"
        mx="auto"
        mt={8}
        p="20px"
        bg="ghostwhite"
        borderRadius="12px"
        boxShadow="lg"
      >
        <Heading as="h2" size="lg" mb={6} textAlign="left" color="blue.600">
          Yeni Elan Əlavə Et
        </Heading>
        <Flex direction="column" gap={4}>
          <FormControl isRequired>
            <FormLabel>Elanın başlığı</FormLabel>
            <Input
              placeholder="Məsələn: Kamera kirayə verilir"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Kateqoriya</FormLabel>
            <Select
              maxW={300}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((ctg) => {
                return <option value={ctg.value}>{ctg.label}</option>;
              })}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Qiymət</FormLabel>
            <Flex gap={2}>
              <Input
                maxW={300}
                placeholder="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
              />
              <Select maxW="100px">
                <option>AZN</option>
              </Select>
            </Flex>
          </FormControl>

          <Flex direction="row" gap={8}>
            <Checkbox
              isChecked={isDaily}
              onChange={(e) => setIsDaily(e.target.checked)}
            >
              <span>Günlük</span>
            </Checkbox>
            <Checkbox
              isChecked={isWeekly}
              onChange={(e) => setIsWeekly(e.target.checked)}
            >
              <span>Həftəlik</span>
            </Checkbox>
            <Checkbox
              isChecked={isMonthly}
              onChange={(e) => setIsMonthly(e.target.checked)}
            >
              <span>Aylıq</span>
            </Checkbox>
          </Flex>

          <FormControl isRequired>
            <FormLabel>Şəhər</FormLabel>
            <Select maxW={300} onChange={(e) => setCity(e.target.value)}>
              <option>Bakı</option>
              <option>Gəncə</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Təsvir</FormLabel>
            <Textarea
              maxW={350}
              placeholder="Elanınız haqqında ətraflı məlumat yazın..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={5}
            />
          </FormControl>

          <Box>
            <Text fontSize="lg" fontWeight="semibold" mb={3}>
              Əlaqə məlumatları
            </Text>

            <Flex direction="column" gap={3}>
              <FormControl isRequired>
                <FormLabel>Ad və soyad</FormLabel>
                <Input
                  maxW={300}
                  placeholder="Adınız və soyadınız"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Telefon nömrəsi</FormLabel>
                <Input
                  type="number"
                  maxW={300}
                  placeholder="+994 XX XXX XX XX"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  maxW={300}
                  type="email"
                  placeholder="email@example.com"
                />
              </FormControl>
            </Flex>
          </Box>

          <FormControl>
            <FormLabel>Şəkillər</FormLabel>
            <Input
              type="file"
              accept="image/*"
              multiple={false}
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              pt={1}
            />
            <Text fontSize="sm" color="gray.500" mt={1}>
              Maksimum 1 şəkil yükləyə bilərsiniz
            </Text>
          </FormControl>

          {/* <FormControl>
            <FormLabel>Şəkillər</FormLabel>
            <Input type="file" accept="image/*" multiple pt={1} />
            <Text fontSize="sm" color="gray.500" mt={1}>
              Maksimum 10 şəkil yükləyə bilərsiniz
            </Text>
          </FormControl> */}

          <Button
            onClick={handleSubmit}
            colorScheme="blue"
            width={"20%"}
            isLoading={loading}
            mt={4}
          >
            Elan Yarat
          </Button>
        </Flex>
      </Box>
    </>
  );
};
