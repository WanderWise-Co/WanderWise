import axios from "axios";
import { toast } from "react-toastify";

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
    if (response.status === 401) {
      toast.error("Session expired. Please login again");
    }
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
    if (reco_response.status === 401) {
      toast.error("Session expired. Please login again");
    }
    setTransportPlaneRecoData(reco_response.data.data);
  } catch (error: any) {
    if (error.response.status === 401) {
      toast.error("Session expired. Please login again");
    }
    console.error("Error fetching planes data:", error.message);
  }
};

export default handlePlaneClick;
