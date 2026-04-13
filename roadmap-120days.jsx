import { useState } from "react";

const phases = [
  {
    id: 1,
    label: "Phase 1",
    title: "พื้นฐาน Azure & Identity",
    days: "Day 1–21",
    color: "#3B82F6",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    icon: "🚀",
    examWeight: "15–20%",
    weeks: [
      {
        week: "Week 1",
        days: "Day 1–7",
        goal: "Azure Fundamentals & Portal",
        tasks: [
          "Azure Portal, CLI, PowerShell, ARM Templates",
          "Subscriptions, Management Groups, Resource Groups",
          "Azure Regions, Availability Zones",
          "สร้าง Free Account และทดลองใช้ Portal",
        ],
        claudePrompt:
          "ช่วยสร้าง Lab สำหรับ AZ-104 Week 1: ฝึกใช้ Azure CLI สร้าง Resource Group, ดู Subscription info และสร้าง ARM Template เบื้องต้น พร้อมคำอธิบายแต่ละ command เป็นภาษาไทย",
      },
      {
        week: "Week 2",
        days: "Day 8–14",
        goal: "Entra ID & RBAC",
        tasks: [
          "Users, Groups, Licenses",
          "RBAC — Roles, Scope, Assignments",
          "Managed Identities, Service Principals",
          "MFA, Conditional Access, SSPR",
        ],
        claudePrompt:
          "ช่วยสร้าง Lab AZ-104 Week 2: สร้าง User และ Group ใน Entra ID ด้วย Azure CLI, assign RBAC role ระดับ Resource Group และอธิบายความต่างของ Owner/Contributor/Reader พร้อม scenario ที่ออกสอบ",
      },
      {
        week: "Week 3",
        days: "Day 15–21",
        goal: "Governance & Cost Management",
        tasks: [
          "Azure Policy — Definitions, Assignments, Initiatives",
          "Tags บน Resources",
          "Cost Management + Budget Alerts",
          "Azure Locks (CanNotDelete / ReadOnly)",
        ],
        claudePrompt:
          "ช่วยสร้าง Lab AZ-104 Week 3: สร้าง Azure Policy บังคับ Tag 'Environment', ตั้ง Budget Alert $50 และ apply Lock บน Resource Group ด้วย Azure CLI พร้อม verify ผล เป็นภาษาไทย",
      },
    ],
  },
  {
    id: 2,
    label: "Phase 2",
    title: "Storage & Compute",
    days: "Day 22–45",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    icon: "⚡",
    examWeight: "35–45%",
    weeks: [
      {
        week: "Week 4",
        days: "Day 22–28",
        goal: "Azure Storage",
        tasks: [
          "Storage Account Types (LRS, ZRS, GRS)",
          "Blob, File, Queue, Table Storage",
          "Access Tiers (Hot / Cool / Archive)",
          "SAS Tokens, Access Keys, Private Endpoints",
        ],
        claudePrompt:
          "ช่วยสร้าง Lab AZ-104 Week 4: สร้าง Storage Account ด้วย Azure CLI, upload file ไป Blob, เปลี่ยน Access Tier เป็น Cool และสร้าง SAS Token แบบ read-only พร้อมทดสอบและอธิบาย replication types",
      },
      {
        week: "Week 5",
        days: "Day 29–35",
        goal: "Azure Files & Virtual Machines",
        tasks: [
          "Azure Files + Azure File Sync",
          "สร้าง VM — Size, Image, Disk",
          "Availability Sets และ Availability Zones",
          "VM Extensions และ Custom Script",
        ],
        claudePrompt:
          "ช่วยสร้าง Lab AZ-104 Week 5: สร้าง Windows VM ด้วย Azure CLI, เชื่อม Azure Files share และ deploy Custom Script Extension เพื่อติดตั้ง IIS อัตโนมัติ พร้อมอธิบาย Availability Set vs Zone",
      },
      {
        week: "Week 6",
        days: "Day 36–42",
        goal: "VM Scale Sets & App Service",
        tasks: [
          "VM Scale Sets (VMSS) พร้อม Autoscale",
          "Azure App Service — Web Apps",
          "Deployment Slots (Staging/Production)",
          "ARM Templates & Bicep เบื้องต้น",
        ],
        claudePrompt:
          "ช่วยสร้าง Lab AZ-104 Week 6: deploy VMSS ด้วย Azure CLI พร้อมตั้ง Autoscale rule (CPU > 70%) และสร้าง App Service deploy Node.js app พร้อม Deployment Slot swap อธิบายทุกขั้นตอน",
      },
      {
        week: "Week 7",
        days: "Day 43–45",
        goal: "Containers & Phase 2 Review",
        tasks: [
          "Azure Container Instances (ACI)",
          "Azure Kubernetes Service (AKS) — Concepts",
          "ทบทวน Phase 2 ทั้งหมด",
          "ทำ Practice Questions Storage & Compute",
        ],
        claudePrompt:
          "ช่วยสร้าง Lab AZ-104 Week 7: deploy container บน ACI ด้วย Azure CLI และออก Quiz 10 ข้อ ครอบคลุม Storage + Compute สำหรับ AZ-104 พร้อมเฉลยอธิบายเหตุผล เป็นภาษาไทย",
      },
    ],
  },
  {
    id: 3,
    label: "Phase 3",
    title: "Virtual Networking",
    days: "Day 46–70",
    color: "#0EA5E9",
    bg: "#F0F9FF",
    border: "#BAE6FD",
    icon: "🌐",
    examWeight: "25–30%",
    weeks: [
      {
        week: "Week 8",
        days: "Day 46–52",
        goal: "Core Networking",
        tasks: [
          "VNet, Subnets, IP Addressing",
          "NSG — Inbound/Outbound Rules",
          "ASG (Application Security Groups)",
          "Azure DNS — Public และ Private Zones",
        ],
        claudePrompt:
          "ช่วยสร้าง Lab AZ-104 Week 8: สร้าง VNet 3 Subnet ด้วย Azure CLI, ตั้ง NSG อนุญาต HTTP/HTTPS บล็อก RDP จาก Internet และสร้าง Private DNS Zone linked กับ VNet พร้อมอธิบาย",
      },
      {
        week: "Week 9",
        days: "Day 53–59",
        goal: "VNet Peering & Connectivity",
        tasks: [
          "VNet Peering (Same Region & Cross Region)",
          "VPN Gateway (Site-to-Site, Point-to-Site)",
          "Azure Bastion",
          "Azure ExpressRoute — Concepts",
        ],
        claudePrompt:
          "ช่วยสร้าง Lab AZ-104 Week 9: สร้าง VNet Peering ระหว่าง 2 VNets ด้วย Azure CLI, ทดสอบ connectivity ด้วย VM และ deploy Azure Bastion เพื่อ access VM อย่างปลอดภัย พร้อมอธิบายความต่าง VPN vs ExpressRoute",
      },
      {
        week: "Week 10",
        days: "Day 60–66",
        goal: "Load Balancer & Application Gateway",
        tasks: [
          "Azure Load Balancer (Basic vs Standard)",
          "Application Gateway + WAF",
          "Azure Firewall",
          "Route Tables (UDR)",
        ],
        claudePrompt:
          "ช่วยสร้าง Lab AZ-104 Week 10: สร้าง Standard Load Balancer กับ Backend Pool 2 VMs ด้วย Azure CLI, ตั้ง Health Probe และทดสอบ traffic distribution พร้อมอธิบายความต่าง Load Balancer vs Application Gateway",
      },
      {
        week: "Week 11",
        days: "Day 67–70",
        goal: "Network Watcher & Phase 3 Review",
        tasks: [
          "Service Endpoints vs Private Endpoints",
          "Network Watcher — Topology, Flow Logs, IP Flow Verify",
          "ทบทวน Networking ทั้งหมด",
          "ทำ Practice Questions Networking",
        ],
        claudePrompt:
          "ช่วยสร้าง Lab AZ-104 Week 11: เปิดใช้ Network Watcher, ดู Topology ของ VNet, ทดสอบ IP Flow Verify และออก Quiz 10 ข้อ Networking สำหรับ AZ-104 พร้อมเฉลยอธิบาย เป็นภาษาไทย",
      },
    ],
  },
  {
    id: 4,
    label: "Phase 4",
    title: "Monitor, Backup & สอบ",
    days: "Day 71–90",
    color: "#10B981",
    bg: "#ECFDF5",
    border: "#A7F3D0",
    icon: "🏆",
    examWeight: "10–15%",
    weeks: [
      {
        week: "Week 12",
        days: "Day 71–77",
        goal: "Azure Monitor & Backup",
        tasks: [
          "Azure Monitor — Metrics, Alerts, Action Groups",
          "Log Analytics Workspace + KQL เบื้องต้น",
          "Azure Backup — VMs, Azure Files, SQL",
          "Azure Site Recovery (ASR) — Concepts",
        ],
        claudePrompt:
          "ช่วยสร้าง Lab AZ-104 Week 12: ตั้ง Azure Monitor Alert เมื่อ VM CPU > 80%, สร้าง Log Analytics Workspace และ query KQL หา VM ที่ heartbeat หาย และตั้ง Azure Backup สำหรับ VM พร้อม step-by-step",
      },
      {
        week: "Week 13",
        days: "Day 78–84",
        goal: "Full Review ทุก Domain",
        tasks: [
          "ทบทวน Phase 1: Identity & Governance",
          "ทบทวน Phase 2: Storage & Compute",
          "ทบทวน Phase 3: Networking",
          "ทำ Full Practice Exam (ตั้งเป้า 85%+)",
        ],
        claudePrompt:
          "ช่วยออก Mock Exam AZ-104 จำนวน 30 ข้อ ครอบคลุมทุก domain (Identity, Storage, Compute, Networking, Monitor) พร้อมเฉลยและอธิบายเหตุผลทุกข้อ เป็นภาษาไทย",
      },
      {
        week: "Week 14",
        days: "Day 85–90",
        goal: "Final Prep & สอบ AZ-104",
        tasks: [
          "ทบทวนข้อที่ผิดจาก Practice Exam",
          "อ่าน Microsoft Docs เรื่องที่ยังไม่มั่นใจ",
          "ทำ Practice Exam ครั้งสุดท้าย",
          "Day 90: สอบ AZ-104 🎯",
        ],
        claudePrompt:
          "ช่วยสรุป Cheat Sheet AZ-104 สำคัญ: Port numbers ที่ต้องจำ, SKU differences (LB/Storage/VM), Azure CLI commands ที่ออกบ่อย และ exam scenarios ที่มักสับสน พร้อมคำอธิบายกระชับ เป็นภาษาไทย",
      },
    ],
  },
];

