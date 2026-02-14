import { useEffect, useRef } from "react";
import WAVES from "vanta/dist/vanta.waves.min";
import * as THREE from "three";
import { useTelegramTheme } from "@/hooks/useTelegramTheme";

window.THREE = THREE;

export default function Background() {
  const vantaRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const effectRef = useRef<any>(null);
  const { bgColor } = useTelegramTheme();

  useEffect(() => {
    if (!vantaRef.current) return;

    if (effectRef.current) effectRef.current.destroy();

    try {
      effectRef.current = WAVES({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1,
        scaleMobile: 1.0,
        color: Number(bgColor),
        shininess: 20,
        waveHeight: 20,
        waveSpeed: 0.5,
        zoom: 1,
      });
    } catch (e) {
      console.error("Vanta init error:", e);
    }

    return () => {
      if (effectRef.current) effectRef.current.destroy();
    };
  }, []);

  return <div ref={vantaRef} className="vanta z-10 fixed inset-0 " />;
}
