import { motion } from 'framer-motion';
import { FaRegSmile } from 'react-icons/fa';

const Header = ({ openTasks = 0 }) => {
  let name = 'User'; // default

  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      if (parsed?.name) {
        name = parsed.name;
      }
    }
  } catch (err) {
    console.error('Error parsing user from localStorage:', err);
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-between items-center mb-6 px-4 py-3 rounded-xl shadow-md bg-white mt-11"
    >
      <div>
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-gray-800">
          <FaRegSmile className="text-orange-500" />
          Welcome, {name}!
        </h1>
        <p className="text-sm sm:text-base text-gray-500">
          You have {openTasks} active tasks
        </p>
      </div>
    </motion.header>
  );
};

export default Header;
