import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import WebApp from '@twa-dev/sdk';
import './index.css';
import App from './App.tsx';

// Initialize Telegram WebApp if running inside Telegram
if (WebApp.initData) {
  WebApp.ready();
  WebApp.expand();

  // Set header color to match our dark theme
  try {
    WebApp.setHeaderColor('#000000');
    WebApp.setBackgroundColor('#000000');
  } catch {
    // Not supported in all versions
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
