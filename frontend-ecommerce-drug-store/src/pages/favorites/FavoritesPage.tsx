import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { drugsApi } from "../../api/endpoints/drugs.api";
import type { Drug } from "../../api/types/drug.types";
import { useFavorites } from "../../context/FavoritesContext";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";
import { useLang } from "../../context/LangContext";
import { translations } from "../../i18n/translations";
import SafeArea from "../../components/ui/SafeArea";
import Navbar from "../../components/ui/Navbar";
import ProductCard from "../store/components/ProductCard";
import Background from "@/components/ui/Background";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [loading, setLoading] = useState(false);
  const { textColor, hintColor, secondaryBgColor } = useTelegramTheme();
  const { language } = useLang();
  const t = translations[language].favorites;

  useEffect(() => {
    if (favorites.length === 0) {
      setDrugs([]);
      return;
    }

    const loadFavoriteDrugs = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          favorites.map((id) => drugsApi.getById(id)),
        );
        setDrugs(results);
      } catch (error) {
        console.error("Failed to load favorite drugs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavoriteDrugs();
  }, [favorites]);

  return (
    <SafeArea className="min-h-screen relative flex flex-col">
      <div className="z-10 absolute inset-0 bg-black/55 h-full w-full" />
      <Background />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div
          className="px-4 py-4 border-b flex items-center gap-3"
          style={{ borderColor: `${hintColor}30` }}
        >
          <h1 className="text-xl font-bold" style={{ color: textColor }}>
            {t.title}
          </h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 pb-24">
          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-2 gap-2.5">
              {[1, 2, 3, 4].map((i) => (
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

          {/* Empty State */}
          {!loading && drugs.length === 0 && (
            <div className="text-center py-16">
              <Heart
                size={48}
                className="mx-auto mb-4"
                style={{ color: hintColor }}
              />
              <p className="font-medium" style={{ color: textColor }}>
                {t.empty}
              </p>
              <p className="text-sm mt-1" style={{ color: hintColor }}>
                {t.emptySubtitle}
              </p>
            </div>
          )}

          {/* Product Grid */}
          {!loading && drugs.length > 0 && (
            <div className="grid grid-cols-2 gap-2.5">
              {drugs.map((drug) => (
                <ProductCard key={drug.id} drug={drug} />
              ))}
            </div>
          )}
        </div>

        <Navbar />
      </div>
    </SafeArea>
  );
}
