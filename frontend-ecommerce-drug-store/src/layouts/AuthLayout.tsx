// AuthLayout.jsx
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <body className="auth-page-container">
      <header>
        <img src="/logo.svg" alt="App Logo" />
      </header>

      <main className="auth-content-card">
        <Outlet />
      </main>

      <footer className="auth-footer">
        <p>Footer</p>
      </footer>
    </body>
  );
}

export default AuthLayout;
