export default function StatCard() {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">

      <p className="text-sm font-semibold text-gray-500 tracking-widest mb-7">
        CURRENT STANDING
      </p>

      {/* BIGGER CIRCLE */}
      <div className="flex justify-center items-center mb-6">
        <div className="w-58 h-58 rounded-full border-[16px] border-teal-700 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-500">9.23</p>
            <p className="text-sm text-gray-500 mt-1">CGPA / 10.0</p>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <span className="bg-emerald-200 text-gray-700 px-4 py-2 rounded-lg text-sm">
          DEAN&apos;S LIST
        </span>
      </div>

      <div className="flex justify-between text-center">
        <div>
          <p className="text-2xl font-bold text-gray-500">120</p>
          <p className="text-xs text-gray-500">TOTAL CREDITS</p>
        </div>

        <div>
          <p className="text-2xl font-bold text-gray-500">88%</p>
          <p className="text-xs text-gray-500">OVERALL AVG</p>
        </div>
      </div>

    </div>
  );
}