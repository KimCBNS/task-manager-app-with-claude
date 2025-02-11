import { useState } from 'react'
import TaskCard from './components/TaskCard'
import TaskForm from './components/TaskForm'
import CompletedTasks from './components/CompletedTasks'

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Test Task",
      description: "This is a test task to verify our component",
      dueDate: "2025-02-14",
      status: "not started"
    }
  ]);

  const handleAddTask = (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // Separate active and completed tasks
  const activeTasks = tasks.filter(task => task.status !== 'complete');
  const completedTasks = tasks.filter(task => task.status === 'complete');

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Task Manager</h1>
      
      <TaskForm onAddTask={handleAddTask} />
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Active Tasks ({activeTasks.length})
        </h2>
        {activeTasks.map(task => (
          <TaskCard 
            key={task.id}
            task={task}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {completedTasks.length > 0 && (
        <CompletedTasks 
          tasks={completedTasks}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  )
}

export default App