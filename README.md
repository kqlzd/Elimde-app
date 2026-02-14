# Elimde - Pet Services Platform

A modern, full-stack pet services marketplace connecting pet owners with professional care providers in Azerbaijan. Built with React, TypeScript, and Firebase.

## Features

### For Pet Owners
- **Browse Services** - Explore veterinary clinics, grooming salons, pet hotels, and training centers
- **Advanced Filtering** - Search by location, price range, and service type
- **Interactive Maps** - View service locations with Leaflet integration
- **Service Details** - Comprehensive information including galleries, contact details, and availability
- **Responsive Design** - Optimized experience across all devices

### For Administrators
- **Service Management** - Full CRUD operations for all service categories
- **Image Uploads** - Firebase Storage integration for service galleries
- **Dashboard** - Overview statistics and management tools
- **Authentication** - Secure admin access with Firebase Auth

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, TypeScript, Chakra UI |
| **Routing** | React Router DOM v6 |
| **State & Forms** | React Hook Form |
| **Backend** | Firebase (Firestore, Auth, Storage) |
| **Maps** | Leaflet, React Leaflet |
| **Animations** | Framer Motion |
| **Styling** | Emotion, Chakra UI |
| **Icons** | Lucide React, React Icons |
| **Date Handling** | Day.js, date-fns |
| **SEO** | React Helmet Async |

## Project Structure

```
src/
├── pages/              # Main page components
│   ├── MainPage/       # Homepage
│   ├── HotelPage/      # Pet hotels listing
│   ├── DoctorsPage/    # Veterinary clinics
│   ├── GroomingPage/   # Grooming services
│   ├── PetTrainings/   # Training centers
│   └── DetailPage/     # Dynamic service details
├── Admin/              # Admin dashboard & management
│   ├── AdminPage/      # Dashboard
│   └── Admin*Page/     # Service management pages
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── layouts/            # Page layouts
├── routes/             # Route configuration
├── lib/                # Firebase configuration
├── models/             # TypeScript type definitions
└── utils/              # Constants & helper functions
```

## Getting Started

### Prerequisites

- Node.js 14+
- npm or yarn
- Firebase project with Firestore, Auth, and Storage enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/elimde-app.git
   cd elimde-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm build` | Create production build |
| `npm test` | Run tests in watch mode |
| `npm run lint` | Check code with ESLint |
| `npm run lint:fix` | Auto-fix linting issues |

## Routes

| Path | Description |
|------|-------------|
| `/` | Homepage |
| `/services/hotels` | Pet hotels listing |
| `/services/doctors` | Veterinary clinics |
| `/services/grooming` | Grooming services |
| `/services/training` | Training centers |
| `/:type/:id` | Service detail page |
| `/about` | About us |
| `/contact` | Contact page |
| `/faq` | FAQ |
| `/admin` | Admin dashboard (protected) |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

---

Built with care for pet lovers in Azerbaijan
