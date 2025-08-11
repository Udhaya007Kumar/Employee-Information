import React, { Suspense } from 'react';

// 🔹 Lazy load charts to reduce initial bundle size
const DepartmentPieChart = React.lazy(() => import('../Components/Charts/DepartmentPieChart'));
const SalaryHistogram = React.lazy(() => import('../Components/Charts/SalaryHistogram'));
const AvgSalaryBarChart = React.lazy(() => import('../Components/Charts/AvgSalaryBarChart'));
const DashboardSummaryCards = React.lazy(() => import('../Components/Charts/DashboardSummaryCards'));

const Dashboard: React.FC = () => {
  return (
    <div className="p-4">
      {/* Chart Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        
        <Suspense fallback={<div className="bg-white p-4 rounded-xl shadow-md">Loading Salary Chart...</div>}>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <SalaryHistogram />
          </div>
        </Suspense>

        <Suspense fallback={<div className="bg-white p-4 rounded-xl shadow-md">Loading Department Chart...</div>}>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <DepartmentPieChart />
          </div>
        </Suspense>

        <Suspense fallback={<div className="bg-white p-4 rounded-xl shadow-md">Loading Avg Salary Chart...</div>}>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <AvgSalaryBarChart />
          </div>
        </Suspense>

      </div>

      {/* Summary Cards */}
      <div className='p-6'>
        <Suspense fallback={<div>Loading Summary Cards...</div>}>
          <DashboardSummaryCards />
        </Suspense>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
