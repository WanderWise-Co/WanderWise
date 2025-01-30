import { createContext, useState } from "react";

// Create and export Context
export const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [placeType, setPlaceType] = useState("");
  const [transportPlaneData, setTransportPlaneData] = useState<any>(null);
  const [transportPlaneRecoData, setTransportPlaneRecoData] =
    useState<any>(null);
  const [transportBusesData, setTransportBusesData] = useState<any>(null);
  const [transportBusesRecoData, setTransportBusesRecoData] =
    useState<any>(null);
  const [transportRentalData, setTransportRentalData] = useState<any>(null);
  const [gemeniData, setGemeniData] = useState<any>(null);
  const [hotelRecoData, setHotelRecoData] = useState<any>(null);
  const [navButton, setNavButton] = useState<string>("");

  return (
    <AppContext.Provider
      value={{
        placeType,
        setPlaceType,
        transportPlaneData,
        setTransportPlaneData,
        transportPlaneRecoData,
        setTransportPlaneRecoData,
        transportBusesData,
        setTransportBusesData,
        transportBusesRecoData,
        setTransportBusesRecoData,
        transportRentalData,
        setTransportRentalData,
        gemeniData,
        setGemeniData,
        hotelRecoData,
        setHotelRecoData,
        navButton,
        setNavButton,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
