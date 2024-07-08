import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import the CSS file
import stripes from './assets/varying-stripes.png';
import axios from 'axios';

const Workout = () => {
  const [formData, setFormData] = useState({
    workout: '',
    sets: 1,
    weights: [''],
    reps: ['']
  });

  const [workouts, setWorkouts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3001/workout', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setWorkouts(response.data.workouts);
    })
    .catch(error => console.log(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'sets') {
      const sets = Math.max(1, parseInt(value, 10));
      const weights = formData.weights.slice(0, sets);
      const reps = formData.reps.slice(0, sets);
      while (weights.length < sets) weights.push('');
      while (reps.length < sets) reps.push('');
      setFormData({ ...formData, sets, weights, reps });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleWeightChange = (index, value) => {
    const newWeights = [...formData.weights];
    newWeights[index] = value === '' ? '' : parseInt(value, 10);
    setFormData({ ...formData, weights: newWeights });
  };

  const handleRepChange = (index, value) => {
    const newReps = [...formData.reps];
    newReps[index] = value === '' ? '' : parseInt(value, 10);
    setFormData({ ...formData, reps: newReps });
  };

  const handleClear = () => {
    setFormData({
      workout: '',
      sets: 1,
      weights: [''],
      reps: ['']
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (editMode) {
      axios.put(`http://localhost:3001/workout/${editId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setWorkouts(workouts.map(workout => workout._id === editId ? response.data.workout : workout));
        handleClear();
      })
      .catch(error => console.log(error));
    } else {
      axios.post('http://localhost:3001/workout', { formData }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setWorkouts([...workouts, response.data.workout]);
        handleClear();
      })
      .catch(error => console.log(error));
    }
  };

  const handleEdit = (workout) => {
    setFormData({
      workout: workout.workout,
      sets: workout.sets,
      weights: workout.weights,
      reps: workout.reps
    });
    setEditMode(true);
    setEditId(workout._id);
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:3001/workout/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setWorkouts(workouts.filter(workout => workout._id !== id));
    })
    .catch(error => console.log(error));
  };

  return (
    <div className="bg-secondary" style={{
      backgroundImage: `url(${stripes})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      flexDirection: 'column'
    }}>
      <Link to="/register" style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: '10',
        textDecoration: 'none'
      }}>
        <button className="Btn">
          <div className="sign">
            <svg viewBox="0 0 512 512">
              <path
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
              ></path>
            </svg>
          </div>
          <div className="text">Logout</div>
        </button>
      </Link>

      <div className="tracker-container" style={{ width: '80%', maxWidth: '500px', marginRight: '1350px', marginBottom: '20px', paddingBottom: '20px' }}>
        <h2>Weight-Training Tracker</h2>
        <form onSubmit={handleSubmit}>
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
              min="1"
            />
          </div>
          {Array.from({ length: formData.sets }).map((_, index) => (
            <div key={index} className="mb-3">
              <label>
                <strong>Set {index + 1}</strong>
              </label>
              <input
                type="number"
                placeholder={`Weight for Set ${index + 1}`}
                autoComplete="off"
                className="form-control rounded-0 mb-2"
                value={formData.weights[index] || ''}
                onChange={(e) => handleWeightChange(index, e.target.value)}
                min="0"
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
            {editMode ? 'Update' : 'Submit'}
          </button>
          <button type="button" className="btn btn-danger w-100 rounded-0" style={{ backgroundColor: 'red', color: 'white', border: 'none' }} onClick={handleClear}>
            Clear
          </button>
        </form>
      </div>

      <div className="workout-list" style={{ marginTop: '20px' }}>
        <h3>Workouts</h3>
        {workouts.map((workout, index) => (
          <div key={index} className="workout-item">
            <h4>{workout.workout}</h4>
            <p>Sets: {workout.sets}</p>
            <p>Weights: {workout.weights.join(', ')}</p>
            <p>Reps: {workout.reps.join(', ')}</p>
            <button onClick={() => handleEdit(workout)}>Edit</button>
            <button onClick={() => handleDelete(workout._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workout;
