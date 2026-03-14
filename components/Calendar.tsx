import React from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const dates = Array.from({ length: 28 }, (_, i) => i + 1);

export default function CalendarSection() {
  return (
    <div className="grid grid-cols-4 gap-6">

      {/* CALENDAR */}
      <div className="col-span-3 bg-white p-6 rounded-xl">

        {/* Header */}
        <div className="flex items-center gap-6 mb-6">
          <h2 className="text-xl font-bold text-gray-600 mb-2">MARCH 2026</h2>

          <div className="flex items-center gap-4 bg-gray-100 px-4 py-1 rounded-lg text-sm mb-2">
            <button className="font-medium text-gray-500">{"<"}</button>
            <p className="font-medium text-gray-500">Today</p>
            <button className="font-medium text-gray-500">{">"}</button>
          </div>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-7 text-gray-500 text-sm mb-3 items-center justify-between">
          {days.map((d) => (
            <p key={d}>{d}</p>
          ))}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-7 gap-4">
          {dates.map((d) => (
            <div
              key={d}
              className={`
                rounded-xl h-24 p-2 text-sm text-gray-600
                ${d === 15 ? "bg-lime-100 border-2 border-lime-400" : "bg-gray-100"}
              `}
            >
              <p>{d}</p>

              {/* EVENT */}
              {d === 2 && (
                <div className="bg-pink-200 text-black px-3 py-1 rounded-lg text-xs mt-2 w-fit">
                  CSD102 Quiz
                </div>
              )}

              {d === 27 && (
                <div className="bg-blue-200 text-black px-3 py-1 rounded-lg text-xs mt-2 w-fit">
                  CSD222 Tutorial
                </div>
              )}

              {d === 15 && (
                <div className="bg-lime-200 text-black px-3 py-1 rounded-lg text-xs mt-2 w-fit">
                  CSD317 Quiz
                </div>
              )}
              
            </div>
          ))}

  
        </div>

      </div>

      {/* TASK LIST (SIDE PANEL) */}
      <div className="bg-white p-6 rounded-xl">

        <h3 className="font-semibold text-lg mb-7 text-gray-600">Upcoming Tasks</h3>

        <div className="space-y-4">

          <div className="border-l-4 border-pink-400 rounded-md pl-3 bg-gray-100 p-2">
            <p className="font-semibold text-pink-400">CSD102 Quiz</p>
            <p className="text-sm text-gray-500">Due Date: 2 March</p>
          </div>

          <div className="border-l-4 border-yellow-400 rounded-md pl-3 bg-gray-100 p-2">
            <p className="font-semibold text-yellow-400">CSD317 Quiz</p>
            <p className="text-sm text-gray-500">Due Date: 15 March</p>
          </div>

          <div className="border-l-4 border-blue-400 rounded-md pl-3 bg-gray-100 p-2">
            <p className="font-semibold text-blue-400">CSD222 Tutorial</p>
            <p className="text-sm text-gray-500">Due Date: 27 March</p>
          </div>

        </div>

        {/*TASKS COMPLETED*/}
        <h3 className="font-semibold text-lg mt-7 mb-7 text-gray-600">Completed Tasks</h3>

        <div className="space-y-4">

          <div className="border-l-4 border-emerald-400 rounded-md pl-3 bg-emerald-100 p-2">
            <p className="font-semibold text-emerald-400">CSD217: Lab Quiz</p>
            <p className="text-sm text-gray-500">Due Date: 19 February</p>
          </div>

          <div className="border-l-4 border-emerald-400 rounded-md pl-3 bg-emerald-100 p-2">
            <p className="font-semibold text-emerald-400">MAT161: Assignment 1</p>
            <p className="text-sm text-gray-500">Due Date: 20 February</p>
          </div>

        </div>

      </div>

    </div>
  );
}