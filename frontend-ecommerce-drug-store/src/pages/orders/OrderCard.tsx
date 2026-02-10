import { useState } from "react";
import { Package, ChevronDown, ChevronUp, Send } from "lucide-react";
import type { orderDto, orderStatus } from "../../api/types/order.types";
import { orderApi } from "../../api/endpoints/order.api";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";
import Button from "../../components/ui/Button";

const statusColors: Record<orderStatus, string> = {
  CHECKOUT: "#f59e0b",
  PENDING_PAYMENT: "#3b82f6",
  PAID: "#22c55e",
  SHIPPED: "#8b5cf6",
  DELIVERED: "#10b981",
  CANCELLED: "#ef4444",
};

const statusLabels: Record<orderStatus, string> = {
  CHECKOUT: "Checkout",
  PENDING_PAYMENT: "Pending Payment",
  PAID: "Paid",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

interface OrderCardProps {
  order: orderDto;
  onOrderUpdated: () => void;
}

export default function OrderCard({ order, onOrderUpdated }: OrderCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { secondaryBgColor, textColor, hintColor, linkColor } =
    useTelegramTheme();

  const statusColor = statusColors[order.orderStatus] || hintColor;
  const isCheckout = order.orderStatus === "CHECKOUT";

  const handlePlaceOrder = async () => {
    setPlacing(true);
    setError(null);
    try {
      await orderApi.placeOrder(order.id);
      onOrderUpdated();
    } catch {
      setError("Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: secondaryBgColor }}
    >
      {/* Header - clickable to expand */}
      <button
        className="w-full p-4 text-left"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Package size={18} style={{ color: hintColor }} />
            <span className="font-semibold" style={{ color: textColor }}>
              Order #{order.id}
            </span>
          </div>
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
          >
            {statusLabels[order.orderStatus]}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: hintColor }}>
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-bold" style={{ color: textColor }}>
              ${(order.totalPrice / 100).toFixed(2)}
            </span>
            {expanded ? (
              <ChevronUp size={16} style={{ color: hintColor }} />
            ) : (
              <ChevronDown size={16} style={{ color: hintColor }} />
            )}
          </div>
        </div>
      </button>

      {/* Expanded items */}
      {expanded && (
        <div
          className="px-4 pb-4"
          style={{ borderTop: `1px solid ${hintColor}30` }}
        >
          {order.items.length > 0 && (
            <div className="pt-3 space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 py-2 border-b last:border-0"
                  style={{ borderColor: `${hintColor}20` }}
                >
                  {/* Drug image */}
                  <div
                    className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
                    style={{ backgroundColor: `${hintColor}20` }}
                  >
                    <img
                      src={item.drugImg || "/placeholder-drug.png"}
                      alt={item.drugName}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium line-clamp-1"
                      style={{ color: textColor }}
                    >
                      {item.drugName}
                    </p>
                    <p className="text-xs" style={{ color: hintColor }}>
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span
                    className="text-sm font-medium flex-shrink-0"
                    style={{ color: textColor }}
                  >
                    ${((item.priceAtPurchase * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Place Order button for CHECKOUT orders */}
          {isCheckout && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <Send size={16} style={{ color: linkColor }} />
                <p className="text-xs" style={{ color: hintColor }}>
                  Invoice will be sent to your Telegram chat
                </p>
              </div>
              {error && (
                <p className="text-red-400 text-xs text-center">{error}</p>
              )}
              <Button fullWidth loading={placing} onClick={handlePlaceOrder}>
                Place Order - ${(order.totalPrice / 100).toFixed(2)}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
