import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BasketProvider } from "./context/BasketContext";
import { FavoritesProvider } from "./context/FavoritesContext";

// Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import StorePage from "./pages/store/StorePage";
import CheckoutPage from "./pages/checkout/CheckoutPage";

// Components
import BasketSheet from "./components/basket/BasketSheet";
import ProtectedRoute from "./components/shared/ProtectedRoute";

function App() {
  window.Telegram?.WebApp?.ready();
  return (
    <AuthProvider>
      <BasketProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <Routes>
              {/* Auth Routes (Public) */}
              <Route path="auth">
                <Route path="login" element={<LoginPage />} />
                <Route path="sign_up" element={<RegisterPage />} />
              </Route>

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="store" element={<StorePage />} />
                <Route path="checkout" element={<CheckoutPage />} />
              </Route>

              {/* Default Redirects */}
              <Route path="/" element={<Navigate to="/store" replace />} />
              <Route
                path="/dashboard/*"
                element={<Navigate to="/store" replace />}
              />
              <Route path="*" element={<Navigate to="/store" replace />} />
            </Routes>

            {/* Global Basket Sheet */}
            <BasketSheet />
          </BrowserRouter>
        </FavoritesProvider>
      </BasketProvider>
    </AuthProvider>
  );
}

export default App;
