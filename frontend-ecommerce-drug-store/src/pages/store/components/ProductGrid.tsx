import { useRef, useEffect } from 'react';
import type { Drug } from '../../../api/types/drug.types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  drugs: Drug[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export default function ProductGrid({ drugs, loading, hasMore, onLoadMore }: ProductGridProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Infinite scroll with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
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
        <p className="text-gray-400 text-sm mb-3">
          {drugs.length} Products Found
        </p>
      )}

      {/* 3-Column Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        {drugs.map((drug) => (
          <ProductCard key={drug.id} drug={drug} />
        ))}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-3 gap-2.5 mt-2.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-900 rounded-2xl animate-pulse">
              <div className="aspect-square bg-gray-800 rounded-t-2xl" />
              <div className="p-2.5 space-y-2">
                <div className="h-3 bg-gray-800 rounded w-10" />
                <div className="h-8 bg-gray-800 rounded" />
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-800 rounded w-12" />
                  <div className="h-6 bg-gray-800 rounded w-10" />
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
        <p className="text-center text-gray-600 py-6 text-sm">No more products</p>
      )}

      {/* Empty State */}
      {!loading && drugs.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-gray-400 text-lg">No products found</p>
          <p className="text-gray-600 text-sm mt-1">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
