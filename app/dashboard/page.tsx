"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Employee {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  education: string;
  address: string;
  experienceLevel: "Fresher" | "Experienced";
  joiningDate: string;
  profileImage?: string;
}

interface Project {
  _id: string;
  projectName: string;
  status: "Active" | "Completed";
  role: string;
  developerName: string;
  techStack: string;
}

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Add Employee", href: "/dashboard/add-employee" },
  { label: "Add Project", href: "/dashboard/add-project" },
  { label: "Leaves", href: "/leaves" },
  { label: "Salaries", href: "#" },
  { label: "Employee Login", href: "/login" },
  { label: "Employee Logout", href: "/login" }
];

export default function Dashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [totalEmployees, setTotalEmployees] = useState(0);

  const refreshProjects = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/projects");

      if (!res.ok) {
        setProjects([]);
        return;
      }

      const data = await res.json();
      const allProjects = Array.isArray(data?.data) ? data.data : [];
      setProjects(allProjects.filter((project: Project) => project.status === "Completed"));
    } catch {
      setProjects([]);
    }
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const employeeRes = await fetch("http://localhost:3001/api/employees");
        const employeeData = await employeeRes.json();
        setEmployees(Array.isArray(employeeData.items) ? employeeData.items : []);
        setTotalEmployees(employeeData.totalEmployees || 0);
      } catch {
        setEmployees([]);
        setTotalEmployees(0);
      }

      await refreshProjects();
    };

    void loadDashboardData();
  }, []);

  const refreshEmployees = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/employees");
      const data = await res.json();
      setEmployees(Array.isArray(data.items) ? data.items : []);
      setTotalEmployees(data.totalEmployees || 0);
    } catch {
      setEmployees([]);
      setTotalEmployees(0);
    }
  };

  const deleteEmployee = async (id: string) => {
    const res = await fetch(`http://localhost:3001/api/employees/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      void refreshEmployees();
    }
  };

  const deleteProject = async (id: string) => {
    const res = await fetch(`http://localhost:3001/api/projects/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      void refreshProjects();
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
                background: index === 0 ? "#1e293b" : "transparent",
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
        <h1>Dashboard</h1>
        <p style={{ color: "#94a3b8", marginTop: 8 }}>Employee and completed project lists stay here. New records are added from the sidebar pages.</p>
        <h2 style={{ marginTop: 20 }}>Total Employees: {totalEmployees}</h2>
        <h2 style={{ marginTop: 8 }}>Completed Projects: {projects.length}</h2>

        <hr style={{ margin: "30px 0", borderColor: "#334155" }} />

        <h2>Employee List</h2>
        {employees.length === 0 ? (
          <div
            style={{
              marginTop: 16,
              padding: 20,
              border: "1px solid #334155",
              borderRadius: 12,
              color: "#94a3b8"
            }}
          >
            No employees available yet.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #334155" }}>
                <th style={{ padding: 12 }}>#</th>
                <th style={{ padding: 12 }}>Profile</th>
                <th style={{ padding: 12 }}>Name</th>
                <th style={{ padding: 12 }}>Email</th>
                <th style={{ padding: 12 }}>Role</th>
                <th style={{ padding: 12 }}>Education</th>
                <th style={{ padding: 12 }}>Experience</th>
                <th style={{ padding: 12 }}>Joining Date</th>
                <th style={{ padding: 12 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee._id} style={{ borderBottom: "1px solid #1e293b" }}>
                  <td style={{ padding: 12 }}>{index + 1}</td>
                  <td style={{ padding: 12 }}>
                    {employee.profileImage ? (
                      <Image
                        src={employee.profileImage}
                        alt={employee.fullName}
                        width={40}
                        height={40}
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: "#2563eb",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700
                        }}
                      >
                        {employee.fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: 12 }}>{employee.fullName}</td>
                  <td style={{ padding: 12 }}>{employee.email}</td>
                  <td style={{ padding: 12 }}>{employee.role}</td>
                  <td style={{ padding: 12 }}>{employee.education}</td>
                  <td style={{ padding: 12 }}>{employee.experienceLevel}</td>
                  <td style={{ padding: 12 }}>{new Date(employee.joiningDate).toLocaleDateString()}</td>
                  <td style={{ padding: 12 }}>
                    <button onClick={() => deleteEmployee(employee._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <hr style={{ margin: "30px 0", borderColor: "#334155" }} />

        {projects.length === 0 ? (
          <div
            style={{
              marginTop: 16,
              padding: 20,
              border: "1px solid #334155",
              borderRadius: 12,
              color: "#94a3b8"
            }}
          >
            No completed projects available.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #334155" }}>
                <th style={{ padding: 12 }}>#</th>
                <th style={{ padding: 12 }}>Project Name</th>
                <th style={{ padding: 12 }}>Status</th>
                <th style={{ padding: 12 }}>Role</th>
                <th style={{ padding: 12 }}>Developer Name</th>
                <th style={{ padding: 12 }}>Tech Stack</th>
                <th style={{ padding: 12 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={project._id} style={{ borderBottom: "1px solid #1e293b" }}>
                  <td style={{ padding: 12 }}>{index + 1}</td>
                  <td style={{ padding: 12 }}>{project.projectName}</td>
                  <td style={{ padding: 12 }}>{project.status}</td>
                  <td style={{ padding: 12 }}>{project.role}</td>
                  <td style={{ padding: 12 }}>{project.developerName}</td>
                  <td style={{ padding: 12 }}>{project.techStack}</td>
                  <td style={{ padding: 12 }}>
                    <button onClick={() => deleteProject(project._id)}>Delete</button>
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
