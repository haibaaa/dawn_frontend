"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Calendar from "@/components/Calendar";
import CreateTaskModal from "@/components/TaskCard";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const { user, logout } = useAuth();
  const displayName = (
  user?.username ??
  user?.email?.split("@")[0] ??
  "User"
).toUpperCase();

  const getTasks = async () => {
    const res = await fetch("http://localhost:8000/tasks/");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-col gap-6 px-12 py-10">

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-semibold text-teal-900">
              HI, {displayName}
            </h1>

            <p className="text-gray-500">
              Stay productive ✨
            </p>
          </div>

          {/* CREATE TASK BUTTON */}
          <button
            onClick={() => setOpenModal(true)}
            className="bg-teal-600 text-white px-5 py-2 rounded-lg"
          >
            + Create Task
          </button>

        </div>

        <Calendar tasks={tasks} refreshTasks={getTasks} />

      </div>

      {openModal && (
        <CreateTaskModal
          onClose={() => setOpenModal(false)}
          refreshTasks={getTasks}
        />
      )}

    </div>
  );
}