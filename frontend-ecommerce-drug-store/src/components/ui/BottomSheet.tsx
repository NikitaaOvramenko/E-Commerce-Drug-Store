import { type ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: string;
  showHandle?: boolean;
}

export default function BottomSheet({
  open,
  onClose,
  children,
  height = "80%",
  showHandle = true,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const { secondaryBgColor, hintColor } = useTelegramTheme();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        if (overlayRef.current) overlayRef.current.style.opacity = "1";
        if (sheetRef.current) sheetRef.current.style.transform = "translateY(0)";
      });
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY;
    const delta = currentY.current - startY.current;
    if (delta > 0 && sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${delta}px)`;
    }
  };

  const handleTouchEnd = () => {
    const delta = currentY.current - startY.current;
    if (sheetRef.current) {
      sheetRef.current.style.transform = "";
    }
    if (delta > 100) {
      onClose();
    }
    startY.current = 0;
    currentY.current = 0;
  };

  if (!open) return null;

  return createPortal(
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 opacity-0"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 rounded-t-3xl z-50 transition-transform duration-300 ease-out translate-y-full"
        style={{ height, maxHeight: "90vh", backgroundColor: secondaryBgColor }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Handle */}
        {showHandle && (
          <div className="flex justify-center py-3 cursor-grab active:cursor-grabbing">
            <div
              className="w-10 h-1 rounded-full"
              style={{ backgroundColor: hintColor }}
            />
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto h-full pb-safe">{children}</div>
      </div>
    </>,
    document.body,
  );
}
