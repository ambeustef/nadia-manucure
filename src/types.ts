export interface NailColor {
  id: 'nude' | 'rose' | 'rouge' | 'corail' | 'violet' | 'bordeaux';
  number: string;
  name: string;
  frenchTitle: string;
  hex: string;
  deepHex: string;
  lightHex: string;
  ambientBg: string;
  glowColor: string;
  description: string;
  notes: string[];
  inspiration: string;
}

export type NailFinish = 'glossy' | 'matte' | 'chrome' | 'glitter' | 'french' | 'goldleaf';

export interface NailFinishOption {
  id: NailFinish;
  label: string;
  sublabel: string;
  description: string;
}

export type NailShape = 'almond' | 'square' | 'oval' | 'stiletto';

export interface NailShapeOption {
  id: NailShape;
  label: string;
  description: string;
}

export interface FingerConfig {
  id: string;
  name: string;
  labelFr: string;
  x: number;       // Native X in the hand photo pixel coordinates
  y: number;       // Native Y in the hand photo pixel coordinates
  rx: number;      // Radius X in px
  ry: number;      // Radius Y in px
  xPercent: number; // Center X in %
  yPercent: number; // Center Y in %
  rotate: number;   // Rotation angle in deg
  zoomScale: number;
  nailPath: string; // Exact nail outline (SVG path) in the hand photo pixel coordinates
}
