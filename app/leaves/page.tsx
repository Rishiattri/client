"use client";

import { useEffect, useState } from "react";

interface LeaveRequest {
  _id: string;
  employeeName: string;
  leaveType: "Casual" | "Sick" | "Earned" | "Unpaid";
  startDate: string;
  endDate: string;
  reason: string;
  days: number;
  status: "Pending" | "Approved" | "Rejected" | "Cancelled";
}

interface BalanceBucket {
  total: number;
  used: number;
  remaining: number;
}

interface LeaveBalance {
  _id: string;
  employeeName: string;
  casual: BalanceBucket;
  sick: BalanceBucket;
  earned: BalanceBucket;
  unpaid: BalanceBucket;
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

export default function LeavesPage() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [balances, setBalances] = useState<LeaveBalance[]>([]);

  const loadData = async () => {
    try {
      const [leaveRes, balanceRes] = await Promise.all([
        fetch("http://localhost:3001/api/leaves"),
        fetch("http://localhost:3001/api/leaves/balances")
      ]);

      const leaveData = await leaveRes.json();
      const balanceData = await balanceRes.json();

      setLeaves(Array.isArray(leaveData.items) ? leaveData.items : []);
      setBalances(Array.isArray(balanceData.items) ? balanceData.items : []);
    } catch {
      setLeaves([]);
      setBalances([]);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [leaveRes, balanceRes] = await Promise.all([
          fetch("http://localhost:3001/api/leaves"),
          fetch("http://localhost:3001/api/leaves/balances")
        ]);

        const leaveData = await leaveRes.json();
        const balanceData = await balanceRes.json();

        setLeaves(Array.isArray(leaveData.items) ? leaveData.items : []);
        setBalances(Array.isArray(balanceData.items) ? balanceData.items : []);
      } catch {
        setLeaves([]);
        setBalances([]);
      }
    };

    void loadInitialData();
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
      void loadData();
    }
  };

  const pendingCount = leaves.filter((leave) => leave.status === "Pending").length;
  const approvedCount = leaves.filter((leave) => leave.status === "Approved").length;
  const rejectedCount = leaves.filter((leave) => leave.status === "Rejected").length;

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
        <span style={{ display: "block", fontSize: 22, fontWeight: 900, letterSpacing: "-0.01em", marginBottom: 24 }}>
          Staff<span style={{ color: "#a78bfa" }}>Hub</span>
        </span>
        <nav style={{ display: "grid", gap: 10 }}>
          {sidebarItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                padding: "12px 14px",
                borderRadius: 10,
                background: index === 3 ? "#1e293b" : "transparent",
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ marginBottom: 8 }}>Leave Management</h1>
            <p style={{ color: "#94a3b8" }}>Track requests, review statuses, and keep leave balances visible for the team.</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="/leaves/apply" style={{ padding: "12px 16px", borderRadius: 10, background: "#7c3aed", color: "white", textDecoration: "none" }}>Apply Leave</a>
            <a href="/leaves/manage" style={{ padding: "12px 16px", borderRadius: 10, border: "1px solid #475569", color: "white", textDecoration: "none" }}>Manage Requests</a>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, marginTop: 24 }}>
          {[
            { label: "Pending Requests", value: pendingCount, tone: "#f59e0b" },
            { label: "Approved Leaves", value: approvedCount, tone: "#10b981" },
            { label: "Rejected Leaves", value: rejectedCount, tone: "#ef4444" }
          ].map((card) => (
            <div key={card.label} style={{ border: "1px solid #334155", borderRadius: 14, padding: 20, background: "#111827" }}>
              <div style={{ color: "#94a3b8", fontSize: 14 }}>{card.label}</div>
              <div style={{ fontSize: 32, fontWeight: 800, marginTop: 8, color: card.tone }}>{card.value}</div>
            </div>
          ))}
        </div>

        <h2 style={{ marginTop: 32 }}>Leave Balances</h2>
        {balances.length === 0 ? (
          <div style={{ marginTop: 16, padding: 20, border: "1px solid #334155", borderRadius: 12, color: "#94a3b8" }}>
            No leave balances available yet. Submit a leave request to create the first balance card.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 16 }}>
            {balances.map((balance) => (
              <div key={balance._id} style={{ border: "1px solid #334155", borderRadius: 14, padding: 20, background: "#111827" }}>
                <h3 style={{ marginTop: 0 }}>{balance.employeeName}</h3>
                {[
                  { label: "Casual", bucket: balance.casual },
                  { label: "Sick", bucket: balance.sick },
                  { label: "Earned", bucket: balance.earned },
                  { label: "Unpaid", bucket: balance.unpaid }
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", marginTop: 10, color: "#cbd5e1" }}>
                    <span>{item.label}</span>
                    <span>{item.bucket.used}/{item.bucket.total} used • {item.bucket.remaining} left</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <h2 style={{ marginTop: 32 }}>Leave Requests</h2>
        {leaves.length === 0 ? (
          <div style={{ marginTop: 16, padding: 20, border: "1px solid #334155", borderRadius: 12, color: "#94a3b8" }}>
            No leave requests available yet.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #334155" }}>
                <th style={{ padding: 12 }}>Employee</th>
                <th style={{ padding: 12 }}>Type</th>
                <th style={{ padding: 12 }}>Dates</th>
                <th style={{ padding: 12 }}>Days</th>
                <th style={{ padding: 12 }}>Reason</th>
                <th style={{ padding: 12 }}>Status</th>
                <th style={{ padding: 12 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave._id} style={{ borderBottom: "1px solid #1e293b" }}>
                  <td style={{ padding: 12 }}>{leave.employeeName}</td>
                  <td style={{ padding: 12 }}>{leave.leaveType}</td>
                  <td style={{ padding: 12 }}>
                    {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td style={{ padding: 12 }}>{leave.days}</td>
                  <td style={{ padding: 12 }}>{leave.reason}</td>
                  <td style={{ padding: 12 }}>{leave.status}</td>
                  <td style={{ padding: 12 }}>
                    {leave.status === "Pending" ? (
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button onClick={() => updateLeaveStatus(leave._id, "Approved")}>Approve</button>
                        <button onClick={() => updateLeaveStatus(leave._id, "Rejected")}>Reject</button>
                        <button onClick={() => updateLeaveStatus(leave._id, "Cancelled")}>Cancel</button>
                      </div>
                    ) : (
                      <span style={{ color: "#94a3b8" }}>No actions</span>
                    )}
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
