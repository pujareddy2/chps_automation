/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenId = 
  | 'LOGIN_USER_ID' 
  | 'LOGIN_PASSWORD' 
  | 'DASHBOARD' 
  | 'E_PROCEEDINGS' 
  | 'VIEW_NOTICES_ACTION' 
  | 'VIEW_NOTICES_INFO' 
  | 'SUBMIT_RESPONSE'
  | 'SUBMITTED_SUCCESS';

export interface AssesseeProfile {
  name: string;
  pan: string;
  phone: string;
  email: string;
}

export interface Proceeding {
  id: string;
  name: string;
  assessmentYear: string;
  financialYear: string;
  pan: string;
  assesseeName: string;
  applicableAct: string;
  timeline: {
    date: string;
    status: 'Open' | 'Closed';
  }[];
  proceedingClosureDate?: string;
  proceedingClosureOrder?: string;
  proceedingLimitationDate?: string;
  noticesCount: number;
}

export interface Notice {
  referenceId: string;
  section: string;
  docReferenceId: string;
  description: string;
  issuedOn: string;
  servedOn?: string;
  responseDueDate?: string;
  status: 'Pending' | 'Submitted';
  submittedText?: string;
  submittedType?: string;
  submittedFile?: string;
}
