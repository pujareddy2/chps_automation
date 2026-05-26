/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, ArrowLeft, ArrowRight, Info, LogIn } from 'lucide-react';

interface LoginPasswordProps {
  userId: string;
  onBack: () => void;
  onLoginSuccess: (password: string) => void;
}

export default function LoginPassword({ userId, onBack, onLoginSuccess }: LoginPasswordProps) {
  const [password, setPassword] = useState('');
  const [confirmMsg, setConfirmMsg] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmMsg) {
      setErrorCode('You must confirm the secure access message checkbox');
      return;
    }
    if (!password) {
      setErrorCode('Please enter your e-Filing account password');
      return;
    }
    setErrorCode(null);
    onLoginSuccess(password);
  };

  const isFormValid = confirmMsg && password.trim().length > 0;

  return (
    <div className="w-full flex justify-center py-6 md:py-10 px-4 animate-fade-in" id="login-password-container">
      <div className="max-w-5xl w-full flex flex-col" id="login-pwd-wrapper">
        
        {/* Indicators */}
        <div className="text-right text-xs text-red-600 mb-6 font-sans select-none" id="mandatory-pwd-indicator">
          * Indicates mandatory fields
        </div>

        {/* Form Box Card */}
        <div className="bg-white shadow-xl rounded-lg border border-gray-100 flex flex-col md:flex-row overflow-hidden min-h-[520px]" id="login-pwd-card-frame">
          
          {/* LEFT SIDE: Password Submission Form */}
          <section className="flex-1 p-8 lg:p-12 border-r border-gray-100 flex flex-col justify-between" id="pwd-form-section">
            <form onSubmit={handleSubmit} className="space-y-6" id="pwd-form-el">
              
              {/* User overview block */}
              <div className="flex items-center gap-4 bg-slate-50 p-4 border border-slate-100 rounded-lg" id="assessee-pwd-overview">
                <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center shrink-0 border border-gray-300">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h1 className="text-xl font-extrabold text-gray-800" id="pwd-login-header">Login</h1>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">
                    PAN : <strong className="text-gray-800">{userId}</strong>
                  </p>
                </div>
              </div>

              {/* Secure Access Message */}
              <div className="space-y-3" id="secure-access-message-block">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider" id="secure-msg-label">
                  Secure Access Message
                </label>
                <div 
                  className="bg-blue-50 border border-blue-100 p-3 rounded text-sm font-bold text-[#2c3e8c] text-center tracking-wide"
                  id="secure-access-message-card"
                >
                  Login
                </div>
                
                <div className="flex items-start gap-3 mt-1" id="confirm-chk-holder">
                  <div className="flex items-center h-5 mt-0.5">
                    <input 
                      type="checkbox" 
                      id="confirm-message"
                      checked={confirmMsg}
                      onChange={(e) => {
                        setConfirmMsg(e.target.checked);
                        if (errorCode) setErrorCode(null);
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-[#2c3e8c] focus:ring-[#2c3e8c]"
                    />
                  </div>
                  <div className="text-xs text-gray-700 leading-normal">
                    <label htmlFor="confirm-message" className="cursor-pointer select-none">
                      Please confirm your secure access message displayed above <span className="text-red-500 font-bold">*</span>
                    </label>
                    <button 
                      type="button" 
                      onClick={() => alert(`A Secure Access Message is a security feature to confirm that you are logging into the genuine Income Tax Department e-Filing portal. Please verify that this word matches the preference set in your profile settings.`)}
                      className="inline-block ml-1 text-gray-400 hover:text-gray-600 shrink-0"
                    >
                      <Info className="w-3.5 h-3.5 inline" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Entry */}
              <div className="space-y-2" id="password-group-block">
                <p className="text-xs text-gray-400 font-sans">
                  Enter password for your e-Filing account
                </p>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider" htmlFor="password">
                  Password <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorCode) setErrorCode(null);
                    }}
                    placeholder="Enter account security key"
                    className="w-full border border-gray-300 rounded p-3 pr-10 focus:ring-2 focus:ring-blue-100 focus:border-[#2c3e8c] focus:outline-none text-sm transition-all font-mono"
                    autoFocus
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                    id="pwd-visibility-toggler"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot link */}
              <div className="flex items-center text-xs" id="forgot-password-trigger-holder">
                <button 
                  type="button"
                  onClick={() => alert('Temporary demo password reset: Any alphanumeric password will allow you to access the dashboard.')}
                  className="text-blue-700 hover:text-blue-900 hover:underline font-bold"
                >
                  Forgot Password?
                </button>
              </div>

              {errorCode && (
                <div className="bg-red-50 border border-red-100 rounded p-2.5 text-xs text-red-700 flex items-center gap-1.5 animate-shake">
                  <span>⚠️</span>
                  <span>{errorCode}</span>
                </div>
              )}

              {/* Button controllers */}
              <div className="space-y-3 pt-3" id="pwd-action-stack">
                <button 
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full py-3.5 rounded font-bold text-sm transition-all focus:outline-none flex items-center justify-center gap-1.5 ${
                    isFormValid 
                      ? 'bg-[#2c3e8c] text-white hover:bg-[#1e2c66] hover:shadow-md cursor-pointer' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  id="pwd-submit-btn"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <button 
                  type="button"
                  onClick={onBack}
                  className="w-full bg-white border border-[#2c3e8c] text-[#2c3e8c] font-bold py-3 px-4 rounded hover:bg-blue-50 transition-colors flex items-center justify-center text-sm"
                  id="pwd-back-btn"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </button>
              </div>
            </form>
          </section>

          {/* RIGHT SIDE: Visual Card Lock Graphic (recreates Image 8) */}
          <section className="hidden md:flex flex-1 items-center justify-center bg-[#f8fafc] p-12 relative overflow-hidden" id="pwd-graphic-section">
            {/* Padlock representation */}
            <div className="relative z-10 flex flex-col items-center select-none" id="padlock-box">
              <div className="w-24 h-28 bg-[#2c3e8c] rounded-t-full relative flex items-center justify-center shadow-lg border border-[#1e2c66]">
                {/* Padlock handle */}
                <div className="absolute -top-10 w-20 h-20 border-8 border-gray-300 rounded-full select-none"></div>
                {/* Shackle profile details */}
                <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center border border-white/20">
                  <LogIn className="w-5 h-5 text-white" />
                </div>
                {/* Bottom static stars pattern */}
                <div className="absolute bottom-4 text-white text-[10px] tracking-[0.25em] font-mono font-bold shrink-0">
                  ******
                </div>
              </div>
              <p className="text-[11px] font-bold text-gray-400 mt-6 tracking-widest font-mono">SECURE LOGIN TUNNEL</p>
              {/* Drop subtle shadow */}
              <div className="w-32 h-3 bg-gray-200 rounded-full mt-2 filter blur-xs opacity-60"></div>
            </div>

            {/* Float Help Assistant Trigger replica */}
            <div 
              onClick={() => alert(`Helpdesk BOT: Need assistance? You can click "Pending Actions" -> "e-Proceedings" after signing in to view your notice list!`)}
              className="absolute bottom-4 right-4 bg-white rounded-full p-2.5 shadow-md border border-gray-100 cursor-pointer hover:scale-105 transition-transform"
              title="Assis-Bot"
              id="help-bee-avatar"
            >
              <img 
                alt="Help Bot Assistant" 
                className="w-9 h-9 rounded-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiFmRdt2cqThl0yeNa2vbTC9O8hLZm3Y2rmlxmltBBseMh_U27LhMNthr1nXU6omrC-m5QWeXZVYpQ7uo1CoY3gtBOKJFsD50rQnJD6LsNAE40Igf8vilZHbhQ-JZFkPPF1RwvW_OImeDeyNaTB95c-ZkS2AJwRGLUm0OiUgotjBeUCuVlM4xS_NaxO6zfn37S6UNEMCRPSw-uH_-qblzaJLYcKcow_VT7R0D7Gi57xaEhIkx5ZbnPcVOxfetHl17nA2VKcxhTC9_f"
              />
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
