// src/Pages/EmployeeList.tsx
import React, { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../Store/hooks';
import { deleteEmployee } from '../Features/EmployeeSlice';
import type { Employee } from '../Types/Employee';

// 🔹 Lazy load heavy components
const Pagination = React.lazy(() => import('../Components/Pagination'));
const EmployeeFilter = React.lazy(() => import('../Components/EmployeeFilter'));
const SortControl = React.lazy(() => import('../Components/SortControl'));
const EmployeeEditModal = React.lazy(() => import('../Components/EmployeeEditModal'));

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

  // Dropdown options (memoized)
  const departmentOptions = useMemo(
    () => [...new Set(employees.map(emp => emp.department.name))],
    [employees]
  );

  const experienceBuckets = useMemo(
    () => [
      { label: 'All', value: '' },
      { label: '0-2 yrs', value: '0-2' },
      { label: '3-5 yrs', value: '3-5' },
      { label: '6-10 yrs', value: '6-10' },
      { label: '10+ yrs', value: '10+' },
    ],
    []
  );

  const sortOptions = useMemo(
    () => [
      { label: 'None', value: '' },
      { label: 'Name (A-Z)', value: 'name-asc' },
      { label: 'Experience (Low → High)', value: 'exp-asc' },
      { label: 'Experience (High → Low)', value: 'exp-desc' },
      { label: 'Salary (Low → High)', value: 'salary-asc' },
      { label: 'Salary (High → Low)', value: 'salary-desc' },
    ],
    []
  );

  // Filtering (memoized)
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const deptMatch = !departmentFilter || emp.department.name === departmentFilter;
      let expMatch = true;
      if (experienceFilter === '0-2') expMatch = emp.experienceYears <= 2;
      else if (experienceFilter === '3-5') expMatch = emp.experienceYears >= 3 && emp.experienceYears <= 5;
      else if (experienceFilter === '6-10') expMatch = emp.experienceYears >= 6 && emp.experienceYears <= 10;
      else if (experienceFilter === '10+') expMatch = emp.experienceYears > 10;

      const query = nameSearch.toLowerCase();
      const nameEmailMatch =
        `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query);

      return deptMatch && expMatch && nameEmailMatch;
    });
  }, [employees, departmentFilter, experienceFilter, nameSearch]);

  // Sorting (memoized)
  const sortedEmployees = useMemo(() => {
    const sorted = [...filteredEmployees];
    if (selectedSort === 'name-asc') {
      sorted.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (selectedSort === 'exp-asc') {
      sorted.sort((a, b) => a.experienceYears - b.experienceYears);
    } else if (selectedSort === 'exp-desc') {
      sorted.sort((a, b) => b.experienceYears - a.experienceYears);
    } else if (selectedSort === 'salary-asc') {
      sorted.sort((a, b) => a.salary - b.salary);
    } else if (selectedSort === 'salary-desc') {
      sorted.sort((a, b) => b.salary - a.salary);
    }
    return sorted;
  }, [filteredEmployees, selectedSort]);

  // Pagination
  const totalPages = Math.ceil(sortedEmployees.length / ITEMS_PER_PAGE);
  const currentEmployees = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedEmployees.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [sortedEmployees, currentPage]);

  // Reset page on filter/sort/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [departmentFilter, experienceFilter, selectedSort, nameSearch]);

  // Handlers (memoized)
  const handleEditClick = useCallback((emp: Employee) => {
    setEditingEmployee(emp);
  }, []);

  const handleDelete = useCallback((id: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployee(id));
    }
  }, [dispatch]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Employee List</h1>
        <button
          onClick={() => navigate('/add-employee')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          Add Employee
        </button>
      </div>

      {/* Filters/Search/Sort */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Search */}
        <div className="flex items-center bg-white shadow-sm px-4 py-2 rounded w-full">
          <input
            type="text"
            placeholder="Search by name or email"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            className="w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 p-3 rounded"
          />
        </div>

        {/* Filters */}
        <Suspense fallback={<div>Loading Filters...</div>}>
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
        </Suspense>

        {/* Sort */}
        <Suspense fallback={<div>Loading Sort...</div>}>
          <div className="bg-white shadow-sm rounded-lg px-4 py-2 flex items-center">
            <SortControl
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              sortOptions={sortOptions}
            />
          </div>
        </Suspense>
      </div>

      {/* Table */}
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
                <td className="px-4 sm:px-6 py-2">
                  {emp.role.title} <span className="text-xs text-gray-400">({emp.role.level})</span>
                </td>
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

      {/* Pagination */}
      <Suspense fallback={<div>Loading Pagination...</div>}>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      </Suspense>

      {/* Edit Modal */}
      <Suspense fallback={<div>Loading Editor...</div>}>
        {editingEmployee && (
          <EmployeeEditModal
            isOpen={editingEmployee !== null}
            employee={editingEmployee}
            onClose={() => setEditingEmployee(null)}
          />
        )}
      </Suspense>
    </div>
  );
};

export default React.memo(EmployeeList);
