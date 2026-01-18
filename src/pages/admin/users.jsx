import React, { useState } from "react";

const initialStudents = [
  { name: "Alex Ray", regNo: "STU123", branch: "CSE", batch: "2025", status: "Not Placed" },
  { name: "Mia Wong", regNo: "STU124", branch: "ECE", batch: "2025", status: "Placed" },
  { name: "Ben Stone", regNo: "STU125", branch: "CSE", batch: "2024", status: "Blocked" },
];

export default function AdminUsers() {
  const [students] = useState(initialStudents);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">User Management</h1>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Reg No</th>
              <th className="border p-2 text-left">Branch</th>
              <th className="border p-2 text-left">Batch</th>
              <th className="border p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.regNo}>
                <td className="border p-2">{s.name}</td>
                <td className="border p-2">{s.regNo}</td>
                <td className="border p-2">{s.branch}</td>
                <td className="border p-2">{s.batch}</td>
                <td className="border p-2">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
