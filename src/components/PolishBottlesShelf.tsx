import React from 'react';
import { NailColor } from '../types.ts';
import { NAIL_SHADES } from '../data/shades.ts';
import { luxuryAudio } from '../utils/audio.ts';
import { Sparkles, Check } from 'lucide-react';

interface PolishBottlesShelfProps {
  selectedColor: NailColor;
  onSelectColor: (color: NailColor) => void;
}

export const PolishBottlesShelf: React.FC<PolishBottlesShelfProps> = ({
  selectedColor,
  onSelectColor,
}) => {
  const handleBottleClick = (shade: NailColor) => {
    luxuryAudio.playBottleSelect();
    onSelectColor(shade);
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 pt-4 pb-10">
      {/* Editorial section header */}
      <div className="text-center mb-8">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#8E7974] block font-body">
          La Collection Privée · 6 Nuances Iconiques
        </span>
        <h2 className="font-editorial text-2xl md:text-3xl text-[#2B2222] font-normal tracking-wide mt-1">
          Sélectionnez Votre Vernis Haute Précision
        </h2>
        <p className="text-xs text-[#7A6B67] mt-1.5 max-w-lg mx-auto font-body">
          Chaque formule est enrichie en résine végétale et pigments purs pour un éclat miroir instantané.
        </p>
      </div>

      {/* 6 Luxury Bottles Shelf, staged over the spilled-lacquer photograph */}
      <div className="relative overflow-hidden rounded-sm border border-[#EADBD5] shadow-xl bg-white">
        <img
          src="/images/nadia_polish_splash.jpg"
          alt="Flacons de vernis renversés, éclaboussures de laque rouge, dorée et bleu nuit"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          loading="lazy"
        />
        {/* Veil: photo stays vivid at the top, fades to soft white behind the bottles */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/35 to-white/90 pointer-events-none" />

        <div className="relative z-10 pt-36 sm:pt-52 md:pt-64 pb-5 px-3 sm:px-6">
        <div className="bg-white/70 backdrop-blur-md border border-white/80 shadow-lg px-3 sm:px-6 pt-8 pb-4">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 md:gap-6 justify-items-center items-end relative z-10">
          {NAIL_SHADES.map((shade, idx) => {
            const isSelected = selectedColor.id === shade.id;

            return (
              <button
                key={shade.id}
                onClick={() => handleBottleClick(shade)}
                className="group relative flex flex-col items-center cursor-pointer transition-all duration-300 focus:outline-none"
                aria-label={`Sélectionner le vernis ${shade.name}`}
              >
                {/* Active selection aura / halo */}
                {isSelected && (
                  <div
                    className="absolute -inset-2 rounded-2xl blur-md opacity-70 transition-opacity pointer-events-none"
                    style={{ backgroundColor: shade.glowColor }}
                  />
                )}

                {/* Bottle body wrapper with lift on active/hover */}
                <div
                  className={`relative flex flex-col items-center transition-all duration-300 ease-out ${
                    isSelected
                      ? '-translate-y-4 scale-105'
                      : 'hover:-translate-y-2 group-hover:scale-[1.02]'
                  }`}
                >
                  {/* Cap: Brushed champagne gold cylinder with metallic highlight */}
                  <div className="relative w-8 md:w-9 h-11 md:h-12 rounded-t-sm shadow-md overflow-hidden bg-gradient-to-r from-[#CBB084] via-[#F4E6C3] to-[#A38657] border-t border-l border-r border-[#E8D4A8]/60">
                    {/* Vertical specular sheen line */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent w-full -skew-x-12 translate-x-1" />
                    {/* Subtle ribbed cap ring */}
                    <div className="absolute bottom-1 inset-x-0 h-[2px] bg-[#8B6E3F]/40" />
                    <div className="absolute top-1 inset-x-0 h-[1px] bg-white/50" />
                  </div>

                  {/* Bottle Neck connector */}
                  <div className="w-5 h-1.5 bg-[#4B403B] rounded-none opacity-80" />

                  {/* Glass Bottle Body (Square Crystal Glass Silhouette) */}
                  <div className="relative w-14 md:w-16 h-18 md:h-20 rounded-b-md shadow-xl overflow-hidden bg-[#FFFFFF]/80 backdrop-blur-sm border border-[#FFFFFF]/90 p-1.5 flex flex-col justify-end">
                    {/* Glass bevel highlights */}
                    <div className="absolute inset-0 border border-white/60 pointer-events-none" />
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/80" />
                    <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-black/10" />

                    {/* Liquid reservoir interior */}
                    <div
                      className="relative w-full h-[82%] rounded-sm shadow-inner transition-colors duration-500 overflow-hidden flex flex-col justify-between items-center p-1"
                      style={{
                        background: `linear-gradient(135deg, ${shade.lightHex} 0%, ${shade.hex} 45%, ${shade.deepHex} 100%)`,
                      }}
                    >
                      {/* Fluid meniscus highlight curve */}
                      <div className="w-full h-1.5 bg-white/35 rounded-full blur-[0.5px]" />

                      {/* Editorial bottle mini label */}
                      <div className="w-full bg-[#FAF5F2]/95 py-1 px-0.5 text-center shadow-sm rounded-[1px] border border-[#E8DCD6]/80">
                        <span className="block text-[6.5px] uppercase tracking-[0.25em] text-[#2C2424] font-serif font-bold">
                          NADIA
                        </span>
                        <span className="block text-[5.5px] uppercase tracking-[0.15em] text-[#8C7A75] font-sans">
                          {shade.number}
                        </span>
                      </div>

                      {/* Bottom glass crystal thickness */}
                      <div className="w-full h-2 bg-gradient-to-t from-white/30 to-transparent" />
                    </div>

                    {/* Glass bottom refraction block */}
                    <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-b from-transparent to-[#B4A099]/30 pointer-events-none" />
                  </div>

                  {/* Ground shadow beneath bottle */}
                  <div
                    className={`h-2.5 rounded-full blur-[3px] transition-all duration-300 mt-1 ${
                      isSelected ? 'w-16 bg-[#2B1B1B]/25' : 'w-12 bg-[#2B1B1B]/15'
                    }`}
                  />
                </div>

                {/* Shade label below bottle */}
                <div className="text-center mt-2 w-full">
                  <span className="block text-[10px] tracking-[0.18em] font-mono uppercase text-[#96827D]">
                    {shade.number}
                  </span>
                  <span
                    className={`block text-xs font-medium tracking-wide transition-colors ${
                      isSelected ? 'text-[#2C2424] font-semibold' : 'text-[#6C5B57] group-hover:text-[#2C2424]'
                    }`}
                  >
                    {shade.name.split(' ')[0]}
                  </span>
                  <span className="block text-[10px] text-[#A3928E] italic font-serif">
                    {shade.frenchTitle}
                  </span>
                </div>

                {/* Selected indicator check badge */}
                {isSelected && (
                  <div className="mt-1 flex items-center justify-center w-4 h-4 rounded-full bg-[#30161C] text-white">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        </div>
        </div>
      </div>

      {/* Dynamic Detailed Shade Story Card */}
      <div className="mt-8 bg-white/70 backdrop-blur-md border border-[#EADBD5] rounded-none p-5 md:p-6 shadow-sm transition-all duration-500 max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#F0E4E0] pb-4">
          <div className="flex items-center gap-3">
            <span
              className="w-5 h-5 rounded-full shadow-inner border border-white"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#9A8782] block font-body">
                Nuance Active · {selectedColor.number}
              </span>
              <h3 className="font-editorial text-xl md:text-2xl text-[#2B2020] font-normal">
                {selectedColor.name} — <span className="italic text-[#756460]">{selectedColor.frenchTitle}</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#7B6A66] font-body">
            <Sparkles className="w-3.5 h-3.5 text-[#B87A65]" />
            <span className="italic">" {selectedColor.inspiration} "</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-xs md:text-sm text-[#5C4C48] leading-relaxed max-w-xl font-body">
            {selectedColor.description}
          </p>

          <div className="flex items-center gap-2 text-[11px] text-[#6E5D59] shrink-0 font-body">
            {selectedColor.notes.map((note, nIdx) => (
              <React.Fragment key={nIdx}>
                {nIdx > 0 && <span className="text-[#C4B2AC]">·</span>}
                <span>{note}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
