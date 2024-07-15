import React from 'react'
import start from './assets/start.jpg'
import './start.css';
import { useNavigate } from 'react-router-dom';
const Start = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate('/register')
  }
  return (
    <div className="bg-secondary" style={{
        backgroundImage: `url(${start})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        flexDirection: 'column'
    }}>
        <button onClick={handleStart} class="start" style={{
                position: 'absolute',
                bottom: '200px',
                left: '200px',
                padding: '20px 40px', // Adjust padding for a larger button
                fontSize: '24px', // Increase font size
                color: 'white', // Customize text color
                border: 'none', // Remove border
                cursor: 'pointer', // Change cursor to pointer
                display: 'flex', // Center the icon
                alignItems: 'center', // Align items center
                gap: '10px' // Space between text and icon
            }}>
            Get Started
            <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
                <path
                clip-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                fill-rule="evenodd"
                ></path>
            </svg>
        </button>
        <h1 style={{
                color: 'white',
                fontSize: '10em',
                fontFamily: 'Times New Roman',
                position: 'absolute',
                top: '10px'
        }}>
            Fitness Tracker
        </h1>
        <p style={{
                color:'white',
                fontSize: '1em',
                fontFamily: 'Times New Roman',
                position: 'absolute',
                top: '175px'
            }}>
                FitnessTrackr is a user-friendly workout tracker web app that helps users log workouts, track progress, set goals, and stay motivated to achieve their fitness objectives.
        </p>
    </div>
  )
}

export default Start
