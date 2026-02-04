import type { ReactNode } from 'react';

interface SafeAreaProps {
  children: ReactNode;
  className?: string;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}

export default function SafeArea({
  children,
  className = '',
  top = true,
  bottom = true,
  left = true,
  right = true,
}: SafeAreaProps) {
  // Use CSS env() for native safe areas
  const style = {
    paddingTop: top ? 'env(safe-area-inset-top, 0px)' : 0,
    paddingBottom: bottom ? 'env(safe-area-inset-bottom, 0px)' : 0,
    paddingLeft: left ? 'env(safe-area-inset-left, 0px)' : 0,
    paddingRight: right ? 'env(safe-area-inset-right, 0px)' : 0,
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
