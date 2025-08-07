import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { employees } from "../../Data/mockEmployees";

interface SalaryBin {
  range: string;
  min: number;
  max: number;
  count: number;
}

export default function SalaryHistogram() {
  const bins: SalaryBin[] = [
    { range: "0-10K", min: 0, max: 9999, count: 0 },
    { range: "10K-50K", min: 10000, max: 50000, count: 0 },
    { range: "50K-70K", min: 50001, max: 70000, count: 0 },
    { range: "70K-90K", min: 70001, max: 90000, count: 0 },
    { range: "90K+", min: 90001, max: Infinity, count: 0 },
  ];

  // Bin salary data
  employees.forEach((emp) => {
    const salary = Number(emp.salary);
    const bin = bins.find((b) => salary >= b.min && salary <= b.max);
    if (bin) bin.count += 1;
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2 hover:text-blue-600">Salary Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={bins}>
          <XAxis dataKey="range" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
