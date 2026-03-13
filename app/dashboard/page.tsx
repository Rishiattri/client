"use client";
import { useState } from "react";

const NAV_ITEMS = [
  { icon: "🏠", label: "Laain", active: true },
  { icon: "📋", label: "logo" },
  { icon: "📝", label: "Notion" },
  { icon: "📅", label: "Dates" },
  { icon: "📊", label: "Dashbars" },
];

const STAT_CARDS = [
  {
    title: "Total Employees",
    value: "#4F46E5",
    sub: "Today real",
    sub2: "Today",
    bg: "linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)",
    icon: "👥",
    number: "1,284",
  },
  {
    title: "Active Projects",
    value: "39",
    sub: "Activities",
    bg: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
    icon: "📁",
    number: "39",
  },
  {
    title: "Pending Leaves",
    value: "15.59",
    sub: "Ref.Approvals +",
    bg: "linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)",
    icon: "📆",
    number: "15",
  },
];

const PROJECTS = [
  { name: "Proxy real", tasks: 12, done: 8, color: "#7c3aed" },
  { name: "Dashboard", tasks: 24, done: 19, color: "#10b981" },
  { name: "Staff Hub", tasks: 16, done: 7, color: "#f59e0b" },
];

const EMPLOYEES = [
  { name: "Sarah Chen", role: "Product Designer", dept: "Design", status: "Active", avatar: "SC", color: "#7c3aed" },
  { name: "Marcus Johnson", role: "Lead Developer", dept: "Engineering", status: "Active", avatar: "MJ", color: "#10b981" },
  { name: "Priya Patel", role: "HR Manager", dept: "Human Resources", status: "On Leave", avatar: "PP", color: "#f59e0b" },
  { name: "Tom Williams", role: "Data Analyst", dept: "Analytics", status: "Active", avatar: "TW", color: "#06b6d4" },
  { name: "Luna Park", role: "QA Engineer", dept: "Engineering", status: "Remote", avatar: "LP", color: "#ec4899" },
];

