/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, Globe, Moon, Sun, ChevronDown, User, Menu, Bell, Shield, 
  ChevronRight, Calendar, AlertTriangle, CheckSquare, X
} from 'lucide-react';
import { ScreenId } from '../types';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onLogout: () => void;
  userName: string;
}

export default function Header({ currentScreen, onNavigate, onLogout, userName }: HeaderProps) {
  const [minutes, setMinutes] = useState(14);
  const [seconds, setSeconds] = useState(59);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Session timer countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        // Reset to simulate continuous activity standard
        setMinutes(14);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDropdownItemClick = (screen: ScreenId) => {
    onNavigate(screen);
    setIsDropdownOpen(false);
  };

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const isUserLoggedIn = currentScreen !== 'LOGIN_USER_ID' && currentScreen !== 'LOGIN_PASSWORD';

  return (
    <div className="w-full relative shrink-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#1e2c66] text-white px-4 py-2 border border-blue-400 rounded-lg shadow-lg text-xs font-mono flex items-center gap-2 animate-fade-in">
          <span className="p-1 bg-blue-500 rounded-full w-2 h-2 animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* BEGIN: UtilityHeader */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex justify-between items-center text-xs">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="lg:hidden p-1.5 text-gray-500 hover:bg-gray-100 rounded"
              aria-label="Toggle Side Drawer Menu"
              id="header-hamburger-menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={() => isUserLoggedIn ? onNavigate('DASHBOARD') : onNavigate('LOGIN_USER_ID')}
              id="header-logo-container"
            >
              {/* High-fidelity Logo Replica */}
              <img 
                alt="Income Tax Department Logo" 
                className="h-10 md:h-12 object-contain" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuDa0Ok6NUozx31WF2oVNp4QkhyEOuC16DUjgt4FJb2NvFPuxI73t_91zdiPN7hywyWX7BMYzXUeWvYUtInwq61sjeYpCbHp8be8THbPesFO8GbrbDJn_xC0ADz-mbvjxh0VeIJmw4D50--GdhGQkgVvlQ6Bx0IzomlR3dqL-EN9bqpcNZI_6NvEhpM47PYw-GkyRkttIWgLkJjH3vPfutjUnBmxtxhjoNU3uf5EwpZjFiaKRyyO1v5REAgkS_fcWZPDG_KKFbl4xl" 
                style={{ clipPath: 'inset(0 68% 0 10%)', transform: 'scale(1.4)' }}
              />
              <div className="hidden sm:block border-l border-gray-300 h-6 pl-4 font-sans justify-center">
                <span className="text-gray-900 font-bold tracking-tight text-[11px] block text-left">e-Filing Anywhere Anytime</span>
                <span className="text-gray-500 text-[9px] block text-left uppercase tracking-wider font-semibold">Income Tax Department, GOVT. OF INDIA</span>
              </div>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center space-x-6 text-gray-600">
            {/* Call Us Link */}
            <div 
              onClick={() => showToast('Helpdesk numbers: 1800 103 0025, 1800 419 0025 available 9AM - 6PM')}
              className="flex items-center space-x-1 cursor-pointer hover:text-[#2c3e8c] select-none text-[11px] font-medium"
              id="call-us-trigger"
            >
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              <span>Call Us</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>

            {/* Language Selection */}
            <div 
              onClick={() => showToast('Language selection: English active (Alternative: Hindi, Tamil, Telugu)')}
              className="flex items-center space-x-1 cursor-pointer hover:text-[#2c3e8c] select-none text-[11px] font-medium"
              id="language-trigger"
            >
              <Globe className="w-3.5 h-3.5 text-gray-400" />
              <span>English</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>

            {/* Zoom Adjustments & Profile Info */}
            <div className="flex items-center space-x-4 border-l border-gray-200 pl-4">
              <div className="hidden md:flex items-center space-x-2 text-[10px] font-bold">
                <span className="hover:text-black cursor-pointer px-1 pr-1.5 text-gray-400">A-</span>
                <span className="bg-[#2c3e8c] text-white px-2 py-0.5 rounded text-[10px]">A</span>
                <span className="hover:text-black cursor-pointer px-1 pl-1.5 text-gray-400">A+</span>
              </div>

              {/* Theme switch placeholder icon */}
              <div 
                onClick={() => showToast('High contrast theme toggle click (Eye comfort preset)')}
                className="p-1 cursor-pointer text-gray-400 hover:text-black rounded hover:bg-gray-100 hidden sm:block"
                id="theme-toggler"
              >
                <Moon className="w-4 h-5" />
              </div>

              {/* Connected User Profile Card */}
              {isUserLoggedIn && (
                <div 
                  onClick={onLogout}
                  className="flex items-center space-x-2 border-l border-gray-200 pl-4 cursor-pointer hover:bg-gray-50 py-1 px-2 rounded group"
                  title="Click to Sign Out"
                  id="user-profile-header-badge"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 group-hover:border-[#2c3e8c] transition-colors">
                    <User className="w-4 h-4 text-gray-600 group-hover:text-[#2c3e8c]" />
                  </div>
                  <div className="text-left select-none">
                    <p className="font-bold text-gray-800 text-[10px] uppercase tracking-wide leading-tight group-hover:text-red-700">
                      {userName || 'FATIMA CONVENT...'}
                    </p>
                    <p className="text-[9px] text-gray-500 leading-none">Trust • Logout</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-700" />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* END: UtilityHeader */}

      {/* BEGIN: Primary Navigation Bar */}
      <nav className="bg-[#2c3e8c] text-white" id="main-navigation-navbar">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row items-stretch md:items-center justify-between min-h-[44px]">
          {/* Main List items */}
          <ul className="flex flex-wrap items-stretch text-xs font-semibold py-1 md:py-0">
            {/* Dashboard Link */}
            <li 
              onClick={() => isUserLoggedIn ? onNavigate('DASHBOARD') : onNavigate('LOGIN_USER_ID')}
              className={`px-4 py-3 cursor-pointer flex items-center border-b-2 transition-all ${
                currentScreen === 'DASHBOARD' 
                  ? 'border-white bg-[#1e2a66]' 
                  : 'border-transparent hover:bg-slate-700/50 hover:border-gray-300'
              }`}
              id="nav-dashboard"
            >
              Dashboard
            </li>

            {/* e-File Menu Option */}
            <li 
              onClick={() => isUserLoggedIn ? showToast('Accessing e-File schedules...') : showToast('Please sign in first')}
              className="px-4 py-3 cursor-pointer flex items-center gap-1 hover:bg-slate-700/50 border-b-2 border-transparent hover:border-gray-300 transition-all"
              id="nav-efile"
            >
              <span>e-File</span>
              <ChevronDown className="w-3 h-3 text-slate-300" />
            </li>

            {/* Authorised Partners */}
            <li 
              onClick={() => isUserLoggedIn ? showToast('Accessing Authorised partners roster...') : showToast('Please sign in first')}
              className="px-4 py-3 cursor-pointer flex items-center gap-1 hover:bg-slate-700/50 border-b-2 border-transparent hover:border-gray-300 transition-all text-slate-100"
              id="nav-partners"
            >
              <span>Authorised Partners</span>
              <ChevronDown className="w-3 h-3 text-slate-300" />
            </li>

            {/* Services Option */}
            <li 
              onClick={() => isUserLoggedIn ? showToast('Displaying portal ancillary services...') : showToast('Please sign in first')}
              className="px-4 py-3 cursor-pointer flex items-center gap-1 hover:bg-slate-700/50 border-b-2 border-transparent hover:border-gray-300 transition-all text-slate-100"
              id="nav-services"
            >
              <span>Services</span>
              <ChevronDown className="w-3 h-3 text-slate-300" />
            </li>

            {/* AIS Card Option */}
            <li 
              onClick={() => isUserLoggedIn ? showToast('AIS: Redirecting online to Annual Information Statement portal...') : showToast('Please sign in first')}
              className="px-4 py-3 cursor-pointer flex items-center hover:bg-[#1e2a66] border-b-2 border-transparent hover:border-white transition-all"
              id="nav-ais"
            >
              AIS
            </li>

            {/* Pending Actions Trigger (Drop down menu is highly functional here) */}
            <li 
              onClick={() => isUserLoggedIn ? setIsDropdownOpen(!isDropdownOpen) : showToast('Please login to view Pending Actions')}
              className={`px-4 py-3 cursor-pointer flex items-center gap-1 border-b-2 transition-all relative ${
                currentScreen === 'E_PROCEEDINGS' || currentScreen === 'VIEW_NOTICES_ACTION' || currentScreen === 'VIEW_NOTICES_INFO' || currentScreen === 'SUBMIT_RESPONSE'
                  ? 'border-white bg-[#1e2a66]' 
                  : 'border-transparent hover:bg-slate-700/50'
              }`}
              id="nav-pending-actions"
            >
              <CheckSquare className="w-3.5 h-3.5 mr-1 text-amber-300 animate-pulse" />
              <span>Pending Actions</span>
              <ChevronDown className={`w-3.5 h-3.5 text-white transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />

              {/* Nav Dropdown Overlay (Highly Faithful layout identical to screenshot) */}
              {isUserLoggedIn && isDropdownOpen && (
                <div 
                  className="absolute top-full left-0 w-64 bg-white text-gray-700 shadow-2xl border border-gray-200 py-0 z-50 text-[12px] font-normal"
                  id="pending-actions-dropdown-box"
                >
                  <div className="bg-[#f0f9ff] border-l-4 border-[#2c3e8c] px-4 py-2.5 font-bold text-[#2c3e8c] text-xs">
                    WORKLIST
                  </div>
                  <div 
                    onClick={() => showToast('Outstanding demands listed here. Currently healthy state.')}
                    className="px-4 py-3 hover:bg-gray-100 border-b border-gray-100 text-gray-600 transition-all"
                  >
                    Response to Outstanding Demand
                  </div>
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDropdownItemClick('E_PROCEEDINGS');
                    }}
                    className="px-4 py-3 bg-amber-50 hover:bg-amber-100 text-[#2c3e8c] hover:text-[#1e2a66] font-bold border-b border-gray-100 flex justify-between items-center transition-all animate-pulse"
                  >
                    <span>e-Proceedings</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#2c3e8c]" />
                  </div>
                  <div 
                    onClick={() => showToast('Redirecting to external reporting dashboard...')}
                    className="px-4 py-3 hover:bg-gray-100 border-b border-gray-100 text-gray-600 flex justify-between items-center transition-all"
                  >
                    <span>Reporting Portal</span>
                    <ChevronDown className="-rotate-90 w-3 h-3 text-gray-400" />
                  </div>
                  <div 
                    onClick={() => showToast('Compliance parameters portal matches default validation.')}
                    className="px-4 py-3 hover:bg-gray-100 text-gray-600 transition-all"
                  >
                    Compliance Portal
                  </div>
                </div>
              )}
            </li>

            {/* Grievances Option */}
            <li 
              onClick={() => isUserLoggedIn ? showToast('Displaying grievance lodging portal setup...') : showToast('Please sign in first')}
              className="px-4 py-3 cursor-pointer flex items-center gap-1 hover:bg-slate-700/50 border-b-2 border-transparent hover:border-gray-300 transition-all"
              id="nav-grievances"
            >
              <span>Grievances</span>
              <ChevronDown className="w-3 h-3 text-slate-300" />
            </li>

            {/* Help option */}
            <li 
              onClick={() => showToast('Accessing e-Filing Help instructions desk...')}
              className="px-4 py-3 cursor-pointer flex items-center hover:bg-slate-700/50 border-b-2 border-transparent hover:border-gray-300 transition-all"
              id="nav-help"
            >
              Help
            </li>
          </ul>

          {/* Session Timer Component */}
          {isUserLoggedIn && (
            <div className="flex items-center space-x-1 py-1 md:py-0 self-center" id="session-time-display-container">
              <span className="text-[10px] uppercase text-slate-300 font-bold shrink-0">Session Time</span>
              <div className="flex items-center text-xs space-x-1 text-white bg-slate-900/40 p-1.5 rounded border border-slate-700 font-mono tracking-wider">
                <span className="bg-[#1e1e1e] px-1 text-amber-400 font-bold rounded">1</span>
                <span className="bg-[#1e1e1e] px-1 text-amber-400 font-bold rounded">{formatNumber(minutes)[0]}</span>
                <span className="bg-[#1e1e1e] px-1 text-amber-400 font-bold rounded">{formatNumber(minutes)[1]}</span>
                <span className="text-amber-400 font-bold animate-pulse">:</span>
                <span className="bg-[#1e1e1e] px-1 text-amber-400 font-bold rounded">{formatNumber(seconds)[0]}</span>
                <span className="bg-[#1e1e1e] px-1 text-amber-400 font-bold rounded">{formatNumber(seconds)[1]}</span>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* END: Primary Navigation Bar */}

      {/* Side menu drawer (highly useful for mobile screens viewport resolution handling as per standard) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="bg-white w-72 h-full p-6 flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <span className="font-bold text-gray-800 text-sm">e-Filing Services</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 p-1 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isUserLoggedIn ? (
                <div className="space-y-4">
                  <p className="text-xs text-gray-400">LOGGED IN AS</p>
                  <div>
                    <h4 className="font-bold text-[#2c3e8c]">{userName}</h4>
                    <p className="text-xs text-gray-500">PAN: AAATF2458F</p>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="space-y-3 font-semibold text-gray-700 text-xs">
                    <div onClick={() => { onNavigate('DASHBOARD'); setIsMenuOpen(false); }} className="hover:text-[#2c3e8c] cursor-pointer">Dashboard</div>
                    <div onClick={() => { onNavigate('E_PROCEEDINGS'); setIsMenuOpen(false); }} className="hover:text-[#2c3e8c] cursor-pointer text-amber-700 animate-pulse">e-Proceedings (Active Notice View)</div>
                    <div onClick={() => showToast('Filing tools option')} className="hover:text-[#2c3e8c] cursor-pointer">e-File Forms</div>
                    <div onClick={() => showToast('Grievance option')} className="hover:text-[#2c3e8c] cursor-pointer">Lodge Grievance</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-xs font-semibold text-gray-700">
                  <div onClick={() => { onNavigate('LOGIN_USER_ID'); setIsMenuOpen(false); }} className="hover:text-[#2c3e8c] cursor-pointer">Sign In User ID</div>
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              {isUserLoggedIn && (
                <button 
                  onClick={() => { onLogout(); setIsMenuOpen(false); }}
                  className="w-full bg-[#2c3e8c] text-white py-2 rounded text-xs font-bold"
                >
                  Sign Out of Account
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
