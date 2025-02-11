import { useState, useEffect } from 'react'
import TaskCard from './components/TaskCard'
import TaskForm from './components/TaskForm'
import { PlusCircle, ListTodo, Timer, CheckCircle } from 'lucide-react'

function App() {
  // Initialize state from localStorage or use empty array if nothing stored
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      {
        id: 1,
        title: "Test Task",
        description: "This is a test task to verify our component",
        dueDate: "2025-02-14",
        status: "not started"
      }
    ];
  });

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const notStartedTasks = tasks.filter(task => task.status === 'not started');
  const inProgressTasks = tasks.filter(task => task.status === 'in progress');
  const completedTasks = tasks.filter(task => task.status === 'complete');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2238] via-[#232e4b] to-[#1a2238] py-8">
      
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-8 text-white text-center">
          Kim's Stuff to Do
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - New Task Form */}
          <div className="lg:col-span-1">
          <div className="bg-blue-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-duration-300">
  <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
    <PlusCircle className="w-6 h-6 text-blue-600" />
    Add New Task
  </h2>
  <TaskForm onAddTask={handleAddTask} />
</div>
          </div>

          {/* Right Panel - Task Lists */}
          <div className="lg:col-span-3 space-y-6">
            {/* Not Started Tasks */}
            <div className="bg-gray-100 rounded-xl p-6 shadow-lg border-2 border-red-200">
  <h2 className="text-2xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
    <ListTodo className="w-6 h-6 text-red-600" />
    To Do
    <span className="text-sm font-normal bg-red-100 text-red-800 px-2 py-1 rounded-full ml-2">
      {notStartedTasks.length}
    </span>
  </h2>
              <div className="space-y-4">
                {notStartedTasks.map(task => (
                  <TaskCard 
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            </div>

            {/* In Progress Tasks */}
            <div className="bg-gray-100 rounded-xl p-6 shadow-lg border-2 border-blue-200">
  <h2 className="text-2xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
    <Timer className="w-6 h-6 text-blue-600" />
    In Progress
    <span className="text-sm font-normal bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-2">
      {inProgressTasks.length}
    </span>
  </h2>
              <div className="space-y-4">
                {inProgressTasks.map(task => (
                  <TaskCard 
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            </div>

            {/* Completed Tasks */}
            <div className="bg-gray-100 rounded-xl p-6 shadow-lg border-2 border-green-200">
  <h2 className="text-2xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
    <CheckCircle className="w-6 h-6 text-green-600" />
    Completed
    <span className="text-sm font-normal bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">
      {completedTasks.length}
    </span>
  </h2>
              <div className="space-y-4">
                {completedTasks.map(task => (
                  <TaskCard 
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App