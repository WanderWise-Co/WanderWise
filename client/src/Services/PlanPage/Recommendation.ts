import axios from "axios";
import { toast } from "react-toastify";

const handleRecoClick = async (setGemeniData: any, setHotelRecoData: any) => {
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
    //web scraping
    const hotel_response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/api/v1/planpage/transport/hotel`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          from,
          to,
          sDate,
          eDate,
        },
      }
    );

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/api/v1/planpage/gemini`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { from, to, startDate: sDate, endDate: eDate },
      }
    );
    if (response.status === 401) {
      toast.error("Session expired. Please login again");
    }
    setGemeniData(response.data.data);

    console.log(hotel_response);

    const selected_features = JSON.parse(
      localStorage.getItem("selected_features") || "[]"
    );
    //recommendation web scraping for hotel
    const reco_response = await axios.get(
      `${
        import.meta.env.VITE_BASE_SERVER_URL
      }/api/v1/planpage/recommendation/hotelreco`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { selected_features },
      }
    );
    if (reco_response.status === 401) {
      toast.error("Session expired. Please login again");
    }
    console.log(reco_response.data);
    setHotelRecoData(reco_response.data);
  } catch (error: any) {
    if (error.response.status === 401) {
      toast.error("Session expired. Please login again");
    }
    console.error(
      "Error fetching gimini data:",
      error.message || error.response?.data
    );
  }
};
export default handleRecoClick;
