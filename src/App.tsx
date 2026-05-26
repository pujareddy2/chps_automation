/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import LoginUserId from './components/LoginUserId';
import LoginPassword from './components/LoginPassword';
import Dashboard from './components/Dashboard';
import EProceedings from './components/EProceedings';
import ViewNotices from './components/ViewNotices';
import SubmitResponse from './components/SubmitResponse';
import SubmittedSuccess from './components/SubmittedSuccess';
import InstructionsModal from './components/InstructionsModal';
import PdfModal from './components/PdfModal';
import { ScreenId, Proceeding, Notice } from './types';

// Seeding Initial High-Fidelity Data Replicating Indian e-Filing Environment
const initialProceedings: Proceeding[] = [
  {
    id: "P1",
    name: "Issue Letter",
    assessmentYear: "",
    financialYear: "Not Available",
    pan: "AAATF2458F",
    assesseeName: "FATIMA CONVENT ASSOCIATION",
    applicableAct: "Income Tax Act 1961",
    timeline: [{ date: '19-Feb-2026', status: 'Open' }],
    noticesCount: 1
  },
  {
    id: "P2",
    name: "Set aside cases for fresh processing of application u/s 12AB",
    assessmentYear: "",
    financialYear: "Not Available",
    pan: "AAATF2458F",
    assesseeName: "FATIMA CONVENT ASSOCIATION",
    applicableAct: "Income Tax Act 1961",
    timeline: [
      { date: '23-Dec-2025', status: 'Closed' },
      { date: '16-Oct-2025', status: 'Open' }
    ],
    proceedingClosureDate: "23-Dec-2025",
    proceedingClosureOrder: "288771674",
    noticesCount: 1
  },
  {
    id: "P3",
    name: "Penalty Proceeding",
    assessmentYear: "2023-24",
    financialYear: "2022-23",
    pan: "AAATF2458F",
    assesseeName: "FATIMA CONVENT ASSOCIATION",
    applicableAct: "Income Tax Act 1961",
    timeline: [{ date: '26-Jun-2025', status: 'Closed' }],
    proceedingClosureDate: "24-Jun-2025",
    proceedingLimitationDate: "30-Sep-2025",
    noticesCount: 0
  }
];

