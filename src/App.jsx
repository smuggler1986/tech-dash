import React, { useState } from "react";
import NewRequestForm from "./NewRequestForm";

const requests = [
  { wip: "1001", reg: "DEF456", work: "Replace brake pads", status: "Approved" },
  { wip: "1002", reg: "XYZ789", work: "Diagnostics", status: "Pending" },
  { wip: "1003", reg: "ABC123", work: "Oil change", status: "Pending" },
  { wip: "1004", reg: "LMN456", work: "Engine repair", status: "Approved" },
  { wip: "1005", reg: "PQR678", work: "Battery replacement", status: "Declined" },
];

const statusColor = {
  Approved: "bg-green-500",
  Pending: "bg-yellow-400",
  Declined: "bg-red-500",
};

export default function App() {
  const [page, setPage] = useState("status");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-8">
        {page !== "status" && (
          <div className="mb-4">
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => setPage("status")}
            >
              ← Back
            </button>
          </div>
        )}

        {page === "status" && (
          <>
            <h1 className="text-4xl font-bold text-center text-gray-800">Tech Dash</h1>
            <h2 className="text-2xl font-semibold text-center text-gray-700 mt-2">Vehicle Repair Authorisation System</h2>
            <h3 className="text-lg text-center text-gray-500 mt-1">Status Page</h3>

            <div className="flex justify-center my-6">
              <button
                className="bg-blue-600 text-white px-6 py-2.5 text-sm font-semibold rounded-xl shadow hover:bg-blue-700 transition"
                onClick={() => setPage("form")}
              >
                Add New Request
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                    <th className="py-3 px-4">WIP #</th>
                    <th className="py-3 px-4">Registration #</th>
                    <th className="py-3 px-4">Work Description</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 divide-y divide-gray-200">
                  {requests.map((req) => (
                    <tr key={req.wip} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-4">{req.wip}</td>
                      <td className="py-3 px-4 font-medium">{req.reg}</td>
                      <td className="py-3 px-4">{req.work}</td>
                      <td className="py-3 px-4">
                        <span className={`text-white px-3 py-1 rounded-full text-sm font-medium ${statusColor[req.status]}`}>
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {page === "form" && <NewRequestForm onCancel={() => setPage("status")} />}
      </div>
    </div>
  );
}
