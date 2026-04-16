import { useState } from "react";

export default function Header({
  currentDay, setCurrentDay, advanceDay, retreatDay,
  startDate, setStartDate, darkMode, setDarkMode,
}) {
  const [editDate, setEditDate] = useState(false);
  const [newDate, setNewDate]   = useState(startDate);
  const [editDay, setEditDay]   = useState(false);
  const [dayInput, setDayInput] = useState(String(currentDay));

  const isPhase1 = currentDay <= 80;
  const isPhase2 = currentDay > 80 && currentDay <= 120;
  const isPhase3 = currentDay > 120;
  const phaseLabel    = isPhase1 ? "AWS SAA-C03" : isPhase2 ? "Terraform Associate" : "AI Engineering";
  const phaseStartDay = isPhase1 ? 1 : isPhase2 ? 81 : 121;
  const phaseEndDay   = isPhase1 ? 80 : isPhase2 ? 120 : 150;
  const phaseTotalDays = phaseEndDay - phaseStartDay + 1;
  const phaseDay      = Math.min(Math.max(currentDay - phaseStartDay + 1, 1), phaseTotalDays);
  const phaseProgress = Math.round((phaseDay / phaseTotalDays) * 100);
  const overallProgress = Math.round((currentDay / 150) * 100);
  const daysToAWS = Math.max(0, 80  - currentDay + 1);
  const daysToTF  = Math.max(0, 120 - currentDay + 1);
  const daysToAI  = Math.max(0, 150 - currentDay + 1);

  const barBg      = isPhase1 ? "bg-amber-500"   : isPhase2 ? "bg-green-600"  : "bg-purple-600";
  const textAccent = isPhase1 ? "text-amber-500"  : isPhase2 ? "text-green-600" : "text-purple-600";
  const bgLight    = isPhase1
    ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
    : isPhase2
    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
    : "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800";

  const btnAdvance = isPhase1
    ? "bg-amber-500 hover:bg-amber-600"
    : isPhase2
    ? "bg-green-600 hover:bg-green-700"
    : "bg-purple-600 hover:bg-purple-700";

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" });

  const commitDayEdit = () => {
    const n = parseInt(dayInput, 10);
    if (!isNaN(n)) setCurrentDay(n);
    setEditDay(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-4 py-4">

        {/* Title row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
              ☁️🏗️🤖 150-Day Cert Tracker
            </h1>
            <p className={`text-sm font-semibold ${textAccent}`}>{phaseLabel}</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Day counter card */}
        <div className={`rounded-xl p-4 mb-3 border ${bgLight}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">วันปัจจุบัน</span>

            {/* Editable day number */}
            {editDay ? (
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={1} max={150}
                  value={dayInput}
                  onChange={(e) => setDayInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") commitDayEdit(); if (e.key === "Escape") setEditDay(false); }}
                  className="w-16 text-right border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 text-lg font-black bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  autoFocus
                />
                <span className="text-sm font-normal text-gray-400">/ 150</span>
                <button onClick={commitDayEdit} className="text-xs bg-amber-500 hover:bg-amber-600 text-white px-2 py-1 rounded-lg ml-1">ตกลง</button>
                <button onClick={() => setEditDay(false)} className="text-xs text-gray-400 px-1">✕</button>
              </div>
            ) : (
              <button
                onClick={() => { setDayInput(String(currentDay)); setEditDay(true); }}
                title="คลิกเพื่อแก้ไขวัน"
                className={`text-3xl font-black ${textAccent} hover:opacity-70 transition-opacity cursor-pointer`}
              >
                Day {currentDay}
                <span className="text-sm font-normal text-gray-400 ml-1">/ 150</span>
              </button>
            )}
          </div>

          {/* Overall progress */}
          <div className="mb-2.5">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Overall</span>
              <span className="font-semibold">{overallProgress}%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div
                className={`h-full ${barBg} rounded-full transition-all duration-500`}
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>

          {/* Phase progress */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>{phaseLabel} — Day {phaseDay}/{phaseTotalDays}</span>
              <span className="font-semibold">{phaseProgress}%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div
                className={`h-full ${barBg} opacity-60 rounded-full transition-all duration-500`}
                style={{ width: `${Math.min(100, phaseProgress)}%` }}
              />
            </div>
          </div>

          {/* Manual day advance controls */}
          <div className="flex items-center gap-2">
            {currentDay > 1 && (
              <button
                onClick={retreatDay}
                className="py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
              >
                ← ย้อน
              </button>
            )}
            <button
              onClick={advanceDay}
              disabled={currentDay >= 150}
              className={`flex-1 ${btnAdvance} disabled:opacity-40 text-white text-sm font-bold py-2.5 px-4 rounded-xl transition-colors`}
            >
              {currentDay >= 150
                ? "🎉 ครบ 150 วันแล้ว!"
                : `✓ ผ่านวันนี้แล้ว · ไปวันที่ ${currentDay + 1}`}
            </button>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
            วันจะเพิ่มก็ต่อเมื่อกดปุ่มนี้เท่านั้น — ไม่นับอัตโนมัติ
          </p>
        </div>

        {/* Exam countdowns */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className={`rounded-lg p-3 text-center border ${daysToAWS === 0 ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : "bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600"}`}>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">AWS SAA-C03</p>
            <p className={`text-xl font-black ${daysToAWS === 0 ? "text-green-600" : "text-amber-500"}`}>
              {daysToAWS === 0 ? "✅" : daysToAWS}
            </p>
            <p className="text-xs text-gray-400">{daysToAWS === 0 ? "สอบแล้ว!" : "วันถึงสอบ"}</p>
          </div>
          <div className={`rounded-lg p-3 text-center border ${daysToTF === 0 ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : "bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600"}`}>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Terraform</p>
            <p className={`text-xl font-black ${daysToTF === 0 ? "text-green-600" : "text-green-600"}`}>
              {daysToTF === 0 ? "✅" : daysToTF}
            </p>
            <p className="text-xs text-gray-400">{daysToTF === 0 ? "สอบแล้ว!" : "วันถึงสอบ"}</p>
          </div>
          <div className={`rounded-lg p-3 text-center border ${daysToAI === 0 ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : "bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600"}`}>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">AI Eng 🚀</p>
            <p className={`text-xl font-black ${daysToAI === 0 ? "text-green-600" : "text-purple-600"}`}>
              {daysToAI === 0 ? "✅" : daysToAI}
            </p>
            <p className="text-xs text-gray-400">{daysToAI === 0 ? "เสร็จแล้ว!" : "วันถึงเป้า"}</p>
          </div>
        </div>

        {/* Start date */}
        {editDate ? (
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={() => { setStartDate(newDate); setEditDate(false); }}
              className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg"
            >
              บันทึก
            </button>
            <button onClick={() => setEditDate(false)} className="text-xs text-gray-400 px-2">ยกเลิก</button>
          </div>
        ) : (
          <button
            onClick={() => setEditDate(true)}
            className="text-xs text-gray-400 hover:text-amber-500 transition-colors"
          >
            📅 เริ่มวันที่ {formatDate(startDate)} · แก้ไข
          </button>
        )}
      </div>
    </div>
  );
}
