
import React, { useState } from "react";

export default function NewRequestForm({ onCancel }) {
  const [tasks, setTasks] = useState([
    { desc: "Replace brake pads", time: 0.5, parts: true },
    { desc: "Clean calipers", time: 0.3, parts: false },
    { desc: "Test drive", time: 0.2, parts: true },
  ]);

  const updateTime = (index, delta) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index
          ? {
              ...task,
              time: parseFloat(
                Math.max(0, parseFloat(task.time) + delta).toFixed(1)
              ),
            }
          : task
      )
    );
  };

  const updateManualTime = (index, value) => {
    const newTime = parseFloat(value);
    if (!isNaN(newTime)) {
      setTasks((prev) =>
        prev.map((task, i) => (i === index ? { ...task, time: newTime } : task))
      );
    }
  };

  const removeTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const addTask = () => {
    setTasks([...tasks, { desc: "", time: 0.0, parts: false }]);
  };

  const totalTime = tasks.reduce((sum, task) => sum + parseFloat(task.time || 0), 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">New Work Request</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Registration Number</label>
          <input type="text" className="mt-1 block w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">WIP Number</label>
          <input type="text" className="mt-1 block w-full border rounded-md px-3 py-2" />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600">Work Description</label>
        <textarea className="mt-1 block w-full border rounded-md px-3 py-2" rows="2"></textarea>
      </div>

      <h3 className="font-semibold text-gray-700 mb-2">Labour Breakdown</h3>
      <table className="min-w-full text-sm text-left border mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4">Task Description</th>
            <th className="py-2 px-4">Time (hrs)</th>
            <th className="py-2 px-4">Parts Required</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tasks.map((task, index) => (
            <tr key={index}>
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={task.desc}
                  onChange={(e) =>
                    setTasks((prev) =>
                      prev.map((t, i) => (i === index ? { ...t, desc: e.target.value } : t))
                    )
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="py-2 px-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateTime(index, -0.1)}
                  className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                >
                  -
                </button>
                <input
                  type="text"
                  value={task.time}
                  onChange={(e) => updateManualTime(index, e.target.value)}
                  className="w-16 border rounded px-1 text-center"
                />
                <button
                  type="button"
                  onClick={() => updateTime(index, 0.1)}
                  className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                >
                  +
                </button>
              </td>
              <td className="py-2 px-4 text-center">
                <input
                  type="checkbox"
                  checked={task.parts}
                  onChange={(e) =>
                    setTasks([
                      ...tasks.slice(0, index),
                      { ...task, parts: e.target.checked },
                      ...tasks.slice(index + 1),
                    ])
                  }
                />
              </td>
              <td className="py-2 px-4 text-center">
                <button
                  type="button"
                  onClick={() => removeTask(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        onClick={addTask}
        className="text-blue-600 hover:underline text-sm mb-4"
      >
        + Add Task
      </button>

      <p className="text-sm text-gray-600 mb-4">
        <strong>Total Labour Requested:</strong> {totalTime.toFixed(1)} hrs
      </p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-1">Upload Labour Breakdown PDF</label>
        <input type="file" className="block w-full text-sm text-gray-500" />
      </div>

      <div className="flex gap-4">
        <button className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold shadow hover:bg-blue-700 transition">
          Submit Request
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full bg-gray-300 text-gray-800 py-2 rounded-xl font-semibold shadow hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
