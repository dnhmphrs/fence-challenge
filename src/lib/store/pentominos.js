import { writable, readable } from 'svelte/store';

export const selectedPentominos = writable([]);
export const toRotatePentominos = writable(0);
export const toFlipPentominos = writable(0);
export const pentominosStore = writable([]);

export const pArea = writable('');
export const pIDs = writable('');
export const pFencedTiles = writable([]);
export const pyodideSays = writable([]);
export const pyodideRan = writable(false);
export const sessionID = readable(Math.random());
export const playerID = writable(0);
export const country = writable("");

export const boardOccupiedTiles = writable([]);
export const pResultString = writable('');
