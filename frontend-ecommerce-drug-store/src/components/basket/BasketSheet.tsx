import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useBasket } from "../../context/BasketContext";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";
import { useLang } from "../../context/LangContext";
import { translations } from "../../i18n/translations";
import { Button } from "../ui/Button";
import { orderApi } from "../../api/endpoints/order.api";
import CheckoutDrawer from "./CheckoutDrawer";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "../ui/drawer";

export default function BasketSheet() {
  const {
    items,
    isOpen,
    closeBasket,
    totalPrice,
    updateQuantity,
    removeFromBasket,
  } = useBasket();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutOrderId, setCheckoutOrderId] = useState<number | null>(null);
  const {
    linkColor,
    buttonColor,
    buttonTextColor,
    bgColor,
    secondaryBgColor,
    textColor,
    hintColor,
    destructiveTextColor,
  } = useTelegramTheme();
  const { language, findByLang } = useLang();
  const t = translations[language].basket;

  const handleCheckout = async () => {
    try {
      const order = await orderApi.checkout();
      closeBasket();
      setCheckoutOrderId(order.id);
      setCheckoutOpen(true);
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  const handleQuantityChange = (drugId: number, delta: number) => {
    const item = items.find((i) => i.drug.id === drugId);
    if (item) {
      updateQuantity(drugId, item.quantity + delta);
    }
  };

  const handleRemove = (drugId: number) => {
    removeFromBasket(drugId);
  };

  return (
    <>
    <Drawer open={isOpen} onOpenChange={(open) => !open && closeBasket()}>
      <DrawerContent
        style={{ backgroundColor: bgColor }}
        className=" max-h-[80vh]"
      >
        <DrawerHeader className="flex-row items-center gap-2 text-left">
          <ShoppingBag size={20} style={{ color: linkColor }} />
          <DrawerTitle>{t.title}</DrawerTitle>
          {items.length > 0 && (
            <DrawerDescription>({items.length})</DrawerDescription>
          )}
          {items.length === 0 && (
            <DrawerDescription className="sr-only">
              {t.emptyTitle}
            </DrawerDescription>
          )}
        </DrawerHeader>

        {/* Items */}
        <div className="flex-1  overflow-y-auto px-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${hintColor}20` }}
              >
                <ShoppingBag size={28} style={{ color: hintColor }} />
              </div>
              <p
                className="text-lg font-medium mb-1"
                style={{ color: textColor }}
              >
                {t.emptyTitle}
              </p>
              <p className="text-sm" style={{ color: hintColor }}>
                {t.emptySubtitle}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.drug.id}
                  style={{ backgroundColor: secondaryBgColor }}
                  className="flex gap-3 rounded-xl p-3 bg-muted/50"
                >
                  {/* Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    <img
                      src={item.drug.img || "/placeholder-drug.png"}
                      alt={item.drug.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3
                        className="font-medium text-sm line-clamp-1"
                        style={{ color: textColor }}
                      >
                        {findByLang(language, item.drug.drugInfoDto)?.title}
                      </h3>
                      <p className="text-xs" style={{ color: hintColor }}>
                        {item.drug.brandName}
                      </p>
                    </div>
                    <p
                      className="font-bold text-sm"
                      style={{ color: linkColor }}
                    >
                      ${((item.drug.price * item.quantity) / 100).toFixed(2)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemove(item.drug.id)}
                      className="p-1.5 transition-colors"
                      style={{ color: destructiveTextColor }}
                    >
                      <Trash2 size={16} />
                    </button>

                    {/* Quantity Controls */}
                    <div
                      className="flex items-center gap-1 rounded-lg"
                      style={{ backgroundColor: `${hintColor}20` }}
                    >
                      <button
                        onClick={() => handleQuantityChange(item.drug.id, -1)}
                        className="p-1.5 transition-colors"
                        style={{ color: hintColor }}
                      >
                        <Minus size={14} />
                      </button>
                      <span
                        className="text-sm w-6 text-center font-medium"
                        style={{ color: textColor }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.drug.id, 1)}
                        className="p-1.5 transition-colors"
                        style={{ color: hintColor }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <DrawerFooter
            className="border-t pt-4"
            style={{ borderColor: `${hintColor}30` }}
          >
            <div className="flex justify-between items-center w-full">
              <span style={{ color: hintColor }}>{t.total}</span>
              <span className="font-bold text-xl" style={{ color: textColor }}>
                ${(totalPrice / 100).toFixed(2)}
              </span>
            </div>
            <Button
              style={{
                backgroundColor: buttonColor,
                color: buttonTextColor,
              }}
              fullWidth
              size="lg"
              onClick={handleCheckout}
            >
              {t.checkout}
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>

    <CheckoutDrawer
      open={checkoutOpen}
      onClose={() => setCheckoutOpen(false)}
      orderId={checkoutOrderId}
    />
    </>
  );
}
