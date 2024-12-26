import axios from "axios";

const handleRecoClick = async (setGemeniData: any, setHotelRecoData: any) => {
  const token = localStorage.getItem("token");
  const from = localStorage.getItem("from");
  const to = localStorage.getItem("to");
  const sDate = localStorage.getItem("startDate");
  const eDate = localStorage.getItem("endDate");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/gemini`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { from, to, startDate: sDate, endDate: eDate },
      }
    );
    setGemeniData(response.data.data);

    const hotel_response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/hotel`,
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
    console.log(hotel_response);

    const selected_features = JSON.parse(
      localStorage.getItem("selected_features") || "[]"
    );

    const reco_response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/recommendation/hotelreco`,
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
