type SummaryCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: string;
  changeColor?: string;
};

const SummaryCard = ({
  icon,
  label,
  value,
  change,
  changeColor = "text-gray-500",
}: SummaryCardProps) => {
  return (
    <div className="flex flex-col items-start bg-white p-5 rounded-lg shadow min-w-[180px]">
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-gray-500">{label}</div>
      {change && (
        <div className={`mt-1 text-sm font-semibold ${changeColor}`}>
          {change}
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
