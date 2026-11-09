import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NailColor, NailFinish, FingerConfig } from '../types.ts';
import { FINGERS_CONFIG, FINISH_OPTIONS, HAND_IMAGE } from '../data/shades.ts';
import { luxuryAudio } from '../utils/audio.ts';
import { ZoomIn, ZoomOut, Sparkles, Eye, Layers, Palette, Sun, Check } from 'lucide-react';
import { UvCuringModal } from './UvCuringModal.tsx';

interface LuxuryHandSimulatorProps {
  selectedColor: NailColor;
  activeFinish: NailFinish;
  onChangeFinish: (finish: NailFinish) => void;
  onOpenMacroModal: () => void;
}

export const LuxuryHandSimulator: React.FC<LuxuryHandSimulatorProps> = ({
  selectedColor,
  activeFinish,
  onChangeFinish,
  onOpenMacroModal,
}) => {
  const [hoveredFinger, setHoveredFinger] = useState<FingerConfig | null>(null);
  const [selectedFinger, setSelectedFinger] = useState<FingerConfig | null>(null);
  const [isNaturalView, setIsNaturalView] = useState<boolean>(false);
  const [isCuring, setIsCuring] = useState<boolean>(false);
  const [cureFlash, setCureFlash] = useState<number>(0); // increments on each finished cure to replay the shine

  const handleCureClose = (cured: boolean) => {
    setIsCuring(false);
    if (cured) {
      setIsNaturalView(false);
      setCureFlash((n) => n + 1);
    }
  };

  // Close zoom on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedFinger) {
        setSelectedFinger(null);
        luxuryAudio.playSoftClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFinger]);

  const handleFingerClick = (finger: FingerConfig) => {
    luxuryAudio.playSoftClick();
    if (selectedFinger?.id === finger.id) {
      setSelectedFinger(null);
    } else {
      setSelectedFinger(finger);
    }
  };

  const handleResetZoom = () => {
    luxuryAudio.playSoftClick();
    setSelectedFinger(null);
  };

  // Determine transform origin in percent for smooth camera zoom
  const zoomOrigin = selectedFinger
    ? `${selectedFinger.xPercent}% ${selectedFinger.yPercent}%`
    : '50% 50%';

  const zoomScale = selectedFinger ? selectedFinger.zoomScale : 1;

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 pt-6 pb-6 select-none">
      {/* Top Controls Bar within simulator container */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-xs font-body">
        {/* Left: View status / Mode */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-[#E8DCD6] text-[#4A3C38] shadow-sm">
            <span
              className="w-2.5 h-2.5 rounded-full shadow-inner border border-white"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <span className="font-medium tracking-wide">
              {selectedFinger ? `Gros plan · ${selectedFinger.name}` : `Main complète · ${selectedColor.name}`}
            </span>
          </div>

          <button
            onClick={() => setIsNaturalView(!isNaturalView)}
            className={`px-3 py-1.5 border transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
              isNaturalView
                ? 'bg-[#30161C] text-white border-[#30161C]'
                : 'bg-white/80 backdrop-blur-md border-[#E8DCD6] text-[#695752] hover:text-[#2C2424]'
            }`}
            title="Comparer avec l'ongle naturel sans vernis"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isNaturalView ? 'Vernis masqué (Naturel)' : 'Masquer le vernis (Avant/Après)'}</span>
          </button>

          <button
            onClick={() => {
              luxuryAudio.playSoftClick();
              setIsCuring(true);
            }}
            className="px-3 py-1.5 border border-[#D9CCF5] bg-[#F3EEFF] text-[#4B2FB8] hover:bg-[#E8E0FF] transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            title="Sécher le vernis sous la lampe UV/LED"
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Sécher sous UV</span>
          </button>
        </div>

        {/* Center: Interactive guidance hint */}
        <div className="hidden sm:flex items-center gap-1.5 text-[#88746F] text-[11px] italic">
          <Sparkles className="w-3.5 h-3.5 text-[#B87A65]" />
          <span>Cliquez sur l'un des {FINGERS_CONFIG.length} ongles pour zoomer en très gros plan</span>
        </div>

        {/* Right: Reset Zoom or Switch to Ultra HD Macro Studio */}
        <div className="flex items-center gap-2">
          {selectedFinger && (
            <button
              onClick={handleResetZoom}
              className="px-3.5 py-1.5 bg-white hover:bg-[#FAF4F2] text-[#30161C] border border-[#D5C2BB] shadow-sm transition-all flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <ZoomOut className="w-3.5 h-3.5" />
              <span>Vue d'ensemble</span>
              <kbd className="text-[9px] px-1 bg-[#F2E8E4] text-[#7A6761] border border-[#E0D0CA]">Échap</kbd>
            </button>
          )}

          <button
            onClick={onOpenMacroModal}
            className="px-3.5 py-1.5 bg-[#F6ECE7] hover:bg-[#EEDFD8] text-[#4A1621] border border-[#DECBC4] transition-all flex items-center gap-1.5 font-medium cursor-pointer shadow-sm"
          >
            <ZoomIn className="w-3.5 h-3.5 text-[#A8283E]" />
            <span>Studio Macro Ultra-HD</span>
          </button>
        </div>
      </div>

      {/* Main Photographic Simulator Viewport */}
      <div
        className="relative w-full rounded-sm overflow-hidden shadow-2xl border border-[#EADBD5] bg-[#F7EBE8]"
        style={{
          aspectRatio: `${HAND_IMAGE.width} / ${HAND_IMAGE.height}`,
          // Portrait photos: cap the height to ~85% of the screen and center the frame
          maxWidth: `min(100%, calc(85vh * ${HAND_IMAGE.width} / ${HAND_IMAGE.height}))`,
          marginInline: 'auto',
          boxShadow: '0 25px 60px -15px rgba(110, 65, 65, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.9) inset',
        }}
      >
        {/* Soft Ambient Mood Lighting tinted subtly with selected lacquer */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-1000 z-0 opacity-30 mix-blend-soft-light"
          style={{
            background: `radial-gradient(circle at 65% 45%, ${selectedColor.hex} 0%, transparent 70%)`,
          }}
        />

        {/* Animated Zooming Canvas Container */}
        <div
          className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transformOrigin: zoomOrigin,
            transform: `scale(${zoomScale})`,
          }}
        >
          {/* High-Resolution Feminine Hand Studio Photograph */}
          <img
            src={HAND_IMAGE.src}
            alt="Deux mains féminines aux ongles amande, entourées de fleurs séchées"
            className="w-full h-full object-cover select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />

          {/* SVG Multi-Layered Nail Lacquer Layer calibrated in the hand photo pixel coordinates */}
          <svg
            key={`lacquer-${cureFlash}`}
            className={`absolute inset-0 w-full h-full pointer-events-none z-10 ${cureFlash ? 'nail-cure-shine' : ''}`}
            viewBox={`0 0 ${HAND_IMAGE.width} ${HAND_IMAGE.height}`}
            preserveAspectRatio="none"
          >
            <defs>
              {/* 3D Cylindrical Lacquer Gradient for each nail angle */}
              <linearGradient id="liveLacquerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                {/* Mostly solid shade for an even, uniform lacquer; only gentle edge shading */}
                <stop offset="0%" stopColor={selectedColor.deepHex} stopOpacity="1" />
                <stop offset="28%" stopColor={selectedColor.hex} stopOpacity="1" />
                <stop offset="72%" stopColor={selectedColor.hex} stopOpacity="1" />
                <stop offset="100%" stopColor={selectedColor.deepHex} stopOpacity="1" />
              </linearGradient>

              {/* Specular softbox glossy gleam */}
              <linearGradient id="specularCurve" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.5" />
                <stop offset="65%" stopColor="#FFFFFF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>

              {/* Holographic chrome / iridescent gradient */}
              <linearGradient id="chromeRainbow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="25%" stopColor="#FDE68A" stopOpacity="0.65" />
                <stop offset="50%" stopColor="#F472B6" stopOpacity="0.55" />
                <stop offset="75%" stopColor="#60A5FA" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#C084FC" stopOpacity="0.35" />
              </linearGradient>

              {/* Golden micro-glitter pattern */}
              <pattern id="goldGlitterPattern" width="12" height="12" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="1.6" fill="#FDE047" opacity="0.9" />
                <circle cx="9" cy="8" r="1.4" fill="#FFFFFF" opacity="0.95" />
                <circle cx="8" cy="2" r="1.2" fill="#EAB308" opacity="0.8" />
              </pattern>

              {/* Cuticle soft blend filter */}
              <filter id="softCuticle" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="0.6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Exact nail outlines traced on the photo: every lacquer layer is clipped to them */}
              {FINGERS_CONFIG.map((finger) => (
                <clipPath key={finger.id} id={`nailClip-${finger.id}`} clipPathUnits="userSpaceOnUse">
                  <path d={finger.nailPath} />
                </clipPath>
              ))}

              {/* Wide blur for the cuticle shadow so it fades instead of drawing a crescent */}
              <filter id="cuticleShadowBlur" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="9" />
              </filter>

              {/* Soft feathered edge so the lacquer melts into the cuticle */}
              <filter id="nailFeather" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="0.7" />
              </filter>
            </defs>

            {/* Render realistic, fully opaque, colored nail lacquer on all 5 fingers */}
            {!isNaturalView &&
              FINGERS_CONFIG.map((finger) => {
                const isFingerFocused = selectedFinger?.id === finger.id;

                return (
                  <g key={finger.id}>
                  <g clipPath={`url(#nailClip-${finger.id})`}>
                  <g
                    transform={`translate(${finger.x}, ${finger.y}) rotate(${finger.rotate})`}
                    className="transition-all duration-300"
                  >
                    {/* Layer 1: OPAQUE base lacquer completely coloring the nail and white tip
                        (oversized ellipse, trimmed to the real nail outline by the clip path) */}
                    <ellipse
                      cx="0"
                      cy="0"
                      rx={finger.rx * 1.35}
                      ry={finger.ry * 1.35}
                      fill="url(#liveLacquerGrad)"
                      filter="url(#softCuticle)"
                      style={{
                        opacity: 0.98,
                        transition: 'fill 350ms cubic-bezier(0.16,1,0.3,1)',
                      }}
                    />

                    {/* Layer 2: Subtle translucent cuticle shadow for 3D depth into nail fold */}
                    <ellipse
                      cx="0"
                      cy={finger.ry * 1.05}
                      rx={finger.rx * 1.2}
                      ry={finger.ry * 0.35}
                      fill={selectedColor.deepHex}
                      filter="url(#cuticleShadowBlur)"
                      style={{
                        mixBlendMode: 'multiply',
                        opacity: 0.35,
                        transition: 'fill 350ms ease',
                      }}
                    />

                    {/* Layer 3: High-Gloss Specular Softbox Highlight Bar */}
                    {activeFinish === 'glossy' && (
                      <ellipse
                        cx={-finger.rx * 0.3}
                        cy="0"
                        rx={finger.rx * 0.16}
                        ry={finger.ry * 0.7}
                        fill="url(#specularCurve)"
                        style={{
                          mixBlendMode: 'screen',
                          opacity: 0.85,
                        }}
                      />
                    )}

                    {/* Layer 4: Matte Velvet Finish attenuation */}
                    {activeFinish === 'matte' && (
                      <ellipse
                        cx="0"
                        cy="0"
                        rx={finger.rx * 1.4}
                        ry={finger.ry * 1.4}
                        fill="#FFFFFF"
                        style={{
                          mixBlendMode: 'soft-light',
                          opacity: 0.2,
                        }}
                      />
                    )}

                    {/* Layer 5: Glazed Chrome Iridescent Sheen */}
                    {activeFinish === 'chrome' && (
                      <ellipse
                        cx="0"
                        cy="0"
                        rx={finger.rx * 1.4}
                        ry={finger.ry * 1.4}
                        fill="url(#chromeRainbow)"
                        style={{
                          mixBlendMode: 'screen',
                          opacity: 0.65,
                        }}
                      />
                    )}

                    {/* Layer 6: Golden Shimmer Glitter */}
                    {activeFinish === 'glitter' && (
                      <ellipse
                        cx="0"
                        cy="0"
                        rx={finger.rx * 1.4}
                        ry={finger.ry * 1.4}
                        fill="url(#goldGlitterPattern)"
                        style={{
                          mixBlendMode: 'screen',
                          opacity: 0.85,
                        }}
                      />
                    )}

                    {/* Layer 7: French Chic Tip on top of active shade */}
                    {activeFinish === 'french' && (
                      <path
                        d={`M -${finger.rx * 0.88} -${finger.ry * 0.55} 
                           Q 0 -${finger.ry * 0.98} 
                             ${finger.rx * 0.88} -${finger.ry * 0.55} 
                           Q 0 -${finger.ry * 0.72} 
                             -${finger.rx * 0.88} -${finger.ry * 0.55}`}
                        fill="#FFFFFF"
                        style={{ opacity: 0.98 }}
                      />
                    )}

                    {/* Layer 8: 24k Gold Leaf Flakes */}
                    {activeFinish === 'goldleaf' && (
                      <g style={{ mixBlendMode: 'screen' }}>
                        <polygon
                          points={`-${finger.rx * 0.4},${finger.ry * 0.3} -${finger.rx * 0.1},${finger.ry * 0.15} -${finger.rx * 0.25},${finger.ry * 0.45}`}
                          fill="#FDE047"
                          opacity="0.9"
                        />
                        <polygon
                          points={`${finger.rx * 0.15},${finger.ry * 0.25} ${finger.rx * 0.4},${finger.ry * 0.1} ${finger.rx * 0.35},${finger.ry * 0.4}`}
                          fill="#EAB308"
                          opacity="0.85"
                        />
                      </g>
                    )}

                  </g>
                  </g>

                  {/* Lacquer rim following the real nail edge: hides the photo's own polish at the border */}
                  <path
                    d={finger.nailPath}
                    fill="none"
                    stroke={selectedColor.hex}
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                    filter="url(#nailFeather)"
                    style={{ transition: 'stroke 350ms ease' }}
                  />
                  <path
                    d={finger.nailPath}
                    fill="none"
                    stroke={selectedColor.deepHex}
                    strokeWidth="1"
                    opacity="0.5"
                    filter="url(#nailFeather)"
                  />

                  {/* Focused active finger indicator: dashed outline around the real nail */}
                  {isFingerFocused && (
                    <path
                      d={finger.nailPath}
                      fill="none"
                      stroke="#FAF5F2"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      opacity="0.9"
                    />
                  )}
                  </g>
                );
              })}
          </svg>

          {/* Interactive Clickable Hotspots for Each Finger */}
          <div className="absolute inset-0 z-20 pointer-events-auto">
            {FINGERS_CONFIG.map((finger) => {
              const isHovered = hoveredFinger?.id === finger.id;
              const isSelected = selectedFinger?.id === finger.id;

              return (
                <div
                  key={finger.id}
                  style={{
                    left: `${finger.xPercent}%`,
                    top: `${finger.yPercent}%`,
                    width: '8%',
                    height: '10%',
                    transform: `translate(-50%, -50%) rotate(${finger.rotate}deg)`,
                  }}
                  className="absolute cursor-pointer group"
                  onClick={() => handleFingerClick(finger)}
                  onMouseEnter={() => setHoveredFinger(finger)}
                  onMouseLeave={() => setHoveredFinger(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Zoomer sur le ${finger.name}`}
                >
                  {/* Subtle target ring on hover */}
                  <div
                    className={`w-full h-full rounded-full transition-all duration-300 border ${
                      isSelected
                        ? 'border-white/90 bg-white/20 scale-110 shadow-lg'
                        : isHovered
                        ? 'border-[#B87A65]/90 bg-[#B87A65]/15 scale-105'
                        : 'border-transparent'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Toast after a UV cure */}
        <AnimatePresence>
          {cureFlash > 0 && (
            <motion.div
              key={`cure-toast-${cureFlash}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: [0, 1, 1, 0], y: 0 }}
              transition={{ duration: 3.2, times: [0, 0.1, 0.8, 1] }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none px-3 py-1.5 bg-white/90 backdrop-blur-md border border-[#EADBD5] shadow-lg text-[11px] text-[#2C2020] flex items-center gap-1.5 whitespace-nowrap"
            >
              <Check className="w-3.5 h-3.5 text-[#2E8B57]" />
              Séché sous UV · tenue jusqu'à 3 semaines
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Finger Tooltip Indicator (when hovered & not zoomed) */}
        <AnimatePresence>
          {hoveredFinger && !selectedFinger && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              className="absolute z-30 pointer-events-none px-3 py-1.5 bg-[#2B1B1D]/90 backdrop-blur-md text-[#FAF5F2] text-[11px] shadow-xl border border-white/20 flex items-center gap-1.5"
              style={{
                left: `${hoveredFinger.xPercent}%`,
                top: `${hoveredFinger.yPercent - 8}%`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <ZoomIn className="w-3 h-3 text-[#E8D4A8]" />
              <span className="font-serif tracking-wider font-medium">{hoveredFinger.name}</span>
              <span className="text-[10px] text-[#D0B8B2]">· Cliquer pour zoomer</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Zoom Controls & Finish Switcher Overlay when Zoomed In */}
        <AnimatePresence>
          {selectedFinger && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-3 inset-x-3 z-30 bg-[#FAF4F2]/95 backdrop-blur-lg border border-[#EADBD5] shadow-2xl p-3 md:p-4"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-[#F0E4E0] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg text-[#2C2020] font-medium">
                      Zoom Macro · {selectedFinger.name}
                    </span>
                    <span className="text-[11px] text-[#8A7772]">
                      ({selectedColor.name})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={onOpenMacroModal}
                      className="text-[11px] uppercase tracking-wider text-[#9E3349] hover:text-[#5B1220] font-medium transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      Studio HD
                    </button>
                    <button
                      onClick={handleResetZoom}
                      className="p-1 text-[#786762] hover:text-[#2C2020] cursor-pointer"
                      title="Quitter le zoom"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Finger selector pills */}
                <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#9E8A84] shrink-0 font-body">
                    Doigt :
                  </span>
                  <div className="flex items-center gap-1">
                    {FINGERS_CONFIG.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => handleFingerClick(f)}
                        className={`px-2.5 py-1 text-xs transition-colors cursor-pointer ${
                          selectedFinger.id === f.id
                            ? 'bg-[#30161C] text-white font-medium'
                            : 'bg-white text-[#65534F] hover:bg-[#F2E5E1]'
                        }`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Finish & Texture Selector directly in Zoom Mode! */}
                <div className="flex items-center justify-between gap-1 pt-1 border-t border-[#F0E4E0]">
                  <span className="text-[10px] uppercase tracking-wider text-[#9E8A84] shrink-0 font-body">
                    Fini :
                  </span>
                  <div className="flex items-center gap-1.5 overflow-x-auto">
                    {FINISH_OPTIONS.slice(0, 4).map((fin) => (
                      <button
                        key={fin.id}
                        onClick={() => {
                          luxuryAudio.playSoftClick();
                          onChangeFinish(fin.id);
                        }}
                        className={`px-2.5 py-1 text-[11px] transition-colors cursor-pointer whitespace-nowrap ${
                          activeFinish === fin.id
                            ? 'bg-[#A8283E] text-white font-medium'
                            : 'bg-white/80 text-[#594844] hover:bg-[#F0E2DE]'
                        }`}
                      >
                        {fin.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Finishes Quick Strip beneath simulator */}
      <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-4 border border-[#EADBD5] shadow-sm">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#A8283E]" />
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#463834] font-body">
            Finition de la laque :
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {FINISH_OPTIONS.map((option) => {
            const isActive = activeFinish === option.id;
            return (
              <button
                key={option.id}
                onClick={() => {
                  luxuryAudio.playSoftClick();
                  onChangeFinish(option.id);
                }}
                className={`px-3 py-1.5 text-xs transition-all cursor-pointer flex flex-col items-start ${
                  isActive
                    ? 'bg-[#30161C] text-white shadow-sm'
                    : 'bg-[#FDF9F7] text-[#63534E] hover:bg-[#F3E7E3] border border-[#E8DDD8]'
                }`}
              >
                <span className="font-medium whitespace-nowrap">{option.label}</span>
                <span className={`text-[9px] ${isActive ? 'text-[#D9B7B0]' : 'text-[#9A8782]'}`}>
                  {option.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <UvCuringModal isOpen={isCuring} selectedColor={selectedColor} onClose={handleCureClose} />
    </div>
  );
};
