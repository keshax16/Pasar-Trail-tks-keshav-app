import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Store, ArrowLeft, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ShopkeeperLogin() {
  const [shopId, setShopId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!shopId.trim()) {
      setError('Please enter your Shop ID');
      return;
    }
    // Store shop ID in session and navigate
    sessionStorage.setItem('shopkeeper_id', shopId.trim());
    navigate('/shopkeeper/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-sm w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 font-body text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary/10 flex items-center justify-center">
            <Store className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Shopkeeper Login</h1>
          <p className="text-muted-foreground font-body text-sm">
            Enter your Shop ID to access your dashboard
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <div className="relative">
            <KeyRound className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Enter Shop ID (e.g. 0000)"
              value={shopId}
              onChange={(e) => { setShopId(e.target.value); setError(''); }}
              className="pl-10 h-12 rounded-xl font-body text-base border-2 focus:border-secondary"
            />
          </div>
          {error && <p className="text-destructive text-sm font-body">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-secondary text-secondary-foreground font-heading text-base h-12 rounded-xl hover:opacity-90"
          >
            Access Dashboard
          </Button>
          <p className="text-center text-xs text-muted-foreground font-body mt-4">
            For MVP, use Shop ID: <span className="font-bold text-foreground">0000</span>
          </p>
        </motion.form>
      </div>
    </div>
  );
}
