import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask, getTaskStats } from '../api/task';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { MdChecklist } from 'react-icons/md';

const CreateTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [stats, setStats] = useState({ total: 0, completed: 0, open: 0 });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await createTask({ title, description: desc, priority });
      setTitle('');
      setDesc('');
      setPriority('Medium');
      navigate('/view-tasks');
    } catch (err) {
      console.error('Task creation failed:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await getTaskStats();
      setStats(res.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* App Header */}
      <h1 className="absolute top-2 text-[20px] left-1/2 transform -translate-x-1/2 flex items-center gap-2  font-bold bg-gradient-to-r from-[#AA076B] via-[#61045F] to-[#AA076B] bg-clip-text text-transparent drop-shadow z-10 mt-3">
        <MdChecklist className="text-4xl text-white bg-gradient-to-r from-[#61045F] to-[#AA076B] p-1 rounded-full shadow-md" />
        Task Manager
      </h1>

      <Sidebar
        onLogout={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }}
      />
      <main className="flex-1 p-10 overflow-auto bg-gradient-to-r from-white to-orange-100">
        <Header openTasks={stats.open} />
        <form
          onSubmit={handleAdd}
          className="bg-white p-6 rounded-xl shadow-xl max-w-2xl mx-auto"
        >
          <h2 className="text-xl font-bold mb-4">Create a New Task</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            required
          />
          <textarea
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            required
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded w-full">
            Create Task
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateTask;
