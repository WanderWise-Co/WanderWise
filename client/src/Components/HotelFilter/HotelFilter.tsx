import { useEffect, useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import styles from './HotelFilter.module.css'; // Ensure the CSS module file exists and is correctly named
import ac from '../../assets/AC.jpg';
import food from '../../assets/food.jpg';
import cp from '../../assets/cp.jpg';
import swimmingPool from '../../assets/s.jpg';
import internetAccess from '../../assets/inac.jpeg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function HomeFilter() {
  const navigate = useNavigate();
  
  const categories = [
    { id: 1, name: 'AC', imgSrc: ac },
    { id: 2, name: 'Food', imgSrc: food },
    { id: 3, name: 'Car Parking', imgSrc: cp },
    { id: 4, name: 'Swimming Pool', imgSrc: swimmingPool},
    { id: 5, name: 'Internet Access', imgSrc: internetAccess},
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(()=>{
    if (selectedCategories) {
      localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    }
  },[selectedCategories])

  const toggleCategorySelection = (categoryName:any) => {
    setSelectedCategories((prev:any) =>
      prev.includes(categoryName)
        ? prev.filter((item:any) => item !== categoryName)
        : [...prev, categoryName]
    );
  };

const handleSubmit = async () => {
  
  try {
    

    // Retrieve categories from localStorage
    const categories = JSON.parse(localStorage.getItem('selectedCategories')||"[]");
    const token = localStorage.getItem('token');

    console.log(categories)
    // Make API request with categories as a parameter
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/recommendation/hotelreco`,
      {
        params: { categories }, // Send as query params
      headers: {
        Authorization: `Bearer ${token}`, // Add the token in the Authorization header
      },
    });

    console.log('Response:', response.data);
    navigate('/api/v1/planpage'); // Navigate after a successful API call

  } catch (err: any) {
    
    console.error('Error fetching recommendations:', err.message);
  }
};


  const handleSkipClick = () =>{
    navigate('/api/v1/planpage')
  }

  return (
    <div className={styles.container}>
      <div className={styles.skipButtonContainer}>
        <MDBBtn className={styles.skipButton} onClick={handleSkipClick}>Skip</MDBBtn>
      </div>
      <div className={styles.headingContainer}>
        <h1>Explore Categories</h1>
      </div>
      <div className={styles.buttonColumns}>
        {categories.map((category:any) => (
          <MDBBtn
            key={category.id}
            className={`${styles.categoryButton} ${
              selectedCategories.includes(category.name) ? styles.selected : ''
            }`}
            onClick={() => toggleCategorySelection(category.name)}
          >
            <img src={category.imgSrc} alt={category.name} />
            <span>{category.name}</span>
          </MDBBtn>
        ))}
      
      <MDBBtn className={styles.submitButton} onClick={handleSubmit}>Next</MDBBtn>
      </div>
    </div>
  );
}
