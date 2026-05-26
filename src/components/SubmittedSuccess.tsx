/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, ArrowRight, Download, Printer, ShieldCheck, Mail } from 'lucide-react';
import { ScreenId } from '../types';

interface SubmittedSuccessProps {
  onNavigate: (screen: ScreenId) => void;
  noticeId: string;
  pan: string;
  assesseeName: string;
  responseType: string;
  fileName: string;
}

export default function SubmittedSuccess({ 
  onNavigate, 
  noticeId, 
  pan, 
  assesseeName,
  responseType,
  fileName 
}: SubmittedSuccessProps) {
  
  const acknowledgmentId = "ACK-" + Math.floor(1000000000 + Math.random() * 9000000000);
  const formattedDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) + ", " + new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12 text-center animate-fade-in" id="success-screen-wrapper">
      <div className="bg-white border border-emerald-100 rounded-2xl shadow-xl p-8 md:p-12 space-y-8 relative overflow-hidden" id="success-container-card">
        
        {/* Subtle background glow */}
        <div className="absolute -top-16 -left-16 w-36 h-36 bg-emerald-50 rounded-full select-none" />
        
        {/* Success Icon */}
        <div className="flex flex-col items-center gap-1.5" id="success-header-badge">
          <div className="bg-emerald-50 text-emerald-600 rounded-full p-4 shrink-0 shadow-xs mb-2">
            <CheckCircle2 className="w-12 h-12" id="success-check-icon animate-pulse" />
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 uppercase tracking-widest px-3 py-1 rounded-full font-sans">
            Transaction Successful
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-2" id="success-main-title">
            Response Submitted Successfully!
          </h1>
          <p className="text-gray-500 text-xs font-sans max-w-md mx-auto pt-1">
            Your response has been securely encrypted and deposited inside the Income Tax Department e-Proceedings register.
          </p>
        </div>

        {/* Transaction details card */}
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-6 text-left space-y-4 font-sans text-xs" id="summary-manifest-card">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2">
            Filing details transcript
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 gap-x-6 text-gray-600 font-medium">
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Acknowledgment ID</p>
              <p className="text-gray-900 font-mono font-bold mt-0.5 tracking-wide select-all text-xs">{acknowledgmentId}</p>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Submitted On</p>
              <p className="text-gray-900 font-mono mt-0.5">{formattedDate}</p>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">PAN of Assessee</p>
              <p className="text-gray-900 font-mono font-semibold mt-0.5 uppercase tracking-wider">{pan}</p>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Name of Assessee</p>
              <p className="text-gray-1000 mt-0.5 uppercase font-semibold text-gray-800">{assesseeName}</p>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Notice Ref ID</p>
              <p className="text-gray-900 font-mono mt-0.5">{noticeId}</p>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Response Mode Chosen</p>
              <p className="text-[#2c3e8c] font-bold mt-0.5 uppercase tracking-tight">{responseType}</p>
            </div>
            <div className="md:col-span-2 border-t border-gray-100 pt-3">
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Deposited Documents</p>
              <div className="flex items-center gap-1.5 text-gray-800 mt-1 font-mono font-bold text-[11px]">
                <span>📄</span>
                <span>{fileName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Email conformation notification banner */}
        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-lg flex items-start gap-3 text-left text-xs text-slate-700 font-sans" id="email-notif-banner">
          <Mail className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold text-slate-900">Confirmation Sent!</p>
            <p className="text-[11px] text-gray-600">
              An official copy of this receipt and audit logs has been dispatched to your verified email address: <strong className="text-slate-900 font-mono font-medium">fatimaconventookal25@gmail.com</strong>.
            </p>
          </div>
        </div>

        {/* Dynamic button control stack */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-4 select-none" id="success-buttons-group">
          <button 
            onClick={() => onNavigate('DASHBOARD')}
            className="w-full sm:w-auto bg-[#2c3e8c] hover:bg-[#1e2c66] text-white px-8 py-3 rounded font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
            id="success-back-dashboard-btn"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => alert(`Initiating download for e-Filing receipt: ${acknowledgmentId}.pdf`)}
            className="w-full sm:w-auto bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded text-xs font-bold hover:bg-gray-50 flex items-center justify-center gap-1.5"
            id="download-receipt-btn"
          >
            <Download className="w-4 h-4 text-gray-500" />
            <span>Download Receipt</span>
          </button>

          <button 
            onClick={() => window.print()}
            className="w-full sm:w-auto bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded text-xs font-bold hover:bg-gray-50 flex items-center justify-center gap-1.5"
            id="print-receipt-btn"
          >
            <Printer className="w-4 h-4 text-gray-500" />
            <span>Print Transcript</span>
          </button>
        </div>

      </div>
    </div>
  );
}
