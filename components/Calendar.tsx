"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarWidget() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">Calendar</h2>

      <Calendar
        value={date}
        onChange={(value) => setDate(value as Date)}
      />

      <p className="mt-3 text-sm text-gray-500">
        Selected date: {date.toDateString()}
      </p>
    </div>
  );
}