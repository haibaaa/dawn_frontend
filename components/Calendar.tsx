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
                ${d === 15 ? "bg-teal-100 border-2 border-teal-600" : "bg-gray-100"}
              `}
            >
              <p>{d}</p>

              {/* EVENT */}
              {d === 1 && (
                <div className="bg-pink-200 text-pink-700 px-3 py-1 rounded-full text-xs mt-2 w-fit">
                  CSD102 Quiz
                </div>
              )}

              {d === 6 && (
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs mt-2 w-fit">
                  CSD222 Tut
                </div>
              )}

              {/*HIGHLIGHTING TODAY */}
              {d === 16 && (
                <div className="bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs mt-2 w-fit">
                  Assignment
                </div>
              )}
              
            </div>
          ))}

  
        </div>

      </div>

      {/* TASK LIST (SIDE PANEL) */}
      <div className="bg-white p-6 rounded-xl">

        <h3 className="font-semibold mb-4">Upcoming Tasks</h3>

        <div className="space-y-4">

          <div className="border-l-4 border-pink-400 pl-3">
            <p className="font-medium">CSD102 Quiz</p>
            <p className="text-sm text-gray-500">Oct 1</p>
          </div>

          <div className="border-l-4 border-green-400 pl-3">
            <p className="font-medium">CSD222 Tutorial</p>
            <p className="text-sm text-gray-500">Oct 6</p>
          </div>

          <div className="border-l-4 border-blue-400 pl-3">
            <p className="font-medium">CSD102 Quiz</p>
            <p className="text-sm text-gray-500">Oct 16</p>
          </div>

        </div>
      </div>

    </div>
  );
}