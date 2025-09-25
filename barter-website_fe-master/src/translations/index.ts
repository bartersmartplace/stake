import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import * as eng from './en';
import * as rus from './ru';

const ns = Object.keys(eng);

export const defaultNS = ns[0];

void i18n.use(initReactI18next).init({
	ns,
	defaultNS,
	resources: {
		eng,
		rus,
	},
	lng: 'rus',
	fallbackLng: 'rus',
	// interpolation: {
	// 	escapeValue: false, // not needed for react as it escapes by default
	// },
	compatibilityJSON: 'v3',
});

export default i18n;
