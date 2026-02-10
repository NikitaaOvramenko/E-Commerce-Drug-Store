import { useNavigate } from "react-router-dom";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useBasket } from "../../context/BasketContext";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";
import BottomSheet from "../ui/BottomSheet";
import Button from "../ui/Button";
import { orderApi } from "../../api/endpoints/order.api";

export default function BasketSheet() {
  const {
    items,
    isOpen,
    closeBasket,
    totalPrice,
    updateQuantity,
    removeFromBasket,
  } = useBasket();
  const navigate = useNavigate();
  const { textColor, hintColor, linkColor, secondaryBgColor } =
    useTelegramTheme();

  const handleCheckout = async () => {
    try {
      const order = await orderApi.checkout();
      closeBasket();
      navigate("/checkout", { state: { orderId: order.id } });
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
    <BottomSheet open={isOpen} onClose={closeBasket} height="75%">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: `${hintColor}30` }}
        >
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} style={{ color: linkColor }} />
            <h2 className="text-lg font-bold" style={{ color: textColor }}>
              Your Basket
            </h2>
            {items.length > 0 && (
              <span className="text-sm" style={{ color: hintColor }}>
                ({items.length})
              </span>
            )}
          </div>
          <button
            onClick={closeBasket}
            className="p-1 rounded-lg transition-colors"
          >
            <X size={22} style={{ color: hintColor }} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
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
                Your basket is empty
              </p>
              <p className="text-sm" style={{ color: hintColor }}>
                Add some products to get started
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.drug.id}
                  className="flex gap-3 rounded-xl p-3"
                  style={{ backgroundColor: `${hintColor}15` }}
                >
                  {/* Image */}
                  <div
                    className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0"
                    style={{ backgroundColor: `${hintColor}20` }}
                  >
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
                        {item.drug.name}
                      </h3>
                      <p className="text-xs" style={{ color: hintColor }}>
                        {item.drug.brandName}
                      </p>
                    </div>
                    <p
                      className="font-bold text-sm"
                      style={{ color: linkColor }}
                    >
                      ${(item.drug.price * item.quantity / 100).toFixed(2)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemove(item.drug.id)}
                      className="p-1.5 transition-colors hover:text-red-400"
                      style={{ color: hintColor }}
                    >
                      <Trash2 size={16} />
                    </button>

                    {/* Quantity Controls */}
                    <div
                      className="flex items-center gap-1 rounded-lg"
                      style={{ backgroundColor: secondaryBgColor }}
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
          <div
            className="p-4 border-t space-y-3 pb-safe"
            style={{ borderColor: `${hintColor}30` }}
          >
            <div className="flex justify-between items-center">
              <span style={{ color: hintColor }}>Total</span>
              <span className="font-bold text-xl" style={{ color: textColor }}>
                ${(totalPrice / 100).toFixed(2)}
              </span>
            </div>
            <Button fullWidth size="lg" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        )}
      </div>
    </BottomSheet>
  );
}
