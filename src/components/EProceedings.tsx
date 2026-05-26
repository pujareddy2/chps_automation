/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Briefcase, Activity, CheckCircle, HelpCircle, FileCheck2, 
  UserSquare2, ArrowRight, ShieldCheck, ChevronRight, Sliders, Eye
} from 'lucide-react';
import { Proceeding, ScreenId } from '../types';

interface EProceedingsProps {
  onNavigate: (screen: ScreenId) => void;
  actionProceedings: Proceeding[];
  infoProceedings: Proceeding[];
}

export default function EProceedings({ onNavigate, actionProceedings, infoProceedings }: EProceedingsProps) {
  const [activeTab, setActiveTab] = useState<'action' | 'info'>('action');
  const [selectedRelation, setSelectedRelation] = useState<'self' | 'others'>('self');

  const getProceedingsToRender = () => {
    return activeTab === 'action' ? actionProceedings : infoProceedings;
  };

  const handleViewNotices = (proceeding: Proceeding) => {
    if (activeTab === 'action') {
      onNavigate('VIEW_NOTICES_ACTION');
    } else {
      onNavigate('VIEW_NOTICES_INFO');
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-6 animate-fade-in" id="eproceedings-holder">
      
      {/* Breadcrumb Navigation Bar */}
      <div className="text-xs text-gray-500 flex items-center gap-1.5 mb-6" id="breadcrumbs">
        <span className="hover:text-blue-800 cursor-pointer" onClick={() => onNavigate('DASHBOARD')}>Dashboard</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-400">Pending Actions</span>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-gray-800">e-Proceedings</span>
      </div>

      {/* Main Heading header */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-2xl font-bold font-sans text-gray-900 tracking-tight" id="eproceedings-title">
          e-Proceeding
        </h1>
      </div>

      {/* View relation options selector section (Self vs. Others) */}
      <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 mb-6 font-sans" id="relationship-filter-card">
        <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
          View e-Proceeding related to:
        </p>
        <div className="flex gap-6 text-sm">
          <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-800 select-none">
            <input 
              type="radio" 
              name="relation" 
              checked={selectedRelation === 'self'}
              onChange={() => setSelectedRelation('self')}
              className="h-4 w-4 text-[#2c3e8c] focus:ring-[#2c3e8c]" 
            />
            <span>Self</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-gray-800 transition-colors select-none">
            <input 
              type="radio" 
              name="relation" 
              checked={selectedRelation === 'others'}
              onChange={() => {
                alert('No listings for representative profiles. Currently viewing primary Self Trust account: AAATF2458F.');
                setSelectedRelation('self');
              }}
              className="h-4 w-4 text-[#2c3e8c] focus:ring-[#2c3e8c]" 
            />
            <span>Of Other PAN/TAN</span>
          </label>
        </div>
      </div>

      {/* Interactive Tabs Header List (Recreates Image 5 active/inactive modes) */}
      <div className="flex border-b border-gray-200 mb-6 font-sans" id="proceedings-tabs-holder">
        <button 
          onClick={() => setActiveTab('action')}
          className={`px-6 py-3.5 font-bold text-sm border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'action' 
              ? 'border-[#2c3e8c] text-[#2c3e8c] font-extrabold' 
              : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'
          }`}
          id="tab-for-your-action"
        >
          <span>For your Action</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-sans font-extrabold ${
            activeTab === 'action' ? 'bg-[#2c3e8c] text-white' : 'bg-gray-100 text-gray-400'
          }`}>
            {actionProceedings.length}
          </span>
        </button>

        <button 
          onClick={() => setActiveTab('info')}
          className={`px-6 py-3.5 font-bold text-sm border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'info' 
              ? 'border-[#2c3e8c] text-[#2c3e8c] font-extrabold' 
              : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'
          }`}
          id="tab-for-your-information"
        >
          <span>For your Information</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-sans font-extrabold ${
            activeTab === 'info' ? 'bg-[#2c3e8c] text-white' : 'bg-gray-100 text-gray-400'
          }`}>
            {infoProceedings.length}
          </span>
        </button>
      </div>

      {/* Proceedings List Panel cards */}
      <div className="space-y-6" id="proceedings-cards-wrapper">
        {getProceedingsToRender().map((pro, idx) => (
          <div 
            key={pro.id}
            className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row focus-within:ring-2 focus-within:ring-[#2c3e8c]/10"
            id={`proceeding-card-${pro.id}`}
          >
            {/* Left proceeding details col (spans 65%) */}
            <div className="flex-1 p-6 md:p-8 space-y-6" id="card-left-column">
              <div>
                <span className="text-[10px] font-bold text-[#2c3e8c] bg-blue-50 px-2.5 py-1 rounded inline-block font-sans select-none mb-2">
                  ITD PROCEEDING WORKUNIT
                </span>
                <h3 className="text-lg md:text-xl font-extrabold text-gray-900 leading-snug tracking-tight">
                  {pro.name}
                </h3>
              </div>

              {/* Grid Metadata details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6 text-xs text-gray-600 font-sans font-medium" id="card-info-grid">
                <div>
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">PAN of Assessee</p>
                  <p className="text-gray-900 font-mono font-bold mt-0.5 tracking-wider uppercase">{pro.pan}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Assessment Year</p>
                  <p className="text-gray-900 font-mono mt-0.5">{pro.assessmentYear || 'Not Available'}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Name of Assessee</p>
                  <p className="text-gray-900 mt-0.5 uppercase tracking-wide">{pro.assesseeName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Financial Year</p>
                  <p className="text-gray-900 mt-0.5">{pro.financialYear || 'Not Available'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Applicable Act</p>
                  <p className="text-gray-900 mt-0.5">{pro.applicableAct}</p>
                </div>

                {pro.proceedingClosureDate && (
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Closure Date</p>
                    <p className="text-emerald-700 font-bold mt-0.5">{pro.proceedingClosureDate}</p>
                  </div>
                )}
                {pro.proceedingClosureOrder && (
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Closure Order Reference</p>
                    <p className="text-gray-900 font-mono mt-0.5">{pro.proceedingClosureOrder}</p>
                  </div>
                )}
                {pro.proceedingLimitationDate && (
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Limitation Date</p>
                    <p className="text-rose-600 font-bold mt-0.5">{pro.proceedingLimitationDate}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right proceeding timeline nodes and button stack col (spans 35%) */}
            <div className="w-full md:w-[35%] bg-slate-50 p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100" id="card-right-column">
              
              {/* Timeline graphic representing progress flow */}
              <div className="space-y-3 font-sans pb-4" id="timeline-node-container">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                  PROCEEDING STATUS TIMELINE
                </p>
                
                <div className="relative pl-5 space-y-4" id="timeline-stack">
                  {/* Vertical bar */}
                  <div className="absolute top-1.5 bottom-1.5 left-1.5 w-0.5 bg-gray-200" />

                  {pro.timeline.map((node, nIdx) => (
                    <div key={nIdx} className="relative flex items-start gap-3 text-xs">
                      {/* Node circle decoration */}
                      <span className={`absolute -left-[16.5px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-white ${
                        node.status === 'Open' 
                          ? 'bg-[#2c3e8c] ring-blue-50 animate-pulse' 
                          : 'bg-emerald-600'
                      }`} />
                      <div>
                        <p className="font-extrabold text-gray-800">{node.date}</p>
                        <p className={`text-[10px] font-bold uppercase ${
                          node.status === 'Open' ? 'text-amber-600' : 'text-emerald-600'
                        }`}>
                          ({node.status})
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stacked primary and context buttons */}
              <div className="space-y-2 pt-4 border-t border-gray-200/50" id="card-action-container">
                <button 
                  onClick={() => handleViewNotices(pro)}
                  className="w-full bg-[#2c3e8c] hover:bg-[#1e2c66] text-white py-3.5 rounded font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  id={`view-notices-[${pro.id}]`}
                >
                  <span>View Notices/Orders ({pro.noticesCount})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {activeTab === 'action' ? (
                  <button 
                    onClick={() => alert('Opening Representative authorization panel... Select representative from roster on next screen.')}
                    className="w-full bg-white hover:bg-gray-50 text-[#2c3e8c] border border-[#2c3e8c] font-bold py-2 px-4 rounded text-[11px] transition-all"
                    id={`add-auth-[${pro.id}]`}
                  >
                    + Add / View Authorised Representative
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      disabled
                      className="bg-gray-100 text-gray-400 py-2 px-1 rounded text-[10px] font-bold cursor-not-allowed border border-gray-200"
                      title="Filing appeals for resolved entries is restricted after assessment code clearances"
                    >
                      File Appeal
                    </button>
                    <button 
                      onClick={() => alert(`Initiating secure receipt download for Closure order Ref: ${pro.proceedingClosureOrder}`)}
                      className="bg-white hover:bg-gray-50 text-[#2c3e8c] border border-gray-200 py-2 px-1 rounded text-[10px] font-bold tracking-tight text-center truncate"
                    >
                      Closure Order
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}

        {getProceedingsToRender().length === 0 && (
          <div className="bg-slate-50 border border-dashed border-gray-200 rounded-lg p-12 text-center" id="empty-state">
            <p className="text-sm font-semibold text-gray-500">No active proceedings found matching current criteria.</p>
          </div>
        )}
      </div>

    </div>
  );
}
