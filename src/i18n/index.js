import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/enTranslation';
import faTranslation from './locales/fa/faTranslation';


// ==========================================
// Language Resources
// ==========================================

const resources = {
    en: {
        translation: enTranslation,
    },

    fa: {
        translation: faTranslation,
    },
};


// ==========================================
// Supported Languages
// ==========================================

export const SUPPORTED_LANGUAGES = {
    ENGLISH: 'en',
    PERSIAN: 'fa',
};


// ==========================================
// Get Initial Language
// ==========================================

const getInitialLanguage = () => {
    const savedLanguage =
        localStorage.getItem('portfolio-language');

    if (
        savedLanguage ===
            SUPPORTED_LANGUAGES.ENGLISH ||
        savedLanguage ===
            SUPPORTED_LANGUAGES.PERSIAN
    ) {
        return savedLanguage;
    }

    return SUPPORTED_LANGUAGES.ENGLISH;
};


// ==========================================
// Update Document Direction
// ==========================================

export const updateDocumentLanguage = (language) => {
    const isPersian =
        language === SUPPORTED_LANGUAGES.PERSIAN;

    const direction = isPersian
        ? 'rtl'
        : 'ltr';

    document.documentElement.lang = language;

    document.documentElement.dir = direction;

    document.body.dir = direction;
};


// ==========================================
// Initialize i18next
// ==========================================

i18n
    .use(initReactI18next)
    .init({
        resources,

        lng: getInitialLanguage(),

        fallbackLng:
            SUPPORTED_LANGUAGES.ENGLISH,

        supportedLngs: [
            SUPPORTED_LANGUAGES.ENGLISH,
            SUPPORTED_LANGUAGES.PERSIAN,
        ],

        interpolation: {
            escapeValue: false,
        },

        react: {
            useSuspense: false,
        },
    });


// ==========================================
// Apply Initial Language Direction
// ==========================================

updateDocumentLanguage(i18n.language);


// ==========================================
// Listen for Language Changes
// ==========================================

i18n.on('languageChanged', (language) => {
    updateDocumentLanguage(language);

    localStorage.setItem(
        'portfolio-language',
        language
    );
});


export default i18n;