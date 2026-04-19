import { apiFetch } from '@/services/api-client';

export interface InterestPayload {
  category: 'ride' | 'drive' | 'corporate';
  email: string;
}

export const registerInterest = (payload: InterestPayload) => apiFetch('/interest', { method: 'POST', data: payload });