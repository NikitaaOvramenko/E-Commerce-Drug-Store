import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  bgColor?: string;
  textColor?: string;
  hintColor?: string;
  accentColor?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
}

function Input({ className, type, bgColor, textColor, hintColor, accentColor, icon, rightIcon, error, style, ...props }: InputProps) {
  const inputElement = (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        icon && "pl-10",
        rightIcon && "pr-10",
        error && "border-red-500",
        className
      )}
      style={{
        ...(bgColor && { backgroundColor: bgColor }),
        ...(textColor && { color: textColor }),
        ...(hintColor && { borderColor: error ? undefined : `${hintColor}40` }),
        ...(accentColor && { '--accent': accentColor } as React.CSSProperties),
        ...style,
      }}
      {...props}
    />
  );

  if (!icon && !rightIcon) {
    return inputElement;
  }

  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: hintColor }}>
          {icon}
        </div>
      )}
      {inputElement}
      {rightIcon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightIcon}
        </div>
      )}
    </div>
  );
}

export { Input }
