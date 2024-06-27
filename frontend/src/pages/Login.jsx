import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const ENDPOINT = 'http://localhost:8080';
  const title = 'Login';
  document.title = 'Pointage | ' + title;
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate('/dashboard');
    }
  }, []);

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (!data.token) {
        throw new Error('Login unsuccessful');
      }

      setFormData({
        email: '',
        password: '',
      });

      const alert = (
        <div className="bg-[#88AB8E] border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          Login success!
        </div>
      );

      localStorage.setItem('token', data.token);
      setMessage(alert);
      navigate('/dashboard');

    } catch (error) {
      console.error('There was a problem with the submission: ', error);

      const alert = (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          Login unsuccessful. Please try again.
        </div>
      );
      setMessage(alert);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen" style={{ backgroundColor: '#F2F1EB' }}>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6 text-3xl font-bold text-center" style={{ color: '#88AB8E' }}>
          Login
        </div>
        {message && message}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mt-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-gray-300 focus:border-[#88AB8E] focus:ring focus:ring-[#AFC8AD] focus:ring-opacity-50 text-lg"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-3 mt-4 rounded-lg border-gray-300 focus:border-[#88AB8E] focus:ring focus:ring-[#AFC8AD] focus:ring-opacity-50 text-lg"
            />
          </div>
          <div className="mt-6">
            <button type="submit" className="w-full" style={{ backgroundColor: '#AFC8AD', color: '#EEE7DA', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '1.125rem', textAlign: 'center' }}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
