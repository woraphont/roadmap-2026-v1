import { useState } from "react";

const MOODS = ["😫", "😐", "😊", "🔥"];

export default function StudyLog({ studyLogs, setStudyLogs }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    hours: "",
    topics: "",
    mood: "😊",
  });

  const handleAdd = () => {
    if (!form.hours) return;
    setStudyLogs(prev => [{ ...form, hours: Number(form.hours), id: Date.now() }, ...prev]);
    setForm({ date: new Date().toISOString().split("T")[0], hours: "", topics: "", mood: "😊" });
    setShowForm(false);
  };

  const totalHours = studyLogs.reduce((sum, l) => sum + (l.hours || 0), 0);
  const last7 = studyLogs.slice(0, 7);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-900 dark:text-white">⏱ Study Log</h2>
          <p className="text-sm font-bold text-amber-500 mt-0.5">{totalHours.toFixed(1)} ชั่วโมงรวม</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
        >
          + Log Today
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">บันทึกการเรียนวันนี้</p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">วันที่</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-xs bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">ชั่วโมงที่เรียน</label>
              <input type="number" min="0" max="24" step="0.5" value={form.hours}
                onChange={e => setForm({ ...form, hours: e.target.value })}
                placeholder="2.5"
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-xs bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
          </div>
          <div className="mb-3">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">หัวข้อที่เรียน</label>
            <input type="text" value={form.topics} onChange={e => setForm({ ...form, topics: e.target.value })}
              placeholder="เช่น VPC, Security Groups, S3 Lifecycle"
              className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-xs bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-2">อารมณ์วันนี้</label>
            <div className="flex gap-2">
              {MOODS.map(m => (
                <button key={m} type="button" onClick={() => setForm({ ...form, mood: m })}
                  className={`text-2xl w-10 h-10 rounded-xl flex items-center justify-center transition-all ${form.mood === m ? "bg-amber-100 dark:bg-amber-900/30 scale-110 shadow-sm" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAdd} className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-lg">บันทึก</button>
            <button onClick={() => setShowForm(false)} className="text-gray-400 text-xs px-3 py-2 hover:text-gray-600">ยกเลิก</button>
          </div>
        </div>
      )}

      {/* Logs */}
      {studyLogs.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-3xl mb-2">📖</p>
          <p className="text-sm">ยังไม่มีบันทึก</p>
          <p className="text-xs mt-1">กด "+ Log Today" เพื่อเริ่มบันทึกการเรียน</p>
        </div>
      ) : (
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">7 วันล่าสุด</p>
          <div className="space-y-2">
            {last7.map(log => (
              <div key={log.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
                <span className="text-2xl">{log.mood}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {log.topics || "—"}
                  </p>
                  <p className="text-xs text-gray-400">{log.date}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-black text-amber-500">{log.hours}h</p>
                </div>
              </div>
            ))}
          </div>
          {studyLogs.length > 7 && (
            <p className="text-center text-xs text-gray-400 mt-3">
              + {studyLogs.length - 7} รายการก่อนหน้า
            </p>
          )}
        </div>
      )}
    </div>
  );
}
