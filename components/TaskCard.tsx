import React from "react";

const TaskCard: React.FC = () => {
  return (
    <div className="bg-gray-100 rounded-xl p-6 flex justify-between items-center border-l-4 border-orange-500 ">

      <div className="space-y-3">

        <div className="flex gap-3 items-center">
            <p className="text-sm text-gray-500">
            CSD102 - Data Structures
            </p>
            <div className="bg-gray-200 rounded-xl p-1 flex items-center text-xs text-gray-400"> 
                <p>Due in 2 days</p>
            </div>
        </div>

        <h2 className="text-xl font-semibold text-black">
          LAB ASSIGNMENT PROJECT
        </h2>

        <div className="flex gap-8 text-sm">

          <div>
            <p className="text-gray-500 py-1">Grade Impact 40%</p>
            <div className="w-40 h-2 bg-gray-300 rounded">
              <div className="bg-orange-500 h-2 w-[40%] rounded"></div>
            </div>
          </div>

          <div>
            <p className="text-gray-500 py-1">Urgency 90%</p>
            <div className="w-40 h-2 bg-gray-300 rounded">
              <div className="bg-blue-500 h-2 w-[90%] rounded"></div>
            </div>
          </div>

          {/*<div>
            <p className="text-gray-500 py-1">Grade Impact 15%</p>
            <div className="w-40 h-2 bg-gray-300 rounded">
              <div className="bg-black h-2 w-[15%] rounded"></div>
            </div>
          </div>*/}

        </div>
      </div>

      <div className="text-right">
        <h1 className="text-4xl text-orange-500 font-bold">
          94
        </h1>

        <p className="text-sm text-gray-500">
          Priority Score
        </p>
      </div>

    </div>
  );
};

export default TaskCard;