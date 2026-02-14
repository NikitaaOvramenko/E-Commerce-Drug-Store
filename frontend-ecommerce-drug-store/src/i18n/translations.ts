import type { CountryOfOrigin } from "@/api/types/drug.types";
import type { orderStatus } from "@/api/types/order.types";

interface Translations {
  navbar: {
    home: string;
    favorites: string;
    orders: string;
  };
  store: {
    searchPlaceholder: string;
    productsFound: string;
    noMoreProducts: string;
    noProductsFound: string;
    adjustFilters: string;
    add: string;
  };
  basket: {
    title: string;
    emptyTitle: string;
    emptySubtitle: string;
    total: string;
    checkout: string;
  };
  orders: {
    title: string;
    loadError: string;
    tryAgain: string;
    noOrders: string;
    noOrdersSubtitle: string;
  };
  orderCard: {
    order: string;
    qty: string;
    invoiceInfo: string;
    placeOrderError: string;
    placeOrder: string;
    status: Record<orderStatus, string>;
  };
  checkout: {
    title: string;
    orderSummary: string;
    qty: string;
    subtotal: string;
    delivery: string;
    free: string;
    total: string;
    telegramPayment: string;
    invoiceInfo: string;
    placeOrder: string;
    placeOrderError: string;
  };
  filters: {
    title: string;
    type: string;
    brand: string;
    category: string;
    sortBy: string;
    default: string;
    nameAZ: string;
    nameZA: string;
    priceLow: string;
    priceHigh: string;
    all: string;
    reset: string;
    apply: string;
  };
}

