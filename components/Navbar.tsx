"use client";

import Link from "next/link";
import React from "react";
import { useAuth } from "@/context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const displayName = user?.username ?? user?.email ?? "User";

  return (
    <div className="flex items-center justify-between px-13 py-4 border-b bg-white">
      <div className="flex items-center gap-2">
        <img height="35" width="35" src="/logo.png" alt="logo" />
        <h1 className="text-xl font-semibold text-teal-900">UniPlanner</h1>
      </div>

      <div className="flex items-center gap-7 text-gray-600">
        <Link href="/" className="font-medium text-gray-600 hover:text-teal-700 transition-colors duration-300">Dashboard</Link>
        <Link href="/calendar" className="font-medium text-gray-600 hover:text-teal-700 transition-colors duration-300">Calendar</Link>
        <Link href="/grades" className="font-medium text-gray-600 hover:text-teal-700 transition-colors duration-300">Performance</Link>
        <Link href="/exam-prep" className="font-medium text-gray-600 hover:text-teal-700 transition-colors duration-300">Exam Prep</Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
            <div className="w-6 h-6 bg-teal-400 rounded-full" />
            <p className="text-sm font-medium text-gray-700">{displayName}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="text-sm font-medium text-gray-500 hover:text-teal-700 transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;