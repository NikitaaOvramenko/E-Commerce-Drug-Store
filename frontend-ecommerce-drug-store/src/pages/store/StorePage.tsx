import { useState, useEffect, useCallback } from "react";
import { LogOut, MoreVertical } from "lucide-react";

import { drugsApi } from "../../api/endpoints/drugs.api";
import type {
  Drug,
  DrugFilters,
  DrugType,
  Brand,
  Category,
  CountryOfOrigin,
} from "../../api/types/drug.types";
import { useBasket } from "../../context/BasketContext";
import { useAuth } from "../../context/AuthContext";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";
import SafeArea from "../../components/ui/SafeArea";
import SearchBar from "./components/SearchBar";
import FilterSheet from "./components/FilterSheet";
import ProductGrid from "./components/ProductGrid";
import BasketButton from "../../components/basket/BasketButton";
import Navbar from "@/components/ui/Navbar";
import { useLang } from "@/context/LangContext";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import Background from "@/components/ui/Background";

interface FlagType {
  lang: CountryOfOrigin;
  flag: string;
}

const flagsArr: FlagType[] = [
  { lang: "ENG", flag: getUnicodeFlagIcon("US") },
  { lang: "RUS", flag: getUnicodeFlagIcon("RU") },
  { lang: "UKR", flag: getUnicodeFlagIcon("UA") },
];

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
  const { language, changeLang } = useLang();
  const initialFlag = flagsArr.find((l) => l.lang === language);
  const [flag, setFlag] = useState<FlagType>(
    initialFlag ?? { lang: "ENG", flag: getUnicodeFlagIcon("US") },
  );
  const { basketCount } = useBasket();
  const { logout } = useAuth();

  const { secondaryBgColor, hintColor } = useTelegramTheme();

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
    <SafeArea className="min-h-screen flex flex-col" bottom={false}>
      <Background />
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div
          className="sticky top-0 z-20 backdrop-blur-sm border-b"
          style={{
            backgroundColor: `${secondaryBgColor}`,
            borderColor: `${hintColor}30`,
          }}
        >
          <div className="px-3 py-3 flex items-center gap-2 ">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onFilterClick={() => setShowFilters(true)}
            />
            <BasketButton count={basketCount} />
            {/* More menu: language + logout */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="p-2.5 rounded-xl flex-shrink-0"
                  style={{ backgroundColor: secondaryBgColor }}
                >
                  <MoreVertical size={20} style={{ color: hintColor }} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-xs opacity-60">
                  Language
                </DropdownMenuLabel>
                <DropdownMenuRadioGroup value={flag.lang}>
                  {flagsArr.map((f, key) => (
                    <DropdownMenuRadioItem
                      key={key}
                      onClick={() => {
                        setFlag({ lang: f.lang, flag: f.flag });
                        changeLang(f.lang);
                      }}
                      value={f.lang}
                    >
                      {f.flag} {f.lang}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-400 focus:text-red-400"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/*  */}
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

        <Navbar></Navbar>
      </div>
    </SafeArea>
  );
}
