import axios from "axios";
import { toast } from "react-toastify";

const handleBusClick = async (
  setTransportBusesData: (data: any) => void,
  setTransportBusesRecoData: (data: any) => void
) => {
  const token = localStorage.getItem("token");
  const from = localStorage.getItem("from");
  const to = localStorage.getItem("to");
  const sDate = localStorage.getItem("startDate");
  const eDate = localStorage.getItem("endDate");
  if (!token) {
    toast.error("Unauthorized access");
    return;
  }
  if (!(from && to && sDate && eDate)) {
    toast.error("Input token and other details are required");
    return;
  }
  try {
    console.log("fetching");

    console.log("Fetching bus data...");
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/api/v1/planpage/transport/bus`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          from,
          to,
          startDate: sDate,
          endDate: eDate,
        },
      }
    );
    console.log("Bus data fetched successfully:", response.data.data);
    setTransportBusesData(response.data.data);
    const reco_response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/api/v1/planpage/recommendation/busreco`,
      {
        headers: {
          Authorization: ` Bearer ${token} `,
        },
      }
    );
    console.log(reco_response);
    setTransportBusesRecoData(reco_response.data.data);
  } catch (error: any) {
    console.error(
      "Error fetching bus data:",
      error.message || error.response?.data
    );
  }
};

export default handleBusClick;
