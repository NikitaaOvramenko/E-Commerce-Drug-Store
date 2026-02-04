import { ShoppingCart } from "lucide-react";
import { useBasket } from "../../context/BasketContext";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";

interface BasketButtonProps {
  count: number;
}

export default function BasketButton({ count }: BasketButtonProps) {
  const { openBasket } = useBasket();
  const { secondaryBgColor, textColor, buttonColor, buttonTextColor } = useTelegramTheme();

  return (
    <button
      onClick={openBasket}
      className="relative p-2.5 rounded-xl transition-colors flex-shrink-0"
      style={{ backgroundColor: secondaryBgColor }}
      aria-label={`Open basket with ${count} items`}
    >
      <ShoppingCart size={20} style={{ color: textColor }} />
      {count > 0 && (
        <span
          className="absolute -top-1 -right-1 text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1"
          style={{ backgroundColor: buttonColor, color: buttonTextColor }}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
