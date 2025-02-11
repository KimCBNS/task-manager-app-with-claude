import React from 'react';

const TaskCard = ({ 
  task, 
  onStatusChange 
}) => {
  // Calculate days until due date
  const daysUntilDue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Determine card color based on due date
  const getStatusColor = () => {
    const days = daysUntilDue();
    if (days < 0) return 'bg-red-100';
    if (days <= 3) return 'bg-yellow-100';
    return 'bg-white';
  };

  return (
    <div className={`rounded-lg border p-4 mb-4 ${getStatusColor()}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
          <p className="text-gray-600 mb-2">{task.description}</p>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>

          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            className="border rounded p-1 text-sm"
          >
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
        </div>

        <span className={`px-2 py-1 rounded text-sm ${
          task.status === 'complete' ? 'bg-green-500 text-white' : 
          task.status === 'in progress' ? 'bg-blue-500 text-white' : 
          'bg-gray-500 text-white'
        }`}>
          {task.status}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;