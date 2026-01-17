import React from "react";
import { Users } from "lucide-react";

const CompanyDashboard = () => {
  const colleges = [
    {
      name: "XYZ Institute of Technology",
      jobs: [
        { role: "SDE I", applicants: 125 },
        { role: "Frontend Developer", applicants: 78 },
        { role: "ML Engineer", applicants: 45 },
      ],
    },
    {
      name: "ABC College of Engineering",
      jobs: [
        { role: "Data Analyst", applicants: 92 },
      ],
    },
  ];

  return (
    <div className="p-6 space-y-10">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Company Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Manage your campus recruitment drives.
        </p>
      </div>

      {/* Active Jobs by College */}
      <div>
        <h2 className="text-xl font-medium mb-4">
          Active Jobs by College
        </h2>

        <div className="space-y-6">
          {colleges.map((college) => (
            <div
              key={college.name}
              className="bg-white border rounded-xl shadow-sm p-5"
            >
              <h3 className="text-lg font-semibold mb-4">
                {college.name}
              </h3>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {college.jobs.map((job) => (
                  <div
                    key={job.role}
                    className="border rounded-lg p-4"
                  >
                    <h4 className="font-medium text-gray-700 mb-2">
                      {job.role}
                    </h4>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span className="text-2xl font-semibold text-gray-900">
                        {job.applicants}
                      </span>
                      Applicants
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Actions */}
      <div>
        <h2 className="text-xl font-medium mb-4">
          Pending Actions
        </h2>

        <div className="bg-white border rounded-xl p-5 flex items-center justify-between">
          <p className="text-gray-700">
            3 offer letters pending approval for SDE I at XYZ Institute.
          </p>

          <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
            Awaiting Your Action
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
