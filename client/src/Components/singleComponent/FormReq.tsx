import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import TextField from '@mui/material/TextField';
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import styles from './FormReq.module.css';
import "react-datepicker/dist/react-datepicker.css";
import beach from '../../assets/beach.jpeg';
import hill from '../../assets/hillstation.jpeg';
import temple from '../../assets/temple.webp';

const categories = [
  { id: 1, name: 'Beaches', imgSrc: beach },
  { id: 2, name: 'Mountains', imgSrc: hill },
  { id: 3, name: 'Temple', imgSrc: temple },
];

const CategoryButton = ({ category, isSelected, onClick }: any) => (
  <button
    className={`${styles.categoryButton} ${isSelected ? styles.selected : ''}`}
    onClick={() => onClick(category.name)}
  >
    <img 
      src={category.imgSrc}
      alt={category.name}
      className={`${styles.buttonImage} ${isSelected ? styles.selectedImage : ''}`}
    />
    <span>{category.name}</span>
  </button>
);

export default function FormReq() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = event.target.value;
    setCurrencySymbol(selectedCurrency === 'USD' ? '$' : '₹');
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryName)) {
        return prevSelected.filter((cat) => cat !== categoryName); // Deselect if already selected
      } else {
        return [...prevSelected, categoryName]; // Select category
      }
    });
  };

  
  return (
    <>
      <div className={styles.imageContainer}>
        <div className={styles.container}>
          <div className={styles.row}>
            <TextField
              id="outlined-basic"
              label="Source"
              variant="outlined"
              className={`${styles.inputField} ${styles.smallInputField}`}
            />
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              placeholderText="Select From Date"
              className={styles.datepicker}
            />
          </div>

          <div className={styles.row}>
            <TextField
              id="outlined-basic"
              label="Destination"
              variant="outlined"
              className={`${styles.inputField} ${styles.smallInputField}`}
            />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Select To Date"
              className={styles.datepicker}
            />
          </div>

          <div className={styles.budgetContainer}>
            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Budget</label>
            <div className={`relative mt-2 rounded-md shadow-sm ${styles.currencyInput}`}>
              <span className={`text-gray-500 sm:text-sm ${styles.currencySymbol}`}>{currencySymbol}</span>
              <input
                type="text"
                name="price"
                id="price"
                className={`${styles.inputField} block w-full py-1.5 pl-7 pr-20`}
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="currency" className="sr-only">Currency</label>
                <select
                  id="currency"
                  name="currency"
                  className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  onChange={handleCurrencyChange}
                >
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Button href="/planpage">
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
    </>
  );
}
