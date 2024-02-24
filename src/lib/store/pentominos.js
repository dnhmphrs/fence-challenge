import { writable } from 'svelte/store';

export const selectedPentominos = writable([]);
export const toRotatePentominos = writable(0);
export const toFlipPentominos = writable(0);
export const pentominosStore = writable([]);
