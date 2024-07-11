import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './endurance.css';
import endurance from './assets/endurance.jpg';

const Endurance = () => {
  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100' style={{
      backgroundImage: `url(${endurance})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      flexDirection: 'column',
      position: 'relative'
    }}>
      <Link to="/register" style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: '10',
            textDecoration: 'none' // Ensure no default underline for link
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
      <Link to="/home" className="no-underline" style={{
            position: 'absolute', 
            top: '20px',
            left: '20px', 
            zIndex: '10', 
            textDecoration: 'none'
        }}>
            <button className="custom-btn">
                <span className="custom-icon">
                    <svg viewBox="0 0 175 80" width="40" height="40">
                        <rect width="80" height="15" fill="#f0f0f0" rx="10"></rect>
                        <rect y="30" width="80" height="15" fill="#f0f0f0" rx="10"></rect>
                        <rect y="60" width="80" height="15" fill="#f0f0f0" rx="10"></rect>
                    </svg>
                </span>
                <span className="custom-text">MENU</span>
            </button>
      </Link>
    </div>
  )
}

export default Endurance