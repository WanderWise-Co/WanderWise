import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import TextField from '@mui/material/TextField';
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import styles from './FormReq.module.css'
import "react-datepicker/dist/react-datepicker.css";


export default function FormReq()  {

      // State htmlFor start date and from date
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);



    // State to handle the selected currency symbol
    const [currencySymbol, setCurrencySymbol] = useState('$'); // Default to USD
  
    // Function to handle currency selection
    const handleCurrencyChange = (event:any) => {
      const selectedCurrency = event.target.value;
      // Update symbol based on selected currency
      setCurrencySymbol(selectedCurrency === 'USD' ? '$' : '₹');
    };

return (
    <>
    <table>
        <tr>
          <td>
          <TextField id="outlined-basic" label="Source" variant="outlined" />
          </td>
          <td>
          <TextField id="outlined-basic" label="Destination" variant="outlined" />
          </td>
          <td>
          <div>
      <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Budget</label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {/* Display the selected currency symbol */}
          <span className="text-gray-500 sm:text-sm">{currencySymbol}</span>
        </div>
        <input
          type="text"
          name="price"
          id="price"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="0.00"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="currency" className="sr-only">Currency</label>
          <select
            id="currency"
            name="currency"
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            onChange={handleCurrencyChange} // Update symbol when currency changes
          >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
          </select>
        </div>
      </div>
    </div>
          </td>
        </tr>
        <tr>
          <td>
          <label>From Date</label><br />
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              placeholderText="Select From Date"
              className={styles.datepicker} // Apply custom styles
            />
          </td>
          <td>
          <label>To Date</label><br />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select To Date"
            className={styles.datepicker} // Apply custom styles
          />
          </td>
          <td>
          <div className="flex flex-wrap gap-2">
          <Button>
            Choose plan
            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
          </td>
        </tr>
      </table>
    </>
)
}
