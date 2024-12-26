import axios from "axios";

const handlePlaneClick = async (
  setTransportPlaneData: any,
  setTransportPlaneRecoData: any
) => {
  try {
    const token = localStorage.getItem("token");
    const from = localStorage.getItem("from");
    const to = localStorage.getItem("to");
    const sDate = localStorage.getItem("startDate");
    const eDate = localStorage.getItem("endDate");

    if (!(token && from && to && sDate && eDate)) {
      alert("Input token and other details");
      return;
    }

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/aeroplane`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { from, to, startDate: sDate, endDate: eDate },
      }
    );
    setTransportPlaneData(response.data.data);

    const reco_response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/recommendation/aeroreco`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setTransportPlaneRecoData(reco_response.data.data);
  } catch (error: any) {
    console.error("Error fetching planes data:", error.message);
  }
};

export default handlePlaneClick;
