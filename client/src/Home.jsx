import React from 'react';
import menu from './assets/menu.jpg';
function Home() {
    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100' style= {{
            backgroundImage: `url(${menu})`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center'
        }}>
            <div>
                
            </div>
        </div>
         
    )
}

export default Home;