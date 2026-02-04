import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, icon, rightIcon, style, ...props }, ref) => {
    return (
      <div style={{ position: 'relative' }}>
        {icon && (
          <div
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </div>
        )}
        <input
          ref={ref}
          style={{
            width: '100%',
            paddingTop: '14px',
            paddingBottom: '14px',
            paddingLeft: icon ? '48px' : '16px',
            paddingRight: rightIcon ? '48px' : '16px',
            backgroundColor: '#1a1a1a',
            border: `2px solid ${error ? '#ef4444' : '#27272a'}`,
            borderRadius: '12px',
            color: '#ffffff',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.2s',
            ...style,
          }}
          onFocus={(e) => {
            e.target.style.borderColor = error ? '#ef4444' : '#22c55e';
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? '#ef4444' : '#27272a';
            props.onBlur?.(e);
          }}
          {...props}
        />
        {rightIcon && (
          <div
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
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
