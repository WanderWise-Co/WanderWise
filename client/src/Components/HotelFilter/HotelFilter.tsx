import React, { useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import './HotelFilter.module.css';

export default function HotelFilter() {
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);

  const toggleButtonSelection = (label: string) => {
    setSelectedButtons((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label) // Remove if already selected
        : [...prev, label] // Add if not selected
    );
  };

  const handleSubmit = () => {
    console.log('Selected Filters:', selectedButtons);
    alert(`Selected Filters: ${selectedButtons.join(', ')}`);
  };

  return (
    <div className="buttons-container">
      <div className="skipButtonContainer">
        <MDBBtn className="skipButton">Skip</MDBBtn>
      </div>
      <div className="headingContainer">
        <h1>Filters for Hotel Booking</h1>
      </div>
      <div className="buttonColumns">
        <div className="buttonColumn">
          <MDBBtn
            className={`categoryButton ${
              selectedButtons.includes('Internet Access') ? 'selected' : ''
            }`}
            onClick={() => toggleButtonSelection('Internet Access')}
          >
            <img src="/assets/internet-access.png" alt="Internet Access" />
            <span>Internet Access</span>
          </MDBBtn>
          <MDBBtn
            className={`categoryButton ${
              selectedButtons.includes('Swimming Pool') ? 'selected' : ''
            }`}
            onClick={() => toggleButtonSelection('Swimming Pool')}
          >
            <img src="/assets/swimming-pool.jpg" alt="Swimming Pool" />
            <span>Swimming Pool</span>
          </MDBBtn>
          <MDBBtn
            className={`categoryButton ${
              selectedButtons.includes('Breakfast') ? 'selected' : ''
            }`}
            onClick={() => toggleButtonSelection('Breakfast')}
          >
            <img src="/assets/breakfast.webp" alt="Breakfast" />
            <span>Breakfast</span>
          </MDBBtn>
        </div>
        <div className="buttonColumn">
          <MDBBtn
            className={`categoryButton ${
              selectedButtons.includes('Car Park') ? 'selected' : ''
            }`}
            onClick={() => toggleButtonSelection('Car Park')}
          >
            <img src="/assets/car-park.jpg" alt="Car Park" />
            <span>Car Park</span>
          </MDBBtn>
          <MDBBtn
            className={`categoryButton ${
              selectedButtons.includes('AC') ? 'selected' : ''
            }`}
            onClick={() => toggleButtonSelection('AC')}
          >
            <img src="/assets/ac.png" alt="AC" />
            <span>AC</span>
          </MDBBtn>
          <MDBBtn
            className={`categoryButton ${
              selectedButtons.includes('Indoor Activities') ? 'selected' : ''
            }`}
            onClick={() => toggleButtonSelection('Indoor Activities')}
          >
            <img src="/assets/indoor-activities.png" alt="Indoor Activities" />
            <span>Indoor Activities</span>
          </MDBBtn>
        </div>
      </div>
      <MDBBtn className="submitButton" onClick={handleSubmit}>
        Submit
      </MDBBtn>
    </div>
  );
}
