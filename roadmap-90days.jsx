import { useState } from "react";

const phases = [
  {
    id: 1,
    label: "Phase 1",
    title: "วางรากฐาน",
    days: "Day 1–30",
    color: "#3B82F6",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    icon: "🚀",
    weeks: [
      {
        week: "Week 1",
        goal: "ศึกษาและวางแผน",
        tasks: [
          "กำหนดเป้าหมายระยะยาว",
          "สำรวจ tools & resources ที่จะใช้",
          "ตั้ง KPI เบื้องต้น",
          "สร้าง workspace และ environment",
        ],
      },
      {
        week: "Week 2",
        goal: "เรียนรู้ทักษะหลัก",
        tasks: [
          "เรียน core skills ที่จำเป็น",
          "ทำ mini project ทดลอง",
          "บันทึก learning journal",
          "ขอ feedback จาก mentor",
        ],
      },
      {
        week: "Week 3",
        goal: "ลงมือปฏิบัติ",
        tasks: [
          "สร้าง prototype แรก",
          "ทดสอบและปรับปรุง",
          "เชื่อม network กับผู้เชี่ยวชาญ",
          "รีวิวความก้าวหน้า",
        ],
      },
      {
        week: "Week 4",
        goal: "ทบทวนและปรับแผน",
        tasks: [
          "สรุปสิ่งที่เรียนรู้ใน Month 1",
          "ปรับแผนสำหรับ Phase 2",
          "แชร์ผลงานให้คนอื่นดู",
          "ฉลองความสำเร็จเล็กๆ",
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Phase 2",
    title: "สร้างและพัฒนา",
    days: "Day 31–60",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    icon: "⚡",
    weeks: [
      {
        week: "Week 5",
        goal: "เร่งพัฒนา skills",
        tasks: [
          "Deep dive ใน advanced topics",
          "สร้าง project จริงจัง",
          "ตั้ง daily habits ที่ชัดเจน",
          "วัดผลด้วย metrics",
        ],
      },
      {
        week: "Week 6",
        goal: "สร้างระบบ",
        tasks: [
          "Automate งานที่ทำซ้ำ",
          "สร้าง workflow ที่มีประสิทธิภาพ",
          "Document สิ่งที่ทำ",
          "Optimize time management",
        ],
      },
      {
        week: "Week 7",
        goal: "ขยายผล",
        tasks: [
          "เพิ่ม scope ของ project",
          "Collaborate กับทีมหรือ community",
          "ทดสอบกับ real users",
          "เก็บ feedback อย่างเป็นระบบ",
        ],
      },
      {
        week: "Week 8",
        goal: "Mid-point Review",
        tasks: [
          "ประเมิน 60 วันที่ผ่านมา",
          "วิเคราะห์ gap vs เป้าหมาย",
          "ปรับ strategy สำหรับ Phase 3",
          "เตรียม final push",
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Phase 3",
    title: "เปิดตัวและเติบโต",
    days: "Day 61–90",
    color: "#10B981",
    bg: "#ECFDF5",
    border: "#A7F3D0",
    icon: "🏆",
    weeks: [
      {
        week: "Week 9",
        goal: "Polish & Refine",
        tasks: [
          "ปรับปรุง quality ของผลงาน",
          "Fix bugs และ edge cases",
          "เตรียม presentation",
          "สร้าง portfolio/showcase",
        ],
      },
      {
        week: "Week 10",
        goal: "Launch เบื้องต้น",
        tasks: [
          "Soft launch ให้กลุ่มเล็ก",
          "เก็บ feedback รอบสุดท้าย",
          "Iterate อย่างรวดเร็ว",
          "สร้าง buzz/awareness",
        ],
      },
      {
        week: "Week 11",
        goal: "Full Launch",
        tasks: [
          "Public launch อย่างเป็นทางการ",
          "Marketing & promotion",
          "Monitor metrics อย่างใกล้ชิด",
          "Support users/audience",
        ],
      },
      {
        week: "Week 12",
        goal: "สรุปและวางแผนต่อ",
        tasks: [
          "รีวิว 90 วันครบถ้วน",
          "เขียน case study / retrospective",
          "กำหนด Next 90-Day Goals",
          "ฉลองความสำเร็จ! 🎉",
        ],
      },
    ],
  },
];

const milestones = [
  { day: 30, label: "Month 1 Complete", icon: "🎯", color: "#3B82F6" },
  { day: 60, label: "Month 2 Complete", icon: "⚡", color: "#8B5CF6" },
  { day: 90, label: "Goal Achieved!", icon: "🏆", color: "#10B981" },
];

export default function Roadmap90Days() {
  const [openWeeks, setOpenWeeks] = useState({});
  const [checkedTasks, setCheckedTasks] = useState({});
  const [currentDay, setCurrentDay] = useState(1);

  const toggleWeek = (key) =>
    setOpenWeeks((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleTask = (key) =>
    setCheckedTasks((prev) => ({ ...prev, [key]: !prev[key] }));

  const totalTasks = phases.flatMap((p) => p.weeks.flatMap((w) => w.tasks)).length;
  const doneTasks = Object.values(checkedTasks).filter(Boolean).length;
  const progressPct = Math.round((doneTasks / totalTasks) * 100);
  const dayPct = Math.round((Math.min(currentDay, 90) / 90) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1E293B 0%, #334155 50%, #1E40AF 100%)",
          color: "white",
          padding: "48px 24px 40px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 12 }}>🗺️</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: 0, letterSpacing: -1 }}>
          90-Day Roadmap
        </h1>
        <p style={{ color: "#94A3B8", marginTop: 8, fontSize: 16 }}>
          แผนพัฒนา 3 เดือน · จาก 0 สู่เป้าหมาย
        </p>

        {/* Day slider */}
        <div
          style={{
            maxWidth: 480,
            margin: "28px auto 0",
            background: "rgba(255,255,255,0.1)",
            borderRadius: 16,
            padding: "16px 24px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: "#CBD5E1" }}>
            <span>วันที่ปัจจุบัน</span>
            <span style={{ fontWeight: 700, color: "white" }}>Day {currentDay} / 90</span>
          </div>
          <input
            type="range"
            min={1}
            max={90}
            value={currentDay}
            onChange={(e) => setCurrentDay(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#60A5FA" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 11, color: "#94A3B8" }}>
            <span>Day 1</span><span>Day 30</span><span>Day 60</span><span>Day 90</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px" }}>

        {/* Stats bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 32,
          }}
        >
          {[
            { label: "ความคืบหน้า (วัน)", value: `${dayPct}%`, sub: `Day ${currentDay}/90`, color: "#3B82F6" },
            { label: "งานที่เสร็จแล้ว", value: `${doneTasks}/${totalTasks}`, sub: `${progressPct}% complete`, color: "#8B5CF6" },
            { label: "เหลืออีก", value: `${90 - currentDay} วัน`, sub: "จนถึงเป้าหมาย", color: "#10B981" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "white",
                borderRadius: 16,
                padding: "20px 16px",
                textAlign: "center",
                boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                borderTop: `4px solid ${s.color}`,
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: "#94A3B8" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Overall progress bar */}
        <div style={{ background: "white", borderRadius: 16, padding: "20px 24px", marginBottom: 32, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontWeight: 600, color: "#1E293B", fontSize: 14 }}>ความคืบหน้าโดยรวม</span>
            <span style={{ fontWeight: 700, color: "#3B82F6", fontSize: 14 }}>{progressPct}%</span>
          </div>
          <div style={{ height: 12, background: "#F1F5F9", borderRadius: 99, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${progressPct}%`,
                background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #10B981)",
                borderRadius: 99,
                transition: "width 0.4s ease",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            {milestones.map((m) => (
              <div key={m.day} style={{ textAlign: "center", fontSize: 11 }}>
                <span style={{ color: currentDay >= m.day ? m.color : "#CBD5E1", fontWeight: 600 }}>
                  {m.icon} {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline milestones */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 32, gap: 0 }}>
          {[1, 30, 60, 90].map((d, i) => (
            <div key={d} style={{ display: "flex", alignItems: "center", flex: i < 3 ? 1 : 0 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: currentDay >= d ? "#1E40AF" : "#E2E8F0",
                  color: currentDay >= d ? "white" : "#94A3B8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  flexShrink: 0,
                  boxShadow: currentDay >= d ? "0 0 0 4px #BFDBFE" : "none",
                  transition: "all 0.3s",
                }}
              >
                {d}
              </div>
              {i < 3 && (
                <div style={{ flex: 1, height: 4, background: currentDay >= [30, 60, 90][i] ? "#3B82F6" : "#E2E8F0", transition: "background 0.3s" }} />
              )}
            </div>
          ))}
        </div>

        {/* Phases */}
        {phases.map((phase) => {
          const isActive = currentDay >= (phase.id - 1) * 30 + 1 && currentDay <= phase.id * 30;
          const isDone = currentDay > phase.id * 30;
          return (
            <div
              key={phase.id}
              style={{
                marginBottom: 28,
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: isActive ? `0 4px 24px ${phase.color}30` : "0 1px 8px rgba(0,0,0,0.06)",
                border: `2px solid ${isActive ? phase.color : phase.border}`,
                transition: "all 0.3s",
              }}
            >
              {/* Phase header */}
              <div
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${phase.color}, ${phase.color}CC)`
                    : isDone
                    ? "#F8FAFC"
                    : phase.bg,
                  padding: "24px 28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      background: isActive ? "rgba(255,255,255,0.2)" : phase.color + "20",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 28,
                    }}
                  >
                    {isDone ? "✅" : phase.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: isActive ? "rgba(255,255,255,0.8)" : phase.color, textTransform: "uppercase", letterSpacing: 1 }}>
                      {phase.label} · {phase.days}
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: isActive ? "white" : "#1E293B", marginTop: 2 }}>
                      {phase.title}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                  {isActive && (
                    <span style={{ background: "rgba(255,255,255,0.25)", color: "white", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 99 }}>
                      กำลังดำเนินการ
                    </span>
                  )}
                  {isDone && (
                    <span style={{ background: "#D1FAE5", color: "#059669", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 99 }}>
                      เสร็จสิ้น
                    </span>
                  )}
                </div>
              </div>

              {/* Weeks */}
              <div style={{ background: "white", padding: "8px 16px 16px" }}>
                {phase.weeks.map((week, wi) => {
                  const wKey = `${phase.id}-${wi}`;
                  const isOpen = openWeeks[wKey] !== false && openWeeks[wKey] !== undefined
                    ? openWeeks[wKey]
                    : wi === 0;
                  const weekDone = week.tasks.filter((_, ti) => checkedTasks[`${wKey}-${ti}`]).length;

                  return (
                    <div
                      key={wKey}
                      style={{
                        margin: "8px 0",
                        borderRadius: 12,
                        border: `1px solid ${phase.border}`,
                        overflow: "hidden",
                      }}
                    >
                      <button
                        onClick={() => toggleWeek(wKey)}
                        style={{
                          width: "100%",
                          padding: "14px 18px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          background: openWeeks[wKey] === true || (openWeeks[wKey] === undefined && wi === 0) ? phase.bg : "white",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontWeight: 700, color: phase.color, fontSize: 13 }}>{week.week}</span>
                          <span style={{ color: "#475569", fontSize: 13 }}>— {week.goal}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 11, color: "#94A3B8", background: "#F1F5F9", padding: "2px 8px", borderRadius: 99 }}>
                            {weekDone}/{week.tasks.length}
                          </span>
                          <span style={{ color: phase.color, fontSize: 18, transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>›</span>
                        </div>
                      </button>

                      {isOpen && (
                        <div style={{ padding: "4px 18px 14px", background: phase.bg }}>
                          {week.tasks.map((task, ti) => {
                            const tKey = `${wKey}-${ti}`;
                            const done = checkedTasks[tKey];
                            return (
                              <label
                                key={tKey}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 10,
                                  padding: "8px 0",
                                  cursor: "pointer",
                                  borderBottom: ti < week.tasks.length - 1 ? `1px solid ${phase.border}` : "none",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={!!done}
                                  onChange={() => toggleTask(tKey)}
                                  style={{ accentColor: phase.color, width: 16, height: 16, cursor: "pointer" }}
                                />
                                <span
                                  style={{
                                    fontSize: 14,
                                    color: done ? "#94A3B8" : "#334155",
                                    textDecoration: done ? "line-through" : "none",
                                    transition: "all 0.2s",
                                  }}
                                >
                                  {task}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "24px 0", color: "#94A3B8", fontSize: 13 }}>
          90-Day Roadmap · Built with React · {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
