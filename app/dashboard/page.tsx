"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {

  const [total, setTotal] = useState(0);

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");

  // Get total employees
  const getEmployees = () => {
    fetch("http://localhost:3001/api/employees")
      .then((res) => res.json())
      .then((data) => {
        setTotal(data.totalEmployees);
      });
  };

  useEffect(() => {
    getEmployees();
  }, []);

  // Add employee
  const addEmployee = async (e:any) => {

    e.preventDefault();

    const res = await fetch("http://localhost:3001/api/employees/add",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email
      })
    });

    const data = await res.json();

    alert(data.message);

    setName("");
    setEmail("");

    // refresh employee count
    getEmployees();
  };

  return (

    <div style={{ padding: 40 }}>

      <h1>Dashboard</h1>

      <h2>Total Employees: {total}</h2>

      <hr style={{margin:"30px 0"}} />

      <h2>Add Employee</h2>

      <form onSubmit={addEmployee}>

        <input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <br/><br/>

        <input
          type="email"
          placeholder="Employee Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <br/><br/>

        <button type="submit">
          Add Employee
        </button>

      </form>

    </div>
  );
}