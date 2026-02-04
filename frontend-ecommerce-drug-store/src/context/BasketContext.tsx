import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Drug } from "../api/types/drug.types";
import type { BasketItem } from "../api/types/basket.types";
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

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Load basket from backend on login/mount
  useEffect(() => {
    const loadBasket = async () => {
      if (user?.basketId) {
        setIsLoading(true);
        try {
          const basketItems = await basketApi.getBasket(user.basketId);
          setItems(
            basketItems.map((item) => ({
              drug: item.drugDto,
              quantity: item.quantity,
            })),
          );
        } catch (error) {
          console.error("Failed to load basket:", error);
          // Fallback to localStorage if API fails
          const savedBasket = localStorage.getItem("basket_items");
          if (savedBasket) {
            try {
              setItems(JSON.parse(savedBasket));
            } catch {
              // Invalid data
            }
          }
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadBasket();
  }, [user?.basketId]);

  // Save to localStorage as backup when items change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("basket_items", JSON.stringify(items));
    }
  }, [items]);

  const basketCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.drug.price * item.quantity,
    0,
  );

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
        console.log("drug added to basket !")
        return [...prev, { drug, quantity: 1 }];
      });

      // Sync with backend
      if (user?.basketId) {
        try {
          await basketApi.addItem(drug.id, user.basketId);
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
      const itemToRemove = items.find((item) => item.drug.id === drugId);

      // Optimistic update
      setItems((prev) => prev.filter((item) => item.drug.id !== drugId));

      // Sync with backend
      if (user?.basketId) {
        try {
          await basketApi.removeItem(user.basketId, drugId);
        } catch (error) {
          console.error("Failed to remove from basket:", error);
          // Revert on failure
          if (itemToRemove) {
            setItems((prev) => [...prev, itemToRemove]);
          }
        }
      }
    },
    [user?.basketId, items],
  );

  const updateQuantity = useCallback(
    async (drugId: number, quantity: number) => {
      const itemToUpdate = items.find((item) => item.drug.id === drugId);
      const oldQuantity = itemToUpdate?.quantity || 0;

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

      // Sync with backend
      if (user?.basketId) {
        try {
          await basketApi.updateQuantity(user.basketId, drugId, quantity);
        } catch (error) {
          console.error("Failed to update quantity:", error);
          // Revert on failure
          if (itemToUpdate) {
            if (quantity <= 0) {
              setItems((prev) => [...prev, itemToUpdate]);
            } else {
              setItems((prev) =>
                prev.map((item) =>
                  item.drug.id === drugId
                    ? { ...item, quantity: oldQuantity }
                    : item,
                ),
              );
            }
          }
        }
      }
    },
    [user?.basketId, items],
  );

  const clearBasket = useCallback(async () => {
    const itemsBackup = [...items];

    // Optimistic update
    setItems([]);
    localStorage.removeItem("basket_items");

    // Sync with backend
    if (user?.basketId) {
      try {
        await basketApi.clearBasket(user.basketId);
      } catch (error) {
        console.error("Failed to clear basket:", error);
        // Revert on failure
        setItems(itemsBackup);
      }
    }
  }, [user?.basketId, items]);

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
