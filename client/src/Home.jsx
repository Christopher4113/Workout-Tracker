import React from 'react';
import menu from './assets/menu.jpg';
import dumbell from './assets/dumbell.jpg';
import running from './assets/running.jpg';
import food from './assets/food.webp';

function Home() {
    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100' style= {{
            backgroundImage: `url(${menu})`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center'
        }}>
            <h1>Fitness Tracker</h1>
            <div>
                
            </div>
        </div>
         
    )
}

export default Home;