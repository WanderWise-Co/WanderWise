import axios from "axios";
import { toast } from "react-toastify";

const handleRentalClick = async (
  setTransportRentalData: (data: any) => void
) => {
  const token = localStorage.getItem("token");
  const to = localStorage.getItem("to");
  if (!token) {
    toast.error("Unauthorized access");
    return;
  }
  if (!to) {
    toast.error("Input token and other details");
    return;
  }
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_BASE_SERVER_URL
      }/api/v1/planpage/transport/rental`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { to },
      }
    );

    setTransportRentalData(response.data.data);
  } catch (error: any) {
    if (error.response.status === 401) {
      toast.error("Session expired. Please login again");
    }
    console.error("Error fetching rental data:", error.message);
  }
};

export default handleRentalClick;
