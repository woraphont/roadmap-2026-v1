import { useState } from "react";

export default function WeekCard({ week, isCurrentWeek, checkboxes, note, onCheckbox, onNote, currentDay }) {
  const [expanded, setExpanded] = useState(isCurrentWeek);
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);

  const isAWS = week.phase === "aws";
  const isDone = currentDay > week.endDay;

  const checkedCount = week.topics.filter((_, i) => checkboxes[`w${week.id}_t${i}`]).length;
  const totalTopics = week.topics.length;
  const allDone = checkedCount === totalTopics;
  const status = allDone ? "Done" : checkedCount > 0 ? "In Progress" : "Not Started";

  // Styles based on state
  const cardBorder = isCurrentWeek
    ? isAWS
      ? "border-2 border-amber-400 shadow-md"
      : "border-2 border-green-500 shadow-md"
    : allDone
    ? "border border-green-200 dark:border-green-900/50"
    : "border border-gray-200 dark:border-gray-700";

  const phaseBadge = isAWS
    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

  const statusBadge = {
    Done: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    "In Progress": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    "Not Started": "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400",
  }[status];

  const accentBar = isAWS ? "bg-amber-500" : "bg-green-600";
  const ringColor = isAWS ? "focus:ring-amber-500" : "focus:ring-green-500";
  const checkAccent = isAWS ? "accent-amber-500" : "accent-green-600";

  return (
    <div className={`rounded-xl bg-white dark:bg-gray-800 transition-all duration-200 ${cardBorder} ${isDone && !allDone ? "opacity-60" : ""}`}>
      {/* YOU ARE HERE banner */}
      {isCurrentWeek && (
        <div className={`px-4 py-1.5 text-xs font-bold text-white rounded-t-[10px] ${isAWS ? "bg-amber-500" : "bg-green-600"}`}>
          📍 YOU ARE HERE · {week.dayRange}
        </div>
      )}

      {/* Card header toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 pt-3 pb-1 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span className="font-bold text-gray-900 dark:text-white text-sm shrink-0">
            Week {week.weekNum}
          </span>
          <span className="text-xs text-gray-400 shrink-0">{week.dayRange}</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${phaseBadge}`}>
            {isAWS ? "AWS" : "Terraform"}
          </span>
          {allDone && <span className="text-green-500 shrink-0">✅</span>}
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusBadge}`}>{status}</span>
          <span className="text-xs text-gray-400">{checkedCount}/{totalTopics}</span>
          <span className={`text-gray-400 text-xs transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>▼</span>
        </div>
      </button>

      {/* Title + mini progress bar */}
      <div className="px-4 pb-2">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{week.title}</p>
        <div className="h-1 bg-gray-100 dark:bg-gray-700 rounded-full mt-1.5 overflow-hidden">
          <div
            className={`h-full ${accentBar} rounded-full transition-all duration-300`}
            style={{ width: `${(checkedCount / totalTopics) * 100}%` }}
          />
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-3">
          {/* Topics checkboxes */}
          <div className="space-y-2.5 mb-4">
            {week.topics.map((topic, i) => {
              const key = `w${week.id}_t${i}`;
              const checked = !!checkboxes[key];
              return (
                <label key={i} className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onCheckbox(week.id, i, e.target.checked)}
                    className={`mt-0.5 w-4 h-4 rounded cursor-pointer ${checkAccent}`}
                  />
                  <span className={`text-sm leading-snug transition-all ${checked ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-700 dark:text-gray-300"}`}>
                    {topic}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-gray-400 dark:text-gray-500 mb-1.5">
              📝 Notes
            </label>
            <textarea
              value={note}
              onChange={(e) => onNote(week.id, e.target.value)}
              placeholder="บันทึกความเข้าใจ, สิ่งที่ต้องทบทวน, links สำคัญ..."
              rows={3}
              className={`w-full text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 dark:text-white text-gray-700 focus:outline-none focus:ring-2 ${ringColor} resize-none placeholder-gray-300 dark:placeholder-gray-600`}
            />
          </div>

          {/* Claude Prompt */}
          {week.claudePrompt && (
            <div className={`mt-3 rounded-lg border overflow-hidden ${isAWS ? "border-amber-200 dark:border-amber-800/50" : "border-green-200 dark:border-green-800/50"}`}>
              <button
                onClick={() => setShowPrompt(!showPrompt)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                  isAWS
                    ? "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                    : "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30"
                }`}
              >
                <span>🤖 ถาม Claude Code · Week {week.weekNum}: {week.title}</span>
                <span className={`transition-transform duration-200 ${showPrompt ? "rotate-180" : ""}`}>▼</span>
              </button>
              {showPrompt && (
                <div className="px-3 py-3 bg-white dark:bg-gray-800/50">
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {week.claudePrompt}
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(week.claudePrompt).then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      });
                    }}
                    className={`mt-3 text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                      copied
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : isAWS
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50"
                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50"
                    }`}
                  >
                    {copied ? "✅ คัดลอกแล้ว!" : "📋 คัดลอก Prompt"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
