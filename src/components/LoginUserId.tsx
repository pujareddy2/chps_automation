/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, Building2, HelpCircle, ArrowRight } from 'lucide-react';

interface LoginUserIdProps {
  onContinue: (userId: string) => void;
  savedUserId?: string;
}

export default function LoginUserId({ onContinue, savedUserId = '' }: LoginUserIdProps) {
  const [userId, setUserId] = useState(savedUserId);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = userId.trim().toUpperCase();
    if (!cleaned) {
      setError('Please enter a valid User ID');
      return;
    }
    if (cleaned.length < 5) {
      setError('User ID must be at least 5 characters');
      return;
    }
    setError(null);
    onContinue(cleaned);
  };

  const handleQuickFill = () => {
    setUserId('AAATF2458F');
    setError(null);
  };

  const isButtonEnabled = userId.trim().length >= 5;

  return (
    <div className="w-full flex justify-center py-6 md:py-10 px-4" id="login-user-id-container">
      <div className="max-w-6xl w-full flex flex-col" id="login-sub-wrapper">
        
        {/* Informational Toast Bar */}
        <div className="text-right text-xs text-red-600 mb-4 font-sans select-none" id="mandatory-indicator">
          * Indicates mandatory fields
        </div>

        {/* Major Login Container Box */}
        <div className="bg-white shadow-xl rounded-lg border border-gray-100 flex flex-col md:flex-row overflow-hidden min-h-[520px]" id="login-id-card-frame">
          
          {/* LEFT SIDE: Form Element */}
          <div className="w-full md:w-[46%] p-8 lg:p-12 border-r border-gray-200 flex flex-col justify-between" id="form-container-pane">
            <form onSubmit={handleSubmit} className="space-y-8" id="submit-id-form">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2" id="login-title-h1">
                  Login
                </h1>
                <p className="text-xs text-gray-500 font-sans">
                  Secure access to e-Filing portal
                </p>
              </div>

              {/* Input Group */}
              <div className="space-y-3" id="input-group-element">
                <label className="block text-xs font-semibold text-gray-700 tracking-wide uppercase" htmlFor="user-id">
                  Enter your User ID <span className="text-red-600 font-bold">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="user-id" 
                    value={userId}
                    onChange={(e) => {
                      setUserId(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="PAN/ AADHAAR/ OTHER USER ID" 
                    className={`w-full border rounded p-3 text-sm placeholder:text-gray-400 font-mono tracking-wide uppercase focus:ring-2 focus:outline-none transition-all ${
                      error 
                        ? 'border-red-500 focus:ring-red-200 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-100 focus:border-[#2c3e8c]'
                    }`}
                    autoFocus
                  />
                  {userId && (
                    <button 
                      type="button" 
                      onClick={() => setUserId('')} 
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 font-sans text-xs underline"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {error ? (
                  <p className="text-xs text-red-600 font-sans flex items-center gap-1">
                    <span>⚠️</span> {error}
                  </p>
                ) : (
                  <div className="bg-blue-50/50 p-2.5 rounded text-[11px] text-[#2c3e8c] flex items-start gap-1">
                    <span className="text-xs">💡</span>
                    <span>
                      For a complete interactive demo, use assessee PAN{' '}
                      <button 
                        type="button" 
                        onClick={handleQuickFill} 
                        className="underline font-bold text-blue-700 hover:text-blue-900 underline-offset-2 shrink-0 cursor-pointer"
                      >
                        AAATF2458F
                      </button>
                    </span>
                  </div>
                )}
              </div>

              {/* CTA Action Buttons */}
              <div className="space-y-3 pt-2" id="login-button-stack">
                <button 
                  type="submit"
                  disabled={!isButtonEnabled}
                  className={`w-full py-3.5 rounded font-bold text-sm transition-all focus:outline-none flex items-center justify-center gap-1.5 ${
                    isButtonEnabled 
                      ? 'bg-[#2c3e8c] text-white hover:bg-[#1e2c66] hover:shadow-md cursor-pointer' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  id="user-id-continue-btn"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  type="button"
                  onClick={() => alert('No previous portal page. This is the entry point of the e-Filing login wizard.')}
                  className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded text-sm hover:bg-gray-50 transition-colors"
                  id="user-id-back-btn"
                >
                  &lt; Back
                </button>
              </div>
            </form>

            {/* Other access methods */}
            <div className="pt-8 border-t border-gray-100" id="other-access-methods-pane">
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                Other ways to access your account
              </p>
              <button 
                type="button"
                onClick={() => alert('Net Banking integration: Select your Bank and authenticating accounts directly with Bank tokens.')}
                className="flex items-center text-xs font-semibold text-[#2c3e8c] hover:text-[#1e2c66] hover:underline"
                id="netbanking-trigger"
              >
                <div className="w-8 h-8 bg-blue-50 text-[#2c3e8c] rounded flex items-center justify-center mr-3 font-mono shrink-0 font-bold">
                  🏦
                </div>
                <span>Net Banking Login</span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Support Panel ( replicates Image 7 with valid card images) */}
          <div className="w-full md:w-[54%] p-8 lg:p-12 bg-gray-50/50 flex flex-col justify-between" id="login-id-know-your-id-pane">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2" id="info-heading">
                <HelpCircle className="w-5 h-5 text-blue-800" />
                <span>Know about your <strong className="text-[#2c3e8c]">User ID</strong></span>
              </h2>

              <div className="space-y-6" id="info-blocks-list">
                {/* PAN Identification */}
                <div className="flex gap-4">
                  <div className="w-16 h-10 border border-gray-200 bg-white rounded shadow-2xs overflow-hidden shrink-0 flex items-center justify-center">
                    <img 
                      alt="PAN Card Preview" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSe-R1zEgrATHc0HeJeKEjWGSRV3J9EdOz9f7zgCEauuV0VB0cCLn-UvMCUvjgeP_x32caYZRCc1YrzAG6__3WfH5t5qSQ0qjURFyIeFK_dvWTbT25sVIvfLKZ_gPnfh7EL3O6m85aB2hpRzMC81h0jPt2O5p69ZEodVoz4ypty-DP5zJdnDUx-JneK77PXWv0hPtZB710x_Hg_Pgx6-69FokPw1lRENv_PqVYm6TQ7YdRS4vQ6t2Ys9hFJyb5BdsC3HKHBSGMFI7K" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs mt-0.5">PAN (Permanent Account Number)</h3>
                    <p className="text-xs text-gray-500 font-bold mt-0.5">Individuals</p>
                    <p className="text-[11px] text-gray-500 mt-1 leading-normal">
                      <strong className="text-gray-700">Other Than Individuals</strong> (Company, Trust, AOP, AJP, BOI, Firm, HUF, LLP, Local Authority)
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200/50"></div>

                {/* Aadhaar Identification */}
                <div className="flex gap-4">
                  <div className="w-16 h-10 border border-gray-200 bg-white rounded shadow-2xs overflow-hidden shrink-0 flex items-center justify-center">
                    <img 
                      alt="Aadhaar Card Preview" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlCj-c9TMJJSjp88KnvplJo1NxZ9dTCyR2qMQFHrWxWC1OkM2RjpVTQi0eaVIlfPvmPHBAiJ4WC72oaHwvPVDHzOHthoJ0JImXgKRxon6j3FQXCiyaeOC8HMe9Rwk_Dded363-_CYatTAXEJB1OYW5kLSJFDyqLPCmGdwqT1mDwvfmMm7KnnteWpuvk4cNwvew26ODB344KN_bwiBiSVjayMsdgQZ22fpRtTD70il3-KqevSe_xGtz2d8At1JZB-sMZtfPrBhVMX3N" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs mt-0.5">Aadhaar Number</h3>
                    <p className="text-xs text-gray-500 font-bold mt-0.5">Individuals</p>
                  </div>
                </div>

                <div className="border-t border-gray-200/50"></div>

                {/* Other identifications */}
                <div className="flex gap-4">
                  <div className="w-16 h-10 border border-gray-200 bg-white rounded shadow-2xs overflow-hidden shrink-0 flex items-center justify-center">
                    <img 
                      alt="Other Identifications Logo" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0ZrjeE4xkw9YVB8vNXKJYqKHAlo_bXhNxHdzfyms2l9AIVin4kTe8VQNGxWj-MkgA3UlhAS0f5Kwox9FIerXrl89VhHTLT-7yOgFX4R1fp3cEyiXvp_f6_Vstcvt3rBi4tZZG1RJNtCfRrMmLCLqIu3T3BewpqMDnZopu7x2bN-sXyxztzfMZ-0oYjmt7F2Vx_UEG3HD3inkEd1wvtLS4oEu_BlaaIP5E5R3iwnBNmquyir6gqVQuH1gxKW5YvpvECUBEy90Ao9x9" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs mt-0.5 font-medium">Other than PAN users</h3>
                    <p className="text-[11px] font-bold text-gray-800 mt-1 leading-normal">
                      CA, External Agency, ERI, Tax Deductor &amp; Tax collector, TIN 2.0 Stakeholders, ITDREIN, Non-Residents not holding PAN
                    </p>
                    <ul className="list-disc pl-4 mt-2 space-y-1 text-[11px] text-gray-500 leading-normal">
                      <li>ARCA (Authorised Representative Chartered Accountant) followed by 6 digit registration code</li>
                      <li>TAN (Tax Deductor &amp; Collector)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 text-right border-t border-gray-100">
              <button 
                onClick={() => alert('This displays further categories like e-Filing representatives or legal heir logins.')}
                className="text-xs font-bold text-[#2c3e8c] hover:text-[#1e2c66] hover:underline"
              >
                Show More
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
