import Navbar from "@/components/Navbar";
import ExamPrep from "@/components/ExamPrep";

export default function ExamPrepPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="px-12 py-10">
        <ExamPrep />
      </div>
    </div>
  );
}
