import React, { useEffect } from 'react';
import start from './assets/start.jpg';
import './start.css';
import { useNavigate } from 'react-router-dom';
import icon from './assets/icon.png';

const Start = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate('/register');
  };

  useEffect(() => {
    const elements = document.querySelectorAll('.floatIn');
    elements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.5}s`;
      element.classList.add('start-animation');
    });
  }, []);

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
      <h1 className="floatIn floatInDelay1" style={{
        color: 'white',
        fontSize: '10em',
        fontFamily: 'Times New Roman',
        position: 'absolute',
        top: '10px',
        textAlign: 'center',
        // Corrected media query syntax
        '@media (maxWidth: 1024px)': {
          fontSize: '1.5em' 
        }
      }}>
        Fitness Tracker
      </h1>
      <p className="floatIn floatInDelay2" style={{
        color: 'white',
        fontSize: '1em',
        fontFamily: 'Times New Roman',
        position: 'absolute',
        top: '250px',
        maxWidth: '600px',
        textAlign: 'center',
        margin: '0 auto'
      }}>
        FitnessTrackr is a user-friendly workout tracker web app that helps users log workouts, track progress, set goals, and stay motivated to achieve their fitness objectives.
      </p>
      <img src={icon} alt="Icon" className="floatIn floatInDelay3" style={{
        position: 'absolute',
        top: '350px',
        width: '300px', // Adjust size as needed
        height: '300px', // Adjust size as needed
      }} />
      <p className="floatIn floatInDelay4" style={{
        color: 'white',
        fontSize: '1em',
        fontFamily: 'Times New Roman',
        position: 'absolute',
        bottom: '200px',
        maxWidth: '600px',
        textAlign: 'center',
        margin: '0 auto'
      }}>
        To use FitnessTracker, sign up or log in, then log your workouts, track your progress, set goals, and access educational resources. Customize your workout plans, track daily calories and activities. 
      </p>
      <button onClick={handleStart} className="start floatIn floatInDelay4" style={{
        position: 'absolute',
        bottom: '100px'
      }}>
        Get Started
        <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
          <path
            clipRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Start;
