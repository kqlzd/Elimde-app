import {
  Award,
  Clock,
  Heart,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  PhoneCallIcon,
  Shield,
  Star,
  Users,
} from "lucide-react";

interface Categories {
  value: string;
  label: string;
}

export const categories: Categories[] = [
  {
    label: "Avtomobillər",
    value: "Avtomobillər",
  },
  {
    label: "Daşınmaz əmlak",
    value: "Daşınmaz əmlak",
  },
  {
    label: "Elektronika",
    value: "Elektronika",
  },
  {
    label: "Ev və bağ",
    value: "Ev və bağ",
  },
  {
    label: "Geyim və aksesuarlar",
    value: "Geyim və aksesuarlar",
  },
  {
    label: "Uşaq aləmi",
    value: "Uşaq aləmi",
  },
  {
    label: "Hobbi və istirahət",
    value: "Hobbi və istirahət",
  },
  {
    label: "Heyvanlar",
    value: "Heyvanlar",
  },
  {
    label: "Xidmətlər",
    value: "Xidmətlər",
  },
  {
    label: "İş",
    value: "İş",
  },
];

export const cardData = [
  {
    id: 1,
    title: "Oteller",
    slug: "hotels",
    description:
      "Öz evinizin rahatlığında ev heyvanlarınıza qulluq edəcək peşəkar baxıcı ilə özünüzü rahat hiss edin.",
    image: "/assets/cat1.webp",
    alt: "Green double couch with wooden legs",
  },
  {
    id: 2,
    title: "Tibbi Qulluq",
    slug: "doctors",
    description:
      "Ev heyvanınızın yaxinliqdaki ən yaxşı qayğını almasını təmin etmək üçün ixtisaslı mütəxəssislərlə əlaqə saxlayın.",
    image: "/assets/cat2.webp",
    alt: "Modern wooden coffee table",
  },
  {
    id: 3,
    title: "Təlim Merkəzləri",
    slug: "training",
    description:
      "Yeni ev dostunuzu tapmaq üçün peşəkar yetişdiricilərlə tanış olun. Onlar sevgi ilə böyüdür",
    image: "/assets/cat3.webp",
    alt: "Comfortable fabric armchair",
  },
  {
    id: 4,
    title: "Baxım",
    slug: "grooming",
    description:
      "Pet Care ilə heyvanınıza peşəkar qulluq göstərin – baxım, görünüş və sağlamlıq bir arada!",
    image: "/assets/cat4.webp",
    alt: "Wooden dining table set",
  },
];

export const stats = [
  { icon: Users, label: "Müştəri", value: "100+" },
  { icon: Star, label: "Reytinq", value: "4.9" },
  { icon: Award, label: "Xidmət", value: "5+" },
  { icon: Clock, label: "İl Təcrübə", value: "5+" },
];

export const services = [
  { name: "Pet Otelləri", link: "/services/hotels" },
  { name: "Veterinar Klinikalar", link: "/services/doctors" },
  { name: "Grooming Salonlar", link: "/services/grooming" },
  { name: "Təlim Mərkəzləri", link: "/services/training" },
];

export const quickLinks = [
  { name: "Haqqımızda", link: "/about" },
  { name: "Əlaqə", link: "/contact" },
  { name: "FAQ", link: "/faq" },
];

export const socialLinks = [
  {
    name: "WhatsApp",
    icon: PhoneCallIcon,
    link: "https://wa.me/994551234567",
    color: "#25D366",
    hoverColor: "green.500",
  },
  {
    name: "Instagram",
    icon: Instagram,
    link: "https://instagram.com/miyav.az",
    color: "#E4405F",
    hoverColor: "pink.500",
  },
];

export const contactMethods = [
  {
    icon: Phone,
    title: "Telefon Dəstəyi",
    description: "Dərhal kömək üçün zəng edin",
    contact: "+994 50 123 45 67",
    availability: "Hər gün 09:00-22:00",
    color: "#25D366",
    action: "tel:+994501234567",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Sürətli mesajlaşma",
    contact: "+994 50 123 45 67",
    availability: "24/7 mövcud",
    color: "#25D366",
    action: "https://wa.me/994501234567",
  },
  {
    icon: Mail,
    title: "E-mail Dəstəyi",
    description: "Ətraflı suallar üçün",
    contact: "info@miyav.az",
    availability: "24 saat ərzində cavab",
    color: "#EA4335",
    action: "mailto:info@miyav.az",
  },
  {
    icon: Instagram,
    title: "Instagram",
    description: "Sosial mediada izləyin",
    contact: "@miyav.az",
    availability: "Gündəlik yeniliklər",
    color: "#E4405F",
    action: "https://instagram.com/miyav.az",
  },
];

export const officeInfo = [
  {
    icon: MapPin,
    title: "Ünvan",
    details: ["Nizami rayonu", "28 May küçəsi", "Bakı, Azərbaycan"],
  },
  {
    icon: Clock,
    title: "İş Saatları",
    details: [
      "Bazar ertəsi - Cümə: 09:00-18:00",
      "Şənbə: 10:00-16:00",
      "Bazar: Bağlı",
    ],
  },
  {
    icon: Users,
    title: "Komanda",
    details: ["15+ Peşəkar", "5+ İl təcrübə", "24/7 Dəstək"],
  },
];

export const contactCategories = [
  "Ümumİ sual",
  "Hotel rezervasiyası",
  "Klinika xidmətləri",
  "Grooming",
  "Təlim mərkəzləri",
  "Texniki dəstək",
  "Şikayət",
  "Təklif",
  "Əməkdaşlıq",
];

