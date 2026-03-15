"use client";

import { useState } from "react";

export default function CreateTaskModal({ onClose, refreshTasks }: any) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [hours, setHours] = useState(1);
  const [gradeImpact, setGradeImpact] = useState(1);
  const [priority, setPriority] = useState(1);

  const handleCreate = async () => {

    if (!title || !deadline) {
      alert("Please fill required fields");
      return;
    }

    const taskData = {
      title,
      description,
      deadline,
      estimated_hours: Number(hours),
      grade_impact: Number(gradeImpact),
      status: "pending",
      priority: Number(priority),
      course_id: null,
      assessment_id: null
    };

    try {

      const res = await fetch("http://localhost:8000/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error(err);
        alert("Task creation failed");
        return;
      }

      const data = await res.json();
      console.log("Created:", data);

      refreshTasks();
      onClose();

    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-[420px] space-y-4">

        <h2 className="text-lg font-semibold text-black">
          Create Task
        </h2>

        <input
          placeholder="Task title"
          className="w-full border p-2 rounded text-gray-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded text-gray-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          className="w-full border p-2 rounded text-gray-400"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <div className="grid grid-cols-3 gap-3">

          <input
            type="number"
            placeholder="Hours"
            className="border p-2 rounded text-gray-400"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />

          <input
            type="number"
            placeholder="Grade Impact"
            className="border p-2 rounded text-gray-400"
            value={gradeImpact}
            onChange={(e) => setGradeImpact(Number(e.target.value))}
          />

          <input
            type="number"
            placeholder="Priority"
            className="border p-2 rounded text-gray-400"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
          />

        </div>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded text-gray-500"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-teal-600 text-white rounded"
          >
            Create
          </button>

        </div>

      </div>

    </div>
  );
}