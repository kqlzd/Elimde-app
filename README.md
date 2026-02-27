# 🐾 Meow.az — Pet Services Platform

Azərbaycanda ev heyvanları üçün ən böyük xidmət platforması. Hotel, klinika, grooming salon və təlim mərkəzlərini bir yerdə tapın.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?logo=firebase)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-v2-teal?logo=chakraui)

---

## ✨ Features

- 🏨 **Pet Otelləri** — Rezerv məlumatları, tarix seçimi, xəritə
- 🩺 **Veterinar Klinikalar** — Həkim axtarışı, konsultasiya qiyməti, təcrübə
- ✂️ **Grooming Salonları** — Qiymət, ortalama müddət, rayon filtri
- 🎓 **Təlim Mərkəzləri** — Aylıq abunə, sertifikasiya, kurs müddəti
- 🗺️ **Leaflet Xəritə** — Hər xidmətin əsas lokasiyası
- 🔍 **Axtarış & Filter** — Ad, rayon, qiymət aralığı, debounced search
- 📱 **Responsive Design** — Mobil, tablet, desktop
- 🔐 **Admin Panel** — Firebase auth ilə qorunur, CRUD əməliyyatları
- ⚡ **Lazy Loading** — React.lazy ilə route-based code splitting
- 🛡️ **Error Boundary** — Xəta idarəetməsi
- 🔎 **SEO** — React Helmet ilə hər səhifə üçün meta teqlər

---

## 🛠️ Tech Stack

| Texnologiya | İstifadə |
|---|---|
| [React 18](https://react.dev) | UI framework |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Firebase Firestore](https://firebase.google.com) | Database |
| [Firebase Auth](https://firebase.google.com) | Admin authentication |
| [Firebase Storage](https://firebase.google.com) | Şəkil yükləmə |
| [Chakra UI v2](https://chakra-ui.com) | UI komponentləri |
| [React Router v6](https://reactrouter.com) | Routing |
| [React Hook Form](https://react-hook-form.com) | Form idarəetməsi |
| [Framer Motion](https://www.framer-motion.com) | Animasiyalar |
| [React Leaflet](https://react-leaflet.js.org) | Xəritə |
| [Lucide React](https://lucide.dev) | İkonlar |
| [React Helmet Async](https://github.com/staylor/react-helmet-async) | SEO |
| [use-debounce](https://github.com/xnimorz/use-debounce) | Axtarış optimizasiyası |
| [date-fns](https://date-fns.org) | Tarix hesablamaları |

---

## 🚀 Başlamaq

### Tələblər

- Node.js 18+

### Quraşdırma

```bash
git clone https://github.com/username/meow-az.git
cd meow-az
npm install
```

### Ətraf mühit dəyişənləri

`.env` faylı yaradın:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Başlatmaq

```bash
npm start
```

---

## 🗂️ Layihə Strukturu

```
src/
├── Admin/                  # Admin panel səhifələri
│   ├── AdminClinicsPage/
│   ├── AdminGroomsPage/
│   ├── AdminHotelPage/
│   ├── AdminTrainingPage/
│   ├── AdminPage/
│   └── components/
│       ├── AdminNavbar/
│       └── AdminRoute/     # Admin route qoruması
├── components/
│   ├── DoctorsCards/
│   ├── ErrorBoundary/
│   ├── GroomingCards/
│   ├── Header/
│   ├── HotelCards/
│   ├── Loading/
│   ├── Map/                # Leaflet xəritə
│   ├── PetCards/
│   ├── PetTrainingCards/
│   └── Seo/
├── hooks/
│   ├── useAdminAuth.ts
│   ├── useDateRange.ts
│   ├── useDetailPage.ts
│   ├── useGetDoctors.ts
│   ├── useGetGrooms.ts
│   ├── useGetHotelsData.ts
│   ├── useGetTrainingCenters.ts
│   ├── useLinkShare.ts
│   └── usePostDataToDb*.ts # Firebase CRUD hookları
├── layouts/
│   ├── MainLayout.tsx
│   └── AdminLayout.tsx
├── lib/
│   └── firebaseConfig.ts
├── models/
│   └── api.d.ts
├── pages/
│   ├── AboutUsPage/
│   ├── Contact/
│   ├── DetailPage/         # Universal detail səhifəsi
│   ├── DoctorsPage/
│   ├── Faq/
│   ├── GroomingPage/
│   ├── HotelPage/
│   ├── Login/
│   ├── MainPage/
│   ├── NotFound/
│   └── PetTrainings/
├── router/
│   └── lazyComponents.ts   # Lazy loading
├── routes/
│   └── pets-routes-config.tsx
└── utils/
    ├── constants/
    └── helpers/
```

---

## 🛤️ Routelar

| Yol | Səhifə |
|---|---|
| `/` | Ana Səhifə |
| `/services/hotels` | Pet Otelləri |
| `/services/doctors` | Veterinar Klinikalar |
| `/services/grooming` | Grooming Salonları |
| `/services/training` | Təlim Mərkəzləri |
| `/:type/:id` | Detail Səhifəsi |
| `/about` | Haqqımızda |
| `/contact` | Əlaqə |
| `/faq` | Tez-tez Verilən Suallar |
| `/login` | Admin Giriş |
| `/admin` | Admin Dashboard |
| `/admin/add-hotels` | Otel Əlavə Et |
| `/admin/add-doctor` | Klinika Əlavə Et |
| `/admin/add-groom` | Grooming Salon Əlavə Et |
| `/admin/add-training-centers` | Təlim Mərkəzi Əlavə Et |

---

## 🔒 Admin Panel

Firebase Authentication istifadə edir. Admin rolu Firestore-da `users/{uid}` sənədindəki `role: "admin"` sahəsi ilə müəyyənləşir.

---

## 📦 Firebase Kolleksiyalar

| Kolleksiya | Məzmun |
|---|---|
| `hotels` | Pet otelləri |
| `hospitals` | Veterinar klinikalar |
| `grooms` | Grooming salonları |
| `trainingcenters` | Təlim mərkəzləri |
| `users` | Admin istifadəçilər |

---

## 🔮 Roadmap

- [ ] Rezervasiya sistemi (real-time)
- [ ] İstifadəçi qeydiyyatı
- [ ] Rəy və reytinq sistemi
- [ ] Push bildirişlər
- [ ] Multi-dil dəstəyi (AZ/EN/RU)
- [ ] PWA dəstəyi

---

## 📄 Lisenziya

MIT
