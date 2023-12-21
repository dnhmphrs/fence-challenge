import { writable } from 'svelte/store';

export const screenType = writable(null);
export const isIframe = writable(true);

export const pyodideLoaded = writable(false);
export const darkMode = writable(false);

export const cvMode = writable(true);

export const mousePosition = writable({ x: 0, y: 0, z: 0 });
