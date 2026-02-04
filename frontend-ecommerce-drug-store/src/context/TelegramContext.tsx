import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import WebApp from '@twa-dev/sdk';

interface SafeAreaInset {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

interface TelegramContextType {
  webApp: typeof WebApp;
  user: TelegramUser | null;
  initData: string;
  colorScheme: 'light' | 'dark';
  isReady: boolean;
  isTelegram: boolean;
  safeAreaInset: SafeAreaInset;
  showMainButton: (text: string, onClick: () => void) => void;
  hideMainButton: () => void;
  setMainButtonLoading: (loading: boolean) => void;
  showBackButton: (onClick: () => void) => void;
  hideBackButton: () => void;
  hapticFeedback: (type: 'impact' | 'notification' | 'selection') => void;
  showAlert: (message: string) => Promise<void>;
  showConfirm: (message: string) => Promise<boolean>;
  openInvoice: (url: string) => Promise<string>;
  close: () => void;
}

const TelegramContext = createContext<TelegramContextType | null>(null);

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [mainButtonCallback, setMainButtonCallback] = useState<(() => void) | null>(null);
  const [backButtonCallback, setBackButtonCallback] = useState<(() => void) | null>(null);

  // Check if running inside Telegram
  const isTelegram = Boolean(WebApp.initData);

  useEffect(() => {
    if (isTelegram) {
      WebApp.ready();
      WebApp.expand();
    }
    setIsReady(true);
  }, [isTelegram]);

  // Handle main button click
  useEffect(() => {
    if (mainButtonCallback) {
      WebApp.MainButton.onClick(mainButtonCallback);
      return () => {
        WebApp.MainButton.offClick(mainButtonCallback);
      };
    }
  }, [mainButtonCallback]);

  // Handle back button click
  useEffect(() => {
    if (backButtonCallback) {
      WebApp.BackButton.onClick(backButtonCallback);
      return () => {
        WebApp.BackButton.offClick(backButtonCallback);
      };
    }
  }, [backButtonCallback]);

  const safeAreaInset: SafeAreaInset = {
    top: WebApp.safeAreaInset?.top || 0,
    bottom: WebApp.safeAreaInset?.bottom || 0,
    left: WebApp.safeAreaInset?.left || 0,
    right: WebApp.safeAreaInset?.right || 0,
  };

  const showMainButton = useCallback((text: string, onClick: () => void) => {
    if (!isTelegram) return;
    WebApp.MainButton.setText(text);
    WebApp.MainButton.color = '#22c55e';
    WebApp.MainButton.textColor = '#000000';
    setMainButtonCallback(() => onClick);
    WebApp.MainButton.show();
    WebApp.MainButton.enable();
  }, [isTelegram]);

  const hideMainButton = useCallback(() => {
    if (!isTelegram) return;
    WebApp.MainButton.hide();
    setMainButtonCallback(null);
  }, [isTelegram]);

  const setMainButtonLoading = useCallback((loading: boolean) => {
    if (!isTelegram) return;
    if (loading) {
      WebApp.MainButton.showProgress();
      WebApp.MainButton.disable();
    } else {
      WebApp.MainButton.hideProgress();
      WebApp.MainButton.enable();
    }
  }, [isTelegram]);

  const showBackButton = useCallback((onClick: () => void) => {
    if (!isTelegram) return;
    setBackButtonCallback(() => onClick);
    WebApp.BackButton.show();
  }, [isTelegram]);

  const hideBackButton = useCallback(() => {
    if (!isTelegram) return;
    WebApp.BackButton.hide();
    setBackButtonCallback(null);
  }, [isTelegram]);

  const hapticFeedback = useCallback((type: 'impact' | 'notification' | 'selection') => {
    if (!isTelegram) return;
    try {
      if (type === 'impact') {
        WebApp.HapticFeedback.impactOccurred('medium');
      } else if (type === 'notification') {
        WebApp.HapticFeedback.notificationOccurred('success');
      } else {
        WebApp.HapticFeedback.selectionChanged();
      }
    } catch {
      // Haptic feedback not supported
    }
  }, [isTelegram]);

  const showAlert = useCallback((message: string): Promise<void> => {
    if (!isTelegram) {
      alert(message);
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      WebApp.showAlert(message, resolve);
    });
  }, [isTelegram]);

  const showConfirm = useCallback((message: string): Promise<boolean> => {
    if (!isTelegram) {
      return Promise.resolve(confirm(message));
    }
    return new Promise((resolve) => {
      WebApp.showConfirm(message, resolve);
    });
  }, [isTelegram]);

  const openInvoice = useCallback((url: string): Promise<string> => {
    if (!isTelegram) {
      return Promise.reject(new Error('Not running in Telegram'));
    }
    return new Promise((resolve) => {
      WebApp.openInvoice(url, (status) => {
        resolve(status);
      });
    });
  }, [isTelegram]);

  const close = useCallback(() => {
    if (isTelegram) {
      WebApp.close();
    }
  }, [isTelegram]);

  const value: TelegramContextType = {
    webApp: WebApp,
    user: WebApp.initDataUnsafe?.user || null,
    initData: WebApp.initData,
    colorScheme: WebApp.colorScheme || 'dark',
    isReady,
    isTelegram,
    safeAreaInset,
    showMainButton,
    hideMainButton,
    setMainButtonLoading,
    showBackButton,
    hideBackButton,
    hapticFeedback,
    showAlert,
    showConfirm,
    openInvoice,
    close,
  };

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegram() {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error('useTelegram must be used within TelegramProvider');
  }
  return context;
}
