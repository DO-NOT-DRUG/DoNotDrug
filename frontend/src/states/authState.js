import { atom } from 'recoil';

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: sessionStorage.getItem('accessToken') || '',
});