import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useBasket } from "../../context/BasketContext";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";
import { Button } from "../ui/Button";
import { orderApi } from "../../api/endpoints/order.api";
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
  const navigate = useNavigate();
  const { linkColor } = useTelegramTheme();

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
    <Drawer open={isOpen} onOpenChange={(open) => !open && closeBasket()}>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="flex-row items-center gap-2 text-left">
          <ShoppingBag size={20} style={{ color: linkColor }} />
          <DrawerTitle>Your Basket</DrawerTitle>
          {items.length > 0 && (
            <DrawerDescription>({items.length})</DrawerDescription>
          )}
          {items.length === 0 && (
            <DrawerDescription className="sr-only">Empty basket</DrawerDescription>
          )}
        </DrawerHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-muted">
                <ShoppingBag size={28} className="text-muted-foreground" />
              </div>
              <p className="text-lg font-medium mb-1">
                Your basket is empty
              </p>
              <p className="text-sm text-muted-foreground">
                Add some products to get started
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.drug.id}
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
                      <h3 className="font-medium text-sm line-clamp-1">
                        {item.drug.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {item.drug.brandName}
                      </p>
                    </div>
                    <p className="font-bold text-sm" style={{ color: linkColor }}>
                      ${((item.drug.price * item.quantity) / 100).toFixed(2)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemove(item.drug.id)}
                      className="p-1.5 transition-colors text-muted-foreground hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 rounded-lg bg-secondary">
                      <button
                        onClick={() => handleQuantityChange(item.drug.id, -1)}
                        className="p-1.5 transition-colors text-muted-foreground"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm w-6 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.drug.id, 1)}
                        className="p-1.5 transition-colors text-muted-foreground"
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
          <DrawerFooter className="border-t pt-4">
            <div className="flex justify-between items-center w-full">
              <span className="text-muted-foreground">Total</span>
              <span className="font-bold text-xl">
                ${(totalPrice / 100).toFixed(2)}
              </span>
            </div>
            <Button fullWidth size="lg" onClick={handleCheckout}>
              Checkout
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
