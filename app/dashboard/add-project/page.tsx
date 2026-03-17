"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Add Employee", href: "/dashboard/add-employee" },
  { label: "Add Project", href: "/dashboard/add-project" },
  { label: "Leaves", href: "/leaves" },
  { label: "Salaries", href: "#" },
  { label: "Employee Login", href: "/login" },
  { label: "Employee Logout", href: "/login" }
];

export default function AddProjectPage() {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState<"Active" | "Completed">("Completed");
  const [role, setRole] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [techStack, setTechStack] = useState("");

  const addProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch("http://localhost:3001/api/projects/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        projectName,
        status,
        role,
        developerName,
        techStack
      })
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      router.push("/dashboard#completed-projects");
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
                background: index === 2 ? "#1e293b" : "transparent",
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
        <h1>Add Completed Project</h1>
        <p style={{ color: "#94a3b8", marginTop: 8 }}>Create project records from here. Completed items will appear in the dashboard list automatically.</p>

        <form
          onSubmit={addProject}
          style={{
            display: "grid",
            gap: 16,
            maxWidth: 760,
            gridTemplateColumns: "1fr 1fr",
            marginTop: 30
          }}
        >
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            required
            style={{ padding: 12 }}
          />
          <select value={status} onChange={(event) => setStatus(event.target.value as "Active" | "Completed")} style={{ padding: 12 }}>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
          <input type="text" placeholder="Role" value={role} onChange={(event) => setRole(event.target.value)} required style={{ padding: 12 }} />
          <input
            type="text"
            placeholder="Developer Name"
            value={developerName}
            onChange={(event) => setDeveloperName(event.target.value)}
            required
            style={{ padding: 12 }}
          />
          <input
            type="text"
            placeholder="Tech Stack"
            value={techStack}
            onChange={(event) => setTechStack(event.target.value)}
            required
            style={{ padding: 12, gridColumn: "1 / -1" }}
          />

          <div style={{ display: "flex", gap: 12, gridColumn: "1 / -1" }}>
            <button type="submit">Save Project</button>
            <button type="button" onClick={() => router.push("/dashboard#completed-projects")}>Cancel</button>
          </div>
        </form>
      </main>
    </div>
  );
}
