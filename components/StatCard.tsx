import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => {
  return (
    <div className="border-2 border-teal-700 rounded-xl p-6 m-2 w-42">

      <p className="text-gray-600 text-sm">
        {title}
      </p>

      <h2 className={`text-4xl font-bold mt-2 ${color}`}>
        {value}
      </h2>

    </div>
  );
};

export default StatCard;