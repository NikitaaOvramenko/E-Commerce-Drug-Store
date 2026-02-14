import { useState } from "react";
import { Send } from "lucide-react";
import { useBasket } from "../../context/BasketContext";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";
import { useLang } from "../../context/LangContext";
import { translations } from "../../i18n/translations";
import { orderApi } from "../../api/endpoints/order.api";
import { Button } from "../ui/Button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "../ui/drawer";

interface CheckoutDrawerProps {
  open: boolean;
  onClose: () => void;
  orderId: number | null;
}

export default function CheckoutDrawer({ open, onClose, orderId }: CheckoutDrawerProps) {
  const { items, totalPrice, clearBasket } = useBasket();
  const { bgColor, secondaryBgColor, textColor, hintColor, linkColor, buttonColor, buttonTextColor } =
    useTelegramTheme();
  const { language } = useLang();
  const t = translations[language].checkout;

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlaceOrder = async () => {
    if (!orderId) return;
    setProcessing(true);
    setError(null);
    try {
      await orderApi.placeOrder(orderId);
      clearBasket();
      onClose();
    } catch {
      setError(t.placeOrderError);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent style={{ backgroundColor: bgColor }} className="max-h-[90vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle style={{ color: textColor }}>{t.title}</DrawerTitle>
        </DrawerHeader>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-2">
          {/* Items */}
          <div className="rounded-2xl p-4" style={{ backgroundColor: secondaryBgColor }}>
            <h2 className="font-semibold mb-3 text-sm" style={{ color: hintColor }}>
              {t.orderSummary}
            </h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.drug.id}
                  className="flex justify-between items-center py-2 border-b last:border-0"
                  style={{ borderColor: `${hintColor}30` }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
                      style={{ backgroundColor: `${hintColor}20` }}
                    >
                      <img
                        src={item.drug.img || "/placeholder-drug.png"}
                        alt={item.drug.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium line-clamp-1" style={{ color: textColor }}>
                        {item.drug.name}
                      </p>
                      <p className="text-xs" style={{ color: hintColor }}>
                        {t.qty} {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium flex-shrink-0" style={{ color: textColor }}>
                    ${((item.drug.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-3 pt-3 border-t space-y-2" style={{ borderColor: `${hintColor}30` }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: hintColor }}>{t.subtotal}</span>
                <span style={{ color: textColor }}>${(totalPrice / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: hintColor }}>{t.delivery}</span>
                <span style={{ color: linkColor }}>{t.free}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-1">
                <span style={{ color: textColor }}>{t.total}</span>
                <span style={{ color: linkColor }}>${(totalPrice / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment info */}
          <div className="rounded-2xl p-4 flex items-center gap-3" style={{ backgroundColor: secondaryBgColor }}>
            <Send size={20} style={{ color: linkColor }} />
            <div>
              <p className="font-medium text-sm" style={{ color: textColor }}>{t.telegramPayment}</p>
              <p className="text-xs" style={{ color: hintColor }}>{t.invoiceInfo}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DrawerFooter className="border-t pt-4" style={{ borderColor: `${hintColor}30` }}>
          {error && <p className="text-red-400 text-sm text-center mb-2">{error}</p>}
          <Button
            fullWidth
            size="lg"
            loading={processing}
            onClick={handlePlaceOrder}
            style={{ backgroundColor: buttonColor, color: buttonTextColor }}
          >
            {t.placeOrder} - ${(totalPrice / 100).toFixed(2)}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
