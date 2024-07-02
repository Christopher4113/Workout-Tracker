import React from 'react';
import menu from './assets/menu.jpg';
import dumbell from './assets/dumbell.jpg';
import running from './assets/running.jpg';
import food from './assets/food.webp';
import {Link} from 'react-router-dom'

function Home() {
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
        color: 'white',
        fontSize: '1.2em', // Larger font size for link
        textDecoration: 'none',
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
            <h1 style={{ 
                color: 'white', 
                fontSize: '10em', 
                fontFamily: 'cursive', 
                position: 'absolute', 
                top: '10px' 
            }}>
                Fitness Tracker
            </h1>

            <div className='d-flex justify-content-around' style={{ width: '100%', marginTop: '200px' }}>
                <div style={boxStyle}>
                    <img src={dumbell} alt="Dumbbell" style={imgStyle} />
                    <p style={textStyle}>Weight Lifting Tracker</p>
                    <a href="#dumbbell" style={linkStyle}>Learn More</a>
                </div>
                <div style={boxStyle}>
                    <img src={running} alt="Running" style={imgStyle} />
                    <p style={textStyle}>Endurance Tracker</p>
                    <a href="#running" style={linkStyle}>Learn More</a>
                </div>
                <div style={boxStyle}>
                    <img src={food} alt="Food" style={imgStyle} />
                    <p style={textStyle}>Calorie Tracker</p>
                    <a href="#food" style={linkStyle}>Learn More</a>
                </div>
            </div>
        </div>
    )
}

export default Home;
