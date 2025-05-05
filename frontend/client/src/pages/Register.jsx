import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import API from '../api'; // ✅ centralized axios instance
import { MdChecklist } from 'react-icons/md';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirm) {
      toast.error('All fields are required');
      return;
    }
    if (password !== confirm) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const res = await API.post('/auth/register', {
        name,
        email,
        password,
      });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Registered successfully!');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage:
          'linear-gradient(89.2deg, rgba(255,255,255,1) -1.3%, rgba(253,109,38,1) 281.6%)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* App Header */}
      <h1 className="absolute top-3 text-[20px] left-1/2 transform -translate-x-1/2 flex items-center gap-2  font-bold bg-gradient-to-r from-[#AA076B] via-[#61045F] to-[#AA076B] bg-clip-text text-transparent drop-shadow z-10 mt-12">
        <MdChecklist className="text-4xl text-white bg-gradient-to-r from-[#61045F] to-[#AA076B] p-1 rounded-full shadow-md" />
        Task Manager
      </h1>

      <motion.form
        onSubmit={handleRegister}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white/90 backdrop-blur-sm border border-white/30 p-8 rounded-2xl shadow-xl w-full max-w-sm hover:shadow-2xl transition-all"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <div className="relative mb-4">
          <input
            type={visible2 ? 'text' : 'password'}
            placeholder="Confirm Password"
            className="w-full p-2 border rounded pr-10"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setVisible2(!visible2)}
          >
            {visible2 ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition-all">
          Register
        </button>

        <div className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default Register;
