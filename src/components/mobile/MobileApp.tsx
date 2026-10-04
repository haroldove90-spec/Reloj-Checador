import React from 'react';
import { Sparkles } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { ScreenHome } from './ScreenHome';
import { ScreenRegisterMovement } from './ScreenRegisterMovement';
import { ScreenRecords } from './ScreenRecords';
import { ScreenRemoteCheck } from './ScreenRemoteCheck';
import { ScreenSummary } from './ScreenSummary';
import { ScreenRequests } from './ScreenRequests';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileDrawer } from './MobileDrawer';

interface MobileAppProps {
  onSwitchToAdmin?: () => void;
}

export const MobileApp: React.FC<MobileAppProps> = ({ onSwitchToAdmin }) => {
  const { currentScreen, toastMessage, isDrawerOpen, setIsDrawerOpen } = useAttendance();

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <ScreenHome onOpenDrawer={() => setIsDrawerOpen(true)} />;
      case 'register_movement':
        return <ScreenRegisterMovement />;
      case 'records':
        return <ScreenRecords />;
      case 'remote_check':
        return <ScreenRemoteCheck />;
      case 'summary':
        return <ScreenSummary />;
      case 'request_modal':
        return <ScreenRequests />;
      default:
        return <ScreenHome onOpenDrawer={() => setIsDrawerOpen(true)} />;
    }
  };

  const showBottomNav = currentScreen !== 'register_movement';

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col relative select-none">
      {/* Main Screen Content */}
      <main className="flex-1 w-full pb-20">
        {renderScreen()}
      </main>

      {/* Persistent Bottom Nav */}
      {showBottomNav && <MobileBottomNav />}

      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-none">
          <div className="bg-slate-900/95 backdrop-blur-md text-white text-xs sm:text-sm font-semibold py-3 px-5 rounded-2xl shadow-2xl border border-white/10 flex items-center space-x-2.5 justify-center text-center">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      <MobileDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        onSwitchToAdmin={onSwitchToAdmin}
      />
    </div>
  );
};
