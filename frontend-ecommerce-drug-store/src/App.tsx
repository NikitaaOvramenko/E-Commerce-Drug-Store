import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BasketProvider } from "./context/BasketContext";
import { FavoritesProvider } from "./context/FavoritesContext";

// Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import StorePage from "./pages/store/StorePage";
import CheckoutPage from "./pages/checkout/CheckoutPage";

// Admin Pages
import AdminDrugsPage from "./pages/admin/AdminDrugsPage";
import AdminDrugFormPage from "./pages/admin/AdminDrugFormPage";
import AdminTypesPage from "./pages/admin/AdminTypesPage";
import AdminBrandsPage from "./pages/admin/AdminBrandsPage";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";

// Layouts
import AdminLayout from "./layouts/AdminLayout";

// Components
import BasketSheet from "./components/basket/BasketSheet";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import AdminRoute from "./components/shared/AdminRoute";
import OrdersPage from "./pages/orders/OrdersPage";
import { LangContextProvider } from "./context/LangContext";

function App() {
  window.Telegram?.WebApp?.ready();
  return (
    <LangContextProvider>
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
                  <Route path="orders" element={<OrdersPage />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<AdminRoute />}>
                  <Route path="admin" element={<AdminLayout />}>
                    <Route
                      index
                      element={<Navigate to="/admin/drugs" replace />}
                    />
                    <Route path="drugs" element={<AdminDrugsPage />} />
                    <Route path="drugs/new" element={<AdminDrugFormPage />} />
                    <Route path="drugs/:id" element={<AdminDrugFormPage />} />
                    <Route path="types" element={<AdminTypesPage />} />
                    <Route path="brands" element={<AdminBrandsPage />} />
                    <Route
                      path="categories"
                      element={<AdminCategoriesPage />}
                    />
                  </Route>
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
    </LangContextProvider>
  );
}

export default App;
