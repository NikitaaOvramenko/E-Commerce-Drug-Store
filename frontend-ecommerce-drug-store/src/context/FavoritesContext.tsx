import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

interface FavoritesContextType {
  favorites: number[];
  isFavorite: (drugId: number) => boolean;
  toggleFavorite: (drugId: number) => void;
  addFavorite: (drugId: number) => void;
  removeFavorite: (drugId: number) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const STORAGE_KEY = "favorite_drugs";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFavorites(JSON.parse(saved));
      } catch {
        // Invalid data
      }
    }
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback(
    (drugId: number) => {
      return favorites.includes(drugId);
    },
    [favorites],
  );

  const toggleFavorite = useCallback((drugId: number) => {
    setFavorites((prev) => {
      if (prev.includes(drugId)) {
        return prev.filter((id) => id !== drugId);
      }
      return [...prev, drugId];
    });
  }, []);

  const addFavorite = useCallback((drugId: number) => {
    setFavorites((prev) => {
      if (prev.includes(drugId)) return prev;
      return [...prev, drugId];
    });
  }, []);

  const removeFavorite = useCallback((drugId: number) => {
    setFavorites((prev) => prev.filter((id) => id !== drugId));
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        addFavorite,
        removeFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}
