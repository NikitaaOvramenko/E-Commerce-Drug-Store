import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type {
  DrugType,
  Brand,
  Category,
  DrugFilters,
} from "../../../api/types/drug.types";
import { useTelegramTheme } from "../../../hooks/useTelegramTheme";
import { useLang } from "../../../context/LangContext";
import { translations } from "../../../i18n/translations";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../../../components/ui/drawer";
import { Button } from "../../../components/ui/Button";

interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
  types: DrugType[];
  brands: Brand[];
  categories: Category[];
  currentFilters: DrugFilters;
  onApply: (filters: DrugFilters) => void;
}

export default function FilterSheet({
  open,
  onClose,
  types,
  brands,
  categories,
  currentFilters,
  onApply,
}: FilterSheetProps) {
  const [selectedType, setSelectedType] = useState(currentFilters.typeId || 0);
  const [selectedBrand, setSelectedBrand] = useState(
    currentFilters.brandId || 0,
  );
  const [selectedCategory, setSelectedCategory] = useState(
    currentFilters.categoryId || 0,
  );
  const [sortBy, setSortBy] = useState(currentFilters.sortBy || "id");
  const [ascending, setAscending] = useState(currentFilters.ascending ?? true);
  const {
    textColor,
    hintColor,
    buttonColor,
    buttonTextColor,
    secondaryBgColor,
  } = useTelegramTheme();
  const { language } = useLang();
  const t = translations[language].filters;

  // Reset local state when filters prop changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedType(currentFilters.typeId || 0);
    setSelectedBrand(currentFilters.brandId || 0);
    setSelectedCategory(currentFilters.categoryId || 0);
    setSortBy(currentFilters.sortBy || "id");
    setAscending(currentFilters.ascending ?? true);
  }, [currentFilters, open]);

  const handleApply = () => {
    onApply({
      typeId: selectedType,
      brandId: selectedBrand,
      categoryId: selectedCategory,
      sortBy,
      ascending,
    });
  };

  const handleReset = () => {
    setSelectedType(0);
    setSelectedBrand(0);
    setSelectedCategory(0);
    setSortBy("id");
    setAscending(true);
  };

  const hasActiveFilters =
    selectedType !== 0 ||
    selectedBrand !== 0 ||
    selectedCategory !== 0 ||
    sortBy !== "id";

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="flex-row items-center justify-between text-left pb-2">
          <DrawerTitle style={{ color: textColor }}>{t.title}</DrawerTitle>
          <button onClick={onClose} className="p-1 rounded-lg">
            <X size={24} style={{ color: hintColor }} />
          </button>
        </DrawerHeader>
        <div className="px-5 pb-8 overflow-y-auto">

        {/* Type Filter */}
        {types.length > 0 && (
          <div className="mb-6">
            <h3
              className="text-sm font-medium mb-3"
              style={{ color: hintColor }}
            >
              {t.type}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Chip
                label={t.all}
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
            <h3
              className="text-sm font-medium mb-3"
              style={{ color: hintColor }}
            >
              {t.brand}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Chip
                label={t.all}
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

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-6">
            <h3
              className="text-sm font-medium mb-3"
              style={{ color: hintColor }}
            >
              {t.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Chip
                label={t.all}
                selected={selectedCategory === 0}
                onClick={() => setSelectedCategory(0)}
                buttonColor={buttonColor}
                buttonTextColor={buttonTextColor}
                secondaryBgColor={secondaryBgColor}
                textColor={textColor}
              />
              {categories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.name}
                  selected={selectedCategory === category.id}
                  onClick={() => setSelectedCategory(category.id)}
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
            {t.sortBy}
          </h3>
          <div className="flex flex-wrap gap-2">
            <Chip
              label={t.default}
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
              label={t.nameAZ}
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
              label={t.nameZA}
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
              label={t.priceLow}
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
              label={t.priceHigh}
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
            {t.reset}
          </Button>
          <Button onClick={handleApply} className="flex-1">
            {t.apply}
          </Button>
        </div>
        </div>
      </DrawerContent>
    </Drawer>
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
