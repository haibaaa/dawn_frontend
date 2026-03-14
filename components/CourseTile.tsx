interface CourseTileProps {
  title: string;
  progress: number;
  grade: string;
  color: "red" | "green";
}

export default function CourseTile({
  title,
  progress,
  grade,
  color
}: CourseTileProps) {

  const bar =
    color === "red"
      ? "bg-red-400"
      : "bg-teal-700";

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">

      <div className="flex justify-between mb-3">
        <p className="font-semibold">{title}</p>
        <p className="font-bold">{grade}</p>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className={`${bar} h-2 rounded-full`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs text-gray-500 mt-2">
        {progress}% Weighted
      </p>

    </div>
  );
}