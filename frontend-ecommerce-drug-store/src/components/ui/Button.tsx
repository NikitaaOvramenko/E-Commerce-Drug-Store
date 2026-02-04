import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  className = "",
  disabled,
  children,
  style,
  ...props
}: ButtonProps) {
  const { buttonColor, buttonTextColor, secondaryBgColor, textColor, hintColor } =
    useTelegramTheme();

  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2.5 text-base gap-2",
    lg: "px-6 py-3.5 text-lg gap-2.5",
  };

  // Get variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: buttonColor,
          color: buttonTextColor,
        };
      case "secondary":
        return {
          backgroundColor: secondaryBgColor,
          color: textColor,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          color: textColor,
          border: `2px solid ${hintColor}`,
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          color: hintColor,
        };
      default:
        return {};
    }
  };

  return (
    <button
      className={`${baseStyles} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled || loading}
      style={{ ...getVariantStyles(), ...style }}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
