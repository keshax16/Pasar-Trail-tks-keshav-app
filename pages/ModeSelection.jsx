import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Store, Shield, Globe, UserPlus } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useFestival } from '@/lib/FestivalContext';
import { getVisitorName, clearVisitor } from '@/lib/visitor';

export default function ModeSelection() {
  const { t, lang } = useLanguage();
  const { theme } = useFestival();
  const navigate = useNavigate();

  const modes = [
    {
      to: '/visitor/interests',
      icon: <Compass className="w-7 h-7" style={{ color: '#c87020' }} />,
      iconBg: 'linear-gradient(135deg, #fff8e0, #f5e6a0)',
      iconBorder: '#c8a040',
      label: t('visitor'),
      desc: t('visitorDesc'),
      emoji: '🗺️',
      badge: '✓',
    },
    {
      to: '/shopkeeper/login',
      icon: <Store className="w-7 h-7" style={{ color: '#2a7a20' }} />,
      iconBg: 'linear-gradient(135deg, #e8f5e0, #c8e8a0)',
      iconBorder: '#60a040',
      label: t('shopkeeper'),
      desc: t('shopkeeperDesc'),
      emoji: '🏪',
    },
    {
      to: '/admin/login',
      icon: <Shield className="w-7 h-7" style={{ color: '#c82020' }} />,
      iconBg: 'linear-gradient(135deg, #f5e0e0, #e8a0a0)',
      iconBorder: '#c04040',
      label: 'Admin',
      desc: 'Control center & festival themes',
      emoji: '🛡️',
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between relative overflow-hidden"
      style={{ background: theme.bg, minHeight: '100svh' }}
    >
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Festival decorations */}
      {theme.decorations?.map((deco, i) => (
        <motion.div key={i} className="absolute text-2xl pointer-events-none select-none"
          style={{ left: `${8 + i * 22}%`, top: `${10 + (i % 3) * 18}%` }}
          animate={{ opacity: [0.3, 0.8, 0.3], y: [0, -8, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}>
          {deco}
        </motion.div>
      ))}

      {/* Default sparkles */}
      {!theme.decorations && [...Array(8)].map((_, i) => (
        <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-yellow-300 pointer-events-none"
          style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 15}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }} />
      ))}

      {/* Top section */}
      <div className="relative z-10 w-full flex flex-col items-center pt-10 px-5">
        <div className="w-full flex items-center justify-between mb-3">
          <button onClick={() => navigate('/language')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body text-white/80 hover:text-white transition-colors"
            style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <Globe className="w-3.5 h-3.5" />
            {lang?.toUpperCase() || 'EN'}
          </button>
          <button
            onClick={() => {
              clearVisitor();
              navigate('/setup');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body text-white/80 hover:text-white transition-colors"
            style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <UserPlus className="w-3.5 h-3.5" />
            {getVisitorName() ? `Switch Visitor` : 'New Visitor'}
          </button>
        </div>

        {/* Parchment banner */}
        <motion.div initial={{ opacity: 0, y: -30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, type: 'spring' }} className="relative w-full max-w-xs mb-2">
          <div className="relative px-6 py-4 text-center shadow-2xl"
            style={{
              background: theme.bannerBg,
              borderRadius: '8px',
              clipPath: 'polygon(0% 10%, 3% 0%, 97% 0%, 100% 10%, 100% 90%, 97% 100%, 3% 100%, 0% 90%)',
              border: `3px solid ${theme.bannerBorder}`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}>
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-8 rounded-l" style={{ background: theme.bannerBorder }} />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-8 rounded-r" style={{ background: theme.bannerBorder }} />
            <div className="text-2xl mb-1">{theme.emoji}</div>
            <h1 className="font-heading text-2xl font-bold leading-tight" style={{ color: theme.textPrimary }}>
              {t('chooseAdventure')}
            </h1>
            <p className="font-body text-xs mt-0.5" style={{ color: theme.textSec }}>{theme.name} · {t('appTagline')}</p>
          </div>
        </motion.div>

        <div className="flex gap-2 my-3 opacity-60">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: theme.cardBorder }} />
          ))}
        </div>
      </div>

      {/* Mode cards */}
      <div className="relative z-10 w-full max-w-sm px-5 flex flex-col gap-4 flex-1 justify-center">
        {modes.map((mode, i) => (
          <motion.div key={mode.to}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.15, type: 'spring', stiffness: 180 }}>
            <Link to={mode.to}>
              <div className="relative flex items-center gap-4 px-4 py-4 rounded-2xl shadow-xl hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                style={{ background: theme.cardBg, border: `3px solid ${theme.cardBorder}`, boxShadow: '0 6px 20px rgba(0,0,0,0.4)' }}>
                <div className="absolute inset-0 rounded-2xl opacity-5 pointer-events-none"
                  style={{ backgroundImage: 'repeating-linear-gradient(45deg, #8B6914 0, #8B6914 1px, transparent 0, transparent 50%)', backgroundSize: '8px 8px' }} />
                <div className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center shadow-inner"
                  style={{ background: mode.iconBg, border: `2px solid ${mode.iconBorder}` }}>
                  {mode.icon}
                </div>
                <div className="flex-1">
                  <h2 className="font-heading text-xl font-bold" style={{ color: theme.textPrimary }}>{mode.label}</h2>
                  <p className="font-body text-xs mt-0.5" style={{ color: theme.textSec }}>{mode.desc}</p>
                </div>
                <div className="shrink-0 text-2xl">{mode.emoji}</div>
                {mode.badge && (
                  <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow">
                    <span className="text-white text-xs font-bold">{mode.badge}</span>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Treasure chest */}
      <motion.div initial={{ opacity: 0, scale: 0.5, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 150 }}
        className="relative z-10 pb-8 flex flex-col items-center">
        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative text-7xl drop-shadow-2xl" style={{ filter: `drop-shadow(0 0 18px ${theme.goldenColor || '#f5d020'})` }}>
          {theme.chestEmoji}
        </motion.div>
        {theme.trailDecos?.map((d, i) => (
          <motion.div key={i} className="absolute text-sm" style={{ bottom: `${20 + i * 8}px`, left: `${30 + i * 15}%` }}
            animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}>
            {d}
          </motion.div>
        ))}
        <p className="font-body text-xs text-white/60 mt-2">Central Market, Kuala Lumpur</p>
      </motion.div>
    </div>
  );
}