export const faqCategories = [
  "Ümumİ",
  "Hotel",
  "Klinika",
  "Grooming",
  "Təlim",
  "Ödəniş",
];

export const faqData = [
  {
    id: "1",
    question: "Miyav.az nədir və necə işləyir?",
    answer:
      "Miyav.az Azərbaycanda ev heyvanları üçün müxtəlif xidmətləri bir platformada birləşdirən rəqəmsal həlldir. Siz burada hotel, klinika, grooming və təlim xidmətlərini tapa, müqayisə edə və rezerv edə bilərsiniz.",
    category: "Ümumİ",
  },

  {
    id: "3",
    question: "Hotel rezervasiyasını necə edə bilərəm?",
    answer:
      "Hotel səhifəsindən seçdiyiniz otelin kartına klikləyin, tarixi seçin və 'Rezerv Et' düyməsinə basın. Sonra əlaqə məlumatlarınızı daxil edərək rezervasiyanızı tamamlayın.",
    category: "Hotel",
  },
  {
    id: "4",
    question: "Hotel qiymətlərinə nə daxildir?",
    answer:
      "Hotel qiymətlərinə adətən günlük qalma, yemək və əsas baxım xidmətləri daxildir. Əlavə xidmətlər (grooming, oyun vaxtı və s.) ayrıca ödənilir.",
    category: "Hotel",
  },
  {
    id: "5",
    question: "Təcili hallarda klinikaya necə müraciət edə bilərəm?",
    answer:
      "Təcili hallarda klinika səhifəsindən 24/7 xidmət göstərən klinika kartlarını seçin və dərhal əlaqə nömrəsinə zəng edin. Bəzi klinikalar təcili yardım üçün xüsusi xətt təqdim edir.",
    category: "Klinika",
  },

  {
    id: "7",
    question: "Grooming xidməti nə qədər çəkir?",
    answer:
      "Grooming müddəti heyvanın növü və seçilən xidmətdən asılıdır. Orta hesabla: köpəklər üçün 1-3 saat, pişiklər üçün 30-90 dəqiqə.",
    category: "Grooming",
  },
  {
    id: "8",
    question: "Grooming-dən əvvəl nələrə diqqət etməliyəm?",
    answer:
      "Heyvanınızın stressini azaltmaq üçün əvvəlcədən tanışlıq planlaşdırın. Xəstə və ya yeni vaksinasiya olunmuş heyvanları gətirməyin.",
    category: "Grooming",
  },
  {
    id: "9",
    question: "Təlim proqramları neçə müddət davam edir?",
    answer:
      "Təlim proqramları növdən və səviyyədən asılı olaraq 2 həftədən 6 aya qədər davam edə bilər. Əsas itaət təlimi adətən 8-12 həftə çəkir.",
    category: "Təlim",
  },
  {
    id: "10",
    question: "Fərdi təlim mövcuddurmu?",
    answer:
      "Bəli, əksər təlim mərkəzləri fərdi və qrup dərsləri təklif edir. Fərdi dərslər daha sürətli nəticə verir, amma daha bahalıdır.",
    category: "Təlim",
  },
];

export const colorSchemes = [
  {
    gradient: "linear(135deg, #FF6B9D, #FF8E8E)",
    accentColor: "#FF6B9D",
    badgeScheme: "pink",
  },
  {
    gradient: "linear(135deg, #4299E1, #63B3ED)",
    accentColor: "#4299E1",
    badgeScheme: "blue",
  },
  {
    gradient: "linear(135deg, #9F7AEA, #B794F6)",
    accentColor: "#9F7AEA",
    badgeScheme: "purple",
  },
  {
    gradient: "linear(135deg, #F6AD55, #FBB041)",
    accentColor: "#F6AD55",
    badgeScheme: "orange",
  },
];

export const values = [
  {
    icon: Heart,
    title: "Sevgi və Qayğı",
    description:
      "Hər heyvan dostunuza maksimal sevgi və peşəkar qayğı göstəririk.",
    color: "#E53E3E",
  },
  {
    icon: Shield,
    title: "Güvən",
    description:
      "Təhlükəsiz və etibarlı xidmətlərlə heyvanlarınızın təhlükəsizliyini təmin edirik.",
    color: "#3182CE",
  },
  {
    icon: Users,
    title: "Komanda",
    description:
      "Təcrübəli və sertifikatlı mütəxəssislərimizdən ibarət güclü komanda.",
    color: "#38A169",
  },
  {
    icon: Award,
    title: "Keyfiyyət",
    description:
      "Yüksək standartlarda xidmət göstərərək müştəri məmnuniyyətini əsas götürürük.",
    color: "#D69E2E",
  },
];

export const aboutUsstats = [
  { number: "50+", label: "Xoşbəxt Müştəri" },
  { number: "5+", label: "Peşəkar Mütəxəssis" },
  { number: "24/7", label: "Dəstək Xidməti" },
  { number: "100%", label: "Müştəri Məmnuniyyəti" },
];

export const statsMainPage = [
  { icon: Star, value: "4.9", label: "Ortalama reytinq" },
  { icon: Users, value: "1,200+", label: "Məmnun müştəri" },
  { icon: Heart, value: "5,000+", label: "Xoşbəxt heyvan" },
  { icon: Shield, value: "100%", label: "Təhlükəsiz xidmət" },
];
