import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import API from '../api'; // ✅ uses centralized axios instance

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await API.post('/auth/reset-password', {
        token,
        newPassword: password,
      });
      toast.success('Password reset successful!');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: 'linear-gradient(89.2deg, rgba(255,255,255,1) -1.3%, rgba(253,109,38,1) 281.6%)'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.form
        onSubmit={handleReset}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white/90 backdrop-blur-sm border border-white/30 p-8 rounded-2xl shadow-xl w-full max-w-sm hover:shadow-2xl transition-all"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Reset Password
        </h2>

        <div className="relative mb-4">
          <input
            type={visible ? 'text' : 'password'}
            placeholder="New Password"
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
          Reset Password
        </button>
      </motion.form>
    </motion.div>
  );
};

export default ResetPassword;
