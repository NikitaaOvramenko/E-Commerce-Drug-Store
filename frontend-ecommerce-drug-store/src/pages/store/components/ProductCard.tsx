import { Heart, Star } from "lucide-react";
import type { Drug } from "../../../api/types/drug.types";
import { useBasket } from "../../../context/BasketContext";
import { useFavorites } from "../../../context/FavoritesContext";
import { useTelegramTheme } from "../../../hooks/useTelegramTheme";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  drug: Drug;
}

export default function ProductCard({ drug }: ProductCardProps) {
  const { addToBasket } = useBasket();
  const { isFavorite, toggleFavorite } = useFavorites();
  const {
    buttonColor,
    buttonTextColor,
    hintColor,
    linkColor,
    secondaryBgColor,
  } = useTelegramTheme();

  const handleAdd = () => {
    addToBasket(drug);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(drug.id);
  };

  const favorite = isFavorite(drug.id);

  return (
    <Card
      style={{ backgroundColor: secondaryBgColor }}
      className="overflow-hidden gap-0 p-0 group relative"
    >
      {/* Favorite */}
      <button
        onClick={handleFavorite}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/50 backdrop-blur-sm transition-transform active:scale-90"
      >
        <Heart
          size={14}
          className={favorite ? "text-red-500 fill-red-500" : ""}
          style={{ color: favorite ? undefined : hintColor }}
        />
      </button>

      {/* Image */}
      <div className="aspect-square bg-muted/50 p-2 overflow-hidden">
        <img
          src={drug.img || "/placeholder-drug.png"}
          alt={drug.name}
          className="w-full h-full object-contain transition-transform group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-drug.png";
          }}
        />
      </div>

      {/* Details */}
      <CardContent className="p-2.5 space-y-1.5">
        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-muted-foreground">4.5</span>
        </div>

        {/* Name */}
        <h3 className="text-xs font-medium line-clamp-2 leading-tight min-h-8">
          {drug.name}
        </h3>

        {/* Brand */}
        {drug.brandName && (
          <p className="text-[10px] text-muted-foreground truncate">
            {drug.brandName}
          </p>
        )}
        {drug.typeName && (
          <p className="text-[10px] text-muted-foreground truncate">
            {drug.typeName}
          </p>
        )}
      </CardContent>

      {/* Price & Add */}
      <CardFooter className="px-2.5 pb-2.5 pt-0 flex justify-between items-center">
        <span className="font-bold text-sm" style={{ color: linkColor }}>
          ${(drug.price / 100).toFixed(2)}
        </span>
        <Button
          onClick={handleAdd}
          size="sm"
          className="h-7 px-2.5 text-xs rounded-lg active:scale-95"
          style={{ backgroundColor: buttonColor, color: buttonTextColor }}
        >
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
