import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'not started'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({
      ...taskData,
      id: Date.now()
    });
    setTaskData({
      title: '',
      description: '',
      dueDate: '',
      status: 'not started'
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          placeholder="Enter task title..."
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          rows="2"
          placeholder="Enter description..."
        />
      </div>

      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-medium"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;