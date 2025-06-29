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
};
