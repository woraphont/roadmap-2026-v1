import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const phases = [
  {
    id: 1,
    label: "Phase 1",
    title: "AWS Fundamentals & IAM",
    days: "Day 1–21",
    startDay: 1,
    endDay: 21,
    color: "#3B82F6",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    icon: "🚀",
    badge: "Cloud Foundation",
    weeks: [
      {
        week: "Week 1",
        days: "Day 1–7",
        goal: "Cloud Concepts & AWS Setup",
        isProject: false,
        tasks: [
          "Cloud Computing: IaaS, PaaS, SaaS คืออะไร",
          "AWS Global Infrastructure: Regions, AZs, Edge Locations",
          "สร้าง AWS Free Tier Account + ตั้ง Billing Alert",
          "AWS Console, CLI, CloudShell เบื้องต้น",
          "Shared Responsibility Model",
        ],
        courses: [
          { name: "AWS Cloud Practitioner Essentials", type: "free", platform: "AWS Skill Builder", hours: 6, star: true },
          { name: "freeCodeCamp AWS SAA-C03 Full Course", type: "free", platform: "YouTube", hours: 20, star: true },
          { name: "Stephane Maarek — AWS SAA-C03 (Section 1–3)", type: "paid", price: "$15–20", platform: "Udemy", hours: 5, star: true },
        ],
        claudePrompt:
          "ช่วยอธิบาย AWS Global Infrastructure: Region, Availability Zone, Edge Location คืออะไร แตกต่างกันอย่างไร พร้อมตัวอย่างการเลือก Region ที่เหมาะสมสำหรับ startup ในไทย และ Lab: สร้าง AWS Free Tier account + ตั้ง Billing Alert $10 ด้วย CLI",
      },
      {
        week: "Week 2",
        days: "Day 8–14",
        goal: "IAM — Identity & Access Management",
        isProject: false,
        tasks: [
          "IAM Users, Groups, Roles, Policies",
          "IAM Policy JSON — Effect, Action, Resource, Condition",
          "MFA, Password Policy, Access Keys",
          "AWS Organizations & SCPs",
          "STS — AssumeRole, Cross-account Access",
        ],
        courses: [
          { name: "Stephane Maarek — IAM Section", type: "paid", price: "$15–20", platform: "Udemy", hours: 3, star: true },
          { name: "AWS IAM Workshop (Hands-on)", type: "free", platform: "workshops.aws", hours: 2, star: false },
        ],
        claudePrompt:
          "ช่วยสร้าง Lab AWS IAM: สร้าง User, Group, และ Custom Policy ที่อนุญาต S3 read-only เฉพาะ bucket ชื่อ 'dev-bucket' ด้วย AWS CLI พร้อมอธิบาย Policy JSON ทุก field และทดสอบ deny access",
      },
      {
        week: "Week 3",
        days: "Day 15–21",
        goal: "ทบทวน + Mini Lab IAM",
        isProject: true,
        projectLabel: "🔨 Mini Lab · Foundation",
        projectName: "IAM Secure Setup",
        projectStack: ["IAM", "MFA", "AWS CLI", "Organizations"],
        tasks: [
          "ทบทวน Cloud Concepts + IAM ทั้งหมด",
          "สร้าง IAM setup ที่ปลอดภัย: root lock, admin user, MFA",
          "สร้าง Custom Policy ตาม least privilege principle",
          "ทำ Practice Questions Fundamentals (20 ข้อ)",
          "บันทึก setup ลง GitHub README",
        ],
        courses: [
          { name: "TutorialsDojo SAA-C03 Cheat Sheets (PDF)", type: "free", platform: "tutorialsdojo.com", hours: 1, star: true },
          { name: "TutorialsDojo Practice Exams", type: "paid", price: "$15", platform: "tutorialsdojo.com", hours: 3, star: true },
        ],
        claudePrompt:
          "ช่วยสร้าง IAM Security Checklist สำหรับ AWS account ใหม่: root account best practices, สร้าง admin IAM user, ตั้ง MFA, password policy และ billing alert พร้อม AWS CLI commands ทุกขั้นตอน",
      },
    ],
  },
  {
    id: 2,
    label: "Phase 2",
    title: "AWS SAA-C03 Core Services",
    days: "Day 22–56",
    startDay: 22,
    endDay: 56,
    color: "#F97316",
    bg: "#FFF7ED",
    border: "#FED7AA",
    icon: "⚡",
    badge: "น้ำหนักสอบ ~80%",
    weeks: [
      {
        week: "Week 4",
        days: "Day 22–28",
        goal: "Compute — EC2",
        isProject: false,
        tasks: [
          "EC2 Instance Types & Families (C, M, R, T series)",
          "Pricing: On-Demand, Reserved, Spot, Savings Plans",
          "AMIs, User Data, Instance Metadata (169.254.169.254)",
          "Security Groups, Key Pairs, Elastic IPs",
          "EBS Volumes (gp2/gp3, io1/io2), Snapshots",
          "Placement Groups: Cluster, Spread, Partition",
        ],
        courses: [
          { name: "Stephane Maarek — EC2 Section", type: "paid", price: "$15–20", platform: "Udemy", hours: 6, star: true },
          { name: "freeCodeCamp — EC2 Chapter", type: "free", platform: "YouTube", hours: 2, star: false },
          { name: "Adrian Cantrill — EC2 (thorough)", type: "paid", price: "$40", platform: "cantrill.io", hours: 8, star: false },
        ],
        claudePrompt:
          "ช่วยสร้าง Lab AWS SAA-C03 Week 4: สร้าง EC2 t3.micro ด้วย AWS CLI, attach EBS volume, ใช้ User Data ติดตั้ง Apache อัตโนมัติ และอธิบายความต่าง On-Demand vs Reserved vs Spot พร้อม use case ของแต่ละแบบ",
      },
      {
        week: "Week 5",
        days: "Day 29–35",
        goal: "Storage — S3",
        isProject: false,
        tasks: [
          "S3 Buckets, Objects, Versioning, MFA Delete",
          "Storage Classes: Standard, IA, One Zone-IA, Glacier Instant/Flexible/Deep Archive, Intelligent-Tiering",
          "S3 Lifecycle Policies",
          "Bucket Policies, ACLs, Pre-signed URLs",
          "S3 Replication (CRR, SRR) + Replication Time Control",
          "S3 Static Website Hosting + CORS",
        ],
        courses: [
          { name: "Stephane Maarek — S3 Section", type: "paid", price: "$15–20", platform: "Udemy", hours: 5, star: true },
          { name: "AWS S3 Immersion Day (Workshop)", type: "free", platform: "workshops.aws", hours: 3, star: true },
        ],
        claudePrompt:
          "ช่วยสร้าง Lab AWS SAA-C03 Week 5: สร้าง S3 bucket, เปิด Versioning, ตั้ง Lifecycle Policy ย้ายไป Glacier หลัง 30 วัน, สร้าง Bucket Policy อนุญาต public read และสร้าง Pre-signed URL หมดอายุ 1 ชั่วโมง ด้วย AWS CLI",
      },
      {
        week: "Week 6",
        days: "Day 36–42",
        goal: "Databases — RDS, DynamoDB, ElastiCache",
        isProject: false,
        tasks: [
          "RDS Engines (MySQL, PostgreSQL, Aurora) + Multi-AZ vs Read Replicas",
          "Aurora — Serverless, Global Database",
          "DynamoDB — Tables, Partition Key, Sort Key, GSI, LSI",
          "DynamoDB Streams, DAX (in-memory cache)",
          "ElastiCache — Redis vs Memcached use cases",
          "Redshift (Data Warehouse) — concepts only",
        ],
        courses: [
          { name: "Stephane Maarek — Database Section", type: "paid", price: "$15–20", platform: "Udemy", hours: 5, star: true },
          { name: "AWS Database Workshop", type: "free", platform: "workshops.aws", hours: 2, star: false },
        ],
        claudePrompt:
          "ช่วยอธิบาย AWS Database เลือกใช้อะไร: RDS Multi-AZ vs Read Replica ต่างกันอย่างไร, เมื่อไหรใช้ DynamoDB แทน RDS, Redis vs Memcached ต่างกันอย่างไร พร้อม exam scenario 5 ข้อที่ออกบ่อยและเฉลย",
      },
      {
        week: "Week 7",
        days: "Day 43–49",
        goal: "Networking — VPC",
        isProject: false,
        tasks: [
          "VPC, Subnets (Public/Private), CIDR Planning",
          "Internet Gateway, NAT Gateway vs NAT Instance",
          "Security Groups (stateful) vs NACLs (stateless)",
          "VPC Peering, Transit Gateway",
          "VPN (Site-to-Site, Client VPN), Direct Connect",
          "VPC Flow Logs, VPC Endpoints (Gateway vs Interface)",
        ],
        courses: [
          { name: "Stephane Maarek — VPC Section", type: "paid", price: "$15–20", platform: "Udemy", hours: 5, star: true },
          { name: "freeCodeCamp — VPC Chapter", type: "free", platform: "YouTube", hours: 2, star: true },
          { name: "AWS VPC Workshop", type: "free", platform: "workshops.aws", hours: 3, star: false },
        ],
        claudePrompt:
          "ช่วยสร้าง Lab AWS SAA-C03 Week 7: ออกแบบ VPC ที่มี Public Subnet + Private Subnet ด้วย AWS CLI, ตั้ง NAT Gateway สำหรับ Private subnet, สร้าง Security Group + NACL และอธิบายความต่าง Security Group vs NACL พร้อม diagram ASCII",
      },
      {
        week: "Week 8",
        days: "Day 50–56",
        goal: "DNS, CDN, Load Balancer & Auto Scaling",
        isProject: true,
        projectLabel: "🔨 Mini Lab · Core",
        projectName: "3-Tier HA Architecture",
        projectStack: ["EC2", "ALB", "Auto Scaling", "Route 53", "S3", "RDS"],
        tasks: [
          "Route 53 — Routing Policies (Simple/Weighted/Latency/Failover/Geolocation/Multi-value)",
          "CloudFront — Distributions, Origins, Behaviors, OAC",
          "ELB — ALB (Layer 7) vs NLB (Layer 4) vs CLB",
          "Auto Scaling Groups — Scaling Policies (Target Tracking, Step, Scheduled)",
          "Mini Lab: ALB + ASG + EC2 + RDS Multi-AZ HA setup",
        ],
        courses: [
          { name: "Stephane Maarek — Route 53, CloudFront, ELB", type: "paid", price: "$15–20", platform: "Udemy", hours: 6, star: true },
          { name: "AWS Elastic Load Balancing Workshop", type: "free", platform: "workshops.aws", hours: 2, star: false },
        ],
        claudePrompt:
          "ช่วยสร้าง Lab AWS SAA-C03 Week 8: สร้าง Application Load Balancer กับ Target Group 2 EC2 instances ด้วย AWS CLI, ตั้ง Auto Scaling Group (min:1 max:3) พร้อม Target Tracking CPU 60% และทดสอบ health check",
      },
    ],
  },
  {
    id: 3,
    label: "Phase 3",
    title: "AWS SAA-C03 Advanced + สอบ",
    days: "Day 57–84",
    startDay: 57,
    endDay: 84,
    color: "#EF4444",
    bg: "#FEF2F2",
    border: "#FECACA",
    icon: "🎯",
    badge: "สอบ SAA-C03 Day 84",
    weeks: [
      {
        week: "Week 9",
        days: "Day 57–63",
        goal: "Security — KMS, Secrets, WAF, GuardDuty",
        isProject: false,
        tasks: [
          "KMS — CMK, Envelope Encryption, Key Policies",
          "Secrets Manager vs SSM Parameter Store",
          "Shield (Standard/Advanced), WAF, Firewall Manager",
          "GuardDuty, Inspector, Macie",
          "CloudTrail (API logging), AWS Config (compliance)",
          "Cognito — User Pools vs Identity Pools",
        ],
        courses: [
          { name: "Stephane Maarek — Security Section", type: "paid", price: "$15–20", platform: "Udemy", hours: 5, star: true },
          { name: "AWS Security Workshop", type: "free", platform: "workshops.aws", hours: 3, star: false },
        ],
        claudePrompt:
          "ช่วยอธิบาย AWS Security สำหรับ SAA-C03: KMS Envelope Encryption ทำงานอย่างไร, Secrets Manager vs SSM Parameter Store เลือกอะไร, GuardDuty vs Inspector vs Macie ต่างกันอย่างไร พร้อม exam scenarios 5 ข้อที่ออกบ่อย",
      },
      {
        week: "Week 10",
        days: "Day 64–70",
        goal: "HA & Disaster Recovery",
        isProject: false,
        tasks: [
          "Multi-AZ vs Multi-Region Architecture",
          "RTO vs RPO — DR Strategies: Backup/Restore, Pilot Light, Warm Standby, Multi-Site",
          "AWS Backup — cross-region, cross-account",
          "Elastic Disaster Recovery (DRS)",
          "AWS Well-Architected Framework — 6 Pillars",
          "CloudFormation concepts (IaC บน AWS)",
        ],
        courses: [
          { name: "Stephane Maarek — HA & DR Section", type: "paid", price: "$15–20", platform: "Udemy", hours: 3, star: true },
          { name: "AWS Well-Architected Framework (free PDF)", type: "free", platform: "aws.amazon.com", hours: 2, star: true },
        ],
        claudePrompt:
          "ช่วยอธิบาย DR Strategies สำหรับ SAA-C03: Backup/Restore vs Pilot Light vs Warm Standby vs Multi-Site ต่างกันอย่างไร ค่าใช้จ่ายและ RTO/RPO ของแต่ละแบบ พร้อม scenario ว่าแบบไหนควรเลือกอะไร เป็นภาษาไทย",
      },
      {
        week: "Week 11",
        days: "Day 71–77",
        goal: "Integration — SQS, SNS, Lambda, API GW",
        isProject: false,
        tasks: [
          "SQS — Standard vs FIFO, Visibility Timeout, DLQ, Long Polling",
          "SNS — Topics, Subscriptions, Fan-out pattern",
          "EventBridge — Rules, Event Bus",
          "Lambda — Triggers, Layers, Concurrency, Cold Start",
          "API Gateway — REST vs HTTP vs WebSocket",
          "Kinesis Data Streams vs Kinesis Firehose",
        ],
        courses: [
          { name: "Stephane Maarek — Messaging & Serverless", type: "paid", price: "$15–20", platform: "Udemy", hours: 5, star: true },
          { name: "AWS Lambda Workshop", type: "free", platform: "workshops.aws", hours: 2, star: false },
        ],
        claudePrompt:
          "ช่วยอธิบาย AWS Messaging สำหรับ SAA-C03: SQS vs SNS vs EventBridge ใช้อะไรเมื่อไหร่, Fan-out pattern คืออะไร, Lambda Cold Start คืออะไรและแก้ยังไง พร้อม exam scenarios 5 ข้อที่สับสนบ่อย เป็นภาษาไทย",
      },
      {
        week: "Week 12",
        days: "Day 78–84",
        goal: "Full Mock Exam + 🎯 สอบ AWS SAA-C03",
        isProject: false,
        tasks: [
          "ทำ Full Practice Exam ครั้งที่ 1 (65 ข้อ) — ตั้งเป้า 80%+",
          "ทบทวนข้อที่ผิดทั้งหมดอ่าน Docs ประกอบ",
          "ทำ Full Practice Exam ครั้งที่ 2",
          "อ่าน SAA-C03 Cheat Sheet รอบสุดท้าย",
          "Day 83: เตรียมตัว นอนหลับพักผ่อน",
          "Day 84: สอบ AWS SAA-C03 ที่ Pearson VUE 🎯",
        ],
        courses: [
          { name: "TutorialsDojo SAA-C03 Practice Exams", type: "paid", price: "$15", platform: "tutorialsdojo.com", hours: 10, star: true },
          { name: "Whizlabs SAA-C03 Practice Tests", type: "paid", price: "$20", platform: "whizlabs.com", hours: 8, star: false },
          { name: "ExamTopics SAA-C03 (ใช้ระวัง: เน้น understand ไม่ใช่ dump)", type: "free", platform: "examtopics.com", hours: 5, star: false },
        ],
        claudePrompt:
          "ช่วยสรุป AWS SAA-C03 Cheat Sheet สำหรับสอบ: Port numbers สำคัญ, S3 Storage Classes เลือกเมื่อไหร่, EBS Volume Types เลือกเมื่อไหร่, RDS Multi-AZ vs Read Replica, ALB vs NLB vs CLB, SQS vs SNS vs EventBridge เป็น bullet points กระชับ",
      },
    ],
  },
  {
    id: 4,
    label: "Phase 4",
    title: "Terraform Associate",
    days: "Day 85–112",
    startDay: 85,
    endDay: 112,
    color: "#8B5CF6",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    icon: "🏗️",
    badge: "HashiCorp Certified",
    weeks: [
      {
        week: "Week 13",
        days: "Day 85–91",
        goal: "Terraform Fundamentals & HCL",
        isProject: false,
        tasks: [
          "IaC คืออะไร: Terraform vs CloudFormation vs Ansible vs Pulumi",
          "Terraform workflow: init → plan → apply → destroy",
          "HCL syntax: resource, variable, output, local, data",
          "Providers — AWS Provider ตั้งค่า credentials",
          "Lab: สร้าง EC2 + Security Group ด้วย Terraform ครั้งแรก",
        ],
        courses: [
          { name: "HashiCorp Official Tutorials", type: "free", platform: "developer.hashicorp.com", hours: 6, star: true },
          { name: "freeCodeCamp Terraform Full Course", type: "free", platform: "YouTube", hours: 3, star: true },
          { name: "Bryan Krausen — Terraform Associate (003)", type: "paid", price: "$15", platform: "Udemy", hours: 8, star: true },
        ],
        claudePrompt:
          "ช่วยสร้าง Lab Terraform Week 13: เขียน main.tf สร้าง EC2 t3.micro + Security Group อนุญาต port 80/443 บน AWS ด้วย AWS Provider พร้อมอธิบาย HCL syntax แต่ละส่วน และ terraform init/plan/apply/destroy ทีละขั้นตอน",
      },
      {
        week: "Week 14",
        days: "Day 92–98",
        goal: "Variables, Outputs & State Management",
        isProject: false,
        tasks: [
          "Variables: input, type constraints, validation, sensitive",
          "terraform.tfvars, .auto.tfvars, Environment variables",
          "Outputs และ output value ระหว่าง modules",
          "Terraform State: tfstate file คืออะไร ทำไมสำคัญ",
          "Remote State: S3 + DynamoDB state locking",
          "State commands: list, show, mv, rm, pull, push",
        ],
        courses: [
          { name: "HashiCorp Tutorials — State Management", type: "free", platform: "developer.hashicorp.com", hours: 3, star: true },
          { name: "Bryan Krausen — State & Variables", type: "paid", price: "$15", platform: "Udemy", hours: 3, star: true },
        ],
        claudePrompt:
          "ช่วยสร้าง Lab Terraform Week 14: ตั้ง Remote State บน S3 + DynamoDB locking ด้วย Terraform backend config, แยก variables ออกเป็น variables.tf + terraform.tfvars และสร้าง output แสดง EC2 public IP พร้อมอธิบายทุกขั้นตอน",
      },
      {
        week: "Week 15",
        days: "Day 99–105",
        goal: "Modules, Loops & Advanced Features",
        isProject: false,
        tasks: [
          "Modules — สร้าง reusable module (vpc, ec2, s3)",
          "Module sources: local path, Git, Terraform Registry",
          "count vs for_each — วิธีใช้และความต่าง",
          "dynamic blocks, locals, expressions",
          "terraform import — นำ resource เดิมเข้า state",
          "Workspaces (dev/staging/prod)",
        ],
        courses: [
          { name: "HashiCorp Tutorials — Modules", type: "free", platform: "developer.hashicorp.com", hours: 3, star: true },
          { name: "Bryan Krausen — Modules & Advanced", type: "paid", price: "$15", platform: "Udemy", hours: 3, star: true },
          { name: "Terraform Registry (browse modules)", type: "free", platform: "registry.terraform.io", hours: 1, star: false },
        ],
        claudePrompt:
          "ช่วยสร้าง Lab Terraform Week 15: สร้าง reusable VPC module ที่รับ input: cidr_block, environment, subnet_count และ output: vpc_id, subnet_ids จากนั้นเรียกใช้ module ใน root module พร้อมอธิบาย best practices การสร้าง modules",
      },
      {
        week: "Week 16",
        days: "Day 106–112",
        goal: "Terraform Cloud, Practice & Mini Project",
        isProject: true,
        projectLabel: "🔨 Capstone Project · IaC",
        projectName: "AWS 3-Tier Infrastructure with Terraform",
        projectStack: ["Terraform Modules", "AWS VPC", "EC2 + ASG", "S3", "RDS", "Remote State", "GitHub Actions"],
        tasks: [
          "Terraform Cloud / Terraform Enterprise — concepts, Remote Execution",
          "Sentinel Policy as Code — concepts",
          "สร้าง Capstone: VPC + EC2 (ASG) + S3 + RDS ด้วย Terraform modules",
          "ตั้ง Remote State บน S3",
          "CI/CD: GitHub Actions รัน terraform plan/apply อัตโนมัติ",
          "ทำ Practice Exam Terraform Associate (ตั้งเป้า 85%+)",
        ],
        courses: [
          { name: "TutorialsDojo Terraform Associate Practice Exams", type: "paid", price: "$15", platform: "tutorialsdojo.com", hours: 5, star: true },
          { name: "Bryan Krausen Free Practice Questions", type: "free", platform: "github.com/btkrausen", hours: 2, star: true },
          { name: "HashiCorp Exam Study Guide (official)", type: "free", platform: "developer.hashicorp.com", hours: 2, star: true },
        ],
        claudePrompt:
          "ช่วยสร้าง Capstone Terraform Project: โครงสร้าง folder สำหรับ 3-Tier AWS infrastructure (VPC module + EC2/ASG module + RDS module + S3 module) พร้อม Remote State บน S3, GitHub Actions workflow รัน terraform plan เมื่อ PR และ apply เมื่อ merge main",
      },
    ],
  },
  {
    id: 5,
    label: "Phase 5",
    title: "Final Prep & สอบ Terraform",
    days: "Day 113–120",
    startDay: 113,
    endDay: 120,
    color: "#10B981",
    bg: "#ECFDF5",
    border: "#A7F3D0",
    icon: "🏆",
    badge: "สอบ Terraform Day 120",
    weeks: [
      {
        week: "Week 17",
        days: "Day 113–120",
        goal: "Final Review + 🎯 สอบ Terraform Associate",
        isProject: false,
        tasks: [
          "ทบทวนข้อที่ผิดจาก Practice Exam ทั้งหมด",
          "อ่าน HashiCorp Exam Objectives ทบทวนทุก topic",
          "ทำ Final Practice Exam (ตั้งเป้า 85%+)",
          "สรุป Cheat Sheet: commands, concepts, state",
          "Day 119: เตรียมตัว นอนหลับพักผ่อน",
          "Day 120: สอบ Terraform Associate 🎯",
        ],
        courses: [
          { name: "HashiCorp Terraform Associate Exam Study Guide", type: "free", platform: "developer.hashicorp.com", hours: 2, star: true },
          { name: "Bryan Krausen Free Questions (GitHub)", type: "free", platform: "github.com/btkrausen", hours: 3, star: true },
          { name: "TutorialsDojo Terraform Practice Exams", type: "paid", price: "$15", platform: "tutorialsdojo.com", hours: 4, star: true },
        ],
        claudePrompt:
          "ช่วยสรุป Terraform Associate Cheat Sheet: terraform commands ทั้งหมดที่ต้องรู้, ความต่าง count vs for_each, terraform taint vs replace vs refresh, state locking คืออะไร, Terraform Cloud vs OSS ต่างกันอย่างไร เป็น bullet points กระชับสำหรับทบทวนก่อนสอบ",
      },
    ],
  },
];

