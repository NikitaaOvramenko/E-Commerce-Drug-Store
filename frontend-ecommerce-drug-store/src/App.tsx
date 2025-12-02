import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationPage from "./auth-pages/RegisterationPage";
import LoginPage from "./auth-pages/LoginPage";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH PAGES */}
        <Route path="auth" element={<AuthLayout />}>
          <Route path="sign_up" element={<RegistrationPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        {/* DASHBOARD */}
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="store" element={<div>Store Page</div>} />
          <Route path="basket" element={<div>Basket Page</div>} />
          <Route path="settings" element={<div>Settings Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
