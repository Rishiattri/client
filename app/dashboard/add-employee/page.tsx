"use client";

import Image from "next/image";
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

export default function AddEmployeePage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [address, setAddress] = useState("");
  const [experienceLevel, setExperienceLevel] = useState<"Fresher" | "Experienced">("Fresher");
  const [joiningDate, setJoiningDate] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImageName, setProfileImageName] = useState("");

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setProfileImage("");
      setProfileImageName("");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(typeof reader.result === "string" ? reader.result : "");
      setProfileImageName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const addEmployee = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch("http://localhost:3001/api/employees/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName,
        email,
        phoneNumber,
        role,
        education,
        address,
        experienceLevel,
        joiningDate,
        profileImage
      })
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      router.push("/dashboard");
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
                background: index === 1 ? "#1e293b" : "transparent",
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
        <h1>Add Employee</h1>
        <p style={{ color: "#94a3b8", marginTop: 8 }}>Create a new employee, then return to the dashboard list.</p>

        <form
          onSubmit={addEmployee}
          style={{
            display: "grid",
            gap: 16,
            maxWidth: 760,
            gridTemplateColumns: "1fr 1fr",
            marginTop: 30
          }}
        >
          <input type="text" placeholder="Full Name" value={fullName} onChange={(event) => setFullName(event.target.value)} required style={{ padding: 12 }} />
          <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required style={{ padding: 12 }} />
          <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} required style={{ padding: 12 }} />
          <input type="text" placeholder="Role" value={role} onChange={(event) => setRole(event.target.value)} required style={{ padding: 12 }} />
          <input type="text" placeholder="Education" value={education} onChange={(event) => setEducation(event.target.value)} required style={{ padding: 12 }} />
          <select value={experienceLevel} onChange={(event) => setExperienceLevel(event.target.value as "Fresher" | "Experienced")} style={{ padding: 12 }}>
            <option value="Fresher">Fresher</option>
            <option value="Experienced">Experienced</option>
          </select>
          <input type="date" value={joiningDate} onChange={(event) => setJoiningDate(event.target.value)} required style={{ padding: 12 }} />

          <div style={{ display: "grid", gap: 8 }}>
            <label
              htmlFor="profileImage"
              style={{
                padding: 12,
                border: "1px dashed #64748b",
                borderRadius: 8,
                cursor: "pointer",
                background: "#1e293b",
                color: "#cbd5e1"
              }}
            >
              {profileImageName || "Select an image from the gallery and upload it."}
            </label>
            <input id="profileImage" type="file" accept="image/*" onChange={handleProfileImageChange} style={{ display: "none" }} />
            {profileImage ? (
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Image src={profileImage} alt="Profile preview" width={48} height={48} style={{ borderRadius: "50%", objectFit: "cover" }} />
                <button
                  type="button"
                  onClick={() => {
                    setProfileImage("");
                    setProfileImageName("");
                  }}
                >
                  Remove Image
                </button>
              </div>
            ) : null}
          </div>

          <textarea
            placeholder="Address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
            style={{ padding: 12, gridColumn: "1 / -1", minHeight: 100 }}
          />

          <div style={{ display: "flex", gap: 12, gridColumn: "1 / -1" }}>
            <button type="submit">Save Employee</button>
            <button type="button" onClick={() => router.push("/dashboard")}>
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
