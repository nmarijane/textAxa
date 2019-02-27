/**
SET UP A CONFIGURATION FILE THAT CONTAIN OUR CONST
 * */

export const MESSAGES = Object.freeze({
    ERROR: 'Le service est momentanément indisponible',
    LOADING: 'Chargement des données...',
});

/**** URL BASE API *****/
export const URL_BASE = "http://localhost";
// port of the fake server
export const FAKESERVER_PORT = "3000";
export const FAKESERVER_BASE_URL = URL_BASE + ":" + FAKESERVER_PORT;
// port of the nodejs server
export const API_PORT = "1337";
export const API_BASE_URL = URL_BASE + ":" + API_PORT;


/**** CONSOLE COLORS *****/
export const green = '\x1b[32m%s\x1b[0m';
export const red = '\x1b[31m%s\x1b[0m';
