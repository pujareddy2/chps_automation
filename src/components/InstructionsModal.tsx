/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, FileText, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export default function InstructionsModal({ isOpen, onClose, onContinue }: InstructionsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in" id="instructions-modal-container">
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden max-h-[85vh] animate-slide-up"
        id="instructions-modal-box"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-[#f8fafc]">
          <h2 className="text-lg font-bold text-gray-800" id="instructions-modal-title">
            Instructions for attaching documents
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
            aria-label="Close modal"
            id="close-instructions-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="px-6 py-6 overflow-y-auto space-y-6 text-sm text-gray-700 leading-relaxed max-h-[50vh]">
          {/* File Type Section */}
          <div className="flex gap-4" id="section-file-type">
            <div className="p-2.5 bg-blue-50 text-blue-700 h-11 w-11 rounded-lg flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-1">File Type</h3>
              <p className="text-gray-600">
                Attachment can be <span className="font-semibold text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">PDF</span>, {' '}
                <span className="font-semibold text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">Excel</span>, {' '}
                or <span className="font-semibold text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">CSV</span> format only.
              </p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* File Name Section */}
          <div className="flex gap-4" id="section-file-name">
            <div className="p-2.5 bg-amber-50 text-amber-700 h-11 w-11 rounded-lg flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-1">File Name</h3>
              <p className="text-gray-600">
                The file name of the attachment <span className="font-semibold text-red-600 underline">should not contain spaces</span> or any special characters other than <code className="bg-gray-100 px-1 rounded">- (hyphen)</code> or <code className="bg-gray-100 px-1 rounded">_ (underscore)</code>.
              </p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Best Practices Section */}
          <div className="flex gap-4" id="section-best-practices">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 h-11 w-11 rounded-lg flex items-center justify-center shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-base mb-3">Best Practices for Scanning of Documents</h3>
              
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 space-y-4">
                <div>
                  <h4 className="font-bold text-gray-800 flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Scan Settings
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-600 pl-1">
                    <li className="flex items-start gap-1">
                      <span className="text-emerald-600 shrink-0 select-none">•</span>
                      <span>Set the Scan Clarity/Resolution to at least <strong className="text-gray-800">300 DPI</strong>.</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-emerald-600 shrink-0 select-none">•</span>
                      <span>Choose the format of saving the document as PDF/XLS/XLSX/CSV and name the document appropriately.</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-emerald-600 shrink-0 select-none">•</span>
                      <span>Scan the document in <strong className="text-gray-800">Black and White only</strong>. Color scans increase file sizes significantly.</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-emerald-600 shrink-0 select-none">•</span>
                      <span className="text-red-700 font-medium">Ensure that the document is NOT password protected.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-slate-200 pt-2">
                  <h4 className="font-bold text-gray-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Scanning Source Documents
                  </h4>
                  <p className="mt-1 text-xs text-gray-500 pl-1">
                    Lay document strictly flat on flatbed scanner to prevent warping of textual symbols which compromises Optical Character Recognition (OCR).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 transition-colors font-medium"
            id="cancel-instructions-button"
          >
            Cancel
          </button>
          <button 
            onClick={onContinue}
            className="bg-[#243782] hover:bg-[#1a2b56] text-white px-8 py-2 rounded font-bold text-sm transition-colors cursor-pointer shadow-sm"
            id="continue-instructions-button"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
