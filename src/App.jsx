import { useState, useEffect, useMemo, useCallback } from "react";
import { WEEKS } from "./data/weeks";
import WelcomeScreen from "./components/WelcomeScreen";
import Header from "./components/Header";
import WeekCard from "./components/WeekCard";
import CoursesPanel from "./components/CoursesPanel";
import MockExamTracker from "./components/MockExamTracker";
import StudyLog from "./components/StudyLog";

const TABS = [
  { id: "roadmap", label: "📅 Roadmap" },
  { id: "courses", label: "📚 Courses" },
  { id: "exams",   label: "📝 Mock Exams" },
  { id: "log",     label: "⏱ Study Log" },
];

function useLocalState(key, defaultVal) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultVal;
    } catch {
      return defaultVal;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

export default function App() {
  const [startDate, setStartDateRaw] = useLocalState("roadmap_start_date", "");
  const [checkboxes, setCheckboxes]   = useLocalState("roadmap_week_topics", {});
  const [notes, setNotes]             = useLocalState("roadmap_week_notes", {});
  const [mockScores, setMockScores]   = useLocalState("roadmap_mock_scores", []);
  const [studyLogs, setStudyLogs]     = useLocalState("roadmap_study_logs", []);
  const [darkMode, setDarkMode]       = useLocalState("roadmap_dark_mode", false);
  const [activeTab, setActiveTab]     = useState("roadmap");

  // Apply dark class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", !!darkMode);
  }, [darkMode]);

  const setStartDate = (d) => setStartDateRaw(d);

  // Manual day counter — only advances when user confirms
  const [currentDay, setCurrentDayRaw] = useLocalState("roadmap_current_day", 1);
  const setCurrentDay = useCallback((val) => {
    const next = typeof val === "function" ? val(currentDay) : val;
    setCurrentDayRaw(Math.min(Math.max(1, next), 150));
  }, [currentDay, setCurrentDayRaw]);

  const advanceDay = useCallback(() => setCurrentDay(d => d + 1), [setCurrentDay]);
  const retreatDay = useCallback(() => setCurrentDay(d => d - 1), [setCurrentDay]);

  // Find which week is active
  const currentWeekId = useMemo(() => {
    if (!currentDay) return null;
    const w = WEEKS.find(w => currentDay >= w.startDay && currentDay <= w.endDay);
    return w ? w.id : null;
  }, [currentDay]);

  const handleCheckbox = (weekId, topicIdx, checked) =>
    setCheckboxes(prev => ({ ...prev, [`w${weekId}_t${topicIdx}`]: checked }));

  const handleNote = (weekId, text) =>
    setNotes(prev => ({ ...prev, [`w${weekId}`]: text }));

  // Show welcome screen if no start date
  if (!startDate) {
    return <WelcomeScreen onSetDate={setStartDate} darkMode={darkMode} setDarkMode={setDarkMode} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
        advanceDay={advanceDay}
        retreatDay={retreatDay}
        startDate={startDate}
        setStartDate={setStartDate}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Sticky tab bar */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 flex overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors flex-shrink-0 ${
                activeTab === tab.id
                  ? "border-amber-500 text-amber-600 dark:text-amber-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-5">
        {activeTab === "roadmap" && (
          <div className="space-y-3">
            {WEEKS.map(week => (
              <WeekCard
                key={week.id}
                week={week}
                isCurrentWeek={week.id === currentWeekId}
                checkboxes={checkboxes}
                note={notes[`w${week.id}`] || ""}
                onCheckbox={handleCheckbox}
                onNote={handleNote}
                currentDay={currentDay}
              />
            ))}
          </div>
        )}

        {activeTab === "courses" && <CoursesPanel />}

        {activeTab === "exams" && (
          <MockExamTracker mockScores={mockScores} setMockScores={setMockScores} />
        )}

        {activeTab === "log" && (
          <StudyLog studyLogs={studyLogs} setStudyLogs={setStudyLogs} />
        )}
      </main>
    </div>
  );
}
