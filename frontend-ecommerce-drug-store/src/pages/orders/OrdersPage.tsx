import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";
import { orderApi } from "../../api/endpoints/order.api";
import type { orderDto } from "../../api/types/order.types";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";
import SafeArea from "../../components/ui/SafeArea";
import OrderCard from "./OrderCard";

export default function OrdersPage() {
  const [orders, setOrders] = useState<orderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { bgColor, textColor, hintColor, secondaryBgColor } = useTelegramTheme();

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderApi.getAllDrugs();
      setOrders(data);
    } catch {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <SafeArea className="min-h-screen flex flex-col" style={{ backgroundColor: bgColor }}>
      {/* Header */}
      <div
        className="px-4 py-4 border-b flex items-center gap-3"
        style={{ borderColor: `${hintColor}30` }}
      >
        <button
          onClick={() => navigate("/store")}
          className="p-2 -ml-2 rounded-lg transition-colors"
          style={{ color: textColor }}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold" style={{ color: textColor }}>
          My Orders
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl p-4 animate-pulse h-20"
                style={{ backgroundColor: secondaryBgColor }}
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-12">
            <p className="text-red-400 mb-3">{error}</p>
            <button
              onClick={loadOrders}
              className="text-sm font-medium px-4 py-2 rounded-xl"
              style={{ backgroundColor: secondaryBgColor, color: textColor }}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto mb-4" style={{ color: hintColor }} />
            <p className="font-medium" style={{ color: textColor }}>
              No orders yet
            </p>
            <p className="text-sm mt-1" style={{ color: hintColor }}>
              Your orders will appear here after checkout
            </p>
          </div>
        )}

        {!loading && !error && orders.map((order) => (
          <OrderCard key={order.id} order={order} onOrderUpdated={loadOrders} />
        ))}
      </div>
    </SafeArea>
  );
}
