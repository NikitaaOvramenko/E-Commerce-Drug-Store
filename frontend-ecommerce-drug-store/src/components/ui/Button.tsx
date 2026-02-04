import type { ButtonHTMLAttributes, ReactNode, CSSProperties } from "react";
import { Loader2 } from "lucide-react";

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
  disabled,
  children,
  style,
  ...props
}: ButtonProps) {
  const baseStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    borderRadius: '12px',
    transition: 'all 0.2s',
    outline: 'none',
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  const variantStyles: Record<string, CSSProperties> = {
    primary: {
      backgroundColor: '#22c55e',
      color: '#000000',
    },
    secondary: {
      backgroundColor: '#1f2937',
      color: '#ffffff',
    },
    outline: {
      backgroundColor: 'transparent',
      border: '2px solid #374151',
      color: '#ffffff',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#9ca3af',
    },
  };

  const sizeStyles: Record<string, CSSProperties> = {
    sm: {
      paddingLeft: '12px',
      paddingRight: '12px',
      paddingTop: '6px',
      paddingBottom: '6px',
      fontSize: '14px',
      gap: '6px',
    },
    md: {
      paddingLeft: '16px',
      paddingRight: '16px',
      paddingTop: '10px',
      paddingBottom: '10px',
      fontSize: '16px',
      gap: '8px',
    },
    lg: {
      paddingLeft: '24px',
      paddingRight: '24px',
      paddingTop: '14px',
      paddingBottom: '14px',
      fontSize: '18px',
      gap: '10px',
    },
  };

  const combinedStyles: CSSProperties = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  };

  return (
    <button
      style={combinedStyles}
      disabled={disabled || loading}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          if (variant === 'primary') {
            e.currentTarget.style.backgroundColor = '#16a34a';
          } else if (variant === 'secondary') {
            e.currentTarget.style.backgroundColor = '#374151';
          } else if (variant === 'outline') {
            e.currentTarget.style.backgroundColor = '#1f2937';
          } else if (variant === 'ghost') {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 0.5)';
          }
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.backgroundColor = '#22c55e';
        } else if (variant === 'secondary') {
          e.currentTarget.style.backgroundColor = '#1f2937';
        } else if (variant === 'outline') {
          e.currentTarget.style.backgroundColor = 'transparent';
        } else if (variant === 'ghost') {
          e.currentTarget.style.color = '#9ca3af';
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
      {...props}
    >
      {loading && (
        <Loader2
          size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
          style={{ animation: 'spin 1s linear infinite' }}
        />
      )}
      {children}
    </button>
  );
}
