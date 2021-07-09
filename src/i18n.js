import * as Localization from 'expo-localization';

import en from './translations/en.json';
import i18n from 'i18n-js';

i18n.locale = Localization.locale;
i18n.fallbacks = true;
i18n.translations = { en };

export default i18n;
