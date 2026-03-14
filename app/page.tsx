import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import TaskCard from "@/components/TaskCard";
import Calendar from "@/components/Calendar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-col gap-6 px-12 py-10">
        
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold text-teal-900">
            HI, NAVYA
          </h1>

          <p className="text-m text-gray-500 mb-2">
            You have completed 12 tasks this week. Steady Progress
          </p>
        </div>

        <Calendar />

      </div>
    </div>
  );
}