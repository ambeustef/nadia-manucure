import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export const LuxuryFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
    }
  };

  return (
    <footer className="border-t border-[#E8DCD6] bg-[#FAF3F0] text-[#4A3C38] pt-14 pb-12 font-body">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E8DDD8]">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-editorial text-2xl tracking-[0.25em] text-[#2C2424] font-medium uppercase block">
              NADIA
            </span>
            <p className="text-xs text-[#7A6B66] leading-relaxed max-w-sm">
              Maison de haute manucure parisienne et laboratoire de formules végétales pures. Conçu pour sublimer la main avec la grâce d'un bijou.
            </p>
            <div className="text-[11px] text-[#9A8782] pt-2">
              <span>18 Place Vendôme, 75001 Paris</span>
              <span className="block mt-0.5">contact@nadia-paris.com · +33 1 42 68 00 00</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-2 space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#2C2424] block mb-3">
              Maison Nadia
            </span>
            <ul className="space-y-1.5 text-xs text-[#6F5E59]">
              <li><a href="#simulateur" className="hover:text-[#2C2424] transition-colors">Simulateur 3D</a></li>
              <li><a href="#collection" className="hover:text-[#2C2424] transition-colors">Collection 6 Nuances</a></li>
              <li><a href="#atelier" className="hover:text-[#2C2424] transition-colors">L'Atelier Vendôme</a></li>
              <li><a href="#soins" className="hover:text-[#2C2424] transition-colors">Carte des Soins</a></li>
            </ul>
          </div>

          {/* Col 3: Protocoles & Clean Beauty */}
          <div className="md:col-span-2 space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#2C2424] block mb-3">
              Engagements
            </span>
            <ul className="space-y-1.5 text-xs text-[#6F5E59]">
              <li>Formule 12-Free Certifiée</li>
              <li>Résines Végétales Nobles</li>
              <li>Non Testé sur les Animaux</li>
              <li>Flacons en Verre Recyclé</li>
            </ul>
          </div>

          {/* Col 4: Newsletter Privilège */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#2C2424] block">
              La Gazette Privée
            </span>
            <p className="text-xs text-[#7A6B66] leading-relaxed">
              Recevez en avant-première nos nouvelles créations chromatiques et invitations aux ateliers privés.
            </p>
            {isSubscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#4A0E17] bg-[#EEDBD5]/60 p-2.5">
                <Check className="w-4 h-4 text-[#A8283E]" />
                <span>Votre invitation a été transmise avec succès.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Votre adresse e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border border-[#E0D0CA] px-3 py-2 text-xs text-[#2C2424] flex-1 focus:outline-none focus:border-[#4A0E17]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#30161C] hover:bg-[#4A0E17] text-white text-xs uppercase tracking-wider font-medium cursor-pointer transition-colors"
                >
                  S'inscrire
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#9A8782]">
          <div>
            © {new Date().getFullYear()} Nadia Haute Manucure Paris. Tous droits réservés.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#4A3C38] cursor-pointer">Mentions Légales</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-[#4A3C38] cursor-pointer">Politique de Confidentialité</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-[#4A3C38] cursor-pointer">Conditions Générales</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
