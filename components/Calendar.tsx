"use client";
import React from "react";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const dates = Array.from({ length: 31 }, (_, i) => i + 1);

type Task = {
  id: number;
  title: string;
  deadline: string;
};

type Props = {
  tasks: Task[];
  refreshTasks: () => void;
};

export default function Calendar({ tasks, refreshTasks }: Props) {

  const deleteTask = async (taskId: number) => {
    try {

      const res = await fetch(`http://localhost:8000/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.error("Delete failed");
        return;
      }

      refreshTasks();

    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const getTasksForDate = (day: number) => {
    return tasks.filter((task) => {
      const date = new Date(task.deadline);
      return date.getDate() === day;
    });
  };

  return (
    <div className="grid grid-cols-4 gap-6">

      {/* CALENDAR */}
      <div className="col-span-3 bg-white p-6 rounded-xl">

        {/* Header */}
        <div className="flex items-center gap-6 mb-6">
          <h2 className="text-xl font-bold text-gray-600">
            March 2026
          </h2>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-7 text-gray-500 text-sm mb-3">
          {days.map((d) => (
            <p key={d}>{d}</p>
          ))}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-7 gap-4">

          {dates.map((d) => {
            const tasksForDay = getTasksForDate(d);

            return (
              <div
                key={d}
                className="rounded-xl h-24 p-2 text-sm text-gray-600 bg-gray-100"
              >

                <p>{d}</p>

                {tasksForDay.map((task) => (
                  <div
                    key={task.id}
                    className="bg-lime-200 text-black px-2 py-1 rounded-lg text-xs mt-1 w-fit"
                  >
                    {task.title}
                  </div>
                ))}

              </div>
            );
          })}

        </div>
      </div>

      {/* TASK PANEL */}
      <div className="bg-white p-6 rounded-xl">

        <h3 className="font-semibold text-lg mb-6 text-gray-600">
          Upcoming Tasks
        </h3>

        <div className="space-y-4">

          {tasks.map((task) => (
            <div
              key={task.id}
              className="border-l-4 border-teal-700 rounded-md pl-3 bg-gray-100 p-2 flex justify-between items-center"
            >

              <div>
                <p className="font-semibold text-teal-700">
                  {task.title}
                </p>

                <p className="text-sm text-gray-500">
                  Due: {new Date(task.deadline).toDateString()}
                </p>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-3 py-1 rounded-lg"
              >
                ✓ Done
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}