function DonutChart({ value, total, color, size = 80 }: { value: number; total: number; color: string; size?: number }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (value / total) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={10} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={10}
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize={size * 0.22} fontWeight="700" fill="#1e293b">
        {value}
      </text>
    </svg>
  );
}

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #__next { height: 100%; }
        body { background: #f1f5f9; font-family: 'Segoe UI', system-ui, sans-serif; }

        .dash-root {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background: #f1f5f9;
        }

        /* SIDEBAR */
        .sidebar {
          width: 68px;
          background: #fff;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 0;
          gap: 6px;
          box-shadow: 2px 0 12px rgba(0,0,0,0.04);
          z-index: 10;
          flex-shrink: 0;
        }
        .sidebar-logo {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #7c3aed, #c026d3);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
          box-shadow: 0 4px 12px rgba(124,58,237,0.35);
        }
        .nav-item {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 18px;
          transition: all 0.2s; position: relative;
          border: none; background: none;
        }
        .nav-item:hover { background: #f8fafc; }
        .nav-item.active { background: #ede9fe; }
        .nav-item.active::before {
          content: '';
          position: absolute; left: -12px; top: 50%; transform: translateY(-50%);
          width: 3px; height: 20px; border-radius: 2px;
          background: #7c3aed;
        }
        .sidebar-bottom { margin-top: auto; display: flex; flex-direction: column; gap: 8px; align-items: center; }
        .avatar-sm {
          width: 34px; height: 34px; border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #9333ea);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: #fff; cursor: pointer;
        }

        /* MAIN */
        .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

        /* TOPBAR */
        .topbar {
          background: #fff;
          border-bottom: 1px solid #e2e8f0;
          padding: 0 28px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .topbar-title { font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: -0.02em; }
        .topbar-right { display: flex; align-items: center; gap: 12px; }
        .icon-btn {
          width: 36px; height: 36px; border-radius: 10px;
          background: #f8fafc; border: 1px solid #e2e8f0;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 15px; color: #64748b;
          transition: all 0.15s;
        }
        .icon-btn:hover { background: #f1f5f9; color: #334155; }
        .badge {
          width: 20px; height: 20px; border-radius: 50%;
          background: #7c3aed; color: #fff;
          font-size: 11px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
        }

        /* CONTENT */
        .content {
          flex: 1; overflow-y: auto; padding: 24px 28px;
          display: flex; flex-direction: column; gap: 20px;
        }

        /* STAT CARDS */
        .stat-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .stat-card {
          border-radius: 18px;
          padding: 22px;
          color: #fff;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          min-height: 130px;
        }
        .stat-card::after {
          content: '';
          position: absolute;
          top: -20px; right: -20px;
          width: 90px; height: 90px;
          border-radius: 50%;
          background: rgba(255,255,255,0.10);
        }
        .stat-card-title { font-size: 12px; font-weight: 600; letter-spacing: 0.05em; opacity: 0.85; margin-bottom: 10px; text-transform: uppercase; display: flex; align-items: center; gap: 6px; }
        .stat-card-value { font-size: 32px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 4px; }
        .stat-card-sub { font-size: 11px; opacity: 0.7; }
        .stat-check { width: 18px; height: 18px; border-radius: 4px; background: rgba(255,255,255,0.25); display: flex; align-items: center; justify-content: center; font-size: 10px; }

        /* GRID 2 cols */
        .grid-2 { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 16px; }

        /* CARD */
        .card {
          background: #fff;
          border-radius: 16px;
          padding: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .card-title { font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
        .card-sub { font-size: 11px; color: #94a3b8; margin-bottom: 16px; }

        /* Project list */
        .proj-item { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
        .proj-item:last-child { border-bottom: none; }
        .proj-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .proj-bar-bg { flex: 1; height: 4px; border-radius: 4px; background: #f1f5f9; overflow: hidden; }
        .proj-bar { height: 4px; border-radius: 4px; }
        .proj-name { font-size: 12px; color: #334155; font-weight: 500; width: 80px; flex-shrink: 0; }
        .proj-count { font-size: 11px; color: #94a3b8; flex-shrink: 0; }

        /* Donut card */
        .donut-center { display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .donut-label { font-size: 12px; color: #64748b; text-align: center; }
        .donut-value-big { font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; }

        /* EMPLOYEES TABLE */
        .emp-table { width: 100%; border-collapse: collapse; }
        .emp-table th { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; padding: 0 12px 10px; text-align: left; border-bottom: 1px solid #f1f5f9; }
        .emp-table td { padding: 12px; font-size: 13px; color: #334155; border-bottom: 1px solid #f8fafc; }
        .emp-table tr:last-child td { border-bottom: none; }
        .emp-table tr:hover td { background: #fafafa; }
        .emp-avatar { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0; }
        .emp-name-cell { display: flex; align-items: center; gap: 10px; }
        .status-pill { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; }
        .status-active { background: #dcfce7; color: #16a34a; }
        .status-leave { background: #fef3c7; color: #d97706; }
        .status-remote { background: #e0e7ff; color: #6d28d9; }
      `}</style>

      <div className="dash-root">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="#fff">
              <path d="M3 3h5v5H3V3zm7 0h5v5h-5V3zm-7 7h5v5H3v-5zm7 2h2v2h-2v-2zm3-2h2v2h-2v-2zm-3 3h2v2h-2v-2zm3 0h2v2h-2v-2z" />
            </svg>
          </div>
          {NAV_ITEMS.map((item, i) => (
            <button
              key={i}
              className={`nav-item${activeNav === i ? " active" : ""}`}
              onClick={() => setActiveNav(i)}
              title={item.label}
            >
              {item.icon}
            </button>
          ))}
          <div className="sidebar-bottom">
            <div className="icon-btn" title="Settings">⚙️</div>
            <div className="avatar-sm">JD</div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="main">
          {/* TOPBAR */}
          <header className="topbar">
            <div>
              <div className="topbar-title">Dashboard</div>
            </div>
            <div className="topbar-right">
              <div className="badge">4</div>
              <div className="icon-btn">🔔</div>
              <div className="icon-btn">⚙️</div>
              <div className="avatar-sm" style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#7c3aed,#9333ea)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>JD</div>
            </div>
          </header>

          {/* SCROLLABLE CONTENT */}
          <div className="content">

            {/* STAT CARDS */}
            <div className="stat-cards">
              {[
                { title: "Total Employees", number: "1,284", sub: "↑ 12 new this week", bg: "linear-gradient(135deg, #6d28d9 0%, #7c3aed 60%, #9333ea 100%)", shadow: "rgba(109,40,217,0.35)" },
                { title: "Active Projects", number: "39", sub: "↑ 4 started today", bg: "linear-gradient(135deg, #047857 0%, #059669 60%, #10b981 100%)", shadow: "rgba(5,150,105,0.35)" },
                { title: "Pending Leaves", number: "15", sub: "⚠ 3 need approval", bg: "linear-gradient(135deg, #0e7490 0%, #0891b2 60%, #06b6d4 100%)", shadow: "rgba(8,145,178,0.35)" },
              ].map((card, i) => (
                <div key={i} className="stat-card" style={{ background: card.bg, boxShadow: `0 8px 28px ${card.shadow}` }}>
                  <div className="stat-card-title">
                    <span className="stat-check">✓</span>
                    {card.title}
                  </div>
                  <div className="stat-card-value">{card.number}</div>
                  <div className="stat-card-sub">{card.sub}</div>
                </div>
              ))}
            </div>

            {/* MIDDLE ROW: Active Projects + 2 Donuts */}
            <div className="grid-2">
              {/* Active Projects */}
              <div className="card">
                <div className="card-title">Active Projects</div>
                <div className="card-sub">Company total</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em", marginBottom: 16 }}>
                  9,2012
                </div>
                {PROJECTS.map((p) => (
                  <div key={p.name} className="proj-item">
                    <div className="proj-dot" style={{ background: p.color }} />
                    <span className="proj-name">{p.name}</span>
                    <div className="proj-bar-bg">
                      <div className="proj-bar" style={{ width: `${(p.done / p.tasks) * 100}%`, background: p.color }} />
                    </div>
                    <span className="proj-count">{p.done}/{p.tasks}</span>
                  </div>
                ))}
                <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                  {["12 Issues", "Dashboard"].map((tag, i) => (
                    <span key={tag} style={{
                      padding: "4px 12px", borderRadius: 999,
                      background: i === 1 ? "#ede9fe" : "#f1f5f9",
                      color: i === 1 ? "#7c3aed" : "#64748b",
                      fontSize: 11, fontWeight: 600,
                      display: "flex", alignItems: "center", gap: 5,
                    }}>
                      {i === 1 && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c3aed", display: "inline-block" }} />}
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Donut 1: Profiling */}
              <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div className="card-title" style={{ textAlign: "center" }}>Profiling</div>
                <div className="card-sub" style={{ textAlign: "center" }}>Department split</div>
                <DonutChart value={191} total={300} color="#7c3aed" size={110} />
                <div style={{ marginTop: 12, display: "flex", gap: 14 }}>
                  {[{ label: "Engineering", color: "#7c3aed" }, { label: "Design", color: "#e2e8f0" }].map((l) => (
                    <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#64748b" }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
                      {l.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Donut 2: Profiling 2 */}
              <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div className="card-title" style={{ textAlign: "center" }}>Profiling</div>
                <div className="card-sub" style={{ textAlign: "center" }}>Leave utilization</div>
                <DonutChart value={374} total={500} color="#10b981" size={110} />
                <div style={{ marginTop: 12, display: "flex", gap: 14 }}>
                  {[{ label: "Used", color: "#10b981" }, { label: "Available", color: "#e2e8f0" }].map((l) => (
                    <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#64748b" }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
                      {l.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* EMPLOYEE TABLE */}
            <div className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div className="card-title" style={{ fontSize: 15 }}>Employee Dashboard</div>
                  <div className="card-sub" style={{ marginBottom: 0 }}>All active staff members</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ padding: "6px 14px", borderRadius: 8, background: "#ede9fe", color: "#7c3aed", border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                    + Add Employee
                  </button>
                  <button style={{ padding: "6px 14px", borderRadius: 8, background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0", fontSize: 12, cursor: "pointer" }}>
                    Export
                  </button>
                </div>
              </div>
              <table className="emp-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {EMPLOYEES.map((emp) => (
                    <tr key={emp.name}>
                      <td>
                        <div className="emp-name-cell">
                          <div className="emp-avatar" style={{ background: emp.color }}>{emp.avatar}</div>
                          <span style={{ fontWeight: 600, color: "#0f172a" }}>{emp.name}</span>
                        </div>
                      </td>
                      <td style={{ color: "#64748b" }}>{emp.role}</td>
                      <td style={{ color: "#64748b" }}>{emp.dept}</td>
                      <td>
                        <span className={`status-pill ${emp.status === "Active" ? "status-active" : emp.status === "On Leave" ? "status-leave" : "status-remote"}`}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
                          {emp.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", fontSize: 11, cursor: "pointer", color: "#64748b" }}>View</button>
                          <button style={{ padding: "4px 10px", borderRadius: 6, border: "none", background: "#ede9fe", fontSize: 11, cursor: "pointer", color: "#7c3aed", fontWeight: 600 }}>Edit</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}