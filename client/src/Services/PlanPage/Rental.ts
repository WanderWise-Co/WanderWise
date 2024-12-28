import axios from "axios";

const handleRentalClick = async (
  setTransportRentalData: (data: any) => void
) => {
  try {
    const token = localStorage.getItem("token");
    const to = localStorage.getItem("to");

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/rental`,
      { headers: { Authorization: `Bearer ${token}` }, params: { to } }
    );
    setTransportRentalData(response.data.data);
  } catch (error: any) {
    console.error("Error fetching rental data:", error.message);
  }
};

export default handleRentalClick;
