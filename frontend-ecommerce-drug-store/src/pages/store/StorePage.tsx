import { useState, useEffect, useCallback } from 'react';
import { drugsApi } from '../../api/endpoints/drugs.api';
import type { Drug, DrugFilters, DrugType, Brand } from '../../api/types/drug.types';
import { useTelegram } from '../../context/TelegramContext';
import { useBasket } from '../../context/BasketContext';
import SafeArea from '../../components/ui/SafeArea';
import SearchBar from './components/SearchBar';
import FilterSheet from './components/FilterSheet';
import ProductGrid from './components/ProductGrid';
import BasketButton from '../../components/basket/BasketButton';

export default function StorePage() {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [types, setTypes] = useState<DrugType[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState<DrugFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { hapticFeedback } = useTelegram();
  const { basketCount } = useBasket();

  const hasMore = page < totalPages - 1;

  // Load filter options
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [typesData, brandsData] = await Promise.all([
          drugsApi.getTypes(),
          drugsApi.getBrands(),
        ]);
        setTypes(typesData);
        setBrands(brandsData);
      } catch (error) {
        console.error('Failed to load filters:', error);
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
        console.error('Failed to load drugs:', error);
      } finally {
        setLoading(false);
      }
    },
    [filters]
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
    hapticFeedback('selection');
    setFilters(newFilters);
    setShowFilters(false);
  };

  // Filter drugs by search query (client-side)
  const filteredDrugs = searchQuery
    ? drugs.filter((d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : drugs;

  return (
    <SafeArea className="min-h-screen bg-black flex flex-col" bottom={false}>
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm border-b border-gray-800/50">
        <div className="px-3 py-3 flex items-center gap-2">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onFilterClick={() => setShowFilters(true)}
          />
          <BasketButton count={basketCount} />
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-y-auto pb-safe">
        <ProductGrid
          drugs={filteredDrugs}
          loading={loading}
          hasMore={hasMore && !searchQuery}
          onLoadMore={handleLoadMore}
        />
      </div>

      {/* Filter Bottom Sheet */}
      <FilterSheet
        open={showFilters}
        onClose={() => setShowFilters(false)}
        types={types}
        brands={brands}
        currentFilters={filters}
        onApply={handleFilterChange}
      />
    </SafeArea>
  );
}
