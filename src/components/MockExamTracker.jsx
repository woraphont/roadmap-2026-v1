import { useState } from "react";

const AWS_PASS = 72;
const TF_PASS = 70;

export default function MockExamTracker({ mockScores, setMockScores }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    name: "",
    score: "",
    phase: "aws",
  });

  const handleAdd = () => {
    if (!form.name.trim() || !form.score) return;
    const score = Number(form.score);
    const threshold = form.phase === "aws" ? AWS_PASS : TF_PASS;
    setMockScores(prev => [...prev, { ...form, score, pass: score >= threshold, id: Date.now() }]);
    setForm({ date: new Date().toISOString().split("T")[0], name: "", score: "", phase: "aws" });
    setShowForm(false);
  };

  const handleDelete = (id) => setMockScores(prev => prev.filter(s => s.id !== id));

  const awsScores = mockScores.filter(s => s.phase === "aws");
  const tfScores = mockScores.filter(s => s.phase === "terraform");
  const avg = (arr) => arr.length ? Math.round(arr.reduce((a, b) => a + b.score, 0) / arr.length) : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">📝 Mock Exam Scores</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
        >
          + เพิ่มผลสอบ
        </button>
      </div>

      {/* Averages */}
      {mockScores.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "AWS SAA-C03", avg: avg(awsScores), pass: AWS_PASS, count: awsScores.length },
            { label: "Terraform", avg: avg(tfScores), pass: TF_PASS, count: tfScores.length },
          ].map(item => (
            <div key={item.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
              <p className={`text-2xl font-black mt-0.5 ${item.avg === null ? "text-gray-300" : item.avg >= item.pass ? "text-green-500" : "text-red-500"}`}>
                {item.avg !== null ? `${item.avg}%` : "—"}
              </p>
              <p className="text-xs text-gray-400">{item.count} attempts · pass ≥{item.pass}%</p>
            </div>
          ))}
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">บันทึกผลสอบ</p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">วันที่</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-xs bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">Phase</label>
              <select value={form.phase} onChange={e => setForm({ ...form, phase: e.target.value })}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-xs bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option value="aws">AWS SAA-C03</option>
                <option value="terraform">Terraform Associate</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">ชื่อ Exam Set</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Tutorials Dojo Set 1"
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-xs bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">คะแนน (%)</label>
              <input type="number" min="0" max="100" value={form.score} onChange={e => setForm({ ...form, score: e.target.value })}
                placeholder="75"
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-xs bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAdd} className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-lg">บันทึก</button>
            <button onClick={() => setShowForm(false)} className="text-gray-400 text-xs px-3 py-2 hover:text-gray-600">ยกเลิก</button>
          </div>
        </div>
      )}

      {/* Table */}
      {mockScores.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-3xl mb-2">📊</p>
          <p className="text-sm">ยังไม่มีผลสอบ</p>
          <p className="text-xs mt-1">กด "+ เพิ่มผลสอบ" เพื่อเริ่มบันทึก</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="text-left px-4 py-2.5 font-medium text-gray-500 dark:text-gray-400">วันที่</th>
                  <th className="text-left px-4 py-2.5 font-medium text-gray-500 dark:text-gray-400">Exam Set</th>
                  <th className="text-left px-4 py-2.5 font-medium text-gray-500 dark:text-gray-400">Phase</th>
                  <th className="text-center px-4 py-2.5 font-medium text-gray-500 dark:text-gray-400">คะแนน</th>
                  <th className="text-center px-4 py-2.5 font-medium text-gray-500 dark:text-gray-400">ผล</th>
                  <th className="px-3 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {mockScores.map(s => (
                  <tr key={s.id} className={`border-t border-gray-100 dark:border-gray-700 ${s.pass ? "bg-green-50/40 dark:bg-green-900/10" : "bg-red-50/40 dark:bg-red-900/10"}`}>
                    <td className="px-4 py-2.5 text-gray-500 dark:text-gray-400">{s.date}</td>
                    <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-white">{s.name}</td>
                    <td className="px-4 py-2.5">
                      <span className={`px-2 py-0.5 rounded-full font-medium ${s.phase === "aws" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"}`}>
                        {s.phase === "aws" ? "AWS" : "TF"}
                      </span>
                    </td>
                    <td className={`px-4 py-2.5 text-center font-black text-sm ${s.pass ? "text-green-600" : "text-red-500"}`}>{s.score}%</td>
                    <td className="px-4 py-2.5 text-center">
                      <span className={`px-2 py-0.5 rounded-full font-bold ${s.pass ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                        {s.pass ? "ผ่าน" : "ไม่ผ่าน"}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <button onClick={() => handleDelete(s.id)} className="text-gray-300 hover:text-red-400 transition-colors">✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                  <td colSpan={6} className="px-4 py-2.5 text-xs text-gray-500 dark:text-gray-400">
                    เฉลี่ย AWS: <strong>{avg(awsScores) ?? "—"}%</strong> · Terraform: <strong>{avg(tfScores) ?? "—"}%</strong>
                    <span className="ml-4 text-gray-300">Pass threshold: AWS≥{AWS_PASS}% · TF≥{TF_PASS}%</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
