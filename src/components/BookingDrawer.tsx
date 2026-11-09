import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, MapPin, Check, Sparkles, User, Mail, Phone } from 'lucide-react';
import { NailColor } from '../types.ts';

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColor: NailColor;
}

const TREATMENTS = [
  {
    id: 'russe',
    title: 'Manucure Russe Signature',
    duration: '60 min',
    price: '95 €',
    desc: 'Nettoyage parfait des cuticules au micromoteur, renforcement kératine et pose laque miroir.',
  },
  {
    id: 'gel',
    title: 'Pose Gel & Nail Art Sur-Mesure',
    duration: '90 min',
    price: '145 €',
    desc: 'Extension sculpturale en gel, chromage nacré ou feuille d’or 24 carats par nos artistes.',
  },
  {
    id: 'spa',
    title: 'Soin Spa Mains aux Huiles Précieuses',
    duration: '45 min',
    price: '75 €',
    desc: 'Gommage aux sels roses de l’Himalaya, masque nourrissant à la camomille et modelage relaxant.',
  },
];

export const BookingDrawer: React.FC<BookingDrawerProps> = ({
  isOpen,
  onClose,
  selectedColor,
}) => {
  const [selectedTreatment, setSelectedTreatment] = useState(TREATMENTS[0].id);
  const [date, setDate] = useState('2026-11-14');
  const [time, setTime] = useState('14:30');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmed(true);
  };

  const handleReset = () => {
    setIsConfirmed(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-[#FAF5F2] h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#EADBD5]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#EADBD5] bg-white/70 backdrop-blur-md flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A8782] block font-body">
                L'Atelier Nadia · Place Vendôme
              </span>
              <h3 className="font-editorial text-2xl text-[#2B2020] font-normal">
                Réserver un Rendez-vous
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#7E6A65] hover:text-[#2C2020] cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto flex-1">
            {isConfirmed ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#30161C] text-[#E8D4A8] mx-auto flex items-center justify-center shadow-lg">
                  <Check className="w-8 h-8" />
                </div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#9A8782] block">
                  Confirmation Enregistrée
                </span>
                <h4 className="font-editorial text-3xl text-[#2C2020]">
                  Merci, {fullName || 'Chère Cliente'}
                </h4>
                <p className="text-xs text-[#6A5853] max-w-sm mx-auto leading-relaxed">
                  Votre séance a été réservée avec succès pour le <strong className="text-[#2C2020]">{date}</strong> à <strong className="text-[#2C2020]">{time}</strong> avec la nuance sélectionnée <span className="font-medium text-[#4A0E17]">{selectedColor.name}</span>. Un e-mail de confirmation vous a été adressé.
                </p>
                <div className="pt-6">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-[#30161C] text-white text-xs uppercase tracking-[0.2em] font-medium cursor-pointer"
                  >
                    Retourner à l'Expérience
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Active shade reminder badge */}
                <div className="p-3 bg-white border border-[#EADBD5] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: selectedColor.hex }}
                    />
                    <div className="text-xs">
                      <span className="text-[#8F7D78] text-[10px] block uppercase tracking-wider">
                        Nuance souhaitée
                      </span>
                      <span className="font-medium text-[#2C2020]">
                        {selectedColor.name} ({selectedColor.number})
                      </span>
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 text-[#B87A65]" />
                </div>

                {/* Treatment selection */}
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] font-medium text-[#4B3B37] mb-3">
                    1. Sélection du Soin
                  </label>
                  <div className="space-y-2.5">
                    {TREATMENTS.map((t) => {
                      const isSel = selectedTreatment === t.id;
                      return (
                        <div
                          key={t.id}
                          onClick={() => setSelectedTreatment(t.id)}
                          className={`p-3.5 border transition-all cursor-pointer ${
                            isSel
                              ? 'bg-[#30161C] text-white border-[#30161C]'
                              : 'bg-white text-[#4A3C38] border-[#E8DDD8] hover:bg-[#F7EFEA]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold">{t.title}</span>
                            <span className="font-mono text-xs tabular-nums">{t.price}</span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <p className={`text-[11px] ${isSel ? 'text-[#E0CFCA]' : 'text-[#7D6B66]'}`}>
                              {t.desc}
                            </p>
                            <span className={`text-[10px] shrink-0 ml-2 ${isSel ? 'text-[#C9A9A2]' : 'text-[#A08E89]'}`}>
                              {t.duration}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Date and Time */}
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] font-medium text-[#4B3B37] mb-3">
                    2. Date & Créneau
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <Calendar className="w-3.5 h-3.5 absolute left-3 top-3 text-[#8A7772]" />
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-white border border-[#E8DDD8] pl-9 pr-3 py-2 text-xs text-[#2C2020] focus:outline-none focus:border-[#4A0E17]"
                      />
                    </div>
                    <div className="relative">
                      <Clock className="w-3.5 h-3.5 absolute left-3 top-3 text-[#8A7772]" />
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-white border border-[#E8DDD8] pl-9 pr-3 py-2 text-xs text-[#2C2020] focus:outline-none focus:border-[#4A0E17] cursor-pointer"
                      >
                        <option value="10:00">10:00</option>
                        <option value="11:30">11:30</option>
                        <option value="14:30">14:30</option>
                        <option value="16:00">16:00</option>
                        <option value="17:30">17:30</option>
                        <option value="19:00">19:00</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] font-medium text-[#4B3B37] mb-3">
                    3. Vos Coordonnées
                  </label>
                  <div className="space-y-2.5">
                    <div className="relative">
                      <User className="w-3.5 h-3.5 absolute left-3 top-3 text-[#8A7772]" />
                      <input
                        type="text"
                        required
                        placeholder="Prénom & Nom"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-white border border-[#E8DDD8] pl-9 pr-3 py-2 text-xs text-[#2C2020] focus:outline-none focus:border-[#4A0E17]"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-[#8A7772]" />
                      <input
                        type="email"
                        required
                        placeholder="Adresse e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-[#E8DDD8] pl-9 pr-3 py-2 text-xs text-[#2C2020] focus:outline-none focus:border-[#4A0E17]"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-[#8A7772]" />
                      <input
                        type="tel"
                        required
                        placeholder="Numéro de téléphone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-[#E8DDD8] pl-9 pr-3 py-2 text-xs text-[#2C2020] focus:outline-none focus:border-[#4A0E17]"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#30161C] hover:bg-[#4A0E17] text-white text-xs uppercase tracking-[0.24em] font-medium transition-all shadow-md cursor-pointer"
                >
                  Confirmer la Réservation
                </button>
              </form>
            )}
          </div>

          {/* Footer Address */}
          <div className="px-6 py-4 bg-white/50 border-t border-[#EADBD5] flex items-center justify-between text-[11px] text-[#7A6964]">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#B87A65]" />
              <span>18 Place Vendôme, 75001 Paris</span>
            </div>
            <span>Lun - Sam · 10h - 20h</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
