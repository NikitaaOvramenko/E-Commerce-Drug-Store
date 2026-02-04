import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Drug } from '../api/types/drug.types';
import type { BasketItem } from '../api/types/basket.types';
import { basketApi } from '../api/endpoints/basket.api';
import { useAuth } from './AuthContext';

interface BasketContextType {
  items: BasketItem[];
  basketCount: number;
  totalPrice: number;
  isOpen: boolean;
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
  const { user } = useAuth();

  // Load basket from user data on login
  useEffect(() => {
    if (user?.basketItems) {
      setItems(
        user.basketItems.map((item) => ({
          drug: item.drugDto,
          quantity: item.quantity,
        }))
      );
    }
  }, [user]);

  // Also load from localStorage for persistence
  useEffect(() => {
    const savedBasket = localStorage.getItem('basket_items');
    if (savedBasket && !user?.basketItems?.length) {
      try {
        setItems(JSON.parse(savedBasket));
      } catch {
        // Invalid data
      }
    }
  }, [user?.basketItems?.length]);

  // Save to localStorage when items change
  useEffect(() => {
    localStorage.setItem('basket_items', JSON.stringify(items));
  }, [items]);

  const basketCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.drug.price * item.quantity, 0);

  const addToBasket = useCallback(async (drug: Drug) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.drug.id === drug.id);
      if (existing) {
        return prev.map((item) =>
          item.drug.id === drug.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { drug, quantity: 1 }];
    });

    // Sync with backend (fire and forget)
    if (user?.basketId) {
      try {
        await basketApi.addItem(drug.id, user.basketId);
      } catch (error) {
        console.error('Failed to sync basket:', error);
      }
    }
  }, [user?.basketId]);

  const removeFromBasket = useCallback((drugId: number) => {
    setItems((prev) => prev.filter((item) => item.drug.id !== drugId));
  }, []);

  const updateQuantity = useCallback((drugId: number, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.drug.id !== drugId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.drug.id === drugId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearBasket = useCallback(() => {
    setItems([]);
    localStorage.removeItem('basket_items');
  }, []);

  const openBasket = useCallback(() => setIsOpen(true), []);
  const closeBasket = useCallback(() => setIsOpen(false), []);

  return (
    <BasketContext.Provider
      value={{
        items,
        basketCount,
        totalPrice,
        isOpen,
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

export function useBasket() {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within BasketProvider');
  }
  return context;
}
