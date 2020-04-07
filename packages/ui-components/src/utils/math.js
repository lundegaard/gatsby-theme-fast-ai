import { o } from 'ramda';

export const toRad = x => (x * Math.PI) / 180;
export const sin = o(Math.sin, toRad);
export const cos = o(Math.cos, toRad);
