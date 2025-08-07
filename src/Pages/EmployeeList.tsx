import React, { useState } from 'react';
import { employees } from '../Data/mockEmployees';
import type { Employee } from '../Types/Employee';
import Pagination from '../Components/Pagination';

const ITEMS_PER_PAGE = 10; // or 5, 8, per your UI

const EmployeeList: React.FC = () => {

    const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentEmployees = employees.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  
  // Page change handler
  // const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Employee List</h1>

      {/* Table */}
      <div className="shadow rounded-lg overflow-x-auto bg-white">
       <table className="min-w-full text-left border-collapse">
  <thead className="bg-indigo-50">
    <tr>
      <th className="px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold text-gray-600">Name</th>
      <th className="px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold text-gray-600">Email</th>
      <th className="px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold text-gray-600">Role</th>
      <th className="px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold text-gray-600">Department</th>
      <th className="px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold text-gray-600">Experience</th>
      <th className="px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold text-gray-600">Salary</th>
      <th className="px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold text-gray-600">Location</th>
      <th className="px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold text-gray-600">Active</th>
    </tr>
  </thead>
  <tbody>
    {currentEmployees.map((emp: Employee) => (
      <tr
        key={emp.id}
        className="odd:bg-white even:bg-indigo-50 hover:bg-indigo-100 transition"
      >
        <td className="px-4 sm:px-6 py-2 whitespace-nowrap font-medium text-sm sm:text-base">
          {emp.firstName} {emp.lastName}
        </td>
        <td className="px-4 sm:px-6 py-2 text-sm sm:text-base">{emp.email}</td>
        <td className="px-4 sm:px-6 py-2 text-sm sm:text-base">
          {emp.role.title} <span className="text-xs sm:text-sm text-gray-400">({emp.role.level})</span>
        </td>
        <td className="px-4 sm:px-6 py-2 text-sm sm:text-base">{emp.department.name}</td>
        <td className="px-4 sm:px-6 py-2 text-center text-sm sm:text-base">{emp.experienceYears} yrs</td>
        <td className="px-4 sm:px-6 py-2 text-sm sm:text-base">₹{emp.salary.toLocaleString('en-IN')}</td>
        <td className="px-4 sm:px-6 py-2 text-sm sm:text-base">{emp.location}</td>
        <td className="px-4 sm:px-6 py-2 text-center text-sm sm:text-base">
          {emp.isActive ? (
            <span className="inline-block rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs sm:text-sm font-semibold">
              Active
            </span>
          ) : (
            <span className="inline-block rounded-full bg-gray-200 text-gray-500 px-3 py-1 text-xs sm:text-sm font-semibold">
              Inactive
            </span>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>

      {/* Pagination Controls */}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      
    </div>
  );
};

export default EmployeeList;
