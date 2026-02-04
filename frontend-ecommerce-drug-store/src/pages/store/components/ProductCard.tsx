import { Heart, Star } from 'lucide-react';
import type { Drug } from '../../../api/types/drug.types';
import { useBasket } from '../../../context/BasketContext';
import { useFavorites } from '../../../context/FavoritesContext';
import { useTelegram } from '../../../context/TelegramContext';

interface ProductCardProps {
  drug: Drug;
}

export default function ProductCard({ drug }: ProductCardProps) {
  const { addToBasket } = useBasket();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { hapticFeedback } = useTelegram();

  const handleAdd = () => {
    hapticFeedback('impact');
    addToBasket(drug);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    hapticFeedback('selection');
    toggleFavorite(drug.id);
  };

  const favorite = isFavorite(drug.id);

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden relative group">
      {/* Favorite Button */}
      <button
        onClick={handleFavorite}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/50 backdrop-blur-sm transition-transform active:scale-90"
      >
        <Heart
          size={16}
          className={favorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}
        />
      </button>

      {/* Image */}
      <div className="aspect-square bg-gray-800 p-2 overflow-hidden">
        <img
          src={drug.img || '/placeholder-drug.png'}
          alt={drug.name}
          className="w-full h-full object-contain transition-transform group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-drug.png';
          }}
        />
      </div>

      {/* Details */}
      <div className="p-2.5 space-y-1.5">
        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-gray-400">4.5</span>
        </div>

        {/* Name */}
        <h3 className="text-xs text-white font-medium line-clamp-2 leading-tight min-h-[2rem]">
          {drug.name}
        </h3>

        {/* Price & Add Button */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-green-500 font-bold text-sm">${drug.price.toFixed(2)}</span>
          <button
            onClick={handleAdd}
            className="bg-green-500 hover:bg-green-400 active:bg-green-600 text-black font-semibold px-2.5 py-1 rounded-lg text-xs transition-colors active:scale-95"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
