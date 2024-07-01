import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import AuthRoute from './components/auth/AuthRoute';
import ChangePassword from './pages/ChangePassword';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} /> 
        <Route path="/dashboard" element={<AuthRoute><Home /></AuthRoute>} />
        <Route path="/employees" element={<AuthRoute><Employees /></AuthRoute>} />
        <Route path='/profile' element={<AuthRoute><Profile /></AuthRoute>}/>
        <Route path="/attendance" element={<AuthRoute><Attendance /></AuthRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
