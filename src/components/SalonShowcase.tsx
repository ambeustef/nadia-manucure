import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, Award } from 'lucide-react';

interface SalonShowcaseProps {
  onOpenBooking: () => void;
}

export const SalonShowcase: React.FC<SalonShowcaseProps> = ({ onOpenBooking }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      {/* 2-Column Split: Parisian Atelier Atmosphere & Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
        <div className="lg:col-span-7 relative overflow-hidden rounded-sm shadow-xl border border-[#EADBD5] group">
          <img
            src="/images/aurelia_salon_ambiance_1794215078567.jpg"
            alt="Intérieur raffiné du salon de manucure Nadia à Paris avec arches en travertin et pivoines fraîches"
            className="w-full h-full object-cover min-h-[360px] group-hover:scale-102 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1214]/75 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#E8D4A8] block font-body">
              L'Atelier Parisien · Place Vendôme
            </span>
            <h3 className="font-editorial text-2xl md:text-3xl font-normal leading-tight mt-1">
              Un Sanctuaire Dédié à la Beauté du Geste
            </h3>
            <p className="text-xs text-[#E8D7D3] mt-2 max-w-md font-body leading-relaxed">
              Arches minérales en travertin, lumière enveloppante et fauteuils en bouclette pour une parenthèse hors du temps au cœur de Paris.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white/70 backdrop-blur-md border border-[#EADBD5] p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8A7772] mb-2 font-body">
              <span>Haute Manucure</span>
              <span aria-hidden="true">·</span>
              <span>Atelier Privé</span>
              <span aria-hidden="true">·</span>
              <span>Depuis 2021</span>
            </div>

            <h3 className="font-editorial text-2xl md:text-3xl text-[#2B2020] font-normal leading-tight">
              L'Art du Soin & la Précision du Tracé
            </h3>

            <p className="text-xs md:text-sm text-[#63534E] mt-4 leading-relaxed font-body">
              Nadia redéfinit les codes de la manucure contemporaine en alliant protocoles d'orfèvre, respect absolu de la matrice de l'ongle et formules de vernis sans compromis. Nos coloristes élaborent chaque teinte comme un parfum rare.
            </p>

            <div className="mt-6 space-y-3.5 border-t border-[#F0E4E0] pt-6 text-xs text-[#52413D] font-body">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#A8283E] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2C2020] font-medium">Formule Clean 12-Free</strong>
                  <span className="text-[#84726C] text-[11px]">Sans toluène, formaldéhyde ni perturbateurs endocriniens.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#A8283E] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2C2020] font-medium">Huile de Camélia & Kératine Végétale</strong>
                  <span className="text-[#84726C] text-[11px]">Nourrit et renforce durablement la kératine naturelle de l'ongle.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-4 h-4 text-[#A8283E] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2C2020] font-medium">Brillance Miroir Longue Tenue</strong>
                  <span className="text-[#84726C] text-[11px]">Tenue intacte jusqu'à 12 jours sans écaillement avec notre Top Coat Gel.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#F0E4E0] mt-6">
            <button
              onClick={onOpenBooking}
              className="w-full py-3 bg-[#30161C] hover:bg-[#4A0E17] text-white text-xs uppercase tracking-[0.24em] font-medium transition-colors cursor-pointer"
            >
              Prendre Rendez-vous au Salon
            </button>
          </div>
        </div>
      </div>

      {/* Editorial Quote Banner */}
      <div className="bg-[#FAF0ED] border border-[#EADBD5] p-8 md:p-12 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9A8782] block font-body">
            Éditorial Beauté Paris
          </span>
          <blockquote className="font-editorial text-2xl md:text-3xl text-[#2C2020] italic font-normal leading-relaxed">
            "Une manucure Nadia ne s'admire pas seulement : elle transforme le geste de la main en une déclaration de pure grâce."
          </blockquote>
          <div className="flex items-center justify-center gap-2 text-xs text-[#84726C] pt-2 font-body">
            <span>Éléonore de Rochechouart</span>
            <span aria-hidden="true">·</span>
            <span>Rédactrice en chef Beauté & Joaillerie</span>
          </div>
        </div>
      </div>
    </div>
  );
};
