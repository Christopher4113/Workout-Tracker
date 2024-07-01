import React from 'react';
import menu from './assets/menu.jpg';
import dumbell from './assets/dumbell.jpg';
import running from './assets/running.jpg';
import food from './assets/food.webp';

function Home() {
    const boxStyle = {
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        padding: '20px',
        margin: '10px',
        textAlign: 'center',
        width: '200px'
    };

    const imgStyle = {
        width: '100px',
        height: '100px',
        objectFit: 'cover'
    };

    const linkStyle = {
        color: '#000',
        textDecoration: 'none'
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100' style={{
            backgroundImage: `url(${menu})`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            flexDirection: 'column'
        }}>
            <h1 style={{ color: 'white', marginBottom: '20px' }}>Fitness Tracker</h1>
            <div className='d-flex justify-content-around' style={{ width: '100%' }}>
                <div style={boxStyle}>
                    <img src={dumbell} alt="Dumbbell" style={imgStyle} />
                    <p>Dumbbell Workout</p>
                    <a href="#dumbbell" style={linkStyle}>Learn More</a>
                </div>
                <div style={boxStyle}>
                    <img src={running} alt="Running" style={imgStyle} />
                    <p>Running</p>
                    <a href="#running" style={linkStyle}>Learn More</a>
                </div>
                <div style={boxStyle}>
                    <img src={food} alt="Food" style={imgStyle} />
                    <p>Healthy Food</p>
                    <a href="#food" style={linkStyle}>Learn More</a>
                </div>
            </div>
        </div>
    )
}

export default Home;
