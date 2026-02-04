import { ShoppingCart } from 'lucide-react';
import { useBasket } from '../../context/BasketContext';

interface BasketButtonProps {
  count: number;
}

export default function BasketButton({ count }: BasketButtonProps) {
  const { openBasket } = useBasket();

  return (
    <button
      onClick={openBasket}
      className="relative p-2.5 bg-gray-900 rounded-xl hover:bg-gray-800 active:bg-gray-700 transition-colors flex-shrink-0"
      aria-label={`Open basket with ${count} items`}
    >
      <ShoppingCart size={20} className="text-white" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-green-500 text-black text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}
