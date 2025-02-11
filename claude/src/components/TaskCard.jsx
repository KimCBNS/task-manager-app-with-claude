import React from 'react';

const TaskCard = ({ 
  task, 
  onStatusChange 
}) => {
  const daysUntilDue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = () => {
    const days = daysUntilDue();
    if (days < 0) return 'bg-red-50 border-red-200';
    if (days <= 3) return 'bg-yellow-50 border-yellow-200';
    return 'bg-white border-gray-200';
  };

  const getStatusBadgeColor = () => {
    switch(task.status) {
      case 'complete':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`rounded-lg border p-4 shadow-sm ${getStatusColor()} transition-all`}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">{task.title}</h3>
          <p className="text-gray-600 mb-3">{task.description}</p>
          
          <div className="flex items-center gap-4 mb-3">
            <span className="text-sm text-gray-600">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
            <span className={`px-2 py-1 rounded-full text-sm ${getStatusBadgeColor()}`}>
              {task.status}
            </span>
          </div>

          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            className="border border-gray-300 rounded-lg p-1.5 text-sm text-gray-600 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;