import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { MdChecklist } from 'react-icons/md'; // Ensure this import is included
import API from '../api'; // Updated relative path

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Login successful!');
      navigate('/view-tasks');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: 'linear-gradient(89.2deg, rgba(255,255,255,1) -1.3%, rgba(253,109,38,1) 281.6%)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Headline Section */}
      <h1 className="absolute top-10 text-[20px] left-1/2 transform -translate-x-1/2 flex items-center gap-2  font-bold bg-gradient-to-r from-[#AA076B] via-[#61045F] to-[#AA076B] bg-clip-text text-transparent drop-shadow">
        <MdChecklist className="text-4xl text-white bg-gradient-to-r from-[#61045F] to-[#AA076B] p-1 rounded-full shadow-md" />
        Task Manager
      </h1>

      {/* Login Form Section */}
      <motion.form
        onSubmit={handleLogin}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white/90 backdrop-blur-sm border border-white/30 p-8 rounded-2xl shadow-xl w-full max-w-sm hover:shadow-2xl transition-all"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative mb-4">
          <input
            type={visible ? 'text' : 'password'}
            placeholder="Password"
            className="w-full p-2 border rounded pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setVisible(!visible)}
          >
            {visible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition-all flex justify-center items-center"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            'Login'
          )}
        </button>

        <div className="mt-4 text-sm flex justify-between">
          <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default Login;
