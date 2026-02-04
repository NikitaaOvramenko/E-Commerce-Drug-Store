import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  bgColor?: string;
  textColor?: string;
  hintColor?: string;
  accentColor?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      icon,
      rightIcon,
      className = "",
      bgColor = "#1a1a1a",
      textColor = "#ffffff",
      hintColor = "#6b7280",
      accentColor = "#22c55e",
      ...props
    },
    ref,
  ) => {
    return (
      <div className="relative">
        {icon && (
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
            style={{ color: hintColor }}
          >
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`w-full py-3.5 border-2 rounded-xl text-base outline-none transition-colors ${
            icon ? "pl-12" : "pl-4"
          } ${rightIcon ? "pr-12" : "pr-4"} ${className}`}
          style={{
            backgroundColor: bgColor,
            color: textColor,
            borderColor: error ? "#ef4444" : `${hintColor}40`,
          }}
          onFocus={(e) => {
            if (!error) {
              e.target.style.borderColor = accentColor;
            }
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            if (!error) {
              e.target.style.borderColor = `${hintColor}40`;
            }
            props.onBlur?.(e);
          }}
          {...props}
        />
        {rightIcon && (
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{ color: hintColor }}
          >
            {rightIcon}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
