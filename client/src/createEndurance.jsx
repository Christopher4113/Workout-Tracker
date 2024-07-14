import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './endurance.css'; // Import the CSS file
import axios from 'axios';
import endurance from './assets/endurance.jpg';

const CreateEndurance = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    workout: '',
    duration: '',
    distance: ''
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleClear = () => {
    setFormData({
      date: '',
      workout: '',
      duration: '',
      distance: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const positiveFloat = /^\d*\.?\d*$/; // Regex to allow positive floats

    if (name === 'duration' || name === 'distance') {
      if (positiveFloat.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { date, workout, duration, distance } = formData;

    // Check if date is not empty
    if (!date) {
      alert("Please select a date.");
      return;
    }

    // Check if workout is not empty
    if (!workout.trim()) {
      alert("Please enter a workout.");
      return;
    }

    // Check if duration is not empty
    if (!duration) {
      alert("Please enter a duration.");
      return;
    }

    // Check if distance is not empty
    if (!distance) {
      alert("Please enter a distance.");
      return;
    }

    const token = sessionStorage.getItem('token'); // Get the token from sessionStorage or other storage

    axios.post('http://localhost:3001/endurance', { formData }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(result => { console.log(result) })
    .catch(error => { console.log(error) });

    handleClear();
    navigate('/Endurance');

    console.log(formData);
  };

  return (
    <div className="bg-secondary" style={{
      backgroundImage: `url(${endurance})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      flexDirection: 'column'
    }}>
      <Link to="/Endurance" className="exit exit-1 hover-filled-slide-left" style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: '10',
        textDecoration: 'none'
      }}>
        <span>Exit</span>
      </Link>
      <div className="tracker-container" style={{ width: '80%', maxWidth: '500px', marginRight: '680px', marginBottom: '20px', paddingBottom: '20px' }}>
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
            <label htmlFor="workout">
              <strong>Workout</strong>
            </label>
            <input
              type="text"
              placeholder="Enter a Workout"
              autoComplete="off"
              name="workout"
              className="form-control rounded-0"
              value={formData.workout}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="duration">
              <strong>Duration</strong>
            </label>
            <input
              type="text"
              placeholder="Enter the Duration"
              autoComplete="off"
              name="duration"
              className="form-control rounded-0"
              value={formData.duration}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="distance">
              <strong>Distance</strong>
            </label>
            <input
              type="text"
              placeholder="Enter the Distance"
              autoComplete="off"
              name="distance"
              className="form-control rounded-0"
              value={formData.distance}
              onChange={handleInputChange}
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
  );
};

export default CreateEndurance;
