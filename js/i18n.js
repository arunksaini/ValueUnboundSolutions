/**
 * Value Unbound Solutions - i18n Module
 * Handles language detection, fetching translations, and updating the UI.
 */

const DEFAULT_LANG = 'en';
const SUPPORTED_LANGS = ['en', 'de', 'fr', 'it', 'es'];

class I18n {
    constructor() {
        this.currentLang = DEFAULT_LANG;
        this.translations = {};
        this.elements = document.querySelectorAll('[data-i18n]');

        this.init();
    }

    async init() {
        const detected = this.detectLanguage();
        this.currentLang = this.validateLang(detected) ? detected : DEFAULT_LANG;

        // Update switcher UI
        const switcher = document.getElementById('lang-switcher');
        if (switcher) {
            switcher.value = this.currentLang;
            switcher.addEventListener('change', (e) => this.setLanguage(e.target.value));
        }

        await this.loadTranslations(this.currentLang);
        this.updateUI();
    }

    detectLanguage() {
        // 1. Check URL param
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam) return langParam;

        // 2. Check LocalStorage
        const stored = localStorage.getItem('vus_lang');
        if (stored) return stored;

        // 3. Browser Language
        const browser = navigator.language.slice(0, 2);
        return browser;
    }

    validateLang(lang) {
        return SUPPORTED_LANGS.includes(lang);
    }

    async setLanguage(lang) {
        if (!this.validateLang(lang)) return;

        this.currentLang = lang;
        localStorage.setItem('vus_lang', lang);

        // Update URL to reflect lang without reload (optional, good for sharing)
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.pushState({}, '', url);

        await this.loadTranslations(lang);
        this.updateUI();

        // Update switcher if changed programmatically
        const switcher = document.getElementById('lang-switcher');
        if (switcher && switcher.value !== lang) switcher.value = lang;
    }

    async loadTranslations(lang) {
        try {
            const response = await fetch(`lang/${lang}.json`);
            if (!response.ok) throw new Error(`Could not load ${lang}.json`);
            this.translations = await response.json();
            document.documentElement.lang = lang;
        } catch (error) {
            console.error('i18n Error:', error);
            // Fallback to English if load fails
            if (lang !== 'en') await this.loadTranslations('en');
        }
    }

    updateUI() {
        this.elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.getNestedTranslation(this.translations, key);

            if (translation) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    // Update placeholder for form fields if needed (not currently using i18n for placeholders in HTML but good practice)
                    el.placeholder = translation; // You might want data-i18n-placeholder for this
                }
                // For this project, we are replacing textContent
                // If we also want to handle placeholders, we can check attribute
                const targetAttr = el.getAttribute('data-i18n-target');
                if (targetAttr) {
                    el.setAttribute(targetAttr, translation);
                } else {
                    el.innerText = translation;
                }
            }
        });
    }

    getNestedTranslation(obj, keyPath) {
        return keyPath.split('.').reduce((prev, curr) => {
            return prev ? prev[curr] : null;
        }, obj);
    }
}

// Export instance
export const i18n = new I18n();
