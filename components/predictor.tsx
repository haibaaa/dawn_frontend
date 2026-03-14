export default function Predictor() {
  return (
    <div className="bg-teal-800 text-white rounded-xl p-6 shadow">

      <h2 className="font-semibold text-lg mb-6">
        ∑ Final SGPA Predictor
      </h2>

      <div className="flex justify-between items-center mb-6">

        <div>
          <p className="text-sm opacity-80">TARGET SGPA</p>
          <p className="text-3xl font-bold">9.54 - 9.8</p>
        </div>

        <div className="text-right">
          <p className="text-sm opacity-80">
            YOUR PROGRESS
          </p>
          <p className="text-4xl font-bold">92%</p>
        </div>

      </div>

      <div className="w-full bg-teal-600 h-2 rounded-full">
        <div className="bg-teal-300 h-2 rounded-full w-[92%]" />
      </div>

    </div>
  );
}