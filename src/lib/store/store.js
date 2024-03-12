import { writable } from 'svelte/store';

export const userType = writable(null);
export const screenType = writable(null);
export const isIframe = writable(true);
export const darkMode = writable(false);

export const screenSize = writable({ width: 0, height: 0 });

export const pyodideLoaded = writable(false);
export const isCvMode = writable(false);
export const appReady = writable(false);

export const disableKeyDown = writable(false);
export const isModalOpen = writable(false);
export const isLeaderboardOpen = writable(false);
export const isInstructionsOpen = writable(false);
export const hideProcess = writable(false);
export const qualityMode = writable(-1);
