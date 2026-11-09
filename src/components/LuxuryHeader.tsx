import React from 'react';
import { Volume2, VolumeX, Sparkles, Calendar } from 'lucide-react';
import { luxuryAudio } from '../utils/audio.ts';

interface LuxuryHeaderProps {
  onOpenBooking: () => void;
  onOpenMacroModal: () => void;
  onScrollToSimulator: () => void;
  onScrollToCollection: () => void;
  onScrollToAtelier: () => void;
}

export const LuxuryHeader: React.FC<LuxuryHeaderProps> = ({
  onOpenBooking,
  onOpenMacroModal,
  onScrollToSimulator,
  onScrollToCollection,
  onScrollToAtelier,
}) => {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isAmbientOn, setIsAmbientOn] = React.useState(false);

  const toggleSoundMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    luxuryAudio.setMuted(next);
  };

  const toggleAmbientMusic = () => {
    const next = luxuryAudio.toggleAmbient();
    setIsAmbientOn(next);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF4F2]/90 backdrop-blur-md border-b border-[#EADBD5]/70 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element in editorial serif) */}
        <button
          onClick={onScrollToSimulator}
          className="text-left group cursor-pointer"
          aria-label="NADIA Paris - Accueil"
        >
          <span className="font-editorial text-2xl md:text-3xl tracking-[0.28em] text-[#2C2424] font-medium uppercase group-hover:text-[#4A0E17] transition-colors whitespace-nowrap shrink-0">
            NADIA
          </span>
          <span className="block text-[9px] tracking-[0.38em] uppercase text-[#8C7A75] -mt-1 font-body">
            Haute Manucure · Paris
          </span>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.22em] text-[#635450] font-medium font-body">
          <button
            onClick={onScrollToSimulator}
            className="hover:text-[#2C2424] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Simulateur
          </button>
          <button
            onClick={onOpenMacroModal}
            className="hover:text-[#2C2424] transition-colors whitespace-nowrap shrink-0 cursor-pointer inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-[#B87A65]" />
            Studio Macro HD
          </button>
          <button
            onClick={onScrollToCollection}
            className="hover:text-[#2C2424] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Collection
          </button>
          <button
            onClick={onScrollToAtelier}
            className="hover:text-[#2C2424] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            L'Atelier Vendôme
          </button>
        </nav>

        {/* Zone 3: Audio controls + 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleAmbientMusic}
            title={isAmbientOn ? "Désactiver l'ambiance sonore" : "Ambiance sonore salon"}
            className={`p-2.5 rounded-full border transition-all text-xs cursor-pointer ${
              isAmbientOn
                ? 'border-[#B87A65] bg-[#EEDBD5]/60 text-[#4A0E17]'
                : 'border-[#E2D2CC] text-[#7E6D68] hover:border-[#B87A65] hover:text-[#2C2424]'
            }`}
            aria-label="Ambiance sonore"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          <button
            onClick={toggleSoundMute}
            title={isMuted ? 'Activer le son' : 'Couper le son des clics'}
            className="p-2.5 rounded-full border border-[#E2D2CC] text-[#7E6D68] hover:border-[#B87A65] hover:text-[#2C2424] transition-colors cursor-pointer"
            aria-label="Sourdine"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <span className="text-[10px] uppercase font-mono tracking-wider">FX</span>}
          </button>

          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 text-xs uppercase tracking-[0.22em] font-medium text-white bg-[#30161C] hover:bg-[#4A0E17] rounded-none shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer whitespace-nowrap shrink-0 inline-flex items-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Réserver un Soin</span>
          </button>
        </div>
      </div>
    </header>
  );
};
