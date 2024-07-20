import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './styles.css'; // Import the CSS file
import axios from 'axios';

const UpdateWT = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    workout: '',
    sets: '',
    weights: [''],
    reps: ['']
  });
  const serverURL = import.meta.env.VITE_SERVER_URL;

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    axios.get(`${serverURL}/workout/getWorkout/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(result => {
        const data = result.data;
        setFormData({
          date: data.date,
          workout: data.workout,
          sets: data.sets.toString(),
          weights: data.weights.map(w => w.toString()),
          reps: data.reps.map(r => r.toString())
        });
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'sets') {
      const sets = value === '' ? '' : Math.max(0, parseInt(value, 10) || 0);
      const weights = formData.weights.slice(0, sets); // Trim weights array if sets are reduced
      const reps = formData.reps.slice(0, sets); // Trim reps array if sets are reduced
      while (weights.length < sets) weights.push(''); // Add empty entries if sets are increased
      while (reps.length < sets) reps.push(''); // Add empty entries if sets are increased
      setFormData({ ...formData, sets, weights, reps });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleWeightChange = (index, value) => {
    const positiveFloatOrZero = /^\d*\.?\d*$/; // Regex to allow positive floats or zero
    const newWeights = [...formData.weights];
    if (value === '' || positiveFloatOrZero.test(value)) {
      newWeights[index] = value;
      setFormData({ ...formData, weights: newWeights });
    }
  };

  const handleRepChange = (index, value) => {
    const newReps = [...formData.reps];
    newReps[index] = value;
    setFormData({ ...formData, reps: newReps });
  };

  const handleClear = () => {
    setFormData({
      date: '',
      workout: '',
      sets: '',
      weights: [''],
      reps: ['']
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { date, workout, sets, weights, reps } = formData;

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

    // Check if all weights and reps are filled if sets is greater than 0
    if (sets > 0) {
      for (let i = 0; i < sets; i++) {
        if (weights[i] === '' || reps[i] === '') {
          alert("Please fill in all weights and reps.");
          return;
        }
      }
    }

    const token = sessionStorage.getItem('token'); // Get the token from localStorage or other storage

    axios.put(`${serverURL}/workout/updateWorkout/${id}`, { formData }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => {
        console.log(result);
        navigate('/postsWT');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="bg-screen">
      <Link to="/postsWT" className="exit exit-1 hover-filled-slide-left" style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: '10',
        textDecoration: 'none'
      }}>
        <span>Exit</span>
      </Link>
      <div className="tracker-container">
        <h2>Edit</h2>
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
            <label htmlFor="sets">
              <strong>Sets</strong>
            </label>
            <input
              type="number"
              placeholder="Enter Number of Sets"
              autoComplete="off"
              name="sets"
              className="form-control rounded-0"
              value={formData.sets}
              onChange={handleInputChange}
              min="0"
            />
          </div>
          {Array.from({ length: parseInt(formData.sets) || 0 }).map((_, index) => (
            <div key={index} className="mb-3">
              <label>
                <strong>Set {index + 1}</strong>
              </label>
              <input
                type="text"
                placeholder={`Weight for Set ${index + 1}`}
                autoComplete="off"
                className="form-control rounded-0 mb-2"
                value={formData.weights[index] || ''}
                onChange={(e) => handleWeightChange(index, e.target.value)}
              />
              <input
                type="number"
                placeholder={`Reps for Set ${index + 1}`}
                autoComplete="off"
                className="form-control rounded-0"
                value={formData.reps[index] || ''}
                onChange={(e) => handleRepChange(index, e.target.value)}
                min="1"
              />
            </div>
          ))}
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

export default UpdateWT;
