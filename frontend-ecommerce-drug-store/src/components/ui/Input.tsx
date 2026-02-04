import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, icon, rightIcon, className = "", ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`w-full py-3.5 bg-[#1a1a1a] border-2 rounded-xl text-white text-base outline-none transition-colors ${
            icon ? 'pl-12' : 'pl-4'
          } ${rightIcon ? 'pr-12' : 'pr-4'} ${
            error ? 'border-red-500' : 'border-zinc-800 focus:border-green-500'
          } ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
