export type TDoctorData = {
  id: string;
  address: string;
  desc: string;
  name: string;
  phone: string;
  image: string;
  consultation: number;
  experience: number;
  relevantPerson: string;
  relevantPersonPhone: string;
  workHours: string;
  isNowOpened: boolean;
};

export type TGroomsData = {
  id: string;
  address: string;
  desc: string;
  name: string;
  phone: string;
  image: string;
  price: number;
  averageTime: string;
};

interface IHotelLocations {
  latitude: string;
  longitude: string;
}

export type THotelData = {
  id: string;
  address: string;
  desc: string;
  name: string;
  phone: string;
  image: string;
  price: number;
  locations: IHotelLocations;
  averageMarketPrice: number;
};

export type TTrainingData = {
  id: string;
  address: string;
  desc: string;
  name: string;
  phone: string;
  imageUrl: string;
  monthlySubscription: number;
  locations: IHotelLocations;
  trainingDuration: string;
  isCertificated: boolean;
};

export interface IDetailPageData {
  id?: string;
  name?: string;
  price?: string;
  relevantPerson?: string;
  relevantPersonPhone?: string;
  image?: string;
  phone?: string;
  desc?: string;
  address?: string;
  workHours?: string;
  locations?: {
    latitude: number;
    longitude: number;
  };
  createdAt?: any;
}
