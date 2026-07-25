import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useFestival } from '@/lib/FestivalContext';

export default function VisitorSetup() {
  const navigate = useNavigate();
  const { theme } = useFestival();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // If already set up, skip
    const existing = localStorage.getItem('cq_visitor_name');
    if (existing) navigate('/', { replace: true });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a username.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    localStorage.setItem('cq_visitor_name', username.trim());
    localStorage.setItem('cq_visitor_email', email.trim().toLowerCase());
    navigate('/', { replace: true });
  };

  const handleSkip = () => {
    // Already has an account — skip setup
    const existing = localStorage.getItem('cq_visitor_name');
    if (existing) {
      navigate('/', { replace: true });
    } else {
      setError('No existing account found. Please create one above.');
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden p-5"
      style={{ background: theme.bg, minHeight: '100svh' }}
    >
      {/* Background sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-yellow-300 pointer-events-none"
          style={{ left: `${10 + i * 15}%`, top: `${15 + (i % 3) * 20}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Banner */}
        <div
          className="text-center px-6 py-5 rounded-2xl mb-6 shadow-2xl"
          style={{
            background: theme.bannerBg,
            border: `3px solid ${theme.bannerBorder}`,
          }}
        >
          <div className="text-3xl mb-2">{theme.emoji}</div>
          <h1 className="font-heading text-2xl font-bold" style={{ color: theme.textPrimary }}>
            Welcome, Explorer!
          </h1>
          <p className="font-body text-xs mt-1" style={{ color: theme.textSec }}>
            Create your profile to start the quest
          </p>
        </div>

        {/* Form card */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <User className="w-4 h-4 text-amber-700" />
            </div>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(''); }}
              className="w-full pl-10 pr-4 py-3.5 rounded-2xl font-body text-sm outline-none"
              style={{
                background: 'linear-gradient(135deg, #f5e6b8 0%, #e8d07a 100%)',
                border: `2px solid ${theme.bannerBorder}`,
                color: '#3d1f00',
              }}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Mail className="w-4 h-4 text-amber-700" />
            </div>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              className="w-full pl-10 pr-4 py-3.5 rounded-2xl font-body text-sm outline-none"
              style={{
                background: 'linear-gradient(135deg, #f5e6b8 0%, #e8d07a 100%)',
                border: `2px solid ${theme.bannerBorder}`,
                color: '#3d1f00',
              }}
            />
          </div>

          {error && (
            <p className="font-body text-xs text-red-300 text-center px-2">{error}</p>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.96 }}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-heading text-base font-bold shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${theme.bannerBorder}, ${theme.cardBorder})`,
              color: 'white',
              textShadow: '0 1px 3px rgba(0,0,0,0.4)',
              border: `2px solid ${theme.cardBorder}`,
            }}
          >
            Start My Quest
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>

        {/* Already have account */}
        <div className="mt-4 text-center">
          <button
            onClick={handleSkip}
            className="flex items-center justify-center gap-1.5 mx-auto font-body text-xs text-white/60 hover:text-white/90 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            I already have an account — skip
          </button>
        </div>
      </motion.div>
    </div>
  );
}
