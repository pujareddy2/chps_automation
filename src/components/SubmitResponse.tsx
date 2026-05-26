/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, UploadCloud, File, Trash2, CheckCircle2, ShieldEllipsis, 
  HelpCircle, Sparkles, Loader2, Info, AlertOctagon, CornerDownRight 
} from 'lucide-react';
import { Notice, Proceeding, ScreenId } from '../types';

interface SubmitResponseProps {
  onNavigate: (screen: ScreenId) => void;
  proceeding: Proceeding;
  notice: Notice;
  onBack: () => void;
  onSubmitSuccess: (responseType: string, remarks: string, uploadedFile: string) => void;
}

export default function SubmitResponse({ 
  onNavigate, 
  proceeding, 
  notice, 
  onBack, 
  onSubmitSuccess 
}: SubmitResponseProps) {
  const [responseType, setResponseType] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; type: string }[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const characterLimit = 4000;
  const remainingCharacters = characterLimit - remarks.length;

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= characterLimit) {
      setRemarks(val);
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    processFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) processFiles(files);
  };

  const processFiles = (files: FileList) => {
    setFileError(null);
    if (files.length === 0) return;

    const file = files[0];
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    // Validate File Type (PDF, Excel, CSV only as per criteria)
    if (extension !== 'pdf' && extension !== 'xls' && extension !== 'xlsx' && extension !== 'csv') {
      setFileError('Invalid File Type! Only PDF, Excel (XLS/XLSX), or CSV formats are supported.');
      return;
    }

    // Validate File Name spaces (Mandated by InstructionsModal rule)
    if (file.name.includes(' ')) {
      setFileError('File Name Error: File name cannot contain spaces as per Indian e-Filing regulatory guidelines. Please rename e.g. "audit-report.pdf".');
      return;
    }

    // Simulate upload delay for visual fidelity
    setIsUploading(true);
    setTimeout(() => {
      const sizeStr = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      setUploadedFiles(prev => [...prev, { name: file.name, size: sizeStr, type: file.type }]);
      setIsUploading(false);
    }, 1200);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!responseType) return;
    if (!remarks.trim() && uploadedFiles.length === 0) {
      alert('Validation Error:\nYou must type remarks or attach supporting financial documents.');
      return;
    }
    
    const fileName = uploadedFiles.length > 0 ? uploadedFiles[0].name : 'Remarks Only';
    onSubmitSuccess(responseType, remarks, fileName);
  };

  const isFormValid = responseType !== '' && (remarks.trim().length > 0 || uploadedFiles.length > 0);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-8 animate-fade-in" id="submit-response-container">
      
      {/* Back button link */}
      <button 
        onClick={onBack}
        className="text-xs font-semibold text-[#2c3e8c] hover:text-blue-900 flex items-center gap-1.5 mb-6 hover:underline focus:outline-none"
        id="submit-response-back-to-notices"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Notice list</span>
      </button>

      {/* Primary header */}
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h1 className="text-xl md:text-2xl font-bold font-sans text-gray-900 tracking-tight flex items-center gap-2">
          <span>Submit Response to Notice ID:</span>
          <span className="text-[#2c3e8c] font-mono select-all tracking-wider font-extrabold">{notice.referenceId}</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">Provide statutory responses, schedules, and document uploads safely</p>
      </div>

      {/* METADATA GRID CARD (Matches Image 2 top metadata) */}
      <div className="bg-[#f8fafc] border border-gray-200/65 rounded-lg p-6 md:p-8 mb-8" id="notice-details-metadata-grid">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Notice Statutory Parameters</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-6 text-xs text-gray-600 font-medium font-sans">
          <div>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Proceeding Name</p>
            <p className="text-gray-900 font-bold mt-0.5">{proceeding.name}</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">PAN of Assessee</p>
            <p className="text-gray-900 font-mono font-bold mt-0.5 uppercase tracking-wider">{proceeding.pan}</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Financial Year</p>
            <p className="text-gray-900 mt-0.5 font-mono">{proceeding.financialYear || 'Not Available'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Assessment Year</p>
            <p className="text-gray-900 mt-0.5 font-mono">{proceeding.assessmentYear || 'Not Available'}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Document Reference ID</p>
            <p className="text-gray-900 font-mono mt-0.5 tracking-tight truncate select-all">{notice.docReferenceId}</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Notice Section Name</p>
            <p className="text-gray-900 font-mono font-semibold mt-0.5 truncate">{notice.section}</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Description</p>
            <p className="text-gray-900 font-medium mt-0.5 leading-relaxed">{notice.description}</p>
          </div>

          <div>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Issued On Date</p>
            <p className="text-gray-900 mt-0.5 font-mono">{notice.issuedOn}</p>
          </div>
          {notice.servedOn && (
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Served On Date</p>
              <p className="text-gray-900 mt-0.5 font-mono">{notice.servedOn}</p>
            </div>
          )}
          {notice.responseDueDate && (
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider text-rose-500">Response Due Date</p>
              <p className="text-rose-600 font-extrabold mt-0.5 font-mono">{notice.responseDueDate}</p>
            </div>
          )}
          <div>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Applicable Act</p>
            <p className="text-gray-900 mt-0.5">{proceeding.applicableAct}</p>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT: Form Details */}
      <form onSubmit={handleFormSubmit} className="space-y-8 pb-32" id="submit-response-main-form">
        
        {/* SECTION: Response Details (matches Image 2 layout) */}
        <div className="bg-white rounded-lg border border-gray-100 shadow-xs p-6 md:p-8 space-y-6" id="form-remarks-area">
          <h2 className="text-base font-extrabold text-gray-800 border-b border-gray-50 pb-3 flex items-center gap-1.5 font-sans">
            <ShieldEllipsis className="w-5 h-5 text-indigo-700" />
            <span>Response from Assessee</span>
          </h2>

          {/* Select Response type (Partial vs Full) */}
          <div className="space-y-3" id="response-type-segment">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Select Response type <span className="text-red-500 font-bold">*</span>
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-gray-700 font-semibold select-none group">
                <input 
                  type="radio" 
                  name="responseType" 
                  value="Partial Response"
                  checked={responseType === 'Partial Response'}
                  onChange={(e) => setResponseType(e.target.value)}
                  className="h-4.5 w-4.5 text-[#2c3e8c] focus:ring-[#2c3e8c]" 
                />
                <span className="group-hover:text-gray-900">Partial Response</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-gray-700 font-semibold select-none group">
                <input 
                  type="radio" 
                  name="responseType" 
                  value="Full Response"
                  checked={responseType === 'Full Response'}
                  onChange={(e) => setResponseType(e.target.value)}
                  className="h-4.5 w-4.5 text-[#2c3e8c] focus:ring-[#2c3e8c]" 
                />
                <span className="group-hover:text-gray-900">Full Response</span>
              </label>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              Note: "Full Response" implies no supplemental filings are requested. Selecting partial locks responses but lets you add updates later.
            </p>
          </div>

          <hr className="border-gray-100" />

          {/* Text Remarks Field */}
          <div className="space-y-2" id="remarks-input-block">
            <div className="flex justify-between items-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              <label htmlFor="remarks">
                Add Written Response/Remarks <span className="text-red-600 font-bold">*</span>
              </label>
              <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${
                remainingCharacters < 500 ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-500'
              }`}>
                Remaining Characters : {remainingCharacters}/{characterLimit}
              </span>
            </div>
            <textarea 
              id="remarks" 
              value={remarks}
              onChange={handleTextareaChange}
              placeholder="Provide clean textual explanations / legal responses here (Max 4000 characters). Supporting accounts or tables can be attached in the Document section below."
              rows={8}
              className="w-full border border-gray-300 rounded p-4 text-xs font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-blue-100 focus:border-[#2c3e8c] focus:outline-none transition-all leading-relaxed"
            />
          </div>
        </div>

        {/* SECTION: File Attachment Uploader (Recreates attachment block from Image 2) */}
        <div className="bg-white rounded-lg border border-gray-100 shadow-xs p-6 md:p-8 space-y-6" id="form-attachment-area">
          <div>
            <h2 className="text-base font-extrabold text-gray-800 flex items-center gap-1.5 font-sans">
              <UploadCloud className="w-5 h-5 text-blue-700" />
              <span>Attach Supporting Documents</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">Add certified audit statements, certificates or bills backing the assertions as requested by tax officers.</p>
          </div>

          {/* Visual Drop area */}
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50/40 hover:bg-slate-100/40 hover:border-[#2c3e8c] transition-colors cursor-pointer select-none"
            onClick={() => fileInputRef.current?.click()}
            id="drag-and-drop-box"
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden" 
              accept=".pdf,.xls,.xlsx,.csv"
            />
            
            <div className="flex flex-col items-center">
              <div className="p-3 bg-white rounded-full text-[#2c3e8c] shadow-sm mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-gray-700">Drag &amp; Drop files here, or <span className="text-blue-700 underline focus:outline-none hover:text-blue-900 cursor-pointer">browse from computer</span></p>
              <p className="text-[10px] text-gray-400 mt-2 font-medium">Supported Formats: PDF, XLS, XLSX, CSV • Strictly B&amp;W 300 DPI • Max Size: 5MB</p>
            </div>
          </div>

          {isUploading && (
            <div className="flex items-center justify-center gap-2 p-3 bg-blue-50/50 rounded-lg text-xs font-medium text-slate-700">
              <Loader2 className="w-4 h-4 text-blue-700 animate-spin" />
              <span>Scanning and encrypting attachment logs... Please Wait</span>
            </div>
          )}

          {fileError && (
            <div className="bg-rose-50 border border-rose-100 text-rose-700 p-3.5 rounded-lg text-xs flex items-start gap-2 select-none animate-shake">
              <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{fileError}</span>
            </div>
          )}

          {/* LISTED UPLOADED ITEMS */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2" id="uploaded-files-registry">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 font-sans">Uploaded attachments ({uploadedFiles.length})</h4>
              
              {uploadedFiles.map((f, fIdx) => (
                <div 
                  key={fIdx}
                  className="bg-white border border-gray-200 rounded-lg p-3.5 flex items-center justify-between text-xs animate-slide-up"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 text-red-600 rounded">
                      <span className="font-mono text-[9px] font-extrabold uppercase">PDF</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 font-mono tracking-tight">{f.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{f.size}</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(fIdx);
                    }}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded transition-colors"
                    title="Delete Upload"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Compliance Info panel helper */}
          <div className="bg-amber-50/50 border border-amber-200/50 p-4 rounded-lg flex items-start gap-2 text-xs text-amber-900 font-sans leading-relaxed">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Important scanning mandate reminder:</p>
              <p className="text-[11px] text-amber-800">
                To guarantee perfect text parser compatibility, make sure target documents are completely flat, de-skewed, strictly high-contrast black &amp; white scans, and carry no passwords.
              </p>
            </div>
          </div>
        </div>

        {/* STICKY BOTTOM BUTTONS ACTIONS FLOATING BAR (matches Image 2 and screenshot) */}
        <div 
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl py-4 z-30 font-sans"
          id="sticky-submit-footer-controller"
        >
          <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
            <p className="text-[11px] text-gray-500 font-semibold hidden md:block">
              Notice Reference: {notice.referenceId}
            </p>
            
            <div className="flex items-center gap-3 ml-auto">
              <button 
                type="button"
                onClick={onBack}
                className="px-6 py-2.5 border border-gray-300 font-bold rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                id="footer-cancel-btn"
              >
                Cancel
              </button>
              
              <button 
                type="submit"
                disabled={!isFormValid || isUploading}
                className={`px-8 py-2.5 font-bold rounded text-sm transition-all focus:outline-none flex items-center gap-1.5 ${
                  isFormValid && !isUploading
                    ? 'bg-[#243782] hover:bg-[#1a2b56] text-white hover:shadow-md cursor-pointer' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                id="footer-submit-continue-btn"
              >
                <span>Continue &gt;</span>
              </button>
            </div>
          </div>
        </div>

      </form>

    </div>
  );
}
