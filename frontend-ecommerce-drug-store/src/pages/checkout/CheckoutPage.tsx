import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone } from 'lucide-react';
import { useTelegram } from '../../context/TelegramContext';
import { useBasket } from '../../context/BasketContext';
import SafeArea from '../../components/ui/SafeArea';
import Button from '../../components/ui/Button';

export default function CheckoutPage() {
  const {
    showBackButton,
    hideBackButton,
    hapticFeedback,
    showAlert,
    // openInvoice will be used when payment backend is ready
    isTelegram,
  } = useTelegram();
  const { items, totalPrice, clearBasket } = useBasket();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (isTelegram) {
      showBackButton(() => navigate(-1));
    }
    return () => {
      if (isTelegram) {
        hideBackButton();
      }
    };
  }, [isTelegram]);

  // Redirect if basket is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/store');
    }
  }, [items.length, navigate]);

  const handleTelegramPayment = async () => {
    setProcessing(true);
    hapticFeedback('impact');

    try {
      // TODO: Call backend to create invoice when endpoint is ready
      // const response = await paymentApi.createInvoice({
      //   items: items.map(item => ({
      //     drugId: item.drug.id,
      //     quantity: item.quantity,
      //     price: item.drug.price,
      //   })),
      //   total: totalPrice,
      // });
      // const status = await openInvoice(response.invoiceUrl);

      // For now, show coming soon message
      await showAlert(
        'Payment integration coming soon! Your order has been saved.'
      );
      hapticFeedback('notification');
      clearBasket();
      navigate('/store');
    } catch (error) {
      console.error('Payment error:', error);
      await showAlert('Payment failed. Please try again.');
      hapticFeedback('impact');
    } finally {
      setProcessing(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <SafeArea className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-800 flex items-center gap-3">
        {!isTelegram && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
        )}
        <h1 className="text-xl font-bold text-white">Checkout</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Order Summary */}
        <div className="bg-gray-900 rounded-2xl p-4">
          <h2 className="text-white font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.drug.id}
                className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg overflow-hidden">
                    <img
                      src={item.drug.img || '/placeholder-drug.png'}
                      alt={item.drug.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium line-clamp-1">
                      {item.drug.name}
                    </p>
                    <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-white font-medium">
                  ${(item.drug.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-4 pt-4 border-t border-gray-800 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Delivery</span>
              <span className="text-green-500">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2">
              <span className="text-white">Total</span>
              <span className="text-green-500">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-gray-900 rounded-2xl p-4">
          <h2 className="text-white font-semibold mb-4">Payment Method</h2>

          {/* Telegram Payment Option */}
          {isTelegram && (
            <div className="p-4 bg-[#0088cc]/10 border border-[#0088cc]/30 rounded-xl mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center">
                  <Smartphone size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Telegram Payments</p>
                  <p className="text-gray-400 text-sm">
                    Apple Pay, Google Pay & Cards
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Card Option (fallback) */}
          <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <CreditCard size={20} className="text-gray-400" />
              </div>
              <div>
                <p className="text-gray-400 font-medium">Credit/Debit Card</p>
                <p className="text-gray-500 text-sm">Coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 pb-safe">
        <Button
          fullWidth
          size="lg"
          loading={processing}
          onClick={handleTelegramPayment}
        >
          {isTelegram ? 'Pay with Telegram' : 'Place Order'}
        </Button>
        <p className="text-center text-gray-500 text-xs mt-3">
          Secure payment powered by {isTelegram ? 'Telegram' : 'Stripe'}
        </p>
      </div>
    </SafeArea>
  );
}
