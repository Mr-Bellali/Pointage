import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import AuthRoute from './components/auth/AuthRoute';
import ChangePassword from './pages/ChangePassword'; // Import ChangePassword component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} /> {/* Add ChangePassword route */}
        <Route path="/dashboard" element={<AuthRoute><Home /></AuthRoute>} />
        <Route path="/employees" element={<AuthRoute><Employees /></AuthRoute>} />
        <Route path="/attendance" element={<AuthRoute><Attendance /></AuthRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
