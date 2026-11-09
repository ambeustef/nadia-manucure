import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NailColor, NailFinish, NailShape } from '../types.ts';
import { NAIL_SHADES, FINISH_OPTIONS, NAIL_SHAPES } from '../data/shades.ts';
import { luxuryAudio } from '../utils/audio.ts';
import { X, Sparkles, Sun, Check, ArrowLeft, Camera, RefreshCw } from 'lucide-react';
import { NAIL_ARTS, NailArtDefs, NailArtLayer, NailArtId } from './NailArtDesigns.tsx';

// Outline of the nail in aurelia_macro_nail (1024x1024), in the overlay's 0-100 viewBox
const MACRO_NAIL_PATH = 'M68.8,18.4 C70.2,19 71.4,19.6 72.3,20.4 C73.2,21.6 73.6,22.8 73.7,24.2 C73.9,25.8 73.9,27.5 73.7,29.1 C73.6,31 73.4,32.8 73,34.6 C72.6,36.3 72.2,37.9 71.6,39.5 C71,41 70.3,42.4 69.5,43.7 C68.7,45.1 67.8,46.5 66.8,47.8 C65.7,49.3 64.5,50.7 63.3,52 C62.2,53.1 61.1,54.2 59.9,55.1 C58.7,55.8 57.5,56.2 56.3,56.4 C54.9,56.6 53.5,56.6 52.2,56.4 C50.5,56.1 48.9,55.7 47.4,55.1 C45.8,54.2 44.4,53.2 43.3,52 C42.3,50.7 41.6,49.3 41.1,47.8 C40.8,46.4 40.7,45 40.8,43.7 C40.9,42.5 41.3,41.3 41.8,40.1 C42.9,38.2 44.1,36.4 45.3,34.6 C46.6,32.9 48,31.3 49.4,29.8 C51,28.1 52.6,26.5 54.3,24.9 C55.9,23.7 57.5,22.5 59.2,21.5 C60.8,20.6 62.4,19.7 64,19 C65.6,18.5 67.2,18.2 68.8,18.4 Z';

interface MacroStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColor: NailColor;
  onSelectColor: (color: NailColor) => void;
  activeFinish: NailFinish;
  onChangeFinish: (finish: NailFinish) => void;
}

