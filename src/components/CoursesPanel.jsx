import { useState } from "react";
import { COURSES } from "../data/weeks";

function CourseItem({ course }) {
  return (
    <div className="flex items-start gap-3 px-5 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{course.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{course.platform} · {course.note}</p>
      </div>
      <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${
        course.type === "free"
          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      }`}>
        {course.type === "free" ? "ฟรี" : course.price}
      </span>
    </div>
  );
}

export default function CoursesPanel() {
  const [open, setOpen] = useState("aws");

  return (
    <div className="space-y-4">
      <h2 className="text-base font-bold text-gray-900 dark:text-white">📚 คอร์สแนะนำ</h2>

      {/* AWS */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          onClick={() => setOpen(open === "aws" ? "" : "aws")}
          className="w-full px-5 py-3.5 flex items-center justify-between bg-amber-50 dark:bg-amber-900/10 hover:bg-amber-100 dark:hover:bg-amber-900/20 transition-colors"
        >
          <span className="font-bold text-amber-700 dark:text-amber-400 text-sm">☁️ AWS SAA-C03 Courses</span>
          <span className={`text-gray-400 text-xs transition-transform duration-200 ${open === "aws" ? "rotate-180" : ""}`}>▼</span>
        </button>
        {open === "aws" && COURSES.aws.map(c => <CourseItem key={c.name} course={c} />)}
      </div>

      {/* Terraform */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          onClick={() => setOpen(open === "terraform" ? "" : "terraform")}
          className="w-full px-5 py-3.5 flex items-center justify-between bg-green-50 dark:bg-green-900/10 hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors"
        >
          <span className="font-bold text-green-700 dark:text-green-400 text-sm">🏗️ Terraform Associate Courses</span>
          <span className={`text-gray-400 text-xs transition-transform duration-200 ${open === "terraform" ? "rotate-180" : ""}`}>▼</span>
        </button>
        {open === "terraform" && COURSES.terraform.map(c => <CourseItem key={c.name} course={c} />)}
      </div>

      {/* AI Engineering */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          onClick={() => setOpen(open === "ai" ? "" : "ai")}
          className="w-full px-5 py-3.5 flex items-center justify-between bg-purple-50 dark:bg-purple-900/10 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
        >
          <span className="font-bold text-purple-700 dark:text-purple-400 text-sm">🤖 AI Engineering Resources</span>
          <span className={`text-gray-400 text-xs transition-transform duration-200 ${open === "ai" ? "rotate-180" : ""}`}>▼</span>
        </button>
        {open === "ai" && COURSES.ai.map(c => <CourseItem key={c.name} course={c} />)}
      </div>

      {/* Budget */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-3">💰 ประมาณค่าใช้จ่ายทั้งหมด</h3>
        <div className="space-y-2">
          {[
            ["Stephane Maarek / Adrian Cantrill", "~$15–40", "text-amber-600 dark:text-amber-400"],
            ["Tutorials Dojo Practice Exams", "~$15", "text-amber-600 dark:text-amber-400"],
            ["Zeal Vora — Terraform (Udemy)", "~$15", "text-amber-600 dark:text-amber-400"],
            ["ค่าสอบ AWS SAA-C03", "$150", "text-red-500"],
            ["ค่าสอบ Terraform Associate", "$70.50", "text-red-500"],
            ["คอร์สฟรี (freeCodeCamp, HashiCorp, DeepLearning.AI)", "FREE", "text-green-600 dark:text-green-400"],
            ["AI Engineering (Anthropic/OpenAI/Gemini APIs)", "~$5–10/mo", "text-purple-600 dark:text-purple-400"],
          ].map(([label, price, cls]) => (
            <div key={label} className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400 text-xs">{label}</span>
              <span className={`font-bold text-xs ${cls}`}>{price}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 dark:border-gray-700 mt-3 pt-3 flex justify-between items-center">
          <span className="font-bold text-gray-900 dark:text-white text-sm">รวม (paid courses + ค่าสอบ)</span>
          <span className="font-black text-amber-500">~$290–310</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">≈ 10,000–11,000 บาท · ได้ Cert 2 ใบ + AI Eng skills</p>
      </div>
    </div>
  );
}
