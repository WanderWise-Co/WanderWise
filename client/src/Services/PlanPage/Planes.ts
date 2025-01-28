import axios from "axios";
import toast from "react-hot-toast";

const handlePlaneClick = async (
  setTransportPlaneData: any,
  setTransportPlaneRecoData: any
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
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/api/v1/planpage/transport/aeroplane`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { from, to, startDate: sDate, endDate: eDate },
      }
    );
    setTransportPlaneData(response.data.data);

    const reco_response = await axios.get(
      `${
        import.meta.env.VITE_BASE_SERVER_URL
      }/api/v1/planpage/recommendation/aeroreco`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTransportPlaneRecoData(reco_response.data.data);
  } catch (error: any) {
    console.error("Error fetching planes data:", error.message);
  }
};

export default handlePlaneClick;
