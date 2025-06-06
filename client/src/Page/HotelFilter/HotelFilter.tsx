import { useEffect, useState } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import styles from "./HotelFilter.module.css";
import ac from "../../assets/AC.jpg";
import food from "../../assets/food.jpg";
import cp from "../../assets/cp.jpg";
import swimmingPool from "../../assets/s.jpg";
import internetAccess from "../../assets/inac.jpeg";
import indoorAct from "../../assets/indoor.png";
import { useNavigate } from "react-router-dom";

export default function HomeFilter() {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "Air conditioning", imgSrc: ac },
    { id: 2, name: "Breakfast [buffet]", imgSrc: food },
    { id: 3, name: "Car park [free of charge]", imgSrc: cp },
    { id: 4, name: "Swimming pool [indoor]", imgSrc: swimmingPool },
    { id: 5, name: "Internet services", imgSrc: internetAccess },
    { id: 6, name: "Indoor Activities", imgSrc: indoorAct },
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (selectedCategories) {
      localStorage.setItem(
        "selected_features",
        JSON.stringify(selectedCategories)
      );
    }
  }, [selectedCategories]);

  const toggleCategorySelection = (categoryName: any) => {
    setSelectedCategories((prev: any) =>
      prev.includes(categoryName)
        ? prev.filter((item: any) => item !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleSubmit = async () => {
    try {
      const categories = JSON.parse(
        localStorage.getItem("selected_features") || "[]"
      );
      console.log(categories);
      navigate("/planpage");
    } catch (err: any) {
      console.error("Error fetching recommendations:", err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.skipButtonContainer}>
        <MDBBtn
          className={styles.skipButton}
          onClick={() => {
            navigate("/planpage");
          }}
        >
          Skip
        </MDBBtn>
      </div>
      <div className={styles.headingContainer}>
        <h1>Select Your Preferences </h1>
      </div>
      <div className={styles.buttonColumns}>
        {categories.map((category: any) => (
          <MDBBtn
            key={category.id}
            className={`${styles.categoryButton} ${
              selectedCategories.includes(category.name) ? styles.selected : ""
            }`}
            onClick={() => toggleCategorySelection(category.name)}
          >
            <img src={category.imgSrc} alt={category.name} loading="lazy" />
            <span>{category.name}</span>
          </MDBBtn>
        ))}

        <MDBBtn className={styles.submitButton} onClick={handleSubmit}>
          Next
        </MDBBtn>
      </div>
    </div>
  );
}
