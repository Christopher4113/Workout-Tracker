import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './calorie.css';
import endurance from './assets/calorie.jpg';

const Calorie = () => {
    const [info, setInfo] = useState([]);
    const navigate = useNavigate(); // useNavigate hook for navigation
    const serverURL = import.meta.VITE_SERVER_URL
    const daysOrder = {
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 6,
        'Sunday': 7
    };

    useEffect(() => {
        axios.get(`${serverURL}/calorie`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(result => {
                const sortedData = result.data.sort((a, b) => {
                    const dayA = a.date.split(', ')[0]; // assuming the date format is "Monday, Month Day, Year"
                    const dayB = b.date.split(', ')[0];
                    return daysOrder[dayA] - daysOrder[dayB];
                });
                setInfo(sortedData);
            })
            .catch(error => console.log(error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${serverURL}/calorie/deleteCalorie/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(result => {
                console.log(result);
                setInfo(info.filter(item => item._id !== id));
            })
            .catch(error => console.log(error));
    }
    const handleLogout = () => {
        sessionStorage.removeItem('token');  // Clear sessionStorage
        navigate('/register');  // Redirect to login page
    };

    return (
        <div className='bg-screen vh-100 d-flex flex-column align-items-center justify-content-center' style={{
            backgroundImage: `url(${endurance})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
        }}>
            <button onClick={handleLogout} style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: '10',
                textDecoration: 'none', // Ensure no default underline for link
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                outline: 'none'
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
            </button>
            <Link to='/home' className="boton-elegante">
                Menu
            </Link>
            <a href="https://www.calculator.net/calorie-calculator.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button className="bottom-button" style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                }}>
                    <span>Calorie Calculator</span>
                </button>
            </a>

            <div className='table-container mt-4' style={{
                width: '80%',
                maxWidth: '1000px',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <table className='table table-bordered rounded'>
                    <thead className='thead-dark'>
                        <tr>
                            <th colSpan="3">
                                <Link to='/createCalorie' className='btn btn-success'>Add +</Link>
                            </th>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <th>Calories</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            info.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.calorie}</td>
                                    <td>
                                        <Link to={`/updateCalorie/${item._id}`} className='btn btn-success btn-sm'>Edit</Link>
                                        <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Calorie;