export const translations: Record<CountryOfOrigin, Translations> = {
  ENG: {
    navbar: {
      home: "Home",
      favorites: "Favorites",
      orders: "Orders",
    },
    store: {
      searchPlaceholder: "Search products...",
      productsFound: "Products Found",
      noMoreProducts: "No more products",
      noProductsFound: "No products found",
      adjustFilters: "Try adjusting your filters",
      add: "Add",
    },
    basket: {
      title: "Your Basket",
      emptyTitle: "Your basket is empty",
      emptySubtitle: "Add some products to get started",
      total: "Total",
      checkout: "Checkout",
    },
    orders: {
      title: "My Orders",
      loadError: "Failed to load orders",
      tryAgain: "Try Again",
      noOrders: "No orders yet",
      noOrdersSubtitle: "Your orders will appear here after checkout",
    },
    orderCard: {
      order: "Order",
      qty: "Qty:",
      invoiceInfo: "Invoice will be sent to your Telegram chat",
      placeOrderError: "Failed to place order",
      placeOrder: "Place Order",
      status: {
        CHECKOUT: "Checkout",
        PENDING_PAYMENT: "Pending Payment",
        PAID: "Paid",
        SHIPPED: "Shipped",
        DELIVERED: "Delivered",
        CANCELLED: "Cancelled",
      },
    },
    checkout: {
      title: "Checkout",
      orderSummary: "Order Summary",
      qty: "Qty:",
      subtotal: "Subtotal",
      delivery: "Delivery",
      free: "Free",
      total: "Total",
      telegramPayment: "Telegram Payment",
      invoiceInfo: "Invoice will be sent to your Telegram chat",
      placeOrder: "Place Order",
      placeOrderError: "Failed to place order. Please try again.",
    },
    filters: {
      title: "Filters",
      type: "Type",
      brand: "Brand",
      category: "Category",
      sortBy: "Sort By",
      default: "Default",
      nameAZ: "Name A-Z",
      nameZA: "Name Z-A",
      priceLow: "Price: Low to High",
      priceHigh: "Price: High to Low",
      all: "All",
      reset: "Reset",
      apply: "Apply Filters",
    },
  },

  RUS: {
    navbar: {
      home: "Главная",
      favorites: "Избранное",
      orders: "Заказы",
    },
    store: {
      searchPlaceholder: "Поиск товаров...",
      productsFound: "Найдено товаров",
      noMoreProducts: "Больше товаров нет",
      noProductsFound: "Товары не найдены",
      adjustFilters: "Попробуйте изменить фильтры",
      add: "Добавить",
    },
    basket: {
      title: "Ваша корзина",
      emptyTitle: "Ваша корзина пуста",
      emptySubtitle: "Добавьте товары, чтобы начать",
      total: "Итого",
      checkout: "Оформить заказ",
    },
    orders: {
      title: "Мои заказы",
      loadError: "Ошибка загрузки заказов",
      tryAgain: "Попробовать ещё",
      noOrders: "Заказов пока нет",
      noOrdersSubtitle: "Ваши заказы появятся здесь после оформления",
    },
    orderCard: {
      order: "Заказ",
      qty: "Кол-во:",
      invoiceInfo: "Счёт будет отправлен в ваш чат Telegram",
      placeOrderError: "Не удалось оформить заказ",
      placeOrder: "Оформить заказ",
      status: {
        CHECKOUT: "Оформление",
        PENDING_PAYMENT: "Ожидает оплаты",
        PAID: "Оплачено",
        SHIPPED: "Отправлено",
        DELIVERED: "Доставлено",
        CANCELLED: "Отменено",
      },
    },
    checkout: {
      title: "Оформление заказа",
      orderSummary: "Итог заказа",
      qty: "Кол-во:",
      subtotal: "Подытог",
      delivery: "Доставка",
      free: "Бесплатно",
      total: "Итого",
      telegramPayment: "Оплата через Telegram",
      invoiceInfo: "Счёт будет отправлен в ваш чат Telegram",
      placeOrder: "Оформить заказ",
      placeOrderError: "Не удалось оформить заказ. Попробуйте ещё раз.",
    },
    filters: {
      title: "Фильтры",
      type: "Тип",
      brand: "Бренд",
      category: "Категория",
      sortBy: "Сортировка",
      default: "По умолчанию",
      nameAZ: "Название А-Я",
      nameZA: "Название Я-А",
      priceLow: "Цена: от низкой",
      priceHigh: "Цена: от высокой",
      all: "Все",
      reset: "Сбросить",
      apply: "Применить фильтры",
    },
  },

  UKR: {
    navbar: {
      home: "Головна",
      favorites: "Обране",
      orders: "Замовлення",
    },
    store: {
      searchPlaceholder: "Пошук товарів...",
      productsFound: "Знайдено товарів",
      noMoreProducts: "Більше товарів немає",
      noProductsFound: "Товари не знайдено",
      adjustFilters: "Спробуйте змінити фільтри",
      add: "Додати",
    },
    basket: {
      title: "Ваш кошик",
      emptyTitle: "Ваш кошик порожній",
      emptySubtitle: "Додайте товари, щоб почати",
      total: "Всього",
      checkout: "Оформити замовлення",
    },
    orders: {
      title: "Мої замовлення",
      loadError: "Помилка завантаження замовлень",
      tryAgain: "Спробувати знову",
      noOrders: "Замовлень ще немає",
      noOrdersSubtitle: "Ваші замовлення з'являться тут після оформлення",
    },
    orderCard: {
      order: "Замовлення",
      qty: "К-сть:",
      invoiceInfo: "Рахунок буде надіслано у ваш чат Telegram",
      placeOrderError: "Не вдалося оформити замовлення",
      placeOrder: "Оформити замовлення",
      status: {
        CHECKOUT: "Оформлення",
        PENDING_PAYMENT: "Очікує оплати",
        PAID: "Оплачено",
        SHIPPED: "Відправлено",
        DELIVERED: "Доставлено",
        CANCELLED: "Скасовано",
      },
    },
    checkout: {
      title: "Оформлення замовлення",
      orderSummary: "Підсумок замовлення",
      qty: "К-сть:",
      subtotal: "Підсумок",
      delivery: "Доставка",
      free: "Безкоштовно",
      total: "Всього",
      telegramPayment: "Оплата через Telegram",
      invoiceInfo: "Рахунок буде надіслано у ваш чат Telegram",
      placeOrder: "Оформити замовлення",
      placeOrderError: "Не вдалося оформити замовлення. Спробуйте ще раз.",
    },
    filters: {
      title: "Фільтри",
      type: "Тип",
      brand: "Бренд",
      category: "Категорія",
      sortBy: "Сортування",
      default: "За замовчуванням",
      nameAZ: "Назва А-Я",
      nameZA: "Назва Я-А",
      priceLow: "Ціна: від низької до високої",
      priceHigh: "Ціна: від високої до низької",
      all: "Всі",
      reset: "Скинути",
      apply: "Застосувати фільтри",
    },
  },
};
