import { useState } from 'react';
import { FaBars, FaHome, FaPlus, FaPowerOff, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? 'text-orange-700 font-bold scale-110'
      : 'text-orange-500';

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex w-16  bg-white shadow-xl flex-col items-center p-3 rounded-r-xl"
      >
        <Link to="/view-tasks" className={`mb-6 hover:scale-110 ${isActive('/view-tasks')}`} title="Home / View Tasks">
          <FaHome size={20} />
        </Link>
        <Link to="/create-task" className={`mb-6 hover:scale-110 ${isActive('/create-task')}`} title="Create Task">
          <FaPlus size={20} />
        </Link>
        <button
          className="mt-auto text-red-400 hover:text-red-600 transition"
          onClick={onLogout}
          title="Logout"
        >
          <FaPowerOff size={18} />
        </button>
      </motion.aside>

      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-orange-600 text-white p-2 rounded shadow-md"
        onClick={() => setOpen(true)}
      >
        <FaBars />
      </button>

      {/* Mobile Sidebar + Backdrop */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dark backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            {/* Slide-in menu */}
            <motion.div
              className="fixed top-0 left-0 w-48 h-full  bg-yellow-50 shadow-lg p-4 z-50 flex flex-col"
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              exit={{ x: -200 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 mb-6 self-end"
              >
                <FaTimes size={20} />
              </button>

              <Link to="/view-tasks" className={`mb-4 ${isActive('/view-tasks')}`} onClick={() => setOpen(false)}>
                <FaHome className="inline mr-2" /> Home
              </Link>
              <Link to="/create-task" className={`mb-4 ${isActive('/create-task')}`} onClick={() => setOpen(false)}>
                <FaPlus className="inline mr-2" /> Create Task
              </Link>
              <button onClick={onLogout} className="mt-auto text-red-500">
                <FaPowerOff className="inline mr-2" /> Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
