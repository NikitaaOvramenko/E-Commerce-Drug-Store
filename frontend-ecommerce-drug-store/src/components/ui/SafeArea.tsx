import type { CSSProperties, ReactNode } from "react";

interface SafeAreaProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}

export default function SafeArea({
  children,
  className = "",
  style = {},
  top = true,
  bottom = true,
  left = true,
  right = true,
}: SafeAreaProps) {
  // Use CSS env() for native safe areas, merge with passed style
  const combinedStyle: CSSProperties = {
    paddingTop: top ? "env(safe-area-inset-top, 0px)" : 0,
    paddingBottom: bottom ? "env(safe-area-inset-bottom, 0px)" : 0,
    paddingLeft: left ? "env(safe-area-inset-left, 0px)" : 0,
    paddingRight: right ? "env(safe-area-inset-right, 0px)" : 0,
    ...style,
  };

  return (
    <div className={className} style={combinedStyle}>
      {children}
    </div>
  );
}