export const MacroStudioModal: React.FC<MacroStudioModalProps> = ({
  isOpen,
  onClose,
  selectedColor,
  onSelectColor,
  activeFinish,
  onChangeFinish,
}) => {
  const [selectedShape, setSelectedShape] = useState<NailShape>('almond');
  const [glossIntensity, setGlossIntensity] = useState<number>(85);
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [nailArt, setNailArt] = useState<NailArtId>('none');
  const [showInspiration, setShowInspiration] = useState<boolean>(false);

  const activeArt = NAIL_ARTS.find((a) => a.id === nailArt) ?? NAIL_ARTS[0];
  const hasArt = nailArt !== 'none';

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A0E12]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#FAF4F2] border border-[#EADBD5] shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#EADBD5] bg-white/70 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-1.5 text-[#6E5B56] hover:text-[#2C2020] transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A8782] block font-body">
                  Studio Macro Photographique · Haute Résolution
                </span>
                <h3 className="font-editorial text-2xl text-[#2B2020] font-normal leading-tight">
                  Examen Clinique & Brillance de l'Ongle
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`text-xs px-3 py-1.5 border transition-all cursor-pointer ${
                  compareMode
                    ? 'bg-[#30161C] text-white border-[#30161C]'
                    : 'bg-white text-[#6E5B56] border-[#DECBC4] hover:bg-[#F3E7E3]'
                }`}
              >
                {compareMode ? 'Affichage Nuance' : 'Mode Comparatif (Ongle Nu)'}
              </button>

              <button
                onClick={onClose}
                className="p-2 text-[#7E6A65] hover:text-[#2C2020] hover:bg-[#EEDFD8] transition-colors cursor-pointer"
                aria-label="Fermer la vue macro"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Content Grid: Macro Lens View (Left) & Haute Manucure Controls (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
            {/* Left 7 cols: Macro Studio Photograph with Dynamic Lacquer Blend */}
            <div className="lg:col-span-7 bg-[#F0E4E0] p-4 sm:p-8 flex flex-col items-center justify-center relative min-h-[380px] sm:min-h-[460px]">
              {/* Luxury Frame Container */}
              <div className="relative w-full max-w-md aspect-square rounded-sm overflow-hidden shadow-2xl border border-white/80 bg-white">
                {/* Ultra Macro Studio Shot of Fingertip & Cuticle */}
                <img
                  src="/images/aurelia_macro_nail_1794215076573.jpg"
                  alt="Gros plan macro photographique d'un ongle féminin parfaitement façonné"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                />

                {/* SVG Overlay calibrated for the macro nail in the center */}
                {!compareMode && (
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <defs>
                      {/* Macro 3D cylinder lacquer gradient for opaque salon coat */}
                      <linearGradient id="macroCylinderLacquer" x1="0%" y1="0%" x2="100%" y2="0%">
                        {/* Mostly solid shade for an even, uniform lacquer; only gentle edge shading */}
                        <stop offset="0%" stopColor={selectedColor.deepHex} stopOpacity="1" />
                        <stop offset="25%" stopColor={selectedColor.hex} stopOpacity="1" />
                        <stop offset="75%" stopColor={selectedColor.hex} stopOpacity="1" />
                        <stop offset="100%" stopColor={selectedColor.deepHex} stopOpacity="1" />
                      </linearGradient>

                      {/* Macro softbox gloss specular highlight */}
                      <linearGradient id="macroSpecular" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity={`${(glossIntensity / 100) * 0.95}`} />
                        <stop offset="40%" stopColor="#FFFFFF" stopOpacity={`${(glossIntensity / 100) * 0.55}`} />
                        <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                      </linearGradient>

                      {/* Chrome Rainbow Specular */}
                      <linearGradient id="macroChrome" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                        <stop offset="25%" stopColor="#FDE68A" stopOpacity="0.65" />
                        <stop offset="55%" stopColor="#F472B6" stopOpacity="0.55" />
                        <stop offset="85%" stopColor="#60A5FA" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#C084FC" stopOpacity="0.35" />
                      </linearGradient>

                      {/* Golden micro-flakes */}
                      <radialGradient id="goldSpecks" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FDE047" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#CA8A04" stopOpacity="0" />
                      </radialGradient>
                      {/* Exact outline of the macro nail traced on the photo (1024px image / 10.24) */}
                      <clipPath id="macroNailClip" clipPathUnits="userSpaceOnUse">
                        <path d={MACRO_NAIL_PATH} />
                      </clipPath>
                      <filter id="macroFeather" x="-10%" y="-10%" width="120%" height="120%">
                        <feGaussianBlur stdDeviation="0.15" />
                      </filter>
                      <filter id="macroCuticleBlur" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" />
                      </filter>
                      <NailArtDefs />
                    </defs>

                    {/* Every lacquer layer is clipped to the real nail outline */}
                    <g clipPath="url(#macroNailClip)">
                    <g transform="rotate(33, 57, 37)">
                      {/* Signature Nadia nail art replaces the plain lacquer when selected */}
                      {hasArt ? (
                        <NailArtLayer design={nailArt} gloss={glossIntensity} />
                      ) : (
                      <ellipse
                        cx="57"
                        cy="37"
                        rx="24"
                        ry="34"
                        fill="url(#macroCylinderLacquer)"
                        style={{
                          opacity: 0.98,
                          transition: 'fill 300ms ease, opacity 300ms ease',
                        }}
                      />
                      )}

                      {/* Cuticle base shadow */}
                      <ellipse
                        cx="57"
                        cy="58"
                        rx="16"
                        ry="6"
                        fill={hasArt ? '#7A3B3B' : selectedColor.deepHex}
                        filter="url(#macroCuticleBlur)"
                        style={{
                          mixBlendMode: 'multiply',
                          opacity: 0.3,
                        }}
                      />

                      {/* Specific Finish Highlights */}
                      {activeFinish === 'glossy' && (
                        <ellipse
                          cx="60.5"
                          cy="32.5"
                          rx="5.5"
                          ry="11.5"
                          fill="url(#macroSpecular)"
                          style={{
                            mixBlendMode: 'screen',
                            opacity: glossIntensity / 100,
                          }}
                        />
                      )}

                      {!hasArt && activeFinish === 'chrome' && (
                        <ellipse
                          cx="57"
                          cy="36"
                          rx="14.8"
                          ry="17.2"
                          fill="url(#macroChrome)"
                          style={{
                            mixBlendMode: 'screen',
                            opacity: 0.7,
                          }}
                        />
                      )}

                      {!hasArt && activeFinish === 'glitter' && (
                        <g style={{ mixBlendMode: 'screen' }}>
                          <circle cx="53" cy="30" r="1.4" fill="url(#goldSpecks)" />
                          <circle cx="61" cy="36" r="1.8" fill="url(#goldSpecks)" />
                          <circle cx="57" cy="42" r="1.2" fill="url(#goldSpecks)" />
                          <circle cx="63" cy="28" r="1.5" fill="#FFFFFF" opacity="0.85" />
                          <circle cx="51" cy="38" r="1.3" fill="url(#goldSpecks)" />
                        </g>
                      )}

                      {!hasArt && activeFinish === 'french' && (
                        <path
                          d="M 43 27 Q 57 21 71 27 Q 57 24 43 27"
                          fill="#FFFFFF"
                          style={{ opacity: 0.96 }}
                        />
                      )}

                      {!hasArt && activeFinish === 'goldleaf' && (
                        <g style={{ mixBlendMode: 'screen' }}>
                          <path
                            d="M 52 40 L 56 38 L 55 42 Z"
                            fill="#FACC15"
                            opacity="0.9"
                          />
                          <path
                            d="M 58 41 L 62 39 L 60 43 Z"
                            fill="#EAB308"
                            opacity="0.85"
                          />
                        </g>
                      )}
                    </g>
                    </g>

                    {/* Thin lacquer rim following the real nail edge */}
                    <path
                      d={MACRO_NAIL_PATH}
                      fill="none"
                      stroke={hasArt ? activeArt.rim : selectedColor.deepHex}
                      strokeWidth="0.25"
                      opacity="0.6"
                      filter="url(#macroFeather)"
                    />
                  </svg>
                )}

                {/* Macro metadata badge */}
                <div className="absolute top-3 left-3 bg-[#1A0E12]/80 backdrop-blur-md px-2.5 py-1 text-[10px] text-white flex items-center gap-1.5 border border-white/20">
                  <Camera className="w-3 h-3 text-[#E8D4A8]" />
                  <span className="font-mono tracking-wider">MACRO 60mm · f/2.8 · 1:1</span>
                </div>

                {/* Live shade watermark */}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 text-right border border-[#EADBD5]">
                  <span className="block text-[8px] uppercase tracking-[0.2em] text-[#8C7974]">
                    {hasArt ? 'Signature Nadia' : selectedColor.number}
                  </span>
                  <span className="block text-xs font-serif font-medium text-[#2C2020]">
                    {hasArt ? activeArt.label : selectedColor.name}
                  </span>
                </div>
              </div>

              {/* Gloss intensity slider */}
              <div className="w-full max-w-md mt-4 flex items-center justify-between gap-4 text-xs font-body text-[#6C5B56]">
                <div className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-[#B87A65]" />
                  <span>Intensité du reflet softbox :</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={glossIntensity}
                    onChange={(e) => setGlossIntensity(Number(e.target.value))}
                    className="w-28 accent-[#A8283E] cursor-pointer"
                  />
                  <span className="font-mono tabular-nums text-[11px] w-8 text-right">
                    {glossIntensity}%
                  </span>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Customization Studio Controls */}
            <div className="lg:col-span-5 p-6 flex flex-col justify-between gap-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Signature Nadia nail art, inspired by her own creations */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#463834] font-body flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#E5007A]" />
                      Nail Art Signature Nadia
                    </span>
                    <button
                      onClick={() => setShowInspiration((v) => !v)}
                      className="text-[11px] text-[#9E3349] hover:text-[#5B1220] underline underline-offset-2 cursor-pointer"
                    >
                      {showInspiration ? 'Masquer ses créations' : 'Voir ses créations'}
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {showInspiration && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mb-3"
                      >
                        <img
                          src="/images/nadia_creations.jpg"
                          alt="Créations de Nadia : french fuchsia 3D, tigre orange et fuchsia, léopard rouge, swirl rouge, guépard et cœur fuchsia"
                          className="w-full max-h-64 object-cover object-center border border-[#EADBD5]"
                          loading="lazy"
                        />
                        <span className="block text-[10px] text-[#8C7A75] italic mt-1 font-serif">
                          Les designs ci-dessous sont inspirés de ces poses réalisées par Nadia.
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-3 gap-2">
                    {NAIL_ARTS.map((art) => {
                      const isSelected = nailArt === art.id;
                      return (
                        <button
                          key={art.id}
                          onClick={() => {
                            luxuryAudio.playSoftClick();
                            setNailArt(art.id);
                          }}
                          className={`p-2 text-left transition-all border cursor-pointer flex flex-col gap-1.5 ${
                            isSelected
                              ? 'bg-[#30161C] text-white border-[#30161C]'
                              : 'bg-white text-[#5E4D48] border-[#E8DDD8] hover:bg-[#F5EAE6]'
                          }`}
                          aria-pressed={isSelected}
                        >
                          <span
                            className="block w-full h-8 rounded-t-full border border-white/70 shadow-inner"
                            style={{ background: art.id === 'none' ? selectedColor.hex : art.swatch }}
                          />
                          <span className="block text-[11px] font-medium leading-tight">{art.label}</span>
                          <span className={`block text-[9px] leading-tight ${isSelected ? 'text-[#D0B2AA]' : 'text-[#96827D]'}`}>
                            {art.sublabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 1. Color Selector directly in Macro Mode (As requested!) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#463834] font-body">
                      1. Nuance de Vernis
                    </span>
                    <span className="text-xs text-[#8C7A75] font-serif italic">
                      {selectedColor.name} ({selectedColor.number})
                    </span>
                  </div>

                  <div className="grid grid-cols-6 gap-2">
                    {NAIL_SHADES.map((shade) => {
                      const isSelected = selectedColor.id === shade.id;
                      return (
                        <button
                          key={shade.id}
                          onClick={() => {
                            luxuryAudio.playBottleSelect();
                            setNailArt('none');
                            onSelectColor(shade);
                          }}
                          className={`relative aspect-square rounded-sm overflow-hidden border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#30161C] ring-2 ring-[#30161C]/30 scale-105'
                              : 'border-white/60 hover:scale-102'
                          }`}
                          style={{ backgroundColor: shade.hex }}
                          title={`${shade.number} · ${shade.name}`}
                        >
                          {isSelected && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Finish / Texture Selector */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#463834] font-body">
                      2. Texture & Finition
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {FINISH_OPTIONS.map((finish) => {
                      const isSelected = activeFinish === finish.id;
                      return (
                        <button
                          key={finish.id}
                          onClick={() => {
                            luxuryAudio.playSoftClick();
                            onChangeFinish(finish.id);
                          }}
                          className={`p-2.5 text-left transition-all border cursor-pointer ${
                            isSelected
                              ? 'bg-[#30161C] text-white border-[#30161C]'
                              : 'bg-white text-[#5E4D48] border-[#E8DDD8] hover:bg-[#F5EAE6]'
                          }`}
                        >
                          <span className="block text-xs font-medium">{finish.label}</span>
                          <span className={`block text-[10px] ${isSelected ? 'text-[#D0B2AA]' : 'text-[#96827D]'}`}>
                            {finish.sublabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Nail Shape Selector (Morphologie de l'ongle) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#463834] font-body">
                      3. Forme Haute Couture
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {NAIL_SHAPES.map((shape) => {
                      const isSelected = selectedShape === shape.id;
                      return (
                        <button
                          key={shape.id}
                          onClick={() => {
                            luxuryAudio.playSoftClick();
                            setSelectedShape(shape.id);
                          }}
                          className={`p-2.5 text-left transition-all border cursor-pointer ${
                            isSelected
                              ? 'bg-white text-[#2B2020] border-[#9E3349] ring-1 ring-[#9E3349]/40'
                              : 'bg-white/60 text-[#6C5B57] border-[#E8DDD8] hover:bg-white'
                          }`}
                        >
                          <span className="block text-xs font-medium">{shape.label}</span>
                          <span className="block text-[10px] text-[#9A8782] line-clamp-1">
                            {shape.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Close & Return to full hand button */}
              <div className="pt-4 border-t border-[#EADBD5]">
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-[#30161C] hover:bg-[#4A0E17] text-white text-xs uppercase tracking-[0.22em] font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Revenir à la Main Complète</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
