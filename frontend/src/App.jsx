import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';

import Login from './pages/Login';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';

const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/attendance" element={<Attendance />} />
        
      </Routes>
    </Router>
  );
};

export default App;
