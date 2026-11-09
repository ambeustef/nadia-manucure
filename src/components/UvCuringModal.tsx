import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Sun } from 'lucide-react';
import { NailColor } from '../types.ts';
import { luxuryAudio } from '../utils/audio.ts';

interface UvCuringModalProps {
  isOpen: boolean;
  selectedColor: NailColor;
  /** cured = true when the countdown reached 0 and the user asked to see the result */
  onClose: (cured: boolean) => void;
}

// Simulated curing time shown on the lamp display, and the real duration of the animation.
const CURE_SECONDS = 60;
const TICK_MS = 70; // 60 ticks ≈ 4.2 s

// Position of the lamp's LCD in nadia_uv_lamp.jpg (1600x1067), in % of the image.
const LCD = { left: 53.6, top: 24.2, width: 12.6, height: 6.9 };

export const UvCuringModal: React.FC<UvCuringModalProps> = ({ isOpen, selectedColor, onClose }) => {
  const [remaining, setRemaining] = useState(CURE_SECONDS);
  const timer = useRef<number | null>(null);
  const done = remaining <= 0;

  // Restart the countdown every time the modal opens
  useEffect(() => {
    if (!isOpen) return;
    setRemaining(CURE_SECONDS);
    timer.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          if (timer.current) window.clearInterval(timer.current);
          return 0;
        }
        return r - 1;
      });
    }, TICK_MS);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && done) luxuryAudio.playSoftClick();
  }, [isOpen, done]);

  // Escape closes (without the "cured" reveal if not finished)
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose(done);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, done, onClose]);

  const progress = 1 - remaining / CURE_SECONDS;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#1A0E12]/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onClose(done)}
        >
          <motion.div
            className="relative w-full max-w-3xl bg-[#FAF4F2] border border-[#EADBD5] shadow-2xl overflow-hidden"
            initial={{ y: 24, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 16, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Séchage sous lampe UV"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#EADBD5]">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-[#7C5CFF]" />
                <span className="font-editorial text-lg text-[#2C2020]">Séchage sous lampe UV/LED</span>
                <span className="text-[11px] text-[#8A7772]">· {selectedColor.name}</span>
              </div>
              <button
                onClick={() => onClose(done)}
                className="p-1.5 text-[#7E6A65] hover:text-[#2C2020] cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Lamp photograph with live LCD countdown */}
            <div className="relative w-full" style={{ aspectRatio: '1600 / 1067', containerType: 'inline-size' }}>
              <img
                src="/images/nadia_uv_lamp.jpg"
                alt="Main posée dans une lampe UV de manucure allumée"
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              />

              {/* Pulsing UV glow coming out of the lamp opening */}
              {!done && (
                <motion.div
                  className="absolute inset-0 pointer-events-none mix-blend-screen"
                  style={{
                    background:
                      'radial-gradient(ellipse 38% 26% at 58% 56%, rgba(140,110,255,0.55) 0%, rgba(140,110,255,0.18) 45%, transparent 75%)',
                  }}
                  animate={{ opacity: [0.35, 0.9, 0.35] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}

              {/* LCD digits drawn over the lamp's own display, skewed like the photo */}
              <div
                className="absolute flex items-center justify-center"
                style={{
                  left: `${LCD.left}%`,
                  top: `${LCD.top}%`,
                  width: `${LCD.width}%`,
                  height: `${LCD.height}%`,
                  transform: 'translate(-50%, -50%) rotate(2.6deg) skewX(-28deg)',
                  background: '#2B2E33',
                  borderRadius: '0.25cqw',
                  boxShadow: 'inset 0 0 0.6cqw rgba(0,0,0,0.6)',
                }}
                aria-live="polite"
                aria-label={done ? 'Terminé' : `${remaining} secondes restantes`}
              >
                <span
                  className="font-mono font-bold tabular-nums leading-none"
                  style={{
                    fontSize: '4.6cqw',
                    letterSpacing: '0.35cqw',
                    color: done ? '#B8FFCF' : '#F2F4F8',
                    textShadow: '0 0 0.5cqw rgba(255,255,255,0.45)',
                  }}
                >
                  {done ? 'END' : String(remaining).padStart(3, ' ')}
                </span>
              </div>

              {/* Done badge */}
              <AnimatePresence>
                {done && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-1/2 bottom-4 -translate-x-1/2 px-4 py-2 bg-white/90 backdrop-blur-md border border-[#EADBD5] shadow-lg flex items-center gap-2 text-sm text-[#2C2020]"
                  >
                    <Check className="w-4 h-4 text-[#2E8B57]" />
                    Vernis polymérisé : sec, brillant et durable
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress + action */}
            <div className="px-5 py-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-[11px] text-[#7A6762] mb-1.5 font-body">
                  <span>{done ? 'Séchage terminé' : 'Polymérisation en cours…'}</span>
                  <span className="tabular-nums">{Math.round(progress * 100)}%</span>
                </div>
                <div className="h-1.5 bg-[#EADBD5] overflow-hidden">
                  <div
                    className="h-full transition-[width] duration-75 ease-linear"
                    style={{
                      width: `${progress * 100}%`,
                      background: `linear-gradient(90deg, #7C5CFF, ${selectedColor.hex})`,
                    }}
                  />
                </div>
              </div>
              <button
                onClick={() => onClose(true)}
                disabled={!done}
                className={`px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium transition-colors ${
                  done
                    ? 'bg-[#30161C] text-white hover:bg-[#4A1621] cursor-pointer'
                    : 'bg-[#EADBD5] text-[#9A8782] cursor-not-allowed'
                }`}
              >
                Voir mes ongles
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
