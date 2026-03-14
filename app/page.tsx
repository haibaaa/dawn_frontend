import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import TaskCard from "@/components/TaskCard";
import Calendar from "@/components/Calendar";

export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen">

      <Navbar />

      <div className="px-25 py-10 space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-teal-900">
            HI, NAVYA
          </h1>

          <p className="text-gray-500">
            You've completed 12 tasks this week. Steady Progress
          </p>
        </div>

        <div className="flex gap-6">

          {/* LEFT SIDE - TASKS */}
          <div className="flex flex-col gap-6 w-[70%]">
            <TaskCard />
            <TaskCard />
          </div>

          {/* RIGHT SIDE - STATS */}
          <div className="grid grid-cols-2 gap-6 w-[30%]">

            <StatCard title="Total Tasks" value={34} color="text-teal-700" />

            <StatCard title="Pending At-Risk" value="03" color="text-red-400" />

            <StatCard title="Lorem Ipsum" value={12} color="text-teal-700" />

            <StatCard title="Ipsum Dorem" value="05" color="text-teal-700" />

          </div>

        </div>

        <Calendar/>

      </div>
    </main>
  );
}