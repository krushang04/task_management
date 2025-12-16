import React, { useState, useEffect, useCallback } from "react";
import { Plus, Search, Filter, Users } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("none");
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { logout, user } = useAuth();

  useEffect(() => {
    if (user?.role === "user") {
      setSortBy("dueDate");
    }
  }, [user?.role]);
  const generateRandomDate = () => {
    const today = new Date();
    const future = new Date(today.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000);
    return future.toISOString().split("T")[0];
  };
  const generateRandomStatus = () => {
    const statuses = ["Pending", "In Progress", "Completed"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };
  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20");
      const data = await response.json();
      const enhancedTasks = data.map((task) => ({
        id: task.id,
        title: task.title,
        description: `Task description for: ${task.title}`,
        status: task.completed ? "Completed" : generateRandomStatus(),
        dueDate: generateRandomDate(),
      }));
      setTasks(enhancedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  const filterAndSortTasks = useCallback(() => {
    let filtered = [...tasks];
    if (searchTerm) {
      filtered = filtered.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (statusFilter !== "All") {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }
    if (sortBy === "dueDate") {
      filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortBy === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "status") {
      filtered.sort((a, b) => a.status.localeCompare(b.status));
    }

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, statusFilter, sortBy]);
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  useEffect(() => {
    filterAndSortTasks();
  }, [filterAndSortTasks]);
  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
    };
    setTasks([newTask, ...tasks]);
    setShowForm(false);
  };
  const handleEditTask = (taskData) => {
    setTasks(tasks.map((task) => (task.id === taskData.id ? taskData : task)));
    setEditingTask(null);
  };
  const handleMarkComplete = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: "Completed" } : task)));
  };
  const handleDeleteTask = (taskId) => {
    if (user.role !== "admin") {
      alert("Only admins can delete tasks");
      return;
    }
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (dragIndex === dropIndex) return;

    const newFilteredTasks = [...filteredTasks];
    const [movedTask] = newFilteredTasks.splice(dragIndex, 1);

    newFilteredTasks.splice(dropIndex, 0, movedTask);

    setFilteredTasks(newFilteredTasks);

    const updatedTasks = newFilteredTasks.map((filteredTask) => tasks.find((task) => task.id === filteredTask.id)).filter(Boolean);

    setTasks(updatedTasks);
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading tasks...</div>
      </div>
    );
  }
  if (showForm || editingTask) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <TaskForm
            task={editingTask}
            onSave={editingTask ? handleEditTask : handleAddTask}
            onCancel={() => {
              setEditingTask(null);
              setShowForm(false);
            }}
            userRole={user?.role}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <Users className="mr-1" size={16} />
              <span className="font-medium">{user?.name || "User"}</span>
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{user?.role || "user"}</span>
            </div>
            <button onClick={logout} className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search tasks..."
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-gray-400 mr-2" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  {user?.role === "admin" && <option value="none">None (Drag to reorder)</option>}
                  <option value="dueDate">Due Date</option>
                  <option value="title">Title</option>
                  <option value="status">Status</option>
                </select>
              </div>
              {user?.role === "admin" && (
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={setEditingTask}
                onComplete={handleMarkComplete}
                onDelete={handleDeleteTask}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                userRole={user?.role}
              />
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <p className="text-gray-500">No tasks found. {user?.role === "admin" && 'Click "Add Task" to create one.'}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
export default TaskList;