const initialNotices: Notice[] = [
  {
    referenceId: "100109622829",
    section: "ITBA/COM/F/17/2025-26/1086235720(1)",
    docReferenceId: "ITBA/COM/F/17/2025-26/1086235720(1)",
    description: "[ITBA]Issue Letter",
    issuedOn: "19-Feb-2026",
    servedOn: "19-Feb-2026",
    responseDueDate: "06-Mar-2026",
    status: "Pending"
  },
  {
    referenceId: "100103294641",
    section: "ITBA/EXM/F/EXM54/2025-26/1081815996(1)",
    docReferenceId: "ITBA/EXM/F/EXM54/2025-26/1081815996(1)",
    description: "[ITBA]Show Cause Notice u/s Set Aside of Income Tax Act 1961",
    issuedOn: "16-Oct-2025",
    servedOn: "16-Oct-2025",
    responseDueDate: "31-Oct-2025",
    status: "Submitted",
    submittedType: "Full Response",
    submittedText: "Financial audits and registration summaries have been parsed in context of section 12AB requirements. Fatima Convent Association complies fully with prescribed exemption parameters.",
    submittedFile: "Audit_Exemption_Certificate_FY25.pdf"
  }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('LOGIN_USER_ID');
  const [userId, setUserId] = useState<string>('');
  const [userName] = useState<string>('FATIMA CONVENT ASSOCIATION');
  
  // Notice & Proceeding Store State
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [activeNotice, setActiveNotice] = useState<Notice>(initialNotices[0]);
  
  // Modal controllers
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [selectedPdfNotice, setSelectedPdfNotice] = useState<Notice | null>(null);

  // Success Confirmation State parameters
  const [recentFilingDetails, setRecentFilingDetails] = useState<{
    noticeId: string;
    responseType: string;
    fileName: string;
  } | null>(null);

  // Authentication Handlers
  const handleUserIdContinue = (enteredId: string) => {
    setUserId(enteredId);
    setCurrentScreen('LOGIN_PASSWORD');
  };

  const handleBackToUserId = () => {
    setCurrentScreen('LOGIN_USER_ID');
  };

  const handleLoginSuccess = (enteredPassword: string) => {
    setCurrentScreen('DASHBOARD');
  };

  const handleLogout = () => {
    setUserId('');
    setCurrentScreen('LOGIN_USER_ID');
  };

  // Nav actions
  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
  };

  // Click handler: Submit Response (opens prompt modal gatekeeper first!)
  const handleSubmitResponseClick = (notice: Notice) => {
    setActiveNotice(notice);
    setIsInstructionsOpen(true);
  };

  // Continue triggers inside Instructions Modal
  const handleInstructionsContinue = () => {
    setIsInstructionsOpen(false);
    setCurrentScreen('SUBMIT_RESPONSE');
  };

  // Submit Response Success form handler
  const handleResponseFormSubmitSuccess = (
    chosenType: string, 
    userRemarks: string, 
    attachedFileName: string
  ) => {
    // Update local notices persistent list state
    setNotices(prevNotices => 
      prevNotices.map(noticeObj => {
        if (noticeObj.referenceId === activeNotice.referenceId) {
          return {
            ...noticeObj,
            status: 'Submitted',
            submittedType: chosenType,
            submittedText: userRemarks,
            submittedFile: attachedFileName
          };
        }
        return noticeObj;
      })
    );

    // Save logs to show on Confirmation Screen
    setRecentFilingDetails({
      noticeId: activeNotice.referenceId,
      responseType: chosenType,
      fileName: attachedFileName
    });

    setCurrentScreen('SUBMITTED_SUCCESS');
  };

  // PDF modal viewers trigger
  const handleOpenNoticePdf = (notice: Notice) => {
    setSelectedPdfNotice(notice);
    setIsPdfModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      
      {/* Universal header layout */}
      <Header 
        currentScreen={currentScreen} 
        onNavigate={handleNavigate} 
        onLogout={handleLogout}
        userName={userName}
      />

      {/* Main viewport area */}
      <main className="flex-1 w-full bg-slate-100 flex flex-col justify-start">
        {currentScreen === 'LOGIN_USER_ID' && (
          <LoginUserId 
            onContinue={handleUserIdContinue} 
            savedUserId={userId}
          />
        )}

        {currentScreen === 'LOGIN_PASSWORD' && (
          <LoginPassword 
            userId={userId} 
            onBack={handleBackToUserId} 
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {currentScreen === 'DASHBOARD' && (
          <Dashboard 
            onNavigate={handleNavigate} 
            userId={userId || 'AAATF2458F'} 
            userName={userName}
          />
        )}

        {currentScreen === 'E_PROCEEDINGS' && (
          <EProceedings 
            onNavigate={handleNavigate}
            actionProceedings={[initialProceedings[0]]}
            infoProceedings={[initialProceedings[1], initialProceedings[2]]}
          />
        )}

        {currentScreen === 'VIEW_NOTICES_ACTION' && (
          <ViewNotices 
            onNavigate={handleNavigate}
            proceeding={initialProceedings[0]}
            notices={notices.filter(n => n.referenceId === "100109622829")}
            onSubmitResponseClick={handleSubmitResponseClick}
            onOpenPdf={handleOpenNoticePdf}
            isActionType={true}
          />
        )}

        {currentScreen === 'VIEW_NOTICES_INFO' && (
          <ViewNotices 
            onNavigate={handleNavigate}
            proceeding={initialProceedings[1]}
            notices={notices.filter(n => n.referenceId === "100103294641")}
            onSubmitResponseClick={handleSubmitResponseClick}
            onOpenPdf={handleOpenNoticePdf}
            isActionType={false}
          />
        )}

        {currentScreen === 'SUBMIT_RESPONSE' && (
          <SubmitResponse 
            onNavigate={handleNavigate}
            proceeding={initialProceedings[0]}
            notice={activeNotice}
            onBack={() => setCurrentScreen('VIEW_NOTICES_ACTION')}
            onSubmitSuccess={handleResponseFormSubmitSuccess}
          />
        )}

        {currentScreen === 'SUBMITTED_SUCCESS' && recentFilingDetails && (
          <SubmittedSuccess 
            onNavigate={handleNavigate}
            noticeId={recentFilingDetails.noticeId}
            pan={userId || 'AAATF2458F'}
            assesseeName={userName}
            responseType={recentFilingDetails.responseType}
            fileName={recentFilingDetails.fileName}
          />
        )}
      </main>

      {/* Footnote information footer (Anti-AI-slop and humble, clean, low-clutter design) */}
      <footer className="bg-slate-900 text-slate-400 text-[11px] py-6 border-t border-slate-800 shrink-0 font-sans mt-auto">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-0.5 text-center md:text-left">
            <p className="font-semibold text-slate-300">© 2026 Income Tax Department, Government of India. All Rights Reserved.</p>
            <p className="text-slate-500 text-[10px]">Site best viewed in latest browsers at 1024x768 resolution.</p>
          </div>
          <div className="flex gap-4 font-bold">
            <span className="hover:text-white cursor-pointer" onClick={() => alert('Secure transmission channels are active (SSL 256-bit AES encryption)')}>Safe Login</span>
            <span className="text-slate-700">|</span>
            <span className="hover:text-white cursor-pointer" onClick={() => alert(`Contact support details: helpdesk@incometax.gov.in`)}>Support</span>
          </div>
        </div>
      </footer>

      {/* OVERLAY: Supporting Instructions Gatekeeper Modal */}
      <InstructionsModal 
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
        onContinue={handleInstructionsContinue}
      />

      {/* OVERLAY: Support PDF Notice View Modal */}
      {selectedPdfNotice && (
        <PdfModal 
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
          docReferenceId={selectedPdfNotice.docReferenceId}
          referenceId={selectedPdfNotice.referenceId}
          assesseeName={userName}
          pan={userId || 'AAATF2458F'}
          section={selectedPdfNotice.section}
        />
      )}

    </div>
  );
}
