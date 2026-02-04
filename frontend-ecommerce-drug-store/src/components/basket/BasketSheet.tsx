import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useBasket } from '../../context/BasketContext';
import BottomSheet from '../ui/BottomSheet';
import Button from '../ui/Button';

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

  const handleCheckout = () => {
    closeBasket();
    navigate('/checkout');
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
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-green-500" />
            <h2 className="text-lg font-bold text-white">Your Basket</h2>
            {items.length > 0 && (
              <span className="text-sm text-gray-400">({items.length})</span>
            )}
          </div>
          <button
            onClick={closeBasket}
            className="p-1 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <X size={22} className="text-gray-400" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                <ShoppingBag size={28} className="text-gray-600" />
              </div>
              <p className="text-white text-lg font-medium mb-1">Your basket is empty</p>
              <p className="text-gray-500 text-sm">Add some products to get started</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.drug.id}
                  className="flex gap-3 bg-gray-800/50 rounded-xl p-3"
                >
                  {/* Image */}
                  <div className="w-16 h-16 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.drug.img || '/placeholder-drug.png'}
                      alt={item.drug.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="text-white font-medium text-sm line-clamp-1">
                        {item.drug.name}
                      </h3>
                      <p className="text-gray-500 text-xs">{item.drug.brandName}</p>
                    </div>
                    <p className="text-green-500 font-bold text-sm">
                      ${(item.drug.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemove(item.drug.id)}
                      className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 bg-gray-800 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item.drug.id, -1)}
                        className="p-1.5 text-gray-400 hover:text-white transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-white text-sm w-6 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.drug.id, 1)}
                        className="p-1.5 text-gray-400 hover:text-white transition-colors"
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
          <div className="p-4 border-t border-gray-800 space-y-3 pb-safe">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total</span>
              <span className="text-white font-bold text-xl">
                ${totalPrice.toFixed(2)}
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
