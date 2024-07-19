import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import largeTriangles from './assets/large-triangles.svg';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const serverURL = import.meta.env.VITE_SERVER_URL;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }
        axios.post(`${serverURL}/login`, { email, password })
            .then(result => {
                if (result.data.message === "Success") {
                    sessionStorage.setItem('token', result.data.token);
                    navigate('/menu');
                } else {
                    setError(result.data.error);
                }
            })
            .catch(error => {
                console.log(error);
                setError("An error occurred. Please try again.");
            });
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center bg-secondary vh-100" style={{
            backgroundImage: `url(${largeTriangles})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <style>
                {`
                /* Default styles for larger screens */
                .login-form {
                    width: 25%;
                }

                /* Media Queries for tablets */
                @media screen and (max-width: 1024px) {
                    .login-form {
                        width: 50%; /* Adjust width for tablets */
                        padding: 2rem; /* Adjust padding for better spacing */
                    }
                }

                /* Media Queries for mobile devices */
                @media screen and (max-width: 768px) {
                    .login-form {
                        width: 75%; /* Adjust width for mobile devices */
                        padding: 1.5rem; /* Adjust padding for better spacing */
                    }

                    .login-form h2 {
                        font-size: 1.5em; /* Adjust font size for better readability */
                    }

                    .login-form .form-control {
                        font-size: 1em; /* Adjust input font size */
                    }

                    .login-form button {
                        font-size: 1em; /* Adjust button font size */
                    }
                }

                /* Media Queries for smaller mobile devices */
                @media screen and (max-width: 480px) {
                    .login-form {
                        width: 90%; /* Adjust width for smaller mobile devices */
                        padding: 1rem; /* Adjust padding for better spacing */
                    }

                    .login-form h2 {
                        font-size: 1.2em; /* Adjust font size for better readability */
                    }

                    .login-form .form-control {
                        font-size: 0.9em; /* Adjust input font size */
                    }

                    .login-form button {
                        font-size: 0.9em; /* Adjust button font size */
                    }
                }
                `}
            </style>
            <div className="login-form bg-white p-3 rounded">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0" style={{ backgroundColor: 'blue', color: 'white', border: 'none' }}>
                        Login
                    </button>
                </form>
                <p>Don't Have an Account</p>
                <Link to='/register' className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign up
                </Link>
            </div>
        </div>
    );
}

export default Login;
