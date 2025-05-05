import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import API from '../api'; // ✅ use centralized API with baseURL

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/forgot-password', { email });
      toast.success('Reset link sent! Check your inbox or console.');
      setSubmitted(true);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage:
          'linear-gradient(89.2deg, rgba(255,255,255,1) -1.3%, rgba(253,109,38,1) 281.6%)'
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
          Forgot Password
        </h2>

        {submitted ? (
          <p className="text-green-600 text-center mb-4 font-medium">
            ✅ Reset link sent! Check your email or backend console.
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition-all">
              Send Reset Link
            </button>
          </>
        )}

        <div className="mt-4 text-sm text-center">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default ForgotPassword;
