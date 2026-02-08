import { useState, useEffect, useCallback } from "react";
import { LogOut } from "lucide-react";
import { drugsApi } from "../../api/endpoints/drugs.api";
import type {
  Drug,
  DrugFilters,
  DrugType,
  Brand,
  Category,
} from "../../api/types/drug.types";
import { useBasket } from "../../context/BasketContext";
import { useAuth } from "../../context/AuthContext";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";
import SafeArea from "../../components/ui/SafeArea";
import SearchBar from "./components/SearchBar";
import FilterSheet from "./components/FilterSheet";
import ProductGrid from "./components/ProductGrid";
import BasketButton from "../../components/basket/BasketButton";

export default function StorePage() {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [types, setTypes] = useState<DrugType[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState<DrugFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { basketCount } = useBasket();
  const { logout } = useAuth();
  const { bgColor, secondaryBgColor, hintColor } = useTelegramTheme();

  const hasMore = page < totalPages - 1;

  // Load filter options
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [typesData, brandsData, categoriesData] = await Promise.all([
          drugsApi.getTypes(),
          drugsApi.getBrands(),
          drugsApi.getCategories(),
        ]);
        setTypes(typesData);
        setBrands(brandsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load filters:", error);
      }
    };
    loadFilters();
  }, []);

  // Load drugs
  const loadDrugs = useCallback(
    async (pageNum: number, reset: boolean = false) => {
      setLoading(true);
      try {
        const data = await drugsApi.getAll({
          ...filters,
          page: pageNum,
          size: 12,
        });

        if (reset) {
          setDrugs(data.content);
        } else {
          setDrugs((prev) => [...prev, ...data.content]);
        }

        setTotalPages(data.totalPages);
        setPage(data.number);
      } catch (error) {
        console.error("Failed to load drugs:", error);
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  // Initial load and filter change
  useEffect(() => {
    loadDrugs(0, true);
  }, [loadDrugs]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadDrugs(page + 1, false);
    }
  };

  const handleFilterChange = (newFilters: DrugFilters) => {
    setFilters(newFilters);
    setShowFilters(false);
  };

  // Filter drugs by search query (client-side)
  const filteredDrugs = searchQuery
    ? drugs.filter((d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : drugs;

  return (
    <SafeArea
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: bgColor }}
      bottom={false}
    >
      {/* Top Bar */}
      <div
        className="sticky top-0 z-20 backdrop-blur-sm border-b border-gray-800/50"
        style={{ backgroundColor: `${secondaryBgColor}ee` }}
      >
        <div className="px-3 py-3 flex items-center gap-2">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onFilterClick={() => setShowFilters(true)}
          />
          <BasketButton count={basketCount} />
          <button
            onClick={logout}
            className="p-2.5 rounded-xl"
            style={{ backgroundColor: secondaryBgColor }}
            title="Logout"
          >
            <LogOut size={20} style={{ color: "#ef4444" }} />
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-y-auto pb-safe">
        <ProductGrid
          drugs={filteredDrugs}
          loading={loading}
          hasMore={hasMore && !searchQuery}
          onLoadMore={handleLoadMore}
          hintColor={hintColor}
          secondaryBgColor={secondaryBgColor}
        />
      </div>

      {/* Filter Bottom Sheet */}
      <FilterSheet
        open={showFilters}
        onClose={() => setShowFilters(false)}
        types={types}
        brands={brands}
        categories={categories}
        currentFilters={filters}
        onApply={handleFilterChange}
      />
    </SafeArea>
  );
}
