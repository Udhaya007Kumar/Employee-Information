// src/Pages/EmployeeList.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../Store/hooks';
import { deleteEmployee } from '../Features/EmployeeSlice';
import Pagination from '../Components/Pagination';
import EmployeeFilter from '../Components/EmployeeFilter';
import SortControl from '../Components/SortControl';
import EmployeeEditModal from '../Components/EmployeeEditModal';
import type { Employee } from '../Types/Employee';

const ITEMS_PER_PAGE = 10;

const EmployeeList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.employee.list);

  const departmentOptions = [...new Set(employees.map(emp => emp.department.name))];
  const experienceBuckets = [
    { label: 'All', value: '' },
    { label: '0-2 yrs', value: '0-2' },
    { label: '3-5 yrs', value: '3-5' },
    { label: '6-10 yrs', value: '6-10' },
    { label: '10+ yrs', value: '10+' },
  ];
  const sortOptions = [
    { label: 'None', value: '' },
    { label: 'Name (A-Z)', value: 'name-asc' },
    { label: 'Experience (Low → High)', value: 'exp-asc' },
    { label: 'Experience (High → Low)', value: 'exp-desc' },
    { label: 'Salary (Low → High)', value: 'salary-asc' },
    { label: 'Salary (High → Low)', value: 'salary-desc' },
  ];

  const filteredEmployees = employees.filter(emp => {
    const deptMatch = !departmentFilter || emp.department.name === departmentFilter;
    let expMatch = true;
    if (experienceFilter === '0-2') expMatch = emp.experienceYears <= 2;
    else if (experienceFilter === '3-5') expMatch = emp.experienceYears >= 3 && emp.experienceYears <= 5;
    else if (experienceFilter === '6-10') expMatch = emp.experienceYears >= 6 && emp.experienceYears <= 10;
    else if (experienceFilter === '10+') expMatch = emp.experienceYears > 10;

    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
    const nameMatch = fullName.includes(nameSearch.toLowerCase());

    return deptMatch && expMatch && nameMatch;
  });

  const sortedEmployees = [...filteredEmployees];
  if (selectedSort === 'name-asc') {
    sortedEmployees.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (selectedSort === 'exp-asc') {
    sortedEmployees.sort((a, b) => a.experienceYears - b.experienceYears);
  } else if (selectedSort === 'exp-desc') {
    sortedEmployees.sort((a, b) => b.experienceYears - a.experienceYears);
  } else if (selectedSort === 'salary-asc') {
    sortedEmployees.sort((a, b) => a.salary - b.salary);
  } else if (selectedSort === 'salary-desc') {
    sortedEmployees.sort((a, b) => b.salary - a.salary);
  }

  const totalPages = Math.ceil(sortedEmployees.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentEmployees = sortedEmployees.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [departmentFilter, experienceFilter, selectedSort, nameSearch]);

  const handleEditClick = (emp: Employee) => {
    setEditingEmployee(emp);
  };

  // const handleUpdate = (updatedEmp: Employee) => {
  //   dispatch(updateEmployee(updatedEmp));
  //   setEditingEmployee(null);
  // };

  const handleDelete = (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this employee?");
    if (confirm) {
      dispatch(deleteEmployee(id));
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Employee List</h1>
        <button
          onClick={() => navigate('/add-employee')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          Add Employee
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center bg-white shadow-sm px-4 py-2">
          <input
            type="text"
            placeholder="Search by name"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            className="w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 p-3 rounded"
          />
        </div>

        <div className="bg-white shadow-sm rounded-lg px-4 py-2">
          <EmployeeFilter
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            experienceFilter={experienceFilter}
            setExperienceFilter={setExperienceFilter}
            departmentOptions={departmentOptions}
            experienceBuckets={experienceBuckets}
          />
        </div>

        <div className="bg-white shadow-sm rounded-lg px-4 py-2 flex items-center">
          <SortControl
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            sortOptions={sortOptions}
          />
        </div>
      </div>

      <div className="shadow rounded-lg overflow-x-auto bg-white">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-indigo-50">
            <tr>
              <th className="px-4 sm:px-6 py-2 font-semibold text-gray-600">Name</th>
              <th className="px-4 sm:px-6 py-2 font-semibold text-gray-600">Email</th>
              <th className="px-4 sm:px-6 py-2 font-semibold text-gray-600">Role</th>
              <th className="px-4 sm:px-6 py-2 font-semibold text-gray-600">Department</th>
              <th className="px-4 sm:px-6 py-2 font-semibold text-gray-600">Experience</th>
              <th className="px-4 sm:px-6 py-2 font-semibold text-gray-600">Salary</th>
              <th className="px-4 sm:px-6 py-2 font-semibold text-gray-600">Location</th>
              <th className="px-4 sm:px-6 py-2 font-semibold text-gray-600">Active</th>
              <th className="px-4 sm:px-6 py-2 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((emp: Employee) => (
              <tr key={emp.id} className="odd:bg-white even:bg-indigo-50 hover:bg-indigo-100 transition">
                <td className="px-4 sm:px-6 py-2 font-medium">{emp.firstName} {emp.lastName}</td>
                <td className="px-4 sm:px-6 py-2">{emp.email}</td>
                <td className="px-4 sm:px-6 py-2">{emp.role.title} <span className="text-xs text-gray-400">({emp.role.level})</span></td>
                <td className="px-4 sm:px-6 py-2">{emp.department.name}</td>
                <td className="px-4 sm:px-6 py-2 text-center">{emp.experienceYears} yrs</td>
                <td className="px-4 sm:px-6 py-2">₹{emp.salary.toLocaleString('en-IN')}</td>
                <td className="px-4 sm:px-6 py-2">{emp.location}</td>
                <td className="px-4 sm:px-6 py-2 text-center">
                  {emp.isActive ? (
                    <span className="inline-block rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold">Active</span>
                  ) : (
                    <span className="inline-block rounded-full bg-gray-200 text-gray-500 px-3 py-1 text-xs font-semibold">Inactive</span>
                  )}
                </td>
                <td className="px-4 sm:px-6 py-2 flex gap-2">
                  <button
                    onClick={() => handleEditClick(emp)}
                    className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-semibold hover:bg-yellow-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-semibold hover:bg-red-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />

      {editingEmployee && (
        <EmployeeEditModal
  isOpen={editingEmployee !== null}
  employee={editingEmployee}
  onClose={() => setEditingEmployee(null)}
/>
      )}
    </div>
  );
};

export default EmployeeList;
