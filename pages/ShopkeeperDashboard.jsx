import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Store, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import VisitorActivity from '@/components/shopkeeper/VisitorActivity';
import FlashDealManager from '@/components/shopkeeper/FlashDealManager';
import ShopInfoEditor from '@/components/shopkeeper/ShopInfoEditor';
import ProductManager from '@/components/shopkeeper/ProductManager';
import HappyHourManager from '@/components/shopkeeper/HappyHourManager';
import ShopkeeperAnalytics from '@/components/shopkeeper/ShopkeeperAnalytics';

export default function ShopkeeperDashboard() {
  const navigate = useNavigate();
  const shopId = sessionStorage.getItem('shopkeeper_id');

  useEffect(() => {
    if (!shopId) navigate('/shopkeeper/login');
  }, [shopId, navigate]);

  const { data: shops = [] } = useQuery({
    queryKey: ['shop', shopId],
    queryFn: () => base44.entities.Shop.filter({ shop_id: shopId }),
    enabled: !!shopId,
  });

  const shop = shops[0];

  const { data: checkIns = [] } = useQuery({
    queryKey: ['shop-checkins', shopId],
    queryFn: () => base44.entities.CheckIn.filter({ shop_id: shopId }, '-created_date'),
    enabled: !!shopId,
    refetchInterval: 10000, // Poll every 10s for real-time feel
  });

  const { data: flashDeals = [] } = useQuery({
    queryKey: ['flashdeals', shopId],
    queryFn: () => base44.entities.FlashDeal.filter({ shop_id: shopId }),
    enabled: !!shopId,
  });

  const handleLogout = () => {
    sessionStorage.removeItem('shopkeeper_id');
    navigate('/shopkeeper/login');
  };

  const checkedInCount = checkIns.filter(c => c.status === 'checked_in').length;
  const enRouteCount = checkIns.filter(c => c.status === 'en_route').length;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
            <LogOut className="w-4 h-4 mr-1" /> Logout
          </Button>
        </div>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <Store className="w-6 h-6 text-secondary" />
            <h1 className="font-heading text-2xl font-bold text-foreground">
              {shop?.name || 'Shop Dashboard'}
            </h1>
          </div>
          <p className="text-muted-foreground font-body text-sm mb-2">Shop ID: {shopId}</p>

          {/* Quick stats */}
          <div className="flex gap-3 mb-6">
            <div className="flex items-center gap-2 bg-secondary/10 rounded-lg px-3 py-2">
              <Bell className="w-4 h-4 text-secondary" />
              <span className="font-heading text-sm font-bold text-secondary">{checkedInCount}</span>
              <span className="font-body text-xs text-muted-foreground">checked in</span>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-2">
              <Badge className="bg-transparent text-primary border-0 p-0 font-heading text-sm font-bold">{enRouteCount}</Badge>
              <span className="font-body text-xs text-muted-foreground">en route</span>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Happy Hour */}
          <HappyHourManager shopId={shopId} shopName={shop?.name || ''} flashDeals={flashDeals} />

          {/* Analytics */}
          <ShopkeeperAnalytics checkIns={checkIns} />

          {/* Visitor Activity */}
          <VisitorActivity checkIns={checkIns} />

          {/* Flash Deal Manager */}
          <FlashDealManager
            shopId={shopId}
            shopName={shop?.name || ''}
            deals={flashDeals}
          />

          {/* Product Manager */}
          <ProductManager shopId={shopId} shopName={shop?.name || ''} />

          {/* Shop Info Editor */}
          <ShopInfoEditor shop={shop} />
        </div>
      </div>
    </div>
  );
}
