/**
 * Value Unbound Solutions - Cookie Consent & GA Loader
 * Handles GDPR compliance by dealing with Google Analytics
 * dependent on user consent.
 */

const GA_MEASUREMENT_ID = 'G-52X1CVWHNN';

class CookieConsent {
    constructor() {
        this.banner = document.getElementById('cookie-banner');
        this.acceptBtn = document.getElementById('cookie-accept');
        this.declineBtn = document.getElementById('cookie-decline');

        this.STORAGE_KEY = 'vus_cookie_consent';

        this.init();
    }

    init() {
        // Check if user has already made a choice
        const consent = localStorage.getItem(this.STORAGE_KEY);

        if (consent === 'granted') {
            this.loadAnalytics();
        } else if (consent === 'denied') {
            // Do nothing, GA remains blocked
        } else {
            // No choice made yet, show banner
            this.showBanner();
        }

        // Event Listeners
        if (this.acceptBtn) {
            this.acceptBtn.addEventListener('click', () => this.accept());
        }

        if (this.declineBtn) {
            this.declineBtn.addEventListener('click', () => this.decline());
        }
    }

    showBanner() {
        if (this.banner) {
            this.banner.style.display = 'flex';
            // Small delay to allow display:flex to apply before adding visible class for animation
            setTimeout(() => {
                this.banner.classList.add('visible');
            }, 100);
        }
    }

    hideBanner() {
        if (this.banner) {
            this.banner.classList.remove('visible');
            setTimeout(() => {
                this.banner.style.display = 'none';
            }, 300); // Wait for transition
        }
    }

    accept() {
        localStorage.setItem(this.STORAGE_KEY, 'granted');
        this.loadAnalytics();
        this.hideBanner();
    }

    decline() {
        localStorage.setItem(this.STORAGE_KEY, 'denied');
        this.hideBanner();

        // Optional: Delete existing GA cookies if they exist?
        // For a simple implementation, mostly we just prevent future loading.
    }

    loadAnalytics() {
        console.log('Cookie Consent: Consent granted. Loading Google Analytics...');

        // 1. Load the GTAG script
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        script.async = true;
        document.head.appendChild(script);

        // 2. Initialize GTAG
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID);

        // Make gtag globally available so other scripts (like main.js) can use it
        window.gtag = gtag;

        // 3. Load other conversion scripts helper if needed
        this.loadConversionHelper();
    }

    loadConversionHelper() {
        // Define the helper function globally for Google Ads tracking
        window.gtag_report_conversion = function (url) {
            var callback = function () {
                if (typeof url !== 'undefined') {
                    window.location = url;
                }
            };
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'conversion', {
                    'send_to': 'AW-CONVERSION_ID/LABEL', // Replace with actual if you have Ads
                    'event_callback': callback
                });
            }
            return false;
        };
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    new CookieConsent();
});
