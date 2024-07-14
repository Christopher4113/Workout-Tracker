import React from 'react';
import './styles.css'; // Import the CSS file
import menu from './assets/menu.jpg';
import dumbell from './assets/dumbell.jpg';
import running from './assets/running.jpg';
import food from './assets/food.webp';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('token');  // Clear sessionStorage
        navigate('/register');  // Redirect to login page
    };

    const boxStyle = {
        background: 'rgba(255, 255, 255, 0.2)', // More transparent background
        borderRadius: '10px',
        padding: '100px', // Larger padding for a bigger box
        margin: '10px',
        textAlign: 'center',
        width: '500px', // Larger width for a bigger box
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center align the contents
        justifyContent: 'center' // Center justify the contents
    };

    const imgStyle = {
        width: '350px', // Larger width for a bigger image
        height: '350px', // Larger height for a bigger image
        objectFit: 'cover',
        marginBottom: '20px' // Space between the image and text
    };

    const textStyle = {
        color: 'white',
        fontSize: '1.5em', // Larger font size
        fontFamily: 'Times New Roman, Times, serif' // Times New Roman font
    };

    const linkStyle = {
        fontSize: '1.2em', // Larger font size for link
        fontFamily: 'Times New Roman, Times, serif' // Times New Roman font
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100' style={{
            backgroundImage: `url(${menu})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flexDirection: 'column',
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
                cursor: 'pointer'
            }}>
                <div className="Btn">
                    <div className="sign">
                        <svg viewBox="0 0 512 512">
                            <path
                                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                            ></path>
                        </svg>
                    </div>
                    <div className="text">Logout</div>
                </div>
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

            <div className='d-flex justify-content-around' style={{ width: '100%', marginTop: '200px' }}>
                <div style={boxStyle}>
                    <img src={dumbell} alt="Dumbbell" style={imgStyle} />
                    <p style={textStyle}>Weight Lifting Tracker</p>
                    <Link to="/postsWT" style={{ ...linkStyle, ...{ color: 'white', textDecoration: 'none' } }} className="button">Explore</Link>
                </div>
                <div style={boxStyle}>
                    <img src={running} alt="Running" style={imgStyle} />
                    <p style={textStyle}>Endurance Tracker</p>
                    <Link to="/Endurance" style={{ ...linkStyle, ...{ color: 'white', textDecoration: 'none' } }} className="button">Explore</Link>
                </div>
                <div style={boxStyle}>
                    <img src={food} alt="Food" style={imgStyle} />
                    <p style={textStyle}>Calorie Tracker</p>
                    <Link to="/Calorie" style={{ ...linkStyle, ...{ color: 'white', textDecoration: 'none' } }} className="button">Explore</Link>
                </div>
            </div>
        </div>
    )
}

export default Home;
