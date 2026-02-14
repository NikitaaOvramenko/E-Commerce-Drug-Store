import { useRef, useEffect } from "react";
import type { Drug } from "../../../api/types/drug.types";
import { useLang } from "../../../context/LangContext";
import { translations } from "../../../i18n/translations";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  drugs: Drug[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  hintColor?: string;
  secondaryBgColor?: string;
}

export default function ProductGrid({
  drugs,
  loading,
  hasMore,
  onLoadMore,
  hintColor = "#6b7280",
  secondaryBgColor = "#1a1a1a",
}: ProductGridProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { language } = useLang();
  const t = translations[language].store;

  // Infinite scroll with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore]);

  return (
    <div className="p-3">
      {/* Product Count */}
      {drugs.length > 0 && (
        <p className="text-sm mb-3" style={{ color: hintColor }}>
          {drugs.length} {t.productsFound}
        </p>
      )}

      {/* 3-Column Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
        {drugs.map((drug) => (
          <ProductCard key={drug.id} drug={drug} />
        ))}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-3 gap-2.5 mt-2.5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl animate-pulse"
              style={{ backgroundColor: secondaryBgColor }}
            >
              <div
                className="aspect-square rounded-t-2xl"
                style={{ backgroundColor: `${hintColor}20` }}
              />
              <div className="p-2.5 space-y-2">
                <div
                  className="h-3 rounded w-10"
                  style={{ backgroundColor: `${hintColor}20` }}
                />
                <div
                  className="h-8 rounded"
                  style={{ backgroundColor: `${hintColor}20` }}
                />
                <div className="flex justify-between items-center">
                  <div
                    className="h-4 rounded w-12"
                    style={{ backgroundColor: `${hintColor}20` }}
                  />
                  <div
                    className="h-6 rounded w-10"
                    style={{ backgroundColor: `${hintColor}20` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Trigger */}
      <div ref={loadMoreRef} className="h-4" />

      {/* End of List */}
      {!hasMore && drugs.length > 0 && (
        <p className="text-center py-6 text-sm" style={{ color: hintColor }}>
          {t.noMoreProducts}
        </p>
      )}

      {/* Empty State */}
      {!loading && drugs.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-lg" style={{ color: hintColor }}>
            {t.noProductsFound}
          </p>
          <p
            className="text-sm mt-1"
            style={{ color: hintColor, opacity: 0.7 }}
          >
            {t.adjustFilters}
          </p>
        </div>
      )}
    </div>
  );
}
