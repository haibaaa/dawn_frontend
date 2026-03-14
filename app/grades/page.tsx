import GradePredictor from "@/components/predictor";
import StatCard from "@/components/StatCard";
import Courses from "@/components/Courses";
import Navbar from "@/components/Navbar"

export default function Dashboard() {
  return (
    <div>
    <Navbar/>

    <div className="grid grid-cols-5 gap-6 p-10 bg-gray-50 min-h-screen">
      {/* LEFT COLUMN */}
      <div className="col-span-2 flex flex-col gap-6 p-3">
        <StatCard />
      </div>

      {/* RIGHT COLUMN */}
      <div className="col-span-3 flex flex-col gap-6 p-3">
        <GradePredictor />        
        <Courses />
      </div>
    </div>

    </div>
  );
}