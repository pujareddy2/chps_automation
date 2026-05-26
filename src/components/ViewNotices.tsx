/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, Search, FileText, CheckCircle2, ChevronRight, HelpCircle, 
  BookOpen, Clock, Settings, Sparkles, ShieldCheck
} from 'lucide-react';
import { Notice, Proceeding, ScreenId } from '../types';

interface ViewNoticesProps {
  onNavigate: (screen: ScreenId) => void;
  proceeding: Proceeding;
  notices: Notice[];
  onSubmitResponseClick: (notice: Notice) => void;
  onOpenPdf: (notice: Notice) => void;
  isActionType: boolean;
}

export default function ViewNotices({ 
  onNavigate, 
  proceeding, 
  notices, 
  onSubmitResponseClick, 
  onOpenPdf,
  isActionType 
}: ViewNoticesProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotices = notices.filter(n => 
    n.referenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.docReferenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSeekAdjournment = (notice: Notice) => {
    alert(`Adjournment Request Gate:\nYou can submit an adjournment request for Notice ID: ${notice.referenceId}.\nPlease upload doctor certificates or CPA delay validations to defer response due dates by 15 business days max.`);
  };

  const handleViewResponse = (notice: Notice) => {
    alert(`RESPONSE VIEW TRANSCRIPT:\n\nNotice ref: ${notice.referenceId}\nResponse status: SUCCESS\nSubmission type: ${notice.submittedType || 'Full Response'}\n\nAssessee remarks:\n"${notice.submittedText || 'Financial audits have been resolved. The exemption parameters match certified Section 12AB guidelines.'}"\n\nUploaded Document:\n"${notice.submittedFile || 'Audit_Exemption_Schedules.pdf'}"`);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-6 animate-fade-in" id="notices-view-context">
      
      {/* Breadcrumbs */}
      <div className="text-xs text-gray-500 flex items-center gap-1.5 mb-6" id="notices-breadcrumbs">
        <span className="hover:text-blue-800 cursor-pointer" onClick={() => onNavigate('DASHBOARD')}>Dashboard</span>
        <ChevronRight className="w-3 h-3" />
        <span className="hover:text-blue-800 cursor-pointer" onClick={() => onNavigate('E_PROCEEDINGS')}>Pending Actions</span>
        <ChevronRight className="w-3 h-3" />
        <span className="hover:text-blue-800 cursor-pointer" onClick={() => onNavigate('E_PROCEEDINGS')}>e-Proceedings</span>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-gray-800">View Notices</span>
      </div>

      {/* Primary Header Group */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold font-sans text-gray-900 tracking-tight" id="notices-title-heading">
            View Notices for e-Proceedings
          </h1>
          <p className="text-xs text-gray-400 mt-1">Viewing critical notices requiring individual actions/resolutions</p>
        </div>
        <button 
          onClick={() => onNavigate('E_PROCEEDINGS')}
          className="bg-white border border-[#2c3e8c] text-[#2c3e8c] font-bold py-2 px-5 rounded text-xs hover:bg-blue-50 transition-colors self-start flex items-center gap-1.5 cursor-pointer"
          id="notices-back-to-list-btn"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to e-Proceedings</span>
        </button>
      </div>

      {/* PROCEEDING DETAIL PANEL CARD (Matches Image 1 top pane layout perfectly) */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 md:p-8 mb-6" id="notices-proceeding-summary-card">
        <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
          <div>
            <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full uppercase tracking-widest inline-block mb-1">
              PROCEEDING HEADER SUMMARY
            </span>
            <h2 className="text-base font-extrabold text-gray-900 leading-snug">
              {proceeding.name}
            </h2>
          </div>
          <span className="bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded text-[10px] tracking-wide border border-emerald-100">
            {isActionType ? '✓ ACTION REQUESTED' : '✓ INFORMATIONAL'}
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs text-gray-600 font-medium font-sans">
          <div>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">PAN of Assessee</p>
            <p className="text-gray-900 font-mono tracking-wider font-extrabold mt-0.5 uppercase">{proceeding.pan}</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Name of Assessee</p>
            <p className="text-gray-900 mt-0.5 uppercase">{proceeding.assesseeName}</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Assessment Year</p>
            <p className="text-gray-900 mt-0.5 font-mono">{proceeding.assessmentYear || 'Not Available'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Financial Year</p>
            <p className="text-gray-900 mt-0.5 font-mono">{proceeding.financialYear || 'Not Available'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Applicable Act</p>
            <p className="text-gray-900 mt-0.5">{proceeding.applicableAct}</p>
          </div>
        </div>
      </div>

      {/* FILTER SEARCH FIELD BAR (Recreates the Search by DIN from screenshot) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6" id="notices-filter-bar">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by DIN / Section / ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded p-2.5 pl-10 focus:ring-2 focus:ring-blue-100 focus:border-[#2c3e8c] focus:outline-none text-xs font-medium placeholder:text-gray-400"
            id="din-search-box"
          />
        </div>
        <div className="text-xs text-gray-500 font-sans pr-1" id="notices-total-indicator-count font-bold">
          Found <strong className="text-gray-900">{filteredNotices.length}</strong> Notice items
        </div>
      </div>

      {/* NOTICES LIST ROWS (Recreates the list of individual notice details Cards) */}
      <div className="space-y-6" id="notices-list">
        {filteredNotices.map((notice, nIdx) => (
          <div 
            key={notice.referenceId}
            className={`bg-white rounded-lg border shadow-xs overflow-hidden ${
              notice.status === 'Submitted' 
                ? 'border-emerald-200/60 bg-emerald-50/5' 
                : 'border-gray-200'
            }`}
            id={`notice-item-${notice.referenceId}`}
          >
            {/* Blue-tinted notice/reference reference banner */}
            <div className={`px-5 py-3 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-sans ${
              notice.status === 'Submitted'
                ? 'bg-emerald-50/40 border-emerald-100 text-emerald-800'
                : 'bg-blue-50/30 border-gray-100 text-[#2c3e8c]'
            }`}>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 mx-0.5 shrink-0" />
                <span className="text-xs font-bold font-mono text-gray-900 tracking-wide">
                  Notice / Communication Reference ID : <strong className="text-[#2c3e8c] tracking-wider select-all">{notice.referenceId}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                {notice.status === 'Submitted' ? (
                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[9px] font-extrabold px-2.5 py-0.5 rounded uppercase font-sans tracking-wider">
                    ✓ RESPONSE FILED
                  </span>
                ) : (
                  <span className="bg-amber-100 text-amber-800 border border-amber-200 text-[9px] font-extrabold px-2.5 py-0.5 rounded uppercase font-sans tracking-wide">
                    ⚠️ ACTION PENDING
                  </span>
                )}
              </div>
            </div>

            {/* Main Content Info Block */}
            <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-start justify-between gap-6" id="notice-grid-body">
              {/* Left detail grid layout */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-xs text-gray-600 font-medium font-sans">
                <div>
                  <p className="text-gray-400 text-[9px] uppercase font-bold tracking-wider">Notice u/s</p>
                  <p className="text-gray-900 mt-0.5 font-mono select-all tracking-tight leading-tight">{notice.section}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[9px] uppercase font-bold tracking-wider">Description</p>
                  <p className="text-gray-900 mt-0.5 leading-relaxed">{notice.description}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[9px] uppercase font-bold tracking-wider">Issued On</p>
                  <p className="text-gray-900 mt-0.5 font-mono">{notice.issuedOn}</p>
                </div>
                {notice.servedOn && (
                  <div>
                    <p className="text-gray-400 text-[9px] uppercase font-bold tracking-wider">Served On</p>
                    <p className="text-gray-900 mt-0.5 font-mono">{notice.servedOn}</p>
                  </div>
                )}
                {notice.responseDueDate && (
                  <div>
                    <p className="text-gray-400 text-[9px] uppercase font-bold tracking-wider">Response Due Date</p>
                    <p className={`mt-0.5 font-mono font-extrabold ${
                      notice.status === 'Submitted' 
                        ? 'text-gray-900' 
                        : 'text-rose-600 ring-2 ring-rose-50 px-1 py-0.5 rounded-sm inline-block'
                    }`}>
                      {notice.responseDueDate}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-gray-400 text-[9px] uppercase font-bold tracking-wider">Document Reference ID</p>
                  <p className="text-blue-800 hover:underline cursor-pointer mt-0.5 font-mono font-bold" onClick={() => onOpenPdf(notice)}>
                    {notice.docReferenceId}
                  </p>
                </div>
              </div>

              {/* Right Stack Action button controllers */}
              <div className="w-full lg:w-56 shrink-0 flex flex-col gap-2.5 font-sans" id="notice-actions-group">
                
                {isActionType ? (
                  <>
                    {/* Action Notices flow */}
                    {notice.status === 'Submitted' ? (
                      <button 
                        onClick={() => handleViewResponse(notice)}
                        className="w-full bg-[#f8fafc] hover:bg-gray-100 border border-gray-300 text-gray-800 text-xs py-3.5 px-4 rounded font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5"
                        id={`view-response-btn-${notice.referenceId}`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>View Response</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => onSubmitResponseClick(notice)}
                        className="w-full bg-[#243782] hover:bg-[#1a2b56] text-white text-xs py-3.5 px-4 rounded font-extrabold transition-all shadow-sm flex items-center justify-center gap-1.5 animate-pulse"
                        id={`submit-response-btn-${notice.referenceId}`}
                      >
                        <span>Submit Response</span>
                      </button>
                    )}

                    <button 
                      onClick={() => onOpenPdf(notice)}
                      className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs py-2 px-3 rounded font-semibold transition-all flex items-center justify-center gap-1"
                      id={`pdf-btn-${notice.referenceId}`}
                    >
                      <span className="text-red-600 text-xs font-mono select-none">PDF</span>
                      <span>Notice/Letter Pdf</span>
                    </button>

                    {notice.status === 'Pending' && (
                      <button 
                        onClick={() => handleSeekAdjournment(notice)}
                        className="w-full bg-white hover:bg-[#fffbeb] border border-amber-300 text-amber-800 hover:text-amber-900 text-xs py-2 px-3 rounded font-semibold transition-all text-center"
                        id={`adjournment-btn-${notice.referenceId}`}
                      >
                        Seek/View Adjournment
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {/* Information Notices flow */}
                    <button 
                      onClick={() => handleViewResponse(notice)}
                      className="w-full bg-slate-100 hover:bg-slate-200 border border-gray-300 text-gray-700 text-xs py-3.5 px-4 rounded font-bold transition-all"
                    >
                      View Response
                    </button>
                    <button 
                      onClick={() => onOpenPdf(notice)}
                      className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs py-2.5 px-3 rounded font-semibold transition-all flex items-center justify-center gap-1"
                    >
                      <span className="text-red-600 text-xs font-mono font-bold">PDF</span>
                      <span>Notice/Letter Pdf</span>
                    </button>
                  </>
                )}

              </div>
            </div>
          </div>
        ))}

        {filteredNotices.length === 0 && (
          <div className="bg-slate-50 border border-dashed border-gray-200 rounded-lg p-12 text-center" id="search-empty-state">
            <p className="text-sm font-semibold text-gray-500">No notices matches your filters. Please adjust the search text.</p>
          </div>
        )}
      </div>

    </div>
  );
}
