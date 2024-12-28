// FormReq.tsx
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useEffect, useState } from "react";
import styles from "./FormReq.module.css";
import Datepicker from "react-tailwindcss-datepicker";
import beach from "../assets/beach.jpeg";
import hill from "../assets/hillstation.jpeg";
import temple from "../assets/temple.webp";
import toast from "react-hot-toast";
import handleChoosePlanClick from "../Services/Home/HandleChoosePlanClick";

const categories = [
  { id: 1, name: "Beaches", imgSrc: beach },
  { id: 2, name: "Mountains", imgSrc: hill },
  { id: 3, name: "Temple", imgSrc: temple },
];

const CategoryButton = ({ category, isSelected, onClick }: any) => (
  <button
    className={`${styles.categoryButton} ${isSelected ? styles.selected : ""}`}
    onClick={() => onClick(category.name)}
  >
    <img
      src={category.imgSrc}
      alt={category.name}
      className={`${styles.buttonImage} ${isSelected ? styles.selectedImage : ""}`}
      loading="lazy"
    />
    <span>{category.name}</span>
  </button>
);

export default function FormReq() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(11)),
  });

  const handleChooseClick = handleChoosePlanClick();

  useEffect(() => {
    if (source) {
      localStorage.setItem("from", source);
    }
    if (destination) {
      localStorage.setItem("to", destination);
    }
    if (date.startDate) {
      localStorage.setItem("startDate", date.startDate.toString());
    }
    if (date.endDate) {
      localStorage.setItem("endDate", date.endDate.toString());
    }
    if (selectedCategories) {
      localStorage.setItem(
        "placesCategories",
        JSON.stringify(selectedCategories)
      );
    }
  }, [source, destination, date, selectedCategories]);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryName)
        ? prevSelected.filter((cat) => cat !== categoryName)
        : [...prevSelected, categoryName]
    );
  };

  const handleValueChange = (newValue: any) => {
    if (!newValue.startDate || !newValue.endDate) {
      toast.error("Please select a valid date range.");
      return;
    }

    const today = new Date();
    const selectedStart = new Date(newValue.startDate);
    const selectedEnd = new Date(newValue.endDate);

    if (selectedStart < today) {
      toast.error("Start date cannot be in the past.");
      return;
    }

    if (selectedEnd < selectedStart) {
      toast.error("End date cannot be earlier than the start date.");
      return;
    }

    setDate(newValue);
  };

  return (
    <div className={styles.imageContainer}>
      <div className={styles.headerContainer}>
        <h1>Wander Wise</h1>
        <h3>Craft Your Perfect Journey With Ease</h3>
      </div>
      <div className={styles.container}>
        <div className={styles.row}>
          <input
            type="text"
            id="outlined-basic"
            name="source"
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className={`${styles.inputField} ${styles.smallInputField}`}
          />
        </div>

        <div className={styles.row}>
          <input
            type="text"
            name="Destination"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={`${styles.inputField} ${styles.smallInputField}`}
          />
          <Datepicker value={date} onChange={handleValueChange} />
        </div>

        <div className={styles.buttonContainer}>
          <Button onClick={handleChooseClick}>
            Choose plan
            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className={styles.categoryContainer}>
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isSelected={selectedCategories.includes(category.name)}
              onClick={handleCategoryClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
