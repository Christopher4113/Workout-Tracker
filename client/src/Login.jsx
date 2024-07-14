import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import largeTriangles from './assets/large-triangles.svg';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }
        axios.post('http://localhost:3001/login', { email, password })
        .then(result => {
            if (result.data.message === "Success") {
                sessionStorage.setItem('token', result.data.token);
                navigate('/home');
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
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100" style={{
            backgroundImage: `url(${largeTriangles})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className="bg-white p-3 rounded w-25">
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
