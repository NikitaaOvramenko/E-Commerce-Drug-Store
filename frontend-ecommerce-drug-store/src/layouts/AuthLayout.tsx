// AuthLayout.jsx
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="auth-page-container min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <header className="mb-6">
        <img src="/logo.svg" alt="App Logo" className="h-12" />
      </header>

      <main className="auth-content-card w-full max-w-md bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <Outlet />
      </main>

      <footer className="auth-footer mt-6 text-sm text-gray-500">
        <p>Footer</p>
      </footer>
    </div>
  );
}

export default AuthLayout;
