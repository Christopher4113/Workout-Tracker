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

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/Workout" element={<Workout />} />
          <Route path="/Endurance" element={<Endurance />} />
          <Route path="/Calorie" element={<Calorie />} />
          <Route path="/postsWT" element={<PostsWT />} /> {/* Corrected import */}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
