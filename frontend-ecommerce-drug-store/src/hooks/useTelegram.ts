import { useCallback } from 'react';
import WebApp from '@twa-dev/sdk';

export function useTelegramMainButton() {
  const show = useCallback((text: string, onClick: () => void) => {
    WebApp.MainButton.setText(text);
    WebApp.MainButton.onClick(onClick);
    WebApp.MainButton.show();
    WebApp.MainButton.enable();
  }, []);

  const hide = useCallback(() => {
    WebApp.MainButton.hide();
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    if (loading) {
      WebApp.MainButton.showProgress();
      WebApp.MainButton.disable();
    } else {
      WebApp.MainButton.hideProgress();
      WebApp.MainButton.enable();
    }
  }, []);

  const setText = useCallback((text: string) => {
    WebApp.MainButton.setText(text);
  }, []);

  return { show, hide, setLoading, setText };
}

export function useTelegramBackButton() {
  const show = useCallback((onClick: () => void) => {
    WebApp.BackButton.onClick(onClick);
    WebApp.BackButton.show();
  }, []);

  const hide = useCallback(() => {
    WebApp.BackButton.hide();
  }, []);

  return { show, hide };
}

export function useTelegramHaptics() {
  const impact = useCallback((style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'medium') => {
    try {
      WebApp.HapticFeedback.impactOccurred(style);
    } catch {
      // Not supported
    }
  }, []);

  const notification = useCallback((type: 'error' | 'success' | 'warning' = 'success') => {
    try {
      WebApp.HapticFeedback.notificationOccurred(type);
    } catch {
      // Not supported
    }
  }, []);

  const selection = useCallback(() => {
    try {
      WebApp.HapticFeedback.selectionChanged();
    } catch {
      // Not supported
    }
  }, []);

  return { impact, notification, selection };
}
