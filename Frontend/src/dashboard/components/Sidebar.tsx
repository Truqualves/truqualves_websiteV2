
import React from 'react';
import { ICONS } from '../constants';
import type { ViewType } from '../types';
import { useAuth } from '../../context';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen, setIsOpen }) => {
  const { userProfile, currentUser, logout } = useAuth();

  const resourceNavItems: { label: ViewType; icon: keyof typeof ICONS }[] = [
    { label: 'Blogs', icon: 'BookOpen' },
    { label: 'Contact', icon: 'MessageSquare' },
    { label: 'Industries', icon: 'FileText' },
    { label: 'Case Studies', icon: 'FileText' },
    { label: 'Team', icon: 'Users' },
  ];

  const requestNavItems: { label: ViewType; icon: keyof typeof ICONS }[] = [
    { label: 'Events', icon: 'Bell' },
    { label: 'Newsletter', icon: 'Mail' },
  ];

  const servicesNavItems: { label: ViewType; icon: keyof typeof ICONS }[] = [
    { label: 'Services', icon: 'Wrench' },
  ];

  const generalNavItems: { label: ViewType; icon: keyof typeof ICONS }[] = [
    { label: 'Dashboard', icon: 'LayoutDashboard' },
  ];

  const careerNavItems: { label: ViewType; icon: keyof typeof ICONS }[] = [
    { label: 'Job Openings', icon: 'Briefcase' },
    { label: 'Candidate Info', icon: 'Users' },
  ];

  // Add Users menu for superadmin only
  if (userProfile?.role === 'superadmin') {
    generalNavItems.push({ label: 'Users', icon: 'Users' });
  }

  const secondaryNavItems: { label: ViewType; icon: keyof typeof ICONS }[] = [
    { label: 'Settings', icon: 'Settings' },
    { label: 'Support', icon: 'HelpCircle' }
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const NavButton: React.FC<{ item: { label: ViewType; icon: keyof typeof ICONS } }> = ({ item }) => {
    const Icon = ICONS[item.icon];
    const isActive = activeView === item.label;
    return (
      <button
        onClick={() => {
          setActiveView(item.label);
          if (window.innerWidth < 1024) setIsOpen(false);
        }}
        className={`w-full flex items-center p-3 rounded-xl transition-all group ${
          isActive 
            ? 'bg-teal-50 text-teal-600' 
            : 'text-slate-900 hover:bg-slate-50 hover:text-slate-950'
        }`}
      >
        <Icon size={20} className={`${isActive ? 'text-teal-600' : 'text-slate-700 group-hover:text-slate-900'}`} />
        {/* On mobile, we always want to show the text if the sidebar is open */}
        <span className={`ml-3 font-medium text-sm transition-all duration-200 
          ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:w-0 overflow-hidden'}`}>
          {item.label}
        </span>
        {isActive && isOpen && (
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-600" />
        )}
      </button>
    );
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 z-50 
      ${isOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'} 
      overflow-hidden`}
    >
      <div className="flex flex-col h-full w-64 lg:w-auto">
            {/* Logo Section */}
        <div className="h-20 flex items-center px-6 border-b border-slate-100 shrink-0">
          <img src="/logo.png" alt="TruQual" className="w-20 h-20 object-contain shrink-0" />
          <span className={`font-urbanist font-extrabold text-2xl  text-slate-800 tracking-tight transition-all duration-200
            ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:w-0 overflow-hidden'}`}>
            TruQual
          </span>
          {/* Mobile close button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="ml-auto p-2 text-slate-400 hover:text-slate-600 lg:hidden"
          >
            <ICONS.X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-6 px-3 no-scrollbar space-y-6">
          <div>
            <p className={`px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-opacity
              ${isOpen ? 'opacity-100 text-slate-700' : 'lg:opacity-0 lg:w-0'}`}>General</p>
            <nav className="space-y-1">
              {generalNavItems.map((item) => <NavButton key={item.label} item={item} />)}
            </nav>
          </div>

          <div>
            <p className={`px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-opacity
              ${isOpen ? 'opacity-100 text-slate-700' : 'lg:opacity-0 lg:w-0'}`}>Requests</p>
            <nav className="space-y-1">
              {requestNavItems.map((item) => <NavButton key={item.label} item={item} />)}
            </nav>
          </div>

          <div>
            <p className={`px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-opacity
              ${isOpen ? 'opacity-100 text-slate-700' : 'lg:opacity-0 lg:w-0'}`}>Resources</p>
            <nav className="space-y-1">
              {resourceNavItems.map((item) => <NavButton key={item.label} item={item} />)}
            </nav>
          </div>

          <div>
            <p className={`px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-opacity
              ${isOpen ? 'opacity-100 text-slate-700' : 'lg:opacity-0 lg:w-0'}`}>Services</p>
            <nav className="space-y-1">
              {servicesNavItems.map((item) => <NavButton key={item.label} item={item} />)}
            </nav>
          </div>

          <div>
            <p className={`px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-opacity
              ${isOpen ? 'opacity-100 text-slate-700' : 'lg:opacity-0 lg:w-0'}`}>Career</p>
            <nav className="space-y-1">
              {careerNavItems.map((item) => <NavButton key={item.label} item={item} />)}
            </nav>
          </div>

          <div>
            <p className={`px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-opacity
              ${isOpen ? 'opacity-100 text-slate-700' : 'lg:opacity-0 lg:w-0'}`}>System</p>
            <nav className="space-y-1">
              {secondaryNavItems.map((item) => <NavButton key={item.label} item={item} />)}
            </nav>
          </div>
        </div>

        {/* Footer info or profile teaser */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center p-3 rounded-xl transition-all text-rose-500 hover:bg-rose-50 mb-3 group ${!isOpen && 'lg:justify-center'}`}
          >
            <ICONS.LogOut size={20} className="group-hover:scale-110 transition-transform shrink-0" />
            <span className={`ml-3 font-semibold text-sm transition-all duration-200 
              ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:w-0 overflow-hidden'}`}>Logout</span>
          </button>

          <div className={`flex items-center ${isOpen ? 'px-1' : 'lg:justify-center'}`}>
            <div className="w-10 h-10 rounded-xl bg-slate-200 overflow-hidden ring-2 ring-white shadow-sm shrink-0 flex items-center justify-center text-slate-500 font-bold">
              {/* <img src="https://picsum.photos/seed/user1/40" alt="Profile" className="w-full h-full object-cover" /> */}
              {currentUser?.email?.substring(0, 2).toUpperCase() || 'US'}
            </div>
            <div className={`ml-3 overflow-hidden transition-all duration-200 
              ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:w-0 overflow-hidden'}`}>
              <p className="text-sm font-bold text-slate-800 truncate" title={currentUser?.email || ''}>
                {currentUser?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-[10px] font-medium text-slate-500 truncate capitalize">
                {userProfile?.role || 'Guest'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
