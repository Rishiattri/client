"use client";

import { useEffect, useState } from "react";

interface LeaveRequest {
  _id: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  status: "Pending" | "Approved" | "Rejected" | "Cancelled";
}

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

export default function ManageLeavesPage() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);

  const loadLeaves = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/leaves");
      const data = await res.json();
      const requests = Array.isArray(data.items) ? data.items : [];
      setLeaves(requests.filter((leave: LeaveRequest) => leave.status === "Pending"));
    } catch {
      setLeaves([]);
    }
  };

  useEffect(() => {
    const loadPendingLeaves = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/leaves");
        const data = await res.json();
        const requests = Array.isArray(data.items) ? data.items : [];
        setLeaves(requests.filter((leave: LeaveRequest) => leave.status === "Pending"));
      } catch {
        setLeaves([]);
      }
    };

    void loadPendingLeaves();
  }, []);

  const updateLeaveStatus = async (id: string, status: "Approved" | "Rejected" | "Cancelled") => {
    const res = await fetch(`http://localhost:3001/api/leaves/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      void loadLeaves();
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
                background: index === 5 ? "#1e293b" : "transparent",
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
        <h1>Manage Leave Requests</h1>
        <p style={{ color: "#94a3b8", marginTop: 8 }}>Review pending requests and update their status. Approved leaves will consume the employee balance.</p>

        {leaves.length === 0 ? (
          <div style={{ marginTop: 24, padding: 20, border: "1px solid #334155", borderRadius: 12, color: "#94a3b8" }}>
            No pending leave requests right now.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 24 }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #334155" }}>
                <th style={{ padding: 12 }}>Employee</th>
                <th style={{ padding: 12 }}>Type</th>
                <th style={{ padding: 12 }}>Dates</th>
                <th style={{ padding: 12 }}>Days</th>
                <th style={{ padding: 12 }}>Status</th>
                <th style={{ padding: 12 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave._id} style={{ borderBottom: "1px solid #1e293b" }}>
                  <td style={{ padding: 12 }}>{leave.employeeName}</td>
                  <td style={{ padding: 12 }}>{leave.leaveType}</td>
                  <td style={{ padding: 12 }}>{new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</td>
                  <td style={{ padding: 12 }}>{leave.days}</td>
                  <td style={{ padding: 12 }}>{leave.status}</td>
                  <td style={{ padding: 12 }}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button onClick={() => updateLeaveStatus(leave._id, "Approved")}>Approve</button>
                      <button onClick={() => updateLeaveStatus(leave._id, "Rejected")}>Reject</button>
                      <button onClick={() => updateLeaveStatus(leave._id, "Cancelled")}>Cancel</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
