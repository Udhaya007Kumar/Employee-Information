

import DepartmentPieChart from '../Components/Charts/DepartmentPieChart';
import SalaryHistogram from '../Components/Charts/SalaryHistogram';
import AvgSalaryBarChart from '../Components/Charts/AvgSalaryBarChart';
import DashboardSummaryCards from '../Components/Charts/DashboardSummaryCards' 

const Dashboard = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        
        
        {/* Salary Distribution */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          {/* <h2 className="font-semibold text-gray-800 text-lg mb-4">Salary Distribution</h2> */}
          <SalaryHistogram />
        </div>

        {/* Employees by Department */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          {/* <h2 className="font-semibold text-gray-800 text-lg mb-4">Employees by Department</h2> */}
          <DepartmentPieChart />
        </div>

        {/* Average Salary */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          {/* <h2 className="font-semibold text-gray-800 text-lg mb-4">Average Salary by Department</h2> */}
          <AvgSalaryBarChart />
        </div>

      </div>

      <div className='p-6'>
        <DashboardSummaryCards />

      </div>
    </div>
  );
};

export default Dashboard;
