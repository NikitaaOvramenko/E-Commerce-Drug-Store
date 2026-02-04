import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useBasket } from "../../context/BasketContext";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";
import SafeArea from "../../components/ui/SafeArea";
import Button from "../../components/ui/Button";

export default function CheckoutPage() {
  const { items, totalPrice, clearBasket } = useBasket();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const {
    bgColor,
    secondaryBgColor,
    textColor,
    hintColor,
    linkColor,
  } = useTelegramTheme();

  // Redirect if basket is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate("/store");
    }
  }, [items.length, navigate]);

  const handlePayment = async () => {
    setProcessing(true);

    try {
      // TODO: Implement payment integration
      alert("Payment integration coming soon! Your order has been saved.");
      clearBasket();
      navigate("/store");
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <SafeArea
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: bgColor }}
    >
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
          Checkout
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Order Summary */}
        <div className="rounded-2xl p-4" style={{ backgroundColor: secondaryBgColor }}>
          <h2 className="font-semibold mb-4" style={{ color: textColor }}>
            Order Summary
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
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-medium" style={{ color: textColor }}>
                  ${(item.drug.price * item.quantity).toFixed(2)}
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
              <span style={{ color: hintColor }}>Subtotal</span>
              <span style={{ color: textColor }}>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: hintColor }}>Delivery</span>
              <span style={{ color: linkColor }}>Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2">
              <span style={{ color: textColor }}>Total</span>
              <span style={{ color: linkColor }}>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="rounded-2xl p-4" style={{ backgroundColor: secondaryBgColor }}>
          <h2 className="font-semibold mb-4" style={{ color: textColor }}>
            Payment Method
          </h2>

          {/* Card Option */}
          <div
            className="p-4 border rounded-xl"
            style={{ borderColor: `${hintColor}40`, backgroundColor: `${hintColor}10` }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${hintColor}30` }}
              >
                <CreditCard size={20} style={{ color: hintColor }} />
              </div>
              <div>
                <p className="font-medium" style={{ color: hintColor }}>
                  Credit/Debit Card
                </p>
                <p className="text-sm" style={{ color: hintColor, opacity: 0.7 }}>
                  Coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="p-4 border-t pb-safe"
        style={{ borderColor: `${hintColor}30` }}
      >
        <Button fullWidth size="lg" loading={processing} onClick={handlePayment}>
          Place Order
        </Button>
        <p className="text-center text-xs mt-3" style={{ color: hintColor }}>
          Secure payment powered by Stripe
        </p>
      </div>
    </SafeArea>
  );
}
