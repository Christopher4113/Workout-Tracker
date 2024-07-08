import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import the CSS file
import stripes from './assets/varying-stripes.png';
import axios from 'axios';

const PostsWT = () => {
  const [info, setInfo] = useState([
    { workout: "Bench Press", sets: 3, weights: [160, 160, 135], reps: [8, 6, 10] }
  ]);

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100' style={{
        backgroundImage: `url(${stripes})`,
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
        <div className="table-container mt-4">
            <table className='table table-bordered rounded'>
                <thead className="thead-dark">
                    <tr>
                        <th colSpan="5">
                            <Link to='/Workout' className='btn btn-success'>Add +</Link>
                        </th>
                    </tr>
                    <tr>
                        <th>Workout</th>
                        <th>Sets</th>
                        <th>Weights</th>
                        <th>Reps</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        info.map((item, index) => (
                            <tr key={index}>
                                <td>{item.workout}</td>
                                <td className="text-center">{item.sets}</td>
                                <td>{item.weights.join(', ')}</td>
                                <td>{item.reps.join(', ')}</td>
                                <td>
                                    <Link to='/Workout' className='btn btn-success btn-sm'>Edit</Link>
                                    <button className="btn btn-danger btn-sm ml-2">Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default PostsWT;
