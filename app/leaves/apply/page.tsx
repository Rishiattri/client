"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Add Employee", href: "/dashboard/add-employee" },
  { label: "Add Project", href: "/dashboard/add-project" },
  { label: "Leaves", href: "/leaves" },
  { label: "Apply Leave", href: "/leaves/apply" },
  { label: "Manage Leaves", href: "/leaves/manage" },
  { label: "Salaries", href: "#" },
  { label: "Employee Login", href: "/login" },
  { label: "Employee Logout", href: "/login" }
];

export default function ApplyLeavePage() {
  const router = useRouter();
  const [employeeName, setEmployeeName] = useState("");
  const [leaveType, setLeaveType] = useState<"Casual" | "Sick" | "Earned" | "Unpaid">("Casual");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const applyLeave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch("http://localhost:3001/api/leaves/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        employeeName,
        leaveType,
        startDate,
        endDate,
        reason
      })
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      router.push("/leaves");
    }
  };

  return (
    <div style={{ display: "flex", color: "white", background: "#151a1f", minHeight: "100vh" }}>
      <aside
        style={{
          width: 260,
          background: "#0f172a",
          borderRight: "1px solid #1e293b",
          padding: 24,
          position: "sticky",
          top: 0,
          height: "100vh"
        }}
      >
        <h2 style={{ margin: 0, marginBottom: 24, fontSize: 24 }}>StaffHub</h2>
        <nav style={{ display: "grid", gap: 10 }}>
          {sidebarItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                padding: "12px 14px",
                borderRadius: 10,
                background: index === 4 ? "#1e293b" : "transparent",
                color: "#e2e8f0",
                border: "1px solid #1e293b",
                textDecoration: "none"
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <main style={{ flex: 1, padding: 40 }}>
        <h1>Apply Leave</h1>
        <p style={{ color: "#94a3b8", marginTop: 8 }}>Submit a leave request for review. Approved requests will update the employee leave balance automatically.</p>

        <form
          onSubmit={applyLeave}
          style={{
            display: "grid",
            gap: 16,
            maxWidth: 760,
            gridTemplateColumns: "1fr 1fr",
            marginTop: 30
          }}
        >
          <input type="text" placeholder="Employee Name" value={employeeName} onChange={(event) => setEmployeeName(event.target.value)} required style={{ padding: 12 }} />
          <select value={leaveType} onChange={(event) => setLeaveType(event.target.value as "Casual" | "Sick" | "Earned" | "Unpaid")} style={{ padding: 12 }}>
            <option value="Casual">Casual Leave</option>
            <option value="Sick">Sick Leave</option>
            <option value="Earned">Earned Leave</option>
            <option value="Unpaid">Unpaid Leave</option>
          </select>
          <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} required style={{ padding: 12 }} />
          <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} required style={{ padding: 12 }} />
          <textarea placeholder="Reason" value={reason} onChange={(event) => setReason(event.target.value)} required style={{ padding: 12, minHeight: 120, gridColumn: "1 / -1" }} />

          <div style={{ display: "flex", gap: 12, gridColumn: "1 / -1" }}>
            <button type="submit">Submit Leave</button>
            <button type="button" onClick={() => router.push("/leaves")}>Cancel</button>
          </div>
        </form>
      </main>
    </div>
  );
}
