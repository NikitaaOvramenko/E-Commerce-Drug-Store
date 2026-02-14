declare module "vanta/dist/vanta.waves.min" {
  interface VantaWavesOptions {
    el: HTMLElement;
    THREE: typeof import("three");
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    shininess?: number;
    waveHeight?: number;
    waveSpeed?: number;
    zoom?: number;
  }

  interface VantaEffect {
    destroy: () => void;
  }

  export default function WAVES(options: VantaWavesOptions): VantaEffect;
}