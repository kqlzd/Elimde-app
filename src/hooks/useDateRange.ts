import { differenceInDays } from "date-fns";
import { useCallback, useEffect, useState } from "react";

export const useDateRange = (price: any) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const calculateTotalPrice = useCallback(() => {
    const days = differenceInDays(
      selectionRange.endDate,
      selectionRange.startDate
    );
    const dailyPrice = parseFloat(price ?? "0");
    const total = days * dailyPrice;

    setNumberOfDays(days);
    setTotalPrice(total);
    return { days, total };
  }, [selectionRange, price]);

  const handleSelect = (ranges: any) => {
    setSelectionRange(ranges.selection);
  };

  useEffect(() => {
    if (price) {
      calculateTotalPrice();
    }
  }, [price, selectionRange, calculateTotalPrice]);

  return {
    totalPrice,
    numberOfDays,
    selectionRange,
    handleSelect,
  };
};
