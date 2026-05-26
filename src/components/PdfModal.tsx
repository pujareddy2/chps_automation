/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Download, Printer, ShieldAlert, FileSignature } from 'lucide-react';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  docReferenceId: string;
  referenceId: string;
  assesseeName: string;
  pan: string;
  section: string;
}

export default function PdfModal({ 
  isOpen, 
  onClose, 
  docReferenceId, 
  referenceId,
  assesseeName,
  pan,
  section
}: PdfModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fade-in" id="pdf-viewer-modal">
      <div 
        className="bg-slate-800 rounded-lg shadow-2xl max-w-4xl w-full flex flex-col overflow-hidden max-h-[92vh] animate-slide-up border border-slate-700"
        id="pdf-modal-box"
      >
        {/* PDF Top Bar Controls */}
        <div className="flex justify-between items-center px-6 py-3 bg-slate-900 border-b border-slate-700 text-slate-200">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 text-white rounded p-1 text-xs font-bold font-mono">PDF</div>
            <span className="text-xs font-mono font-medium truncate max-w-xs md:max-w-md text-slate-300">
              {docReferenceId}.pdf
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrint}
              className="p-2 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition-colors"
              title="Print Order"
              id="print-pdf-btn"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button 
              onClick={() => alert('Mock Download Triggered! The document has saved to your Downloads directory.')}
              className="p-2 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-xs"
              title="Download PDF"
              id="download-pdf-btn"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <div className="w-px h-6 bg-slate-700 mx-1"></div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-red-600 rounded hover:text-white transition-colors transition-all"
              aria-label="Close"
              id="close-pdf-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Paper Container Body representing standard A4 Gov Document */}
        <div className="p-6 md:p-8 overflow-y-auto bg-slate-700 flex justify-center flex-1 max-h-[80vh]">
          <div 
            className="bg-white text-slate-900 shadow-xl p-8 md:p-12 max-w-[800px] w-full min-h-[1050px] font-serif relative border border-gray-300 flex flex-col justify-between"
            style={{ fontSize: '14px', lineHeight: '1.6' }}
            id="pdf-paper-face"
          >
            {/* National emblem and official header info */}
            <div>
              <div className="text-center mb-6">
                <div className="inline-block text-4xl mb-2 font-semibold tracking-wider text-blue-900">
                  🏛️
                </div>
                <h1 className="text-sm font-bold tracking-widest font-sans text-gray-800 uppercase">
                  GOVERNMENT OF INDIA
                </h1>
                <h2 className="text-xs tracking-wider font-bold text-gray-700 uppercase font-sans">
                  INCOME TAX DEPARTMENT
                </h2>
                <p className="text-[10px] font-sans text-gray-500 mt-1">
                  OFFICE OF THE ASSISTANT COMMISSIONER OF INCOME TAX, EXEMPTION CIRCLE, BENGALURU
                </p>
                <div className="w-24 h-0.5 bg-gray-300 mx-auto mt-3"></div>
              </div>

              {/* Notice Metadata Block */}
              <div className="grid grid-cols-2 gap-4 text-xs font-sans text-slate-600 border-b border-gray-100 pb-4 mb-6">
                <div className="space-y-1">
                  <p><strong>PAN:</strong> <span className="font-mono text-slate-900">{pan}</span></p>
                  <p><strong>Assessee:</strong> <span className="text-slate-950 uppercase font-medium">{assesseeName}</span></p>
                  <p><strong>Status:</strong> Exemption Trust u/s 12AB</p>
                </div>
                <div className="space-y-1 text-right">
                  <p><strong>DIN / Ref No:</strong> <span className="font-mono text-slate-900 font-bold">{docReferenceId}</span></p>
                  <p><strong>Communication Ref:</strong> <span className="font-mono text-slate-900">{referenceId}</span></p>
                  <p><strong>Date of Issue:</strong> 19-Feb-2026</p>
                </div>
              </div>

              {/* Subject Title */}
              <div className="text-center my-6 font-sans">
                <h3 className="font-bold underline text-sm uppercase text-gray-900 tracking-tight">
                  NOTICE UNDER SECTION {section || '143(1)'} OF THE INCOME TAX ACT, 1961
                </h3>
              </div>

              {/* Letter Content */}
              <div className="space-y-4 text-justify pr-2 font-serif text-[13px] text-gray-800">
                <p>To,</p>
                <p className="font-bold uppercase text-gray-900 pl-4">
                  THE TRUSTEE / REPRESENTATIVE,<br />
                  {assesseeName}
                </p>
                
                <p className="indent-8 pt-2">
                  Sir / Madam,
                </p>

                <p className="indent-8">
                  This refers to your application submitted under statutory parameters requesting exemption validations and subsequent processing of records under the <strong className="text-gray-950">Income Tax Act, 1961</strong>. Upon primary audits of filing reports presented for initial assessment cycles, certain documentation discrepancies have been highlighted in reference to the aforementioned statutory codes.
                </p>

                <p className="indent-8">
                  Accordingly, as per authority directives, you are hereby requested to provide a structured <strong className="text-gray-950">Written Response along with certified financial schedules</strong> verifying compliance bounds for registration criteria. The responses must explicitly specify details matching the guidelines of Exempted entities under sub-sections of Section 12AB/Section 11/Section 12 of the Income Tax Act.
                </p>

                <p className="indent-8">
                  Please take notice that you are required to submit the written answers along with supporting certificates in pdf format online via the e-Filing workspace dashboard. The document portal remains active for submissions under safe transaction bounds until the specified response timelines.
                </p>

                <p className="indent-8 font-semibold text-gray-900 flex items-start gap-2 bg-amber-50 p-3 rounded border border-amber-100 font-sans text-xs">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <span>Failure to submit specified clarifications within prescribed deadline timelines might trigger assessment review actions leading to potential denial of tax exemptions u/s 12AB of the Act.</span>
                </p>
              </div>
            </div>

            {/* Signature Area */}
            <div className="flex justify-between items-end border-t border-gray-100 pt-6 mt-8 font-sans">
              <div className="text-[10px] text-gray-500">
                <p>System Generated Document</p>
                <p>Authenticity code: ITD-BGLR-VAL-901</p>
              </div>
              <div className="text-center space-y-1">
                <div className="flex flex-col items-center">
                  <FileSignature className="w-10 h-10 text-blue-700 opacity-80" />
                  <div className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 font-bold mt-1">
                    ✓ DIGITALLY SIGNED
                  </div>
                </div>
                <p className="text-xs font-bold text-gray-900 mt-2">Assistant Commissioner of Income Tax</p>
                <p className="text-[10px] text-gray-500">Exemptions Division, Government of India</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
