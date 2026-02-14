import { Heart, Star } from "lucide-react";
import type { Drug } from "../../../api/types/drug.types";
import { useBasket } from "../../../context/BasketContext";
import { useFavorites } from "../../../context/FavoritesContext";
import { useTelegramTheme } from "../../../hooks/useTelegramTheme";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useLang } from "@/context/LangContext";

interface ProductCardProps {
  drug: Drug;
}

export default function ProductCard({ drug }: ProductCardProps) {
  const { addToBasket } = useBasket();
  const { language, findByLang } = useLang();
  const { isFavorite, toggleFavorite } = useFavorites();
  const {
    buttonColor,
    buttonTextColor,
    hintColor,
    linkColor,
    textColor,
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
      style={{ backgroundColor: `${secondaryBgColor}50` }}
      className={`overflow-hidden gap-0 p-0 group   backdrop-blur-xl relative`}
    >
      {/* Favorite */}
      <button
        onClick={handleFavorite}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full backdrop-blur-sm transition-transform active:scale-90"
      >
        <Heart
          size={14}
          className={favorite ? "text-red-500 fill-red-500" : ""}
          style={{ color: favorite ? undefined : hintColor }}
        />
      </button>

      {/* Image */}
      <div
        className="aspect-square  p-2 overflow-hidden"
        // style={{ backgroundColor: `${hintColor}15` }}
      >
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
          <span className="text-xs" style={{ color: hintColor }}>
            4.5
          </span>
        </div>

        {/* Name */}
        <h3
          className="text-xs font-medium line-clamp-2 leading-tight min-h-8"
          style={{ color: textColor }}
        >
          {findByLang(language, drug.drugInfoDto)?.title}
        </h3>

        {findByLang(language, drug.drugInfoDto)?.sm_description && (
          <p
            className="text-[10px] overflow-x-auto whitespace-nowrap text-clip "
            style={{ color: hintColor }}
          >
            {findByLang(language, drug.drugInfoDto)?.sm_description}
          </p>
        )}
        {/* Brand */}
        {drug.brandName && (
          <p className="text-[10px] truncate" style={{ color: hintColor }}>
            {drug.brandName}
          </p>
        )}
        {drug.typeName && (
          <p className="text-[10px] truncate" style={{ color: hintColor }}>
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
