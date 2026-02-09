import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Drug } from "../api/types/drug.types";
import type { BasketItem, BasketDto } from "../api/types/basket.types";
import { basketApi } from "../api/endpoints/basket.api";
import { useAuth } from "./AuthContext";

interface BasketContextType {
  items: BasketItem[];
  basketCount: number;
  totalPrice: number;
  isOpen: boolean;
  isLoading: boolean;
  addToBasket: (drug: Drug) => void;
  removeFromBasket: (drugId: number) => void;
  updateQuantity: (drugId: number, quantity: number) => void;
  clearBasket: () => void;
  openBasket: () => void;
  closeBasket: () => void;
}

const BasketContext = createContext<BasketContextType | null>(null);

function applyResponse(
  res: BasketDto,
  setItems: React.Dispatch<React.SetStateAction<BasketItem[]>>,
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>,
) {
  setItems(
    res.items.map((item) => ({
      drug: item.drugDto,
      quantity: item.quantity,
    })),
  );
  setTotalPrice(res.totalPrice);
}

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Load basket from backend on login/mount
  useEffect(() => {
    const loadBasket = async () => {
      if (user?.basketId) {
        setIsLoading(true);
        try {
          const res = await basketApi.getBasket(user.basketId);
          applyResponse(res, setItems, setTotalPrice);
        } catch (error) {
          console.error("Failed to load basket:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadBasket();
  }, [user?.basketId]);

  const basketCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const addToBasket = useCallback(
    async (drug: Drug) => {
      // Optimistic update
      setItems((prev) => {
        const existing = prev.find((item) => item.drug.id === drug.id);
        if (existing) {
          return prev.map((item) =>
            item.drug.id === drug.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }
        return [...prev, { drug, quantity: 1 }];
      });

      if (user?.basketId) {
        try {
          const res = await basketApi.addItem(drug.id, user.basketId);
          applyResponse(res, setItems, setTotalPrice);
        } catch (error) {
          console.error("Failed to add to basket:", error);
          // Revert on failure
          setItems((prev) => {
            const existing = prev.find((item) => item.drug.id === drug.id);
            if (existing && existing.quantity === 1) {
              return prev.filter((item) => item.drug.id !== drug.id);
            }
            return prev.map((item) =>
              item.drug.id === drug.id
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            );
          });
        }
      }
    },
    [user?.basketId],
  );

  const removeFromBasket = useCallback(
    async (drugId: number) => {
      const itemsBackup = [...items];
      const priceBackup = totalPrice;

      // Optimistic update
      setItems((prev) => prev.filter((item) => item.drug.id !== drugId));

      if (user?.basketId) {
        try {
          const res = await basketApi.removeItem(user.basketId, drugId);
          applyResponse(res, setItems, setTotalPrice);
        } catch (error) {
          console.error("Failed to remove from basket:", error);
          setItems(itemsBackup);
          setTotalPrice(priceBackup);
        }
      }
    },
    [user?.basketId, items, totalPrice],
  );

  const updateQuantity = useCallback(
    async (drugId: number, quantity: number) => {
      const itemsBackup = [...items];
      const priceBackup = totalPrice;

      // Optimistic update
      if (quantity <= 0) {
        setItems((prev) => prev.filter((item) => item.drug.id !== drugId));
      } else {
        setItems((prev) =>
          prev.map((item) =>
            item.drug.id === drugId ? { ...item, quantity } : item,
          ),
        );
      }

      if (user?.basketId) {
        try {
          const res = await basketApi.updateQuantity(user.basketId, drugId, quantity);
          applyResponse(res, setItems, setTotalPrice);
        } catch (error) {
          console.error("Failed to update quantity:", error);
          setItems(itemsBackup);
          setTotalPrice(priceBackup);
        }
      }
    },
    [user?.basketId, items, totalPrice],
  );

  const clearBasket = useCallback(async () => {
    const itemsBackup = [...items];
    const priceBackup = totalPrice;

    // Optimistic update
    setItems([]);
    setTotalPrice(0);

    if (user?.basketId) {
      try {
        await basketApi.clearBasket(user.basketId);
      } catch (error) {
        console.error("Failed to clear basket:", error);
        setItems(itemsBackup);
        setTotalPrice(priceBackup);
      }
    }
  }, [user?.basketId, items, totalPrice]);

  const openBasket = useCallback(() => setIsOpen(true), []);
  const closeBasket = useCallback(() => setIsOpen(false), []);

  return (
    <BasketContext.Provider
      value={{
        items,
        basketCount,
        totalPrice,
        isOpen,
        isLoading,
        addToBasket,
        removeFromBasket,
        updateQuantity,
        clearBasket,
        openBasket,
        closeBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBasket() {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within BasketProvider");
  }
  return context;
}
