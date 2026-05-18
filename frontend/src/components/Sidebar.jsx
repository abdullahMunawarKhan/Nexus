import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Megaphone, 
  History, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Heart,
  ShieldCheck,
  BarChart3,
  Users
} from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Sidebar = ({ isOpen, toggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const donorLinks = [
    { name: 'Dashboard', path: '/donor-dashboard', icon: LayoutDashboard },
    { name: 'Browse Campaigns', path: '/', icon: Megaphone },
    { name: 'My Donations', path: '/donor-dashboard#history', icon: History },
  ];

  const ngoLinks = [
    { name: 'Dashboard', path: '/ngo-dashboard', icon: LayoutDashboard },
    { name: 'My Campaigns', path: '/ngo-dashboard#campaigns', icon: Megaphone },
    { name: 'Create Campaign', path: '/ngo-dashboard#create', icon: Heart },
  ];

  const adminLinks = [
    { name: 'Overview', path: '/admin-dashboard', icon: LayoutDashboard },
    { name: 'Manage NGOs', path: '/admin-dashboard#ngos', icon: ShieldCheck },
    { name: 'Campaign Analytics', path: '/admin-dashboard#analytics', icon: BarChart3 },
    { name: 'All Users', path: '/admin-dashboard#users', icon: Users },
  ];

  const links = user?.role === 'donor' ? donorLinks : (user?.role === 'ngo' ? ngoLinks : adminLinks);

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-400 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 p-6 text-white border-b border-slate-800">
          <Heart className="h-6 w-6 text-primary-500" fill="currentColor" />
          <span className="font-bold text-lg">Disaster Relief</span>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-4">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20' : 'hover:bg-slate-800 hover:text-white'}`
              }
            >
              <link.icon size={20} />
              <span className="font-medium">{link.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-4">
          <div className="px-2 py-3 bg-slate-800/50 rounded-xl">
             <div className="text-xs text-slate-500 mb-2 px-2 uppercase font-bold tracking-wider">Wallet</div>
             <div className="flex justify-center scale-90 origin-left">
                <ConnectButton label="Connect" accountStatus="avatar" chainStatus="icon" showBalance={false} />
             </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-950/30 hover:text-red-400 transition-all text-slate-400"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
