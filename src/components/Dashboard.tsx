/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, Calendar, Clock, ArrowRight, ShieldAlert, CheckCircle, 
  ChevronRight, AlertCircle, FileText, Landmark, Download, Info
} from 'lucide-react';
import { ScreenId } from '../types';

interface DashboardProps {
  onNavigate: (screen: ScreenId) => void;
  userId: string;
  userName: string;
}

export default function Dashboard({ onNavigate, userId, userName }: DashboardProps) {
  // Accordion state
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handleActionClick = () => {
    onNavigate('E_PROCEEDINGS');
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-8 animate-fade-in" id="dashboard-outer-container">
      {/* GUIDANCE BANNER - Explaining how to follow the e-Proceeding flow */}
      <div 
        className="mb-6 bg-gradient-to-r from-blue-50 to-amber-50 border border-blue-100 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs"
        id="flow-guidance-banner"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 text-amber-800 rounded-full mt-0.5 md:mt-0 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Interactive Notice &amp; Response Flow</h3>
            <p className="text-xs text-gray-600 mt-0.5">
              To proceed with the requested statutory notice flow, access <strong className="text-[#2c3e8c]">e-Proceedings</strong> under <strong className="text-gray-800">Pending Actions</strong> on the navbar or click the quick shortcut on the right!
            </p>
          </div>
        </div>
        <button 
          onClick={handleActionClick}
          className="bg-[#2c3e8c] hover:bg-[#1e2c66] text-white px-5 py-2 rounded font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 shadow-sm cursor-pointer"
          id="direct-proceedings-shortcut-btn"
        >
          <span>Go to e-Proceedings</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="dashboard-grid-layout">
        
        {/* LEFT COLUMN (4 spans): Profile & Logs */}
        <div className="lg:col-span-4 space-y-6" id="dashboard-left-column">
          
          {/* Welcome User Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-auto" id="user-info-card">
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-full inline-block mb-3">
                TRUST ASSESSEE
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 tracking-tight leading-snug mb-4" id="welcome-assessee-name">
                Welcome Back, {userName}
              </h2>
              
              <div className="space-y-3 pt-2 text-xs text-gray-600 font-medium font-sans" id="assessee-attribute-list">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 select-none w-4 font-mono font-bold">💳</span>
                  <span>PAN: <strong className="text-gray-800 font-mono tracking-wider">{userId}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 select-none w-4 font-mono font-bold">📱</span>
                  <span>+91 9951078954</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 select-none w-4 font-mono font-bold">✉️</span>
                  <span className="truncate">fatimaconventookal25@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 space-y-3.5" id="user-info-sub-actions">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 font-medium">Contact Details</span>
                <button 
                  onClick={() => alert('Update contact details panel active. Fields: Mobile Number, Primary Email verification.')}
                  className="text-blue-700 hover:text-blue-900 font-bold hover:underline"
                  id="update-contact-btn"
                >
                  Update
                </button>
              </div>
              <div className="flex justify-between items-start text-xs pt-3 border-t border-gray-50">
                <span className="text-gray-500 font-medium max-w-[190px] leading-relaxed">
                  Your account is not secure with e-vault protection
                </span>
                <button 
                  onClick={() => alert('Redirecting to secure login settings with e-vault Aadhaar OTP or Digital Signature Token setup.')}
                  className="text-blue-700 hover:text-blue-900 font-bold hover:underline shrink-0"
                  id="secure-vault-btn"
                >
                  Secure Account
                </button>
              </div>
            </div>
          </div>

          {/* Tax Calendar Widget */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer" id="tax-calendar-widget">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-[#2c3e8c] rounded-lg">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-left font-sans">
                <p className="font-extrabold text-sm text-gray-800">Tax Calendar</p>
                <p className="text-[10px] text-gray-400">Important dates &amp; deadlines</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </div>

          {/* Activity Logs Widget */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden" id="activity-log-widget">
            <div className="p-5 pb-3 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>Activity Log</span>
              </h3>
              <button 
                onClick={() => alert('No deeper logs saved. Typical data: Login source IP, secure browser parameters, active session tokens.')}
                className="text-blue-700 hover:text-blue-900 text-xs font-bold"
                id="view-all-logs-btn"
              >
                View All
              </button>
            </div>
            <div className="p-5 space-y-3.5 text-xs">
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">Last log In</span>
                <span className="text-gray-900 font-mono tracking-tight">26-May-2026, 03:03 PM</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">Last log out</span>
                <span className="text-gray-900 font-mono tracking-tight">26-May-2026, 03:08 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (8 spans): CTA Cards and Accordions */}
        <div className="lg:col-span-8 space-y-6" id="dashboard-right-column">
          
          {/* Filing Return CTA card (Exact replicates Image 4) */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden" id="cta-file-return-card">
            {/* Visual background indicator */}
            <div className="absolute right-0 top-0 -mt-6 -mr-6 w-32 h-32 bg-blue-50/40 rounded-full select-none" />

            <div className="space-y-2 max-w-lg relative z-10" id="cta-card-texts">
              <h2 className="text-lg md:text-xl font-extrabold text-gray-900 tracking-tight leading-snug">
                File your return for the Assessment Year 2024-25
              </h2>
              <p className="text-xs text-[#2c3e8c] font-bold">
                For Assessment Year 2024-25
              </p>
              <p className="text-xs text-gray-500 leading-relaxed pt-1">
                Taxpayers are reminded to verify income structures matching TDS/AIS forms before clicking submit on standard Income returns.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-6 relative z-10" id="cta-card-buttons">
              <button 
                onClick={() => alert('Income Return Wizard: Bootstrapping electronic forms prefilled with AIS audit databases.')}
                className="bg-[#2c3e8c] hover:bg-[#1e2c66] text-white px-6 py-2.5 rounded font-bold text-xs shadow-md transition-all cursor-pointer"
                id="file-now-btn"
              >
                File Now
              </button>
              <button 
                disabled
                className="bg-gray-100 text-gray-400 px-6 py-2.5 rounded text-xs font-bold cursor-not-allowed border border-gray-200/50"
                id="resume-filing-btn"
              >
                Resume Filing
              </button>
            </div>
          </div>

          {/* Interactive Accordion sections */}
          <div className="space-y-4" id="dashboard-accordions-holder">
            
            {/* Accordion 1: Tax Deposit */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-xs overflow-hidden" id="accordion-tax-deposit">
              <div 
                onClick={() => toggleSection('deposit')}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 text-slate-500 rounded">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <span className="text-base font-bold text-gray-700">Tax Deposit</span>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'deposit' ? 'rotate-90' : ''}`} />
              </div>
              
              {expandedSection === 'deposit' && (
                <div className="px-5 pb-5 pt-1 border-t border-gray-50 bg-slate-50/30 text-xs text-gray-600 animate-slide-down">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                          <th className="py-2.5">Challan Ref</th>
                          <th className="py-2.5">Deposit Date</th>
                          <th className="py-2.5 text-right">Tax Paid (₹)</th>
                          <th className="py-2.5 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-medium">
                        <tr>
                          <td className="py-3 font-mono">CH-890123512</td>
                          <td className="py-3">12-Apr-2026</td>
                          <td className="py-3 text-right font-mono font-bold text-gray-800">4,50,000.00</td>
                          <td className="py-3 text-right">
                            <button onClick={() => alert('Challan downloaded successfully')} className="text-blue-700 font-bold hover:underline">Receipt</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 font-mono">CH-231156294</td>
                          <td className="py-3">15-Feb-2026</td>
                          <td className="py-3 text-right font-mono font-bold text-gray-800">1,25,000.00</td>
                          <td className="py-3 text-right">
                            <button onClick={() => alert('Challan downloaded successfully')} className="text-blue-700 font-bold hover:underline">Receipt</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Recent Filed Returns */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-xs overflow-hidden" id="accordion-returns">
              <div 
                onClick={() => toggleSection('returns')}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 text-slate-500 rounded">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-base font-bold text-gray-700">Recent Filed Returns</span>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'returns' ? 'rotate-90' : ''}`} />
              </div>

              {expandedSection === 'returns' && (
                <div className="px-5 pb-5 pt-1 border-t border-gray-50 bg-slate-50/30 text-xs text-gray-600 animate-slide-down">
                  <div className="space-y-3 font-medium">
                    <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg">
                      <div>
                        <p className="font-bold text-gray-800">ITR-7 (Exempt Trust Return)</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">AY 2023-24 • Receipt No: 890123912304</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded text-[10px] border border-emerald-100">
                          ✓ PROCESSED
                        </span>
                        <button onClick={() => alert('Receipt PDF downloaded')} className="p-1.5 hover:bg-gray-100 rounded text-gray-500" title="Download Receipt">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3: Recent Forms Filed */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-xs overflow-hidden" id="accordion-forms">
              <div 
                onClick={() => toggleSection('forms')}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 text-slate-500 rounded">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-base font-bold text-gray-700">Recent Forms Filed</span>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'forms' ? 'rotate-90' : ''}`} />
              </div>

              {expandedSection === 'forms' && (
                <div className="px-5 pb-5 pt-1 border-t border-gray-50 bg-slate-50/30 text-xs text-gray-600 animate-slide-down">
                  <div className="p-4 bg-white border border-gray-100 rounded-lg flex justify-between items-center text-xs">
                    <div>
                      <p className="font-extrabold text-gray-800">Form 10B (Audit Report of Trust)</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">AY 2024-25 • Filed On: 12-Nov-2025</p>
                    </div>
                    <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-[10px] border border-blue-100">
                      SUBMITTED
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
