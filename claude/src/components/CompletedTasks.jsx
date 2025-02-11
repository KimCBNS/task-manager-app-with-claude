import React from 'react';
import TaskCard from './TaskCard';

const CompletedTasks = ({ tasks, onStatusChange }) => {
  return (
    <div className="mt-8 bg-gray-50 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Completed Tasks ({tasks.length})
      </h2>
      <div className="space-y-4">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default CompletedTasks;