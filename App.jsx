import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { LanguageProvider, useLanguage } from '@/lib/LanguageContext';
import { FestivalProvider } from '@/lib/FestivalContext';
import { NotificationProvider } from '@/lib/NotificationContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ModeSelection from './pages/ModeSelection';
import VisitorSetup from './pages/VisitorSetup';
import LanguageSelect from './pages/LanguageSelect';
import VisitorInterests from './pages/visitor/VisitorInterests';
import TrailMap from './pages/visitor/TrailMap';
import QuestMap from './pages/visitor/QuestMap';
import QuestComplete from './pages/visitor/QuestComplete';
import RewardsTimeline from './pages/visitor/RewardsTimeline';
import CustomTrail from './pages/visitor/CustomTrail';
import PointsRoadmap from './pages/visitor/PointsRoadmap';
import Experiences from './pages/visitor/Experiences';
import CulturalEvents from './pages/visitor/CulturalEvents';
import SeatBooking from './pages/visitor/SeatBooking';
import CulturalWorkshops from './pages/visitor/CulturalWorkshops';
import RestaurantReservations from './pages/visitor/RestaurantReservations';
import ShopkeeperLogin from './pages/shopkeeper/ShopkeeperLogin';
import ShopkeeperDashboard from './pages/shopkeeper/ShopkeeperDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AIAssistant from './components/AIAssistant';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  const { lang } = useLanguage();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center"
        style={{ background: 'linear-gradient(180deg, #2d5a1b 0%, #3d7a22 100%)' }}>
        <div className="w-10 h-10 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') return <UserNotRegisteredError />;
    if (authError.type === 'auth_required') { navigateToLogin(); return null; }
  }

  return (
    <>
      <Routes>
        <Route path="/language" element={<LanguageSelect />} />
        <Route path="/setup" element={<VisitorSetup />} />
        <Route path="/" element={lang ? <ModeSelection /> : <LanguageSelect />} />
        <Route path="/visitor/interests" element={<VisitorInterests />} />
        <Route path="/visitor/trail/:category" element={<QuestMap />} />
        <Route path="/visitor/trail-list/:category" element={<TrailMap />} />
        <Route path="/visitor/complete/:category" element={<QuestComplete />} />
        <Route path="/visitor/rewards" element={<RewardsTimeline />} />
        <Route path="/visitor/custom-trail" element={<CustomTrail />} />
        <Route path="/visitor/roadmap" element={<PointsRoadmap />} />
        <Route path="/visitor/experiences" element={<Experiences />} />
        <Route path="/visitor/experiences/events" element={<CulturalEvents />} />
        <Route path="/visitor/experiences/seat-booking/:id" element={<SeatBooking />} />
        <Route path="/visitor/experiences/workshops" element={<CulturalWorkshops />} />
        <Route path="/visitor/experiences/restaurants" element={<RestaurantReservations />} />
        <Route path="/shopkeeper/login" element={<ShopkeeperLogin />} />
        <Route path="/shopkeeper/dashboard" element={<ShopkeeperDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <AIAssistant />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <FestivalProvider>
            <LanguageProvider>
              <NotificationProvider>
                <AuthenticatedApp />
              </NotificationProvider>
            </LanguageProvider>
          </FestivalProvider>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
