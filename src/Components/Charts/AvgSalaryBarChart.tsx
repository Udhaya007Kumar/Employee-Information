import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { employees } from "../../Data/mockEmployees";

export default function AvgSalaryBarChart() {
  // 🔢 Calculate department-wise average salary
  const deptSalaryMap = new Map();

  employees.forEach(emp => {
    const dept = emp.department.name;
    if (!deptSalaryMap.has(dept)) {
      deptSalaryMap.set(dept, { total: 0, count: 0 });
    }
    const entry = deptSalaryMap.get(dept);
    entry.total += emp.salary;
    entry.count += 1;
  });

  const avgSalaryByDept = Array.from(deptSalaryMap.entries()).map(
    ([department, { total, count }]) => ({
      department,
      avgSalary: Math.round(total / count),
    })
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full h-[350px]">
      <h2 className="text-lg font-semibold mb-2 hover:text-blue-600">Average Salary by Department</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={avgSalaryByDept}>
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="avgSalary" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
