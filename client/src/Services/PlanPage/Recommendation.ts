import axios from "axios";
import toast from "react-hot-toast";

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
    const hotel_response = axios.get(
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
    setGemeniData(response.data.data);

    console.log(hotel_response);

    const selected_features = JSON.parse(
      localStorage.getItem("selected_features") || "[]"
    );

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
    console.log(reco_response.data);
    setHotelRecoData(reco_response.data);
  } catch (error: any) {
    console.error(
      "Error fetching gimini data:",
      error.message || error.response?.data
    );
  }
};
export default handleRecoClick;