const milestones = [
  { day: 21,  label: "Foundation Done",       icon: "🚀", color: "#3B82F6" },
  { day: 56,  label: "SAA Core Done",          icon: "⚡", color: "#F97316" },
  { day: 84,  label: "AWS SAA-C03 ผ่าน! 🎯",  icon: "🎯", color: "#EF4444" },
  { day: 112, label: "Terraform Prep Done",    icon: "🏗️", color: "#8B5CF6" },
  { day: 120, label: "Terraform ผ่าน! 🏆",    icon: "🏆", color: "#10B981" },
];

const allCourses = [
  { category: "AWS SAA-C03 — แนะนำมากที่สุด", items: [
    { name: "Stephane Maarek — AWS SAA-C03", type: "paid", price: "$15–20 (Udemy sale)", platform: "Udemy", note: "ครบที่สุด อัปเดตบ่อย ⭐⭐⭐" },
    { name: "TutorialsDojo Practice Exams", type: "paid", price: "$15", platform: "tutorialsdojo.com", note: "Practice exam ดีที่สุดในตลาด ⭐⭐⭐" },
    { name: "freeCodeCamp AWS SAA-C03", type: "free", price: "ฟรี", platform: "YouTube", note: "20+ ชั่วโมง ฟรี ⭐⭐" },
    { name: "AWS Skill Builder", type: "free", price: "ฟรี", platform: "skillbuilder.aws", note: "Official AWS content ⭐⭐" },
    { name: "Adrian Cantrill — AWS SAA", type: "paid", price: "$40", platform: "cantrill.io", note: "ละเอียดที่สุด เหมาะถ้าต้องการ deep dive" },
  ]},
  { category: "Terraform Associate — แนะนำมากที่สุด", items: [
    { name: "HashiCorp Official Tutorials", type: "free", price: "ฟรี", platform: "developer.hashicorp.com", note: "Official ครบ ฟรี ⭐⭐⭐" },
    { name: "Bryan Krausen — Terraform 003", type: "paid", price: "$15", platform: "Udemy", note: "ตรงกับ exam มาก ⭐⭐⭐" },
    { name: "freeCodeCamp Terraform", type: "free", price: "ฟรี", platform: "YouTube", note: "เริ่มต้นได้ดี ⭐⭐" },
    { name: "TutorialsDojo Terraform Exams", type: "paid", price: "$15", platform: "tutorialsdojo.com", note: "Practice exam ⭐⭐" },
  ]},
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Roadmap120Days() {
  const [openWeeks, setOpenWeeks]       = useState({});
  const [checkedTasks, setCheckedTasks] = useState({});
  const [currentDay, setCurrentDay]     = useState(1);
  const [showPrompt, setShowPrompt]     = useState({});
  const [showCourses, setShowCourses]   = useState({});
  const [copiedKey, setCopiedKey]       = useState(null);
  const [activeTab, setActiveTab]       = useState("roadmap");

  const toggleWeek    = (k) => setOpenWeeks((p)    => ({ ...p, [k]: !p[k] }));
  const toggleTask    = (k) => setCheckedTasks((p) => ({ ...p, [k]: !p[k] }));
  const togglePrompt  = (k) => setShowPrompt((p)   => ({ ...p, [k]: !p[k] }));
  const toggleCourses = (k) => setShowCourses((p)  => ({ ...p, [k]: !p[k] }));

  const copyPrompt = (key, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  const totalTasks  = phases.flatMap((p) => p.weeks.flatMap((w) => w.tasks)).length;
  const doneTasks   = Object.values(checkedTasks).filter(Boolean).length;
  const progressPct = Math.round((doneTasks / totalTasks) * 100);
  const dayPct      = Math.round((Math.min(currentDay, 120) / 120) * 100);
  const daysLeft    = 120 - currentDay;

  const totalBudget = {
    min: 15 + 15 + 15 + 15,
    max: 20 + 15 + 15 + 15,
    exam: 150 + 70,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1E293B 0%, #1a1a2e 50%, #16213e 100%)",
        color: "white", padding: "40px 24px 32px", textAlign: "center",
      }}>
        <div style={{ fontSize: 44, marginBottom: 10 }}>☁️🏗️</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>
          120-Day Roadmap
        </h1>
        <p style={{ color: "#F97316", marginTop: 4, fontSize: 16, fontWeight: 700 }}>
          AWS SAA-C03 → Terraform Associate
        </p>
        <p style={{ color: "#94A3B8", marginTop: 4, fontSize: 13 }}>
          สอบ 2 ใบ · พิชิตใน 120 วัน · Multi-Cloud Engineer
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
          {[
            { id: "roadmap", label: "📅 Roadmap" },
            { id: "courses", label: "📚 คอร์สทั้งหมด" },
            { id: "budget",  label: "💰 ค่าใช้จ่าย" },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: "8px 18px", borderRadius: 99, border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 600,
              background: activeTab === tab.id ? "white" : "rgba(255,255,255,0.1)",
              color: activeTab === tab.id ? "#1E293B" : "white",
              transition: "all 0.2s",
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Day slider */}
        {activeTab === "roadmap" && (
          <div style={{
            maxWidth: 520, margin: "20px auto 0",
            background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: "14px 24px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: "#CBD5E1" }}>
              <span>วันที่ปัจจุบัน</span>
              <span style={{ fontWeight: 700, color: "white" }}>Day {currentDay} / 120</span>
            </div>
            <input type="range" min={1} max={120} value={currentDay}
              onChange={(e) => setCurrentDay(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#F97316" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 10, color: "#94A3B8" }}>
              <span>D1</span><span>D21</span><span>D56</span><span>D84</span><span>D112</span><span>D120</span>
            </div>
          </div>
        )}
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "28px 16px" }}>

        {/* ── TAB: COURSES ── */}
        {activeTab === "courses" && (
          <div>
            {allCourses.map((cat) => (
              <div key={cat.category} style={{
                background: "white", borderRadius: 16, padding: "20px 24px",
                marginBottom: 20, boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
              }}>
                <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#1E293B" }}>
                  {cat.category}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {cat.items.map((c) => (
                    <div key={c.name} style={{
                      display: "flex", alignItems: "flex-start", justifyContent: "space-between",
                      padding: "10px 14px", borderRadius: 10, gap: 12,
                      background: c.type === "free" ? "#F0FDF4" : "#FFFBEB",
                      border: `1px solid ${c.type === "free" ? "#BBF7D0" : "#FDE68A"}`,
                      flexWrap: "wrap",
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 14, color: "#1E293B" }}>{c.name}</div>
                        <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>{c.platform} · {c.note}</div>
                      </div>
                      <span style={{
                        padding: "3px 12px", borderRadius: 99, fontSize: 12, fontWeight: 700, flexShrink: 0,
                        background: c.type === "free" ? "#22C55E" : "#F59E0B",
                        color: "white",
                      }}>
                        {c.type === "free" ? "ฟรี" : c.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TAB: BUDGET ── */}
        {activeTab === "budget" && (
          <div>
            <div style={{
              background: "white", borderRadius: 16, padding: "24px 28px",
              marginBottom: 20, boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
            }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1E293B" }}>
                💰 ประมาณค่าใช้จ่ายทั้งหมด
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "Stephane Maarek — AWS SAA-C03 (Udemy sale)", price: "$15–20", type: "paid", note: "ซื้อตอน sale ราคาถูกมาก" },
                  { label: "TutorialsDojo SAA-C03 Practice Exams", price: "$15", type: "paid", note: "จำเป็นมาก" },
                  { label: "Bryan Krausen — Terraform 003 (Udemy)", price: "$15", type: "paid", note: "" },
                  { label: "TutorialsDojo Terraform Practice Exams", price: "$15", type: "paid", note: "" },
                  { label: "ค่าสอบ AWS SAA-C03", price: "$150", type: "exam", note: "Pearson VUE" },
                  { label: "ค่าสอบ Terraform Associate", price: "$70.50", type: "exam", note: "PSI Testing" },
                  { label: "freeCodeCamp, HashiCorp Tutorials, AWS Workshops", price: "ฟรี", type: "free", note: "ใช้เต็มที่!" },
                ].map((item) => (
                  <div key={item.label} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 14px", borderRadius: 10, gap: 12, flexWrap: "wrap",
                    background: item.type === "free" ? "#F0FDF4" : item.type === "exam" ? "#FEF2F2" : "#FFFBEB",
                    border: `1px solid ${item.type === "free" ? "#BBF7D0" : item.type === "exam" ? "#FECACA" : "#FDE68A"}`,
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "#1E293B" }}>{item.label}</div>
                      {item.note && <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 1 }}>{item.note}</div>}
                    </div>
                    <span style={{ fontWeight: 800, fontSize: 15,
                      color: item.type === "free" ? "#16A34A" : item.type === "exam" ? "#DC2626" : "#D97706"
                    }}>
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 16, padding: "14px 18px", borderRadius: 12,
                background: "linear-gradient(135deg, #1E293B, #334155)",
                color: "white",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: "#CBD5E1" }}>คอร์ส (paid)</span>
                  <span style={{ fontWeight: 700 }}>~$60–65</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: "#CBD5E1" }}>ค่าสอบ 2 ใบ</span>
                  <span style={{ fontWeight: 700 }}>~$220.50</span>
                </div>
                <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "10px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>รวมทั้งหมด</span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "#F97316" }}>~$280–285</span>
                </div>
                <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 6 }}>
                  ≈ 10,000–10,500 บาท · ได้ Cert 2 ใบ
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: ROADMAP ── */}
        {activeTab === "roadmap" && (
          <>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
              {[
                { label: "ความคืบหน้า (วัน)", value: `${dayPct}%`,                sub: `Day ${currentDay}/120`,     color: "#3B82F6" },
                { label: "งานที่เสร็จแล้ว",    value: `${doneTasks}/${totalTasks}`, sub: `${progressPct}% complete`, color: "#F97316" },
                { label: "เหลืออีก",            value: `${daysLeft} วัน`,           sub: daysLeft <= 15 ? "ใกล้แล้ว! 🔥" : "จนถึง Cert 2 ใบ", color: "#10B981" },
              ].map((s) => (
                <div key={s.label} style={{
                  background: "white", borderRadius: 16, padding: "18px 14px",
                  textAlign: "center", boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                  borderTop: `4px solid ${s.color}`,
                }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 10, color: "#94A3B8" }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{ background: "white", borderRadius: 16, padding: "18px 22px", marginBottom: 24, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontWeight: 600, color: "#1E293B", fontSize: 14 }}>ความคืบหน้าโดยรวม</span>
                <span style={{ fontWeight: 700, color: "#F97316", fontSize: 14 }}>{progressPct}%</span>
              </div>
              <div style={{ height: 12, background: "#F1F5F9", borderRadius: 99, overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${progressPct}%`,
                  background: "linear-gradient(90deg, #3B82F6, #F97316, #EF4444, #8B5CF6, #10B981)",
                  borderRadius: 99, transition: "width 0.4s ease",
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, flexWrap: "wrap", gap: 6 }}>
                {milestones.map((m) => (
                  <div key={m.day} style={{ fontSize: 11 }}>
                    <span style={{ color: currentDay >= m.day ? m.color : "#CBD5E1", fontWeight: 600 }}>
                      {m.icon} {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 32, gap: 0 }}>
              {[1, 21, 56, 84, 112, 120].map((d, i) => (
                <div key={d} style={{ display: "flex", alignItems: "center", flex: i < 5 ? 1 : 0 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                    background: currentDay >= d ? "#1E293B" : "#E2E8F0",
                    color: currentDay >= d ? "white" : "#94A3B8",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 9, fontWeight: 700,
                    boxShadow: currentDay >= d ? "0 0 0 4px #FED7AA" : "none",
                    transition: "all 0.3s",
                  }}>
                    {d}
                  </div>
                  {i < 5 && (
                    <div style={{
                      flex: 1, height: 4,
                      background: currentDay >= [21, 56, 84, 112, 120][i] ? "#F97316" : "#E2E8F0",
                      transition: "background 0.3s",
                    }} />
                  )}
                </div>
              ))}
            </div>

            {/* Phases */}
            {phases.map((phase) => {
              const isActive = currentDay >= phase.startDay && currentDay <= phase.endDay;
              const isDone   = currentDay > phase.endDay;

              return (
                <div key={phase.id} style={{
                  marginBottom: 24, borderRadius: 20, overflow: "hidden",
                  boxShadow: isActive ? `0 4px 24px ${phase.color}30` : "0 1px 8px rgba(0,0,0,0.06)",
                  border: `2px solid ${isActive ? phase.color : phase.border}`,
                  transition: "all 0.3s",
                }}>
                  {/* Phase header */}
                  <div style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${phase.color}, ${phase.color}CC)`
                      : isDone ? "#F8FAFC" : phase.bg,
                    padding: "20px 26px",
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between", flexWrap: "wrap", gap: 10,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{
                        width: 50, height: 50, borderRadius: 14, fontSize: 24,
                        background: isActive ? "rgba(255,255,255,0.2)" : phase.color + "18",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {isDone ? "✅" : phase.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase",
                          color: isActive ? "rgba(255,255,255,0.75)" : phase.color }}>
                          {phase.label} · {phase.days}
                        </div>
                        <div style={{ fontSize: 20, fontWeight: 800, marginTop: 2, color: isActive ? "white" : "#1E293B" }}>
                          {phase.title}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 99,
                        background: isActive ? "rgba(255,255,255,0.2)" : phase.color + "15",
                        color: isActive ? "white" : phase.color,
                      }}>
                        {phase.badge}
                      </span>
                      {isActive && <span style={{ background: "rgba(255,255,255,0.25)", color: "white", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 99 }}>กำลังดำเนินการ</span>}
                      {isDone  && <span style={{ background: "#D1FAE5", color: "#059669", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 99 }}>เสร็จสิ้น</span>}
                    </div>
                  </div>

                  {/* Weeks */}
                  <div style={{ background: "white", padding: "8px 14px 14px" }}>
                    {phase.weeks.map((week, wi) => {
                      const wKey    = `${phase.id}-${wi}`;
                      const isOpen  = openWeeks[wKey] !== undefined ? openWeeks[wKey] : wi === 0;
                      const isPOpen = showPrompt[wKey]  || false;
                      const isCOpen = showCourses[wKey] || false;
                      const weekDone = week.tasks.filter((_, ti) => checkedTasks[`${wKey}-${ti}`]).length;
                      const isCopied = copiedKey === wKey;
                      const freeCourses = week.courses.filter((c) => c.type === "free").length;
                      const paidCourses = week.courses.filter((c) => c.type === "paid").length;

                      return (
                        <div key={wKey} style={{
                          margin: "8px 0", borderRadius: 12,
                          border: `1px solid ${week.isProject ? phase.color + "55" : phase.border}`,
                          overflow: "hidden",
                        }}>
                          {/* Week toggle */}
                          <button onClick={() => toggleWeek(wKey)} style={{
                            width: "100%", padding: "12px 16px",
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            background: isOpen ? (week.isProject ? phase.color + "0D" : phase.bg) : "white",
                            border: "none", cursor: "pointer", textAlign: "left",
                          }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                              <span style={{ fontWeight: 700, color: phase.color, fontSize: 13 }}>{week.week}</span>
                              <span style={{ color: "#94A3B8", fontSize: 11, background: "#F1F5F9", padding: "2px 8px", borderRadius: 99 }}>{week.days}</span>
                              {week.isProject && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: phase.color + "15", color: phase.color }}>{week.projectLabel}</span>}
                              <span style={{ color: "#475569", fontSize: 13 }}>— {week.goal}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                              <span style={{ fontSize: 10, color: "#94A3B8", background: "#F1F5F9", padding: "2px 6px", borderRadius: 99 }}>
                                {weekDone}/{week.tasks.length}
                              </span>
                              <span style={{ color: phase.color, fontSize: 18, transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>›</span>
                            </div>
                          </button>

                          {isOpen && (
                            <div style={{ background: week.isProject ? phase.color + "06" : phase.bg }}>
                              {/* Project tech stack */}
                              {week.isProject && week.projectStack && (
                                <div style={{ padding: "10px 16px 4px", display: "flex", flexWrap: "wrap", gap: 6 }}>
                                  {week.projectStack.map((tech) => (
                                    <span key={tech} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99, background: phase.color + "15", color: phase.color, fontWeight: 600 }}>
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Tasks */}
                              <div style={{ padding: "4px 16px 10px" }}>
                                {week.tasks.map((task, ti) => {
                                  const tKey = `${wKey}-${ti}`;
                                  const done = checkedTasks[tKey];
                                  return (
                                    <label key={tKey} style={{
                                      display: "flex", alignItems: "center", gap: 10, padding: "7px 0", cursor: "pointer",
                                      borderBottom: ti < week.tasks.length - 1 ? `1px solid ${phase.border}` : "none",
                                    }}>
                                      <input type="checkbox" checked={!!done} onChange={() => toggleTask(tKey)}
                                        style={{ accentColor: phase.color, width: 15, height: 15, cursor: "pointer" }} />
                                      <span style={{ fontSize: 13, color: done ? "#94A3B8" : "#334155", textDecoration: done ? "line-through" : "none", transition: "all 0.2s" }}>
                                        {task}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>

                              {/* Courses */}
                              <div style={{ margin: "0 12px 10px", borderRadius: 10, border: `1px solid ${phase.color}30`, background: "white", overflow: "hidden" }}>
                                <button onClick={() => toggleCourses(wKey)} style={{
                                  width: "100%", padding: "9px 14px",
                                  display: "flex", alignItems: "center", justifyContent: "space-between",
                                  background: isCOpen ? "#F8FAFC" : "white",
                                  border: "none", cursor: "pointer", textAlign: "left",
                                }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ fontSize: 14 }}>📚</span>
                                    <span style={{ fontWeight: 700, color: "#475569", fontSize: 12 }}>
                                      คอร์สแนะนำสำหรับ Week นี้
                                    </span>
                                    <span style={{ fontSize: 10, background: "#D1FAE5", color: "#059669", padding: "1px 7px", borderRadius: 99, fontWeight: 600 }}>ฟรี {freeCourses}</span>
                                    <span style={{ fontSize: 10, background: "#FEF3C7", color: "#D97706", padding: "1px 7px", borderRadius: 99, fontWeight: 600 }}>จ่าย {paidCourses}</span>
                                  </div>
                                  <span style={{ color: "#94A3B8", fontSize: 16, transform: isCOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>›</span>
                                </button>
                                {isCOpen && (
                                  <div style={{ padding: "4px 14px 12px", borderTop: "1px solid #F1F5F9" }}>
                                    {week.courses.map((c) => (
                                      <div key={c.name} style={{
                                        display: "flex", justifyContent: "space-between", alignItems: "center",
                                        padding: "8px 0", gap: 10, flexWrap: "wrap",
                                        borderBottom: "1px solid #F1F5F9",
                                      }}>
                                        <div style={{ flex: 1 }}>
                                          <div style={{ fontSize: 13, fontWeight: 600, color: "#1E293B" }}>
                                            {c.star && "⭐ "}{c.name}
                                          </div>
                                          <div style={{ fontSize: 11, color: "#94A3B8" }}>
                                            {c.platform} · {c.hours} ชั่วโมง
                                          </div>
                                        </div>
                                        <span style={{
                                          padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, flexShrink: 0,
                                          background: c.type === "free" ? "#D1FAE5" : "#FEF3C7",
                                          color: c.type === "free" ? "#059669" : "#D97706",
                                        }}>
                                          {c.type === "free" ? "ฟรี" : c.price}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Ask Claude Code */}
                              <div style={{ margin: "0 12px 12px", borderRadius: 10, border: `1px solid ${phase.color}40`, background: "white", overflow: "hidden" }}>
                                <button onClick={() => togglePrompt(wKey)} style={{
                                  width: "100%", padding: "9px 14px",
                                  display: "flex", alignItems: "center", justifyContent: "space-between",
                                  background: isPOpen ? phase.color + "10" : "white",
                                  border: "none", cursor: "pointer", textAlign: "left",
                                }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ fontSize: 14 }}>🤖</span>
                                    <span style={{ fontWeight: 700, color: phase.color, fontSize: 12 }}>
                                      ถาม Claude Code เพื่อทำ {week.isProject ? "Project" : "Lab"}
                                    </span>
                                  </div>
                                  <span style={{ color: phase.color, fontSize: 16, transform: isPOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>›</span>
                                </button>
                                {isPOpen && (
                                  <div style={{ padding: "4px 14px 12px", borderTop: `1px solid ${phase.color}20` }}>
                                    <div style={{
                                      background: "#F8FAFC", borderRadius: 8, padding: "10px 12px",
                                      fontSize: 13, color: "#334155", lineHeight: 1.75,
                                      fontStyle: "italic", border: "1px solid #E2E8F0", marginBottom: 10,
                                    }}>
                                      {week.claudePrompt}
                                    </div>
                                    <button onClick={() => copyPrompt(wKey, week.claudePrompt)} style={{
                                      padding: "6px 14px", borderRadius: 8,
                                      border: `1.5px solid ${phase.color}`,
                                      background: isCopied ? phase.color : "white",
                                      color: isCopied ? "white" : phase.color,
                                      fontSize: 12, fontWeight: 700, cursor: "pointer",
                                      transition: "all 0.2s",
                                      display: "flex", alignItems: "center", gap: 6,
                                    }}>
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
          </>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "20px 0", color: "#94A3B8", fontSize: 12 }}>
          AWS SAA-C03 + Terraform 120-Day Roadmap · Built with React · {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
