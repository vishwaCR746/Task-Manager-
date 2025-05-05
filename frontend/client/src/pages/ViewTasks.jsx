import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getTasks,
  getTaskStats,
  deleteTask,
  toggleComplete,
  togglePin,
} from '../api/task';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FaTrash, FaCheck, FaTimes, FaThumbtack } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { MdChecklist } from 'react-icons/md';
import toast from 'react-hot-toast';

const ViewTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, open: 0 });

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      if (err.response?.status === 401) {
        navigate('/login');
        toast.error('Session expired. Please login again.');
      } else {
        toast.error('Failed to load tasks.');
      }
    }
  };

  const fetchStats = async () => {
    try {
      const res = await getTaskStats();
      setStats(res.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      await toggleComplete(task._id, !task.status);
      fetchTasks();
      fetchStats();
      toast.success(task.status ? 'Task marked as undone' : 'Task marked as done');
    } catch (err) {
      toast.error('Failed to update task status.');
    }
  };

  const handleTogglePin = async (task) => {
    try {
      await togglePin(task._id, !task.pinned);
      fetchTasks();
    } catch (err) {
      toast.error('Failed to toggle pin.');
    }
  };

  const handleDelete = async (id) => {
    toast((t) => (
      <div className="text-sm">
        <p className="mb-2">Are you sure you want to delete this task?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await deleteTask(id);
                fetchTasks();
                fetchStats();
                toast.success('Task deleted');
              } catch {
                toast.error('Failed to delete task');
              }
            }}
            className="bg-red-500 text-white px-3 py-1 rounded text-xs"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 px-3 py-1 rounded text-xs"
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: 10000 });
  };

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100 relative">
      {/* App Header */}
      <h1 className="absolute top-2 text-[20px] left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-1xl font-bold bg-gradient-to-r from-[#AA076B] via-[#61045F] to-[#AA076B] bg-clip-text text-transparent drop-shadow z-10 mt-2">
        <MdChecklist className="text-4xl text-white bg-gradient-to-r from-[#61045F] to-[#AA076B] p-1 rounded-full shadow-md" />
        Task Manager
      </h1>

      <div className="flex flex-1">
        <Sidebar
          onLogout={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
          }}
        />

        <main className="flex-1 p-8 overflow-auto bg-gradient-to-r from-white to-orange-100">
          <Header openTasks={stats.open} />
          <h2 className="text-xl font-bold mb-4">Your Tasks</h2>

          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks found.</p>
          ) : (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <motion.div
                  key={task._id}
                  className={`p-4 rounded-xl shadow bg-white border-l-4 ${task.status ? 'border-green-500' : 'border-yellow-400'
                    }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-lg">{task.title}</h3>
                    <button
                      onClick={() => handleTogglePin(task)}
                      title="Pin/Unpin"
                      className="text-yellow-600 text-lg"
                    >
                      <FaThumbtack
                        className={
                          task.pinned ? 'rotate-45 text-orange-600' : 'opacity-50'
                        }
                      />
                    </button>
                  </div>
                  <p>{task.description}</p>
                  <p className="text-sm text-gray-500 mt-1">Priority: {task.priority}</p>
                  <p className="text-xs text-gray-400 mb-2">
                    {new Date(task.date).toLocaleString()}
                  </p>
                  <div className="flex gap-2 text-sm mt-2">
                    <button
                      onClick={() => handleToggleStatus(task)}
                      className={`flex items-center gap-1 px-2 py-1 rounded ${task.status
                          ? 'bg-gray-300 text-gray-800'
                          : 'bg-green-500 text-white'
                        }`}
                    >
                      {task.status ? <FaTimes /> : <FaCheck />}
                      {task.status ? 'Undo' : 'Done'}
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default ViewTasks;
