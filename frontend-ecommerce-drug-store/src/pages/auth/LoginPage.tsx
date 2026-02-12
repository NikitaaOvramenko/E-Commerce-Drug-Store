import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, isLoading, clearError } = useAuth();
  const navigate = useNavigate();
  const { bgColor, textColor, hintColor, linkColor, secondaryBgColor } =
    useTelegramTheme();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    // Get Telegram user data
    const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    const tgUserId = tgUser?.id || 0;
    const tgChatId = tgUserId; // In mini apps, chat ID is typically the user ID

    try {
      await login({ email, password, tgUserId, tgChatId });
      if (email === "admin@admin.com") {
        navigate("/admin");
        return;
      }
      navigate("/store");
    } catch {
      // Error is handled by AuthContext
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{ backgroundColor: bgColor }}
    >
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6"
            style={{ backgroundColor: `${linkColor}20` }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4C20 4 17 7 17 11V18H31V11C31 7 28 4 24 4Z"
                fill="#ff6b9d"
              />
              <path
                d="M17 18V37C17 41 20 44 24 44C28 44 31 41 31 37V18H17Z"
                fill="#ffb347"
              />
              <circle cx="24" cy="11" r="3" fill="#fff" fillOpacity="0.6" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold" style={{ color: textColor }}>
            Welcome Back
          </h1>
          <p className="mt-2" style={{ color: hintColor }}>
            Sign in to your account
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            icon={<Mail size={20} />}
            bgColor={secondaryBgColor}
            textColor={textColor}
            hintColor={hintColor}
            accentColor={linkColor}
          />

          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            icon={<Lock size={20} />}
            bgColor={secondaryBgColor}
            textColor={textColor}
            hintColor={hintColor}
            accentColor={linkColor}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 transition-colors"
                style={{ color: hintColor }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            }
          />

          <div className="pt-2">
            <Button type="submit" loading={isLoading} fullWidth size="lg">
              Sign In
            </Button>
          </div>
        </form>

        {/* Register Link */}
        <p className="text-center pt-4" style={{ color: hintColor }}>
          Don't have an account?{" "}
          <Link
            to="/auth/sign_up"
            className="font-semibold transition-colors"
            style={{ color: linkColor }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
