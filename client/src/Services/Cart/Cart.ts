import axios from "axios";

type CategoryItem = {
  category: "restaurant" | "hotel" | "attraction";
  location: string[];
};

type CartData = {
  restaurants: string[];
  hotels: string[];
  attractions: string[];
};

const fetchData = async (): Promise<CartData> => {
  try {
    const token = localStorage.getItem("token");
    const to = localStorage.getItem("to");
    const from = localStorage.getItem("from");

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/cart`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { to, from },
      }
    );

    const userPreferences = response.data.userPreferences;

    const restaurants = userPreferences
      .filter((item: CategoryItem) => item.category === "restaurant")
      .map((item: CategoryItem) => item.location)
      .flat();

    const hotels = userPreferences
      .filter((item: CategoryItem) => item.category === "hotel")
      .map((item: CategoryItem) => item.location)
      .flat();

    const attractions = userPreferences
      .filter((item: CategoryItem) => item.category === "attraction")
      .map((item: CategoryItem) => item.location)
      .flat();

    return { restaurants, hotels, attractions };
  } catch (err) {
    console.error("Error fetching cart data:", err);
    throw new Error("Failed to fetch cart data");
  }
};

export default fetchData;
