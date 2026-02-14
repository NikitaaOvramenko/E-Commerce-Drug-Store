import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { useBasket } from "../../context/BasketContext";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";
import { useLang } from "../../context/LangContext";
import { translations } from "../../i18n/translations";
import { orderApi } from "../../api/endpoints/order.api";
import SafeArea from "../../components/ui/SafeArea";
import { Button } from "../../components/ui/Button";
import Background from "../../components/ui/Background";

export default function CheckoutPage() {
  const { items, totalPrice, clearBasket } = useBasket();
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = (location.state as { orderId?: number })?.orderId;

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { bgColor, secondaryBgColor, textColor, hintColor, linkColor } =
    useTelegramTheme();
  const { language } = useLang();
  const t = translations[language].checkout;

  useEffect(() => {
    if (items.length === 0 || !orderId) {
      navigate("/store");
    }
  }, [items.length, orderId, navigate]);

  const handlePlaceOrder = async () => {
    if (!orderId) return;
    setProcessing(true);
    setError(null);

    try {
      await orderApi.placeOrder(orderId);
      clearBasket();
      navigate("/store");
    } catch (err) {
      console.error("Place order failed:", err);
      setError(t.placeOrderError);
    } finally {
      setProcessing(false);
    }
  };

  if (items.length === 0 || !orderId) return null;

  return (
    <SafeArea className="min-h-screen flex flex-col">
      <Background />
      <div className="relative z-10 flex flex-col min-h-screen">
      {/* Header */}
      <div
        className="px-4 py-4 border-b flex items-center gap-3"
        style={{ borderColor: `${hintColor}30` }}
      >
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-lg transition-colors"
          style={{ color: textColor }}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold" style={{ color: textColor }}>
          {t.title}
        </h1>
      </div>

      {/* Order Summary */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div
          className="rounded-2xl p-4"
          style={{ backgroundColor: secondaryBgColor }}
        >
          <h2 className="font-semibold mb-4" style={{ color: textColor }}>
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
                    className="w-10 h-10 rounded-lg overflow-hidden"
                    style={{ backgroundColor: `${hintColor}20` }}
                  >
                    <img
                      src={item.drug.img || "/placeholder-drug.png"}
                      alt={item.drug.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p
                      className="text-sm font-medium line-clamp-1"
                      style={{ color: textColor }}
                    >
                      {item.drug.name}
                    </p>
                    <p className="text-xs" style={{ color: hintColor }}>
                      {t.qty} {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-medium" style={{ color: textColor }}>
                  ${(item.drug.price * item.quantity / 100).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div
            className="mt-4 pt-4 border-t space-y-2"
            style={{ borderColor: `${hintColor}30` }}
          >
            <div className="flex justify-between text-sm">
              <span style={{ color: hintColor }}>{t.subtotal}</span>
              <span style={{ color: textColor }}>${(totalPrice / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: hintColor }}>{t.delivery}</span>
              <span style={{ color: linkColor }}>{t.free}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2">
              <span style={{ color: textColor }}>{t.total}</span>
              <span style={{ color: linkColor }}>${(totalPrice / 100).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div
          className="rounded-2xl p-4"
          style={{ backgroundColor: secondaryBgColor }}
        >
          <div className="flex items-center gap-3">
            <Send size={20} style={{ color: linkColor }} />
            <div>
              <p className="font-medium" style={{ color: textColor }}>
                {t.telegramPayment}
              </p>
              <p className="text-sm" style={{ color: hintColor }}>
                {t.invoiceInfo}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="p-4 border-t pb-safe"
        style={{ borderColor: `${hintColor}30` }}
      >
        {error && (
          <p className="text-red-400 text-sm text-center mb-3">{error}</p>
        )}
        <Button
          fullWidth
          size="lg"
          loading={processing}
          onClick={handlePlaceOrder}
        >
          {t.placeOrder} - ${(totalPrice / 100).toFixed(2)}
        </Button>
      </div>
      </div>
    </SafeArea>
  );
}
