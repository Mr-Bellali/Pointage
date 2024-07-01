import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ChangePassword = () => {

  const token = localStorage.getItem("token")
  const decoded = jwtDecode(token)

  console.log(decoded.id)

  const ENDPOINT = 'http://localhost:8080';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const { newPassword, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${ENDPOINT}/change-password/${decoded.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ password: newPassword }), // Ensure the key is "password"
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Network response was not ok');
        }

        setFormData({
            newPassword: '',
            confirmPassword: '',
        });

        alert('Password changed successfully');
        navigate('/attendance');

    } catch (error) {
        console.error('There was a problem with changing password: ', error);
        alert('Password change unsuccessful. Please try again.');
    }
};



  return (
    <div className="flex justify-center items-center h-screen" style={{ backgroundColor: '#F2F1EB' }}>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6 text-3xl font-bold text-center" style={{ color: '#88AB8E' }}>
          Change Password
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mt-3">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              name="newPassword"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-gray-300 focus:border-[#88AB8E] focus:ring focus:ring-[#AFC8AD] focus:ring-opacity-50 text-lg"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              className="w-full px-4 py-3 mt-4 rounded-lg border-gray-300 focus:border-[#88AB8E] focus:ring focus:ring-[#AFC8AD] focus:ring-opacity-50 text-lg"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full"
              style={{ backgroundColor: '#AFC8AD', color: '#EEE7DA', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '1.125rem', textAlign: 'center' }}
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
