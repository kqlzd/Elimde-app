export type TDoctorData = {
  id: string;
  address: string;
  desc: string;
  name: string;
  phone: string;
  image: string;
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
};
