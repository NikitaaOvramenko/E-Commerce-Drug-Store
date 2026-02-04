import { Search, SlidersHorizontal } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterClick: () => void;
}

export default function SearchBar({ value, onChange, onFilterClick }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 flex-1">
      {/* Search Input */}
      <div className="flex-1 flex items-center gap-2 bg-gray-900 rounded-xl px-3 py-2.5">
        <Search size={18} className="text-gray-500 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search products..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm min-w-0"
        />
      </div>

      {/* Filter Button */}
      <button
        onClick={onFilterClick}
        className="p-2.5 bg-gray-900 rounded-xl hover:bg-gray-800 active:bg-gray-700 transition-colors flex-shrink-0"
        aria-label="Open filters"
      >
        <SlidersHorizontal size={20} className="text-gray-400" />
      </button>
    </div>
  );
}
