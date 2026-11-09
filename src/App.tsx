import React, { useState, useRef } from 'react';
import { NAIL_SHADES, FINISH_OPTIONS } from './data/shades.ts';
import { NailColor, NailFinish } from './types.ts';
import { LuxuryHeader } from './components/LuxuryHeader.tsx';
import { LuxuryHandSimulator } from './components/LuxuryHandSimulator.tsx';
import { PolishBottlesShelf } from './components/PolishBottlesShelf.tsx';
import { MacroStudioModal } from './components/MacroStudioModal.tsx';
import { BookingDrawer } from './components/BookingDrawer.tsx';
import { SalonShowcase } from './components/SalonShowcase.tsx';
import { LuxuryFooter } from './components/LuxuryFooter.tsx';
import { Sparkles, Compass, Shield, ArrowDown, Share2, Check } from 'lucide-react';

export default function App() {
  const [selectedColor, setSelectedColor] = useState<NailColor>(NAIL_SHADES[1]); // Default to Rose Nymphéa
  const [activeFinish, setActiveFinish] = useState<NailFinish>('glossy');
  const [isMacroModalOpen, setIsMacroModalOpen] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [hasCopiedLook, setHasCopiedLook] = useState<boolean>(false);

  const simulatorRef = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);
  const atelierRef = useRef<HTMLDivElement>(null);

  const scrollToSimulator = () => {
    simulatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCollection = () => {
    collectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAtelier = () => {
    atelierRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShareLook = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(
        `Découvrez mon look NADIA : Vernis ${selectedColor.name} (${selectedColor.number}) en finition ${activeFinish} sur le simulateur haute manucure.`
      );
      setHasCopiedLook(true);
      setTimeout(() => setHasCopiedLook(false), 2500);
    }
  };

  return (
    <div
      className="min-h-screen text-[#2C2424] transition-colors duration-1000 ease-in-out font-body"
      style={{
        backgroundColor: selectedColor.ambientBg,
      }}
    >
      {/* Luxury Navigation Header */}
      <LuxuryHeader
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenMacroModal={() => setIsMacroModalOpen(true)}
        onScrollToSimulator={scrollToSimulator}
        onScrollToCollection={scrollToCollection}
        onScrollToAtelier={scrollToAtelier}
      />

      {/* Hero Editorial Kicker */}
      <section className="pt-10 pb-4 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-[#8C7A75] font-body mb-3">
          <span>Atelier de Haute Manucure</span>
          <span aria-hidden="true">·</span>
          <span>Place Vendôme</span>
          <span aria-hidden="true">·</span>
          <span>Édition 2026</span>
        </div>

        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#2B2020] font-normal tracking-tight leading-[1.12]">
          L'Expérience Interactive de Nail Art
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#6E5D58] max-w-2xl mx-auto font-body leading-relaxed">
          Expérimentez nos six nuances de laques haute couture sur une main réaliste. Cliquez sur un doigt pour déclencher le zoom macro, observer la pureté du reflet et sculpter votre manucure.
        </p>

        {/* Quick action bar */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs">
          <button
            onClick={handleShareLook}
            className="px-4 py-2 bg-white/70 hover:bg-white text-[#4A3B37] border border-[#E0D0CA] transition-all cursor-pointer flex items-center gap-2"
          >
            {hasCopiedLook ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Lien du look copié !</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#B87A65]" />
                <span>Partager mon look</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsMacroModalOpen(true)}
            className="px-4 py-2 bg-[#30161C] hover:bg-[#4A0E17] text-white transition-all cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5DFB5]" />
            <span>Ouvrir le Studio Macro HD</span>
          </button>
        </div>
      </section>

      {/* Simulator Section */}
      <section id="simulateur" ref={simulatorRef} className="scroll-mt-24">
        {/* Main Feminine Hand Realistic Simulator */}
        <LuxuryHandSimulator
          selectedColor={selectedColor}
          activeFinish={activeFinish}
          onChangeFinish={setActiveFinish}
          onOpenMacroModal={() => setIsMacroModalOpen(true)}
        />

        {/* 6 Luxury Bottles Shelf Aligned Beneath the Hand */}
        <PolishBottlesShelf
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
      </section>

      {/* Collection Details Section */}
      <section id="collection" ref={collectionRef} className="py-16 px-4 max-w-6xl mx-auto scroll-mt-20 border-t border-[#EADBD5]">
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#8C7A75] block font-body">
            Les Écrins Couture
          </span>
          <h2 className="font-editorial text-3xl md:text-4xl text-[#2B2020] font-normal mt-1">
            La Palette des Six Nuances Intemporelles
          </h2>
          <p className="text-xs text-[#7A6A65] mt-2 max-w-lg mx-auto">
            Chaque teinte est formulée en laboratoire avec des résines d'origine végétale pour une couvrance veloutée et une brillance miroir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NAIL_SHADES.map((shade) => {
            const isCurrent = selectedColor.id === shade.id;
            return (
              <div
                key={shade.id}
                onClick={() => {
                  setSelectedColor(shade);
                  scrollToSimulator();
                }}
                className={`p-6 bg-white/75 backdrop-blur-sm border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'border-[#30161C] shadow-lg ring-1 ring-[#30161C]/20'
                    : 'border-[#EADBD5] hover:border-[#B87A65] hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#988580]">
                      {shade.number}
                    </span>
                    <span
                      className="w-5 h-5 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: shade.hex }}
                    />
                  </div>

                  <h3 className="font-editorial text-2xl text-[#2C2020] font-normal">
                    {shade.name}
                  </h3>
                  <span className="block text-xs italic font-serif text-[#786661] -mt-0.5 mb-3">
                    {shade.frenchTitle}
                  </span>

                  <p className="text-xs text-[#63534E] leading-relaxed mb-4">
                    {shade.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0E4E0] flex items-center justify-between text-xs">
                  <span className="text-[#A08E89] text-[11px] italic line-clamp-1">
                    {shade.notes[0]}
                  </span>
                  <span className="text-[#30161C] font-medium uppercase tracking-wider text-[10px]">
                    {isCurrent ? 'Actif sur la main' : 'Essayer →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Atelier Parisien Atmosphere Section */}
      <section id="atelier" ref={atelierRef} className="scroll-mt-20">
        <SalonShowcase onOpenBooking={() => setIsBookingOpen(true)} />
      </section>

      {/* Luxury Footer */}
      <LuxuryFooter />

      {/* Studio Macro Ultra-HD Modal */}
      <MacroStudioModal
        isOpen={isMacroModalOpen}
        onClose={() => setIsMacroModalOpen(false)}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
        activeFinish={activeFinish}
        onChangeFinish={setActiveFinish}
      />

      {/* Luxury Booking Drawer */}
      <BookingDrawer
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedColor={selectedColor}
      />
    </div>
  );
}
