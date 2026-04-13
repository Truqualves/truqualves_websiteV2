
import React from 'react';
import { ICONS } from '../constants';
import type { ViewType } from '../types';

interface HeaderProps {
  activeView: ViewType;
  toggleSidebar: () => void;
}

import { useAuth } from '../../context';

// ...

export const Header: React.FC<HeaderProps> = ({ activeView, toggleSidebar }) => {
  const { currentUser, userProfile } = useAuth();

  const getInitials = (email: string) => {
    return email ? email.substring(0, 2).toUpperCase() : 'U';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 h-16 flex items-center justify-between">
      {/* ... existing search code ... */}
      
      <div className="flex items-center gap-3 md:gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-100 rounded-lg lg:hidden text-slate-600 transition-colors"
          aria-label="Toggle Navigation"
        >
          <ICONS.Menu size={24} />
        </button>
        <h1 className="text-lg md:text-2xl font-bold text-slate-800 tracking-tight whitespace-nowrap">
          {activeView}
        </h1>
      </div>

      {/* Responsive Search - Hidden on Small Devices */}
      <div className="flex-1 max-w-xl mx-4 md:mx-8 hidden sm:block">
        <div className="relative group">
          <ICONS.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-3">
        {/* Search Toggle for Mobile */}
        <button className="sm:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
          <ICONS.Search size={20} />
        </button>

        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
          <ICONS.Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-1 md:mx-2 hidden sm:block"></div>
        
        <button className="flex items-center gap-2 p-1 pl-2 hover:bg-slate-50 rounded-lg transition-colors group">
          <div className="text-right hidden md:block">
            <p className="text-xs font-semibold text-slate-800">
              {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}
            </p>
            <p className="text-[10px] text-slate-500 capitalize">
              {userProfile?.role || 'Guest'}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold overflow-hidden shrink-0 border border-teal-200">
             {currentUser?.photoURL ? (
               <img src={currentUser.photoURL} alt="Avatar" className="w-full h-full object-cover" />
             ) : (
               <span>{getInitials(currentUser?.email || '')}</span>
             )}
          </div>
        </button>
      </div>
    </header>
  );
};
