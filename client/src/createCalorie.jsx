import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './calorie.css'; // Import the CSS file
import axios from 'axios';
import Calorie from './assets/calorie.jpg'

const createCalorie = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    calorie:''
  });
  const serverURL = import.meta.env.VITE_SERVER_URL;
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const handleClear = () => {
    setFormData({
      date: '',
      calorie:''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { date, calorie} = formData;

    // Check if date is not empty
    if (!date) {
      alert("Please select a date.");
      return;
    }

   if (!calorie || calorie < 0) {
    alert("Please enter a valid calorie count (must be 0 or greater).");
    return;
   }
    

    const token = sessionStorage.getItem('token'); // Get the token from localStorage or other storage

    axios.post(`${serverURL}/calorie`, { formData }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(result => { console.log(result) })
    .catch(error => { console.log(error) });

    handleClear();
    navigate('/Calorie');

    console.log(formData);
  };
  return (
    <div className="bg-secondary" style={{
      backgroundImage: `url(${Calorie})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      flexDirection: 'column'
    }}>
      <Link to="/Calorie" class="exit exit-1 hover-filled-slide-left" style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: '10',
        textDecoration: 'none'
      }}>
        <span>Exit</span>
      </Link>
      <div className="tracker-container">
        <h2>Add</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="date">
              <strong>Date</strong>
            </label>
            <select
              name="date"
              className="form-control rounded-0"
              value={formData.date}
              onChange={handleInputChange}
            >
              <option value="">Select a day</option>
              {daysOfWeek.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
        </div>
        <div className="mb-3">
            <label htmlFor="calorie">
              <strong>Calories</strong>
            </label>
            <input
              type="number"
              placeholder="Enter today's Calories"
              autoComplete="off"
              name="calorie"
              className="form-control rounded-0"
              value={formData.calorie}
              onChange={handleInputChange}
              min="0"
            />
        </div>
        <button type="submit" className="btn btn-success w-100 rounded-0" style={{ backgroundColor: 'green', color: 'white', border: 'none', marginBottom: '10px' }}>
            Submit
        </button>
        <button type="button" className="btn btn-danger w-100 rounded-0" style={{ backgroundColor: 'red', color: 'white', border: 'none' }} onClick={handleClear}>
            Clear
        </button>
        </form>
      </div>
    </div>
  )
}

export default createCalorie