const milestones = [
  { day: 21, label: "Phase 1 Done", icon: "🚀", color: "#3B82F6" },
  { day: 45, label: "Phase 2 Done", icon: "⚡", color: "#8B5CF6" },
  { day: 70, label: "Phase 3 Done", icon: "🌐", color: "#0EA5E9" },
  { day: 90, label: "AZ-104 Certified!", icon: "🏆", color: "#10B981" },
];

export default function Roadmap90Days() {
  const [openWeeks, setOpenWeeks] = useState({});
  const [checkedTasks, setCheckedTasks] = useState({});
  const [currentDay, setCurrentDay] = useState(1);
  const [copiedKey, setCopiedKey] = useState(null);
  const [showPrompt, setShowPrompt] = useState({});

  const toggleWeek = (key) =>
    setOpenWeeks((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleTask = (key) =>
    setCheckedTasks((prev) => ({ ...prev, [key]: !prev[key] }));

  const togglePrompt = (key) =>
    setShowPrompt((prev) => ({ ...prev, [key]: !prev[key] }));

  const copyPrompt = (key, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

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
        <div style={{ fontSize: 48, marginBottom: 12 }}>☁️</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0, letterSpacing: -1 }}>
          90-Day Roadmap: AZ-104
        </h1>
        <p style={{ color: "#94A3B8", marginTop: 8, fontSize: 15 }}>
          Microsoft Azure Administrator · แผนพิชิต Cert ใน 90 วัน
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
            <span>Day 1</span><span>Day 21</span><span>Day 45</span><span>Day 70</span><span>Day 90</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 16px" }}>

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
            { label: "เหลืออีก", value: `${90 - currentDay} วัน`, sub: "จนถึงสอบ AZ-104", color: "#10B981" },
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
                background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #0EA5E9, #10B981)",
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

        {/* Timeline */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 32, gap: 0 }}>
          {[1, 21, 45, 70, 90].map((d, i) => (
            <div key={d} style={{ display: "flex", alignItems: "center", flex: i < 4 ? 1 : 0 }}>
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
                  fontSize: 10,
                  fontWeight: 700,
                  flexShrink: 0,
                  boxShadow: currentDay >= d ? "0 0 0 4px #BFDBFE" : "none",
                  transition: "all 0.3s",
                }}
              >
                {d}
              </div>
              {i < 4 && (
                <div style={{ flex: 1, height: 4, background: currentDay >= [21, 45, 70, 90][i] ? "#3B82F6" : "#E2E8F0", transition: "background 0.3s" }} />
              )}
            </div>
          ))}
        </div>

        {/* Phases */}
        {phases.map((phase) => {
          const [startDay, endDay] = phase.days.replace("Day ", "").split("–").map(Number);
          const isActive = currentDay >= startDay && currentDay <= endDay;
          const isDone = currentDay > endDay;

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
                  flexWrap: "wrap",
                  gap: 12,
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
                  <span
                    style={{
                      background: isActive ? "rgba(255,255,255,0.2)" : phase.color + "15",
                      color: isActive ? "white" : phase.color,
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: 99,
                    }}
                  >
                    น้ำหนักสอบ {phase.examWeight}
                  </span>
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
                  const isOpen = openWeeks[wKey] !== undefined ? openWeeks[wKey] : wi === 0;
                  const isPromptOpen = showPrompt[wKey] || false;
                  const weekDone = week.tasks.filter((_, ti) => checkedTasks[`${wKey}-${ti}`]).length;
                  const isCopied = copiedKey === wKey;

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
                      {/* Week header */}
                      <button
                        onClick={() => toggleWeek(wKey)}
                        style={{
                          width: "100%",
                          padding: "14px 18px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          background: isOpen ? phase.bg : "white",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontWeight: 700, color: phase.color, fontSize: 13 }}>{week.week}</span>
                          <span style={{ color: "#94A3B8", fontSize: 11, background: "#F1F5F9", padding: "2px 8px", borderRadius: 99 }}>{week.days}</span>
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
                        <div style={{ background: phase.bg }}>
                          {/* Tasks */}
                          <div style={{ padding: "4px 18px 12px" }}>
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

                          {/* Claude Code prompt section */}
                          <div
                            style={{
                              margin: "0 12px 12px",
                              borderRadius: 10,
                              border: `1px solid ${phase.color}40`,
                              background: "white",
                              overflow: "hidden",
                            }}
                          >
                            <button
                              onClick={() => togglePrompt(wKey)}
                              style={{
                                width: "100%",
                                padding: "10px 14px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                background: isPromptOpen ? phase.color + "10" : "white",
                                border: "none",
                                cursor: "pointer",
                                textAlign: "left",
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ fontSize: 16 }}>🤖</span>
                                <span style={{ fontWeight: 700, color: phase.color, fontSize: 12 }}>
                                  ถาม Claude Code เพื่อทำ Lab
                                </span>
                              </div>
                              <span style={{ color: phase.color, fontSize: 16, transform: isPromptOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>›</span>
                            </button>

                            {isPromptOpen && (
                              <div style={{ padding: "4px 14px 14px", borderTop: `1px solid ${phase.color}20` }}>
                                <div
                                  style={{
                                    background: "#F8FAFC",
                                    borderRadius: 8,
                                    padding: "10px 12px",
                                    fontSize: 13,
                                    color: "#334155",
                                    lineHeight: 1.7,
                                    fontStyle: "italic",
                                    border: "1px solid #E2E8F0",
                                    marginBottom: 10,
                                  }}
                                >
                                  {week.claudePrompt}
                                </div>
                                <button
                                  onClick={() => copyPrompt(wKey, week.claudePrompt)}
                                  style={{
                                    padding: "7px 16px",
                                    borderRadius: 8,
                                    border: `1.5px solid ${phase.color}`,
                                    background: isCopied ? phase.color : "white",
                                    color: isCopied ? "white" : phase.color,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                  }}
                                >
                                  {isCopied ? "✅ คัดลอกแล้ว!" : "📋 คัดลอก Prompt"}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Exam resources */}
        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: "24px 28px",
            marginBottom: 28,
            boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
            border: "1px solid #E2E8F0",
          }}
        >
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1E293B" }}>
            📚 แหล่งเรียนรู้ AZ-104
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            {[
              { label: "Microsoft Learn (ฟรี)", icon: "🎓", desc: "Official learning path" },
              { label: "John Savill YouTube", icon: "▶️", desc: "AZ-104 Study Cram" },
              { label: "Azure Free Account", icon: "☁️", desc: "$200 credit สำหรับ Labs" },
              { label: "MeasureUp / Whizlabs", icon: "📝", desc: "Practice exams" },
            ].map((r) => (
              <div
                key={r.label}
                style={{
                  padding: "12px 16px",
                  borderRadius: 10,
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 4 }}>{r.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#1E293B" }}>{r.label}</div>
                <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "24px 0", color: "#94A3B8", fontSize: 13 }}>
          AZ-104 90-Day Roadmap · Built with React · {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
