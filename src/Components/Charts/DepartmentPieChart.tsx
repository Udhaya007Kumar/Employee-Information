import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { employees } from "../../Data/mockEmployees";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

interface DepartmentData {
  name: string;
  value: number;
}

const DepartmentPieChart: React.FC = () => {
  const departmentCountMap = new Map<string, number>();

  employees.forEach(emp => {
    const deptName = emp.department.name;
    departmentCountMap.set(deptName, (departmentCountMap.get(deptName) || 0) + 1);
  });

  const departmentData: DepartmentData[] = Array.from(departmentCountMap.entries()).map(
    ([name, value]) => ({ name, value })
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2 hover:text-blue-600">Employees by Department</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={departmentData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
          dataKey="value"
        >
          {departmentData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default DepartmentPieChart;
