import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { DrugType, Brand, DrugFilters } from "../../../api/types/drug.types";
import { useTelegramTheme } from "../../../hooks/useTelegramTheme";
import BottomSheet from "../../../components/ui/BottomSheet";
import Button from "../../../components/ui/Button";

interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
  types: DrugType[];
  brands: Brand[];
  currentFilters: DrugFilters;
  onApply: (filters: DrugFilters) => void;
}

export default function FilterSheet({
  open,
  onClose,
  types,
  brands,
  currentFilters,
  onApply,
}: FilterSheetProps) {
  const [selectedType, setSelectedType] = useState(currentFilters.typeId || 0);
  const [selectedBrand, setSelectedBrand] = useState(currentFilters.brandId || 0);
  const [sortBy, setSortBy] = useState(currentFilters.sortBy || "id");
  const [ascending, setAscending] = useState(currentFilters.ascending ?? true);
  const { textColor, hintColor, buttonColor, buttonTextColor, secondaryBgColor } =
    useTelegramTheme();

  // Reset local state when filters prop changes
  useEffect(() => {
    setSelectedType(currentFilters.typeId || 0);
    setSelectedBrand(currentFilters.brandId || 0);
    setSortBy(currentFilters.sortBy || "id");
    setAscending(currentFilters.ascending ?? true);
  }, [currentFilters, open]);

  const handleApply = () => {
    onApply({
      typeId: selectedType,
      brandId: selectedBrand,
      sortBy,
      ascending,
    });
  };

  const handleReset = () => {
    setSelectedType(0);
    setSelectedBrand(0);
    setSortBy("id");
    setAscending(true);
  };

  const hasActiveFilters =
    selectedType !== 0 || selectedBrand !== 0 || sortBy !== "id";

  return (
    <BottomSheet open={open} onClose={onClose} height="auto">
      <div className="p-5 pb-8 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold" style={{ color: textColor }}>
            Filters
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg transition-colors"
          >
            <X size={24} style={{ color: hintColor }} />
          </button>
        </div>

        {/* Type Filter */}
        {types.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3" style={{ color: hintColor }}>
              Type
            </h3>
            <div className="flex flex-wrap gap-2">
              <Chip
                label="All"
                selected={selectedType === 0}
                onClick={() => setSelectedType(0)}
                buttonColor={buttonColor}
                buttonTextColor={buttonTextColor}
                secondaryBgColor={secondaryBgColor}
                textColor={textColor}
              />
              {types.map((type) => (
                <Chip
                  key={type.id}
                  label={type.name}
                  selected={selectedType === type.id}
                  onClick={() => setSelectedType(type.id)}
                  buttonColor={buttonColor}
                  buttonTextColor={buttonTextColor}
                  secondaryBgColor={secondaryBgColor}
                  textColor={textColor}
                />
              ))}
            </div>
          </div>
        )}

        {/* Brand Filter */}
        {brands.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3" style={{ color: hintColor }}>
              Brand
            </h3>
            <div className="flex flex-wrap gap-2">
              <Chip
                label="All"
                selected={selectedBrand === 0}
                onClick={() => setSelectedBrand(0)}
                buttonColor={buttonColor}
                buttonTextColor={buttonTextColor}
                secondaryBgColor={secondaryBgColor}
                textColor={textColor}
              />
              {brands.map((brand) => (
                <Chip
                  key={brand.id}
                  label={brand.name}
                  selected={selectedBrand === brand.id}
                  onClick={() => setSelectedBrand(brand.id)}
                  buttonColor={buttonColor}
                  buttonTextColor={buttonTextColor}
                  secondaryBgColor={secondaryBgColor}
                  textColor={textColor}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sort Options */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-3" style={{ color: hintColor }}>
            Sort By
          </h3>
          <div className="flex flex-wrap gap-2">
            <Chip
              label="Default"
              selected={sortBy === "id"}
              onClick={() => {
                setSortBy("id");
                setAscending(true);
              }}
              buttonColor={buttonColor}
              buttonTextColor={buttonTextColor}
              secondaryBgColor={secondaryBgColor}
              textColor={textColor}
            />
            <Chip
              label="Name A-Z"
              selected={sortBy === "name" && ascending}
              onClick={() => {
                setSortBy("name");
                setAscending(true);
              }}
              buttonColor={buttonColor}
              buttonTextColor={buttonTextColor}
              secondaryBgColor={secondaryBgColor}
              textColor={textColor}
            />
            <Chip
              label="Name Z-A"
              selected={sortBy === "name" && !ascending}
              onClick={() => {
                setSortBy("name");
                setAscending(false);
              }}
              buttonColor={buttonColor}
              buttonTextColor={buttonTextColor}
              secondaryBgColor={secondaryBgColor}
              textColor={textColor}
            />
            <Chip
              label="Price: Low to High"
              selected={sortBy === "price" && ascending}
              onClick={() => {
                setSortBy("price");
                setAscending(true);
              }}
              buttonColor={buttonColor}
              buttonTextColor={buttonTextColor}
              secondaryBgColor={secondaryBgColor}
              textColor={textColor}
            />
            <Chip
              label="Price: High to Low"
              selected={sortBy === "price" && !ascending}
              onClick={() => {
                setSortBy("price");
                setAscending(false);
              }}
              buttonColor={buttonColor}
              buttonTextColor={buttonTextColor}
              secondaryBgColor={secondaryBgColor}
              textColor={textColor}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasActiveFilters}
            className="flex-1"
          >
            Reset
          </Button>
          <Button onClick={handleApply} className="flex-1">
            Apply Filters
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}

function Chip({
  label,
  selected,
  onClick,
  buttonColor,
  buttonTextColor,
  secondaryBgColor,
  textColor,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  buttonColor: string;
  buttonTextColor: string;
  secondaryBgColor: string;
  textColor: string;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-sm font-medium transition-all active:scale-95"
      style={{
        backgroundColor: selected ? buttonColor : secondaryBgColor,
        color: selected ? buttonTextColor : textColor,
      }}
    >
      {label}
    </button>
  );
}
