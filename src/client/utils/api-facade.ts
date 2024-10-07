import axios from 'axios';
import { Deal } from '@shared/Deal';

export function loadDealsAPI() {
  return axios.get(`/api/deals`).then((res) => res.data as Deal[]);
}

export function createDeal(data: any) {
  return axios.post(`/api/deals`, data).then((res) => res.data as Deal[]);
}

export function deleteDeal(id: number) {
  return axios.delete(`/api/deal/${id}`);
}

export function updateSession(sessionId: string, status: string) {
  return axios
    .put(`/api/deals/checkout-status`, {
      status,
      sessionId,
    })
    .then((res) => res.data as Deal[]);
}

export function updateOffer(offerId: string, status: string) {
  return axios
    .put(`/api/deals/offer-status`, {
      status,
      offerId,
    })
    .then((res) => res.data as Deal[]);
}
