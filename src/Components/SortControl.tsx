
type SortOption = {
  label: string;
  value: string;
};

type Props = {
  selectedSort: string;
  setSelectedSort: (value: string) => void;
  sortOptions: SortOption[];
};

const SortControl: React.FC<Props> = ({
  selectedSort,
  setSelectedSort,
  sortOptions,
}) => {
  return (
    <div className="mb-4 flex items-center gap-3">
      <label
        className="text-gray-700 text-base font-semibold"
        htmlFor="sort-select"
      >
        Sort By:
      </label>
      <select
        id="sort-select"
        value={selectedSort}
        onChange={(e) => setSelectedSort(e.target.value)}
        className="
          border border-gray-300 rounded-md
          px-4 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-400
          transition
          bg-white text-gray-800
          shadow-sm
        "
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};


export default SortControl;
