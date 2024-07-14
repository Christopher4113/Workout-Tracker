import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import Home from './home.jsx';
import PrivateRoute from './PrivateRoute';
import Workout from './Workout'; // Import Workout component
import Endurance from './Endurance'; // Import Endurance component
import Calorie from './Calorie'; // Import Calorie component
import PostsWT from './postsWT'; // Import corrected
import UpdateWT from './updateWT.jsx';
import CreateEndurance from './createEndurance.jsx';
import UpdateEndurance from './updateEndurance.jsx';
import CreateCalorie from './createCalorie.jsx';
import UpdateCalorie from './updateCalorie.jsx';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/Workout" element={<Workout />} />
          <Route path="/Endurance" element={<PrivateRoute><Endurance /></PrivateRoute>} />
          <Route path="/Calorie" element={<PrivateRoute><Calorie /> </PrivateRoute>} />
          <Route path="/postsWT" element={<PrivateRoute><PostsWT /> </PrivateRoute>} /> 
          <Route path="/updateWT/:id" element={<UpdateWT />} /> 
          <Route path="/createEndurance" element={<CreateEndurance />} /> 
          <Route path="/updateEndurance/:id" element={<UpdateEndurance />} />
          <Route path="/createCalorie" element={<CreateCalorie />} /> 
          <Route path="/updateCalorie/:id" element={<UpdateCalorie />} /> 
        </Routes>
    </BrowserRouter>
  );
}

export default App;
