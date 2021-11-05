import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from 'react-i18next';

i18n
	.use(detector)
	.use(Backend)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en-US',
		debug: true,
		backend: {
			// for all available options read the backend's repository readme file
			loadPath: '/locales/{{lng}}/{{ns}}.json'
		},
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
	});

export default i18n;
