"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {

  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3001/api/employees")
      .then((res) => res.json())
      .then((data) => {
        setTotal(data.totalEmployees);
      });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>

      <h2>Total Employees: {total}</h2>

    </div>
  );
}