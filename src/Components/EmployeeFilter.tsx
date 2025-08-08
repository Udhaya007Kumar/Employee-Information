

type Props = {
  departmentFilter: string;
  setDepartmentFilter: (value: string) => void;
  experienceFilter: string;
  setExperienceFilter: (value: string) => void;
  departmentOptions: string[];
  experienceBuckets: { label: string; value: string }[];
};

const EmployeeFilter: React.FC<Props> = ({
  departmentFilter,
  setDepartmentFilter,
  experienceFilter,
  setExperienceFilter,
  departmentOptions,
  experienceBuckets,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
      {/* Department Filter */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <label className="font-semibold text-gray-700 min-w-[96px]">Department</label>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
        >
          <option value="">All</option>
          {departmentOptions.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Experience Filter */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <label className="font-semibold text-gray-700 min-w-[96px]">Experience</label>
        <select
          value={experienceFilter}
          onChange={(e) => setExperienceFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
        >
          {experienceBuckets.map((bucket) => (
            <option key={bucket.value} value={bucket.value}>
              {bucket.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};


export default EmployeeFilter;
