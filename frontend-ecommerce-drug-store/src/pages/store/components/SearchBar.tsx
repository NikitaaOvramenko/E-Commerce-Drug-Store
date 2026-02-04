import { Search, SlidersHorizontal } from "lucide-react";
import { useTelegramTheme } from "../../../hooks/useTelegramTheme";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterClick: () => void;
}

export default function SearchBar({ value, onChange, onFilterClick }: SearchBarProps) {
  const { secondaryBgColor, textColor, hintColor } = useTelegramTheme();

  return (
    <div className="flex items-center gap-2 flex-1">
      {/* Search Input */}
      <div
        className="flex-1 flex items-center gap-2 rounded-xl px-3 py-2.5"
        style={{ backgroundColor: secondaryBgColor }}
      >
        <Search size={18} className="flex-shrink-0" style={{ color: hintColor }} />
        <input
          type="text"
          placeholder="Search products..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm min-w-0"
          style={{ color: textColor }}
        />
      </div>

      {/* Filter Button */}
      <button
        onClick={onFilterClick}
        className="p-2.5 rounded-xl transition-colors flex-shrink-0"
        style={{ backgroundColor: secondaryBgColor }}
        aria-label="Open filters"
      >
        <SlidersHorizontal size={20} style={{ color: hintColor }} />
      </button>
    </div>
  );
}
