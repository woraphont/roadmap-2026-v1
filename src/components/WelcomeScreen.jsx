import { useState } from "react";

export default function WelcomeScreen({ onSetDate, darkMode, setDarkMode }) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-sm w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">☁️🏗️</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            120-Day Cert Tracker
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            AWS SAA-C03 → Terraform Associate
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
          <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 mb-2">
            📋 แผนการเรียน 120 วัน
          </p>
          <ul className="text-xs text-amber-700 dark:text-amber-400 space-y-1">
            <li>• Day 1–80: AWS Solutions Architect Associate</li>
            <li>• Day 81–120: HashiCorp Terraform Associate 003</li>
          </ul>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            วันเริ่มต้นของคุณ
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <button
          onClick={() => onSetDate(date)}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition-colors text-sm"
        >
          เริ่มต้น Roadmap 🚀
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full mt-3 py-2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>
  );
}
