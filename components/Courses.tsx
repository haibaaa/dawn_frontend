import ModuleCard from "./CourseTile";

export default function Courses() {
  return (
    <div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg text-black">
          Your Courses
        </h2>
        <p className="text-sm text-teal-700 cursor-pointer">
          View All Courses
        </p>
      </div>

      <div className="flex flex-col gap-4 text-gray-500">
        <ModuleCard
          title="CSD317: Introduction to DBMS"
          progress={85}
          grade="92%"
          color="green"
        />

        <ModuleCard
          title="CSD205: Discrete Mathematics"
          progress={60}
          grade="74%"
          color="red"
        />

        <ModuleCard
          title="MAT161: Applied Linear Algebra"
          progress={45}
          grade="89%"
          color="green"
        />

        <ModuleCard
          title="MAT161: Applied Linear Algebra"
          progress={45}
          grade="89%"
          color="green"
        />
      </div>

    </div>
  );
}