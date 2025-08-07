import SummaryCard from "../SummaryCard";
import { Users, Briefcase, UserCheck, UserX } from "lucide-react";
import { employees } from "../../Data/mockEmployees";

export default function DashboardSummaryCards() {
  const totalEmployees = employees.length;
  const totalSalary = employees.reduce((acc, emp) => acc + emp.salary, 0);
  const avgSalary = Math.round(totalSalary / totalEmployees);
  const activeCount = employees.filter(emp => emp.isActive).length;
  const inactiveCount = totalEmployees - activeCount;

  return (
    <div className="mb-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4 hover:text-blue-600">
        Employee Summary
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          icon={<Users className="text-indigo-500 w-6 h-6" />}
          label="Total Employees"
          value={totalEmployees}
          change="+2 since last week"
          changeColor="text-green-500"
        />
        <SummaryCard
          icon={<Briefcase className="text-green-500 w-6 h-6" />}
          label="Average Salary"
          value={`₹${avgSalary.toLocaleString()}`}
          change="+5% compared to last month"
          changeColor="text-green-500"
        />
        <SummaryCard
          icon={<UserCheck className="text-blue-500 w-6 h-6" />}
          label="Active Employees"
          value={activeCount}
        />
        <SummaryCard
          icon={<UserX className="text-red-500 w-6 h-6" />}
          label="Inactive Employees"
          value={inactiveCount}
        />
      </div>
    </div>
  );
}
