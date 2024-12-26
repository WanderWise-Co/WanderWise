import axios from "axios";

const handlegemini1 = async () => {
  try {
    const token = localStorage.getItem("token");
    const to = localStorage.getItem("to");
    const from = localStorage.getItem("from");
    const startDate = localStorage.getItem("startDate");
    const endDate = localStorage.getItem("endDate");

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/gemini2`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { from, to, startDate, endDate },
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "TravelPlan.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.error("Error generating travel plan PDF:", error);
  }
};

export default handlegemini1;
