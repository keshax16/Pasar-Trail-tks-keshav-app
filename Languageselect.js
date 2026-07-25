import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LANGUAGES } from '@/lib/LanguageContext';
import { useLanguage } from '@/lib/LanguageContext';

export default function LanguageSelect() {
  const navigate = useNavigate();
  const { setLanguage } = useLanguage();

  const handleSelect = (code) => {
    setLanguage(code);
    // If visitor already set up, go home; otherwise show setup
    const existing = localStorage.getItem('cq_visitor_name');
    navigate(existing ? '/' : '/setup');
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: 'url(https://media.base44.com/images/public/69caae09ed6c6cde4f05e64d/471e0d121_generated_image.png) center/cover no-repeat',
        minHeight: '100svh',
      }}
    >
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-sm px-5"
      >
        {/* Title banner */}
        <div
          className="text-center px-6 py-4 rounded-2xl mb-6 shadow-2xl"
          style={{
            background: 'linear-gradient(180deg, #e8d07a 0%, #c8a84b 60%, #b8922a 100%)',
            border: '3px solid #8B6010',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <p className="font-heading text-2xl font-bold" style={{ color: '#3d1f00' }}>🌏 Choose Language</p>
          <p className="font-body text-xs mt-1" style={{ color: '#6b4010' }}>Cultural Quest KL</p>
        </div>

        {/* Language grid */}
        <div className="grid grid-cols-2 gap-3">
          {LANGUAGES.map((lang, i) => (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07, type: 'spring', stiffness: 200 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => handleSelect(lang.code)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg hover:brightness-110 transition-all"
              style={{
                background: 'linear-gradient(135deg, #f5e6b8 0%, #e8d07a 100%)',
                border: '2px solid #a07820',
              }}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="text-left">
                <p className="font-heading text-sm font-bold" style={{ color: '#3d1f00' }}>{lang.native}</p>
                <p className="font-body text-[10px]" style={{ color: '#6b4010' }}>{lang.label}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
