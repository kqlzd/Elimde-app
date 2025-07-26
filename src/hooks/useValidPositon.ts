import { IDetailPageData } from "../models/api";

export const useValidPositon = (data: IDetailPageData) => {
  const validPosition: [number, number] | null =
    data.locations &&
    !isNaN(data.locations.latitude) &&
    !isNaN(data.locations.longitude) &&
    data.locations.latitude >= -90 &&
    data.locations.latitude <= 90 &&
    data.locations.longitude >= -180 &&
    data.locations.longitude <= 180
      ? [data.locations.latitude, data.locations.longitude]
      : null;

  return { validPosition };
};
