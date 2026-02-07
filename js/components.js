/**
 * Value Unbound Solutions - Shared Components for Sub-Pages
 * Injects header, footer, mobile nav, and cookie banner into sub-pages.
 * This file should NOT be loaded on index.html (which has inline header/footer).
 *
 * Usage: Place these placeholder divs in your HTML:
 *   <div id="site-header"></div>
 *   <div id="site-footer"></div>
 *   <div id="site-cookie-banner"></div>
 *
 * Then load this script BEFORE cookies.js, i18n.js, analytics.js, and main.js.
 */

(function () {
    'use strict';

    function getHeaderHTML() {
        return `
    <header id="header" class="header">
        <div class="nav-container">
            <a href="/" class="logo">
                <img src="/assets/images/logo.png" alt="Value Unbound Solutions" class="logo-img">
                <div class="logo-text">
                    <span class="company-name">Value Unbound Solutions</span>
                    <span class="company-location">Germany</span>
                </div>
            </a>

            <nav class="nav-menu">
                <a href="/" class="nav-link" data-i18n="nav.home">Home</a>
                <div class="nav-dropdown">
                    <div class="nav-dropdown-toggle nav-link">
                        <span data-i18n="nav.company">Company</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                    <div class="nav-dropdown-menu">
                        <a href="/#about" class="nav-dropdown-item" data-i18n="nav.about">About</a>
                        <a href="/#vision" class="nav-dropdown-item" data-i18n="nav.vision">Vision</a>
                        <a href="/#founder" class="nav-dropdown-item" data-i18n="nav.founder">Founder</a>
                    </div>
                </div>
                <a href="/#services" class="nav-link" data-i18n="nav.services">Services</a>
                <a href="/products/" class="nav-link" data-i18n="nav.products">Products</a>
                <a href="/blog/" class="nav-link" data-i18n="nav.blog">Blog</a>
                <a href="/#contact" class="nav-link" data-i18n="nav.contact">Contact</a>
            </nav>

            <div class="nav-actions">
                <div class="lang-switcher">
                    <button class="lang-toggle" aria-label="Select language" aria-haspopup="true" aria-expanded="false">
                        <span>\u{1F1FA}\u{1F1F8} EN</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <polyline points="6,9 12,15 18,9"></polyline>
                        </svg>
                    </button>
                    <div class="lang-menu" role="menu">
                        <button class="lang-option" data-lang="en" role="menuitem">\u{1F1FA}\u{1F1F8} English</button>
                        <button class="lang-option" data-lang="de" role="menuitem">\u{1F1E9}\u{1F1EA} Deutsch</button>
                        <button class="lang-option" data-lang="fr" role="menuitem">\u{1F1EB}\u{1F1F7} Fran\u00e7ais</button>
                        <button class="lang-option" data-lang="it" role="menuitem">\u{1F1EE}\u{1F1F9} Italiano</button>
                        <button class="lang-option" data-lang="es" role="menuitem">\u{1F1EA}\u{1F1F8} Espa\u00f1ol</button>
                    </div>
                </div>
                <a href="/#contact" class="btn btn--primary" data-i18n="nav.get_started">Get Started</a>
            </div>

            <button class="mobile-menu-btn" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>

    <!-- Mobile Navigation -->
    <div class="mobile-nav">
        <div class="mobile-nav-content">
            <a href="/" class="mobile-nav-link" data-i18n="nav.home">Home</a>
            <div class="mobile-nav-group">
                <div class="mobile-nav-toggle">
                    <span data-i18n="nav.company">Company</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                <div class="mobile-nav-sub">
                    <a href="/#about" class="mobile-nav-link" data-i18n="nav.about">About</a>
                    <a href="/#vision" class="mobile-nav-link" data-i18n="nav.vision">Vision</a>
                    <a href="/#founder" class="mobile-nav-link" data-i18n="nav.founder">Founder</a>
                </div>
            </div>
            <a href="/#services" class="mobile-nav-link" data-i18n="nav.services">Services</a>
            <a href="/products/" class="mobile-nav-link" data-i18n="nav.products">Products</a>
            <a href="/blog/" class="mobile-nav-link" data-i18n="nav.blog">Blog</a>
            <a href="/#contact" class="mobile-nav-link" data-i18n="nav.contact">Contact</a>

            <div class="mobile-nav-actions">
                <div class="lang-switcher">
                    <button class="lang-toggle" aria-label="Select language" aria-haspopup="true" aria-expanded="false">
                        <span>\u{1F1FA}\u{1F1F8} EN</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <polyline points="6,9 12,15 18,9"></polyline>
                        </svg>
                    </button>
                    <div class="lang-menu" role="menu">
                        <button class="lang-option" data-lang="en" role="menuitem">\u{1F1FA}\u{1F1F8} English</button>
                        <button class="lang-option" data-lang="de" role="menuitem">\u{1F1E9}\u{1F1EA} Deutsch</button>
                        <button class="lang-option" data-lang="fr" role="menuitem">\u{1F1EB}\u{1F1F7} Fran\u00e7ais</button>
                        <button class="lang-option" data-lang="it" role="menuitem">\u{1F1EE}\u{1F1F9} Italiano</button>
                        <button class="lang-option" data-lang="es" role="menuitem">\u{1F1EA}\u{1F1F8} Espa\u00f1ol</button>
                    </div>
                </div>
                <a href="/#contact" class="btn btn--primary btn--block" data-i18n="nav.get_started">Get Started</a>
            </div>
        </div>
    </div>`;
    }

    function getFooterHTML() {
        return `
    <footer class="site-footer">
        <div class="footer-main">
            <div class="container">
                <div class="footer-content">
                    <!-- Brand Section -->
                    <div class="footer-section">
                        <div class="footer-brand">
                            <a href="/" class="footer-brand-logo">
                                <img src="/assets/images/logo.png" alt="Value Unbound Solutions">
                                <span class="footer-brand-logo-text">Value Unbound Solutions</span>
                            </a>
                            <p data-i18n="footer.tagline">Freeing business value from unnecessary software</p>
                        </div>

                        <div class="footer-contact">
                            <a href="mailto:info@valueunbound.com" class="footer-contact-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" role="img" aria-label="Email icon">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                info@valueunbound.com
                            </a>
                            <div class="footer-contact-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" role="img" aria-label="Location icon">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <span data-i18n="footer.address" style="white-space: pre-line;">Im Geh\u00f6lz 31,
                                    Blankenfelde-Mahlow
                                    Brandenburg 15827, Germany</span>
                            </div>
                        </div>

                        <div class="location-badge">
                            <span data-i18n="footer.location">Engineered in Germany \u{1F1E9}\u{1F1EA}</span>
                        </div>
                    </div>

                    <!-- Services Links -->
                    <div class="footer-section">
                        <h4 data-i18n="footer.services_title">Services</h4>
                        <div class="footer-links">
                            <a href="/#services" class="footer-link" data-i18n="footer.service_optimization">Salesforce Optimization</a>
                            <a href="/#services" class="footer-link" data-i18n="footer.service_automation">Process Automation</a>
                            <a href="/#services" class="footer-link" data-i18n="footer.service_integration">System Integration</a>
                            <a href="/#services" class="footer-link" data-i18n="footer.service_advisory">Strategic Advisory</a>
                            <a href="/#services" class="footer-link" data-i18n="footer.service_custom">Custom Solutions</a>
                        </div>
                    </div>

                    <!-- Company Links -->
                    <div class="footer-section">
                        <h4 data-i18n="footer.company_title">Company</h4>
                        <div class="footer-links">
                            <a href="/#about" class="footer-link" data-i18n="footer.about_link">About Us</a>
                            <a href="/#vision" class="footer-link" data-i18n="footer.vision_link">Our Vision</a>
                            <a href="/#founder" class="footer-link" data-i18n="footer.founder_link">Meet the Founder</a>
                            <a href="/blog/" class="footer-link" data-i18n="footer.blog_link">Blog</a>
                            <a href="/products/" class="footer-link" data-i18n="footer.products_link">Products</a>
                            <a href="/#contact" class="footer-link" data-i18n="footer.contact_link">Contact</a>
                        </div>
                    </div>

                    <!-- Legal & Compliance -->
                    <div class="footer-section">
                        <h4 data-i18n="footer.legal_title">Compliance & Legal</h4>
                        <div class="footer-legal">
                            <div class="compliance-badges">
                                <div class="compliance-badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" role="img" aria-label="Security shield icon">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                    </svg>
                                    <span data-i18n="footer.gdpr_compliant">GDPR Compliant</span>
                                </div>
                                <div class="compliance-badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" role="img" aria-label="Security lock icon">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                    <span data-i18n="footer.iso_compliant">ISO 27001 Standards</span>
                                </div>
                            </div>
                            <div class="footer-links" style="margin-top: var(--space-4);">
                                <a href="#" class="footer-link" id="impressum-link"
                                    data-i18n="footer.imprint_link">Impressum</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <div class="container">
                <div class="footer-bottom-content">
                    <p class="footer-disclaimer"
                        style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: var(--space-3); text-align: center;">
                        Value Unbound Solutions is an independent advisory firm and is not affiliated with, endorsed by,
                        or partnered with Salesforce or any other software vendor.
                    </p>
                    <p class="footer-copyright" data-i18n="footer.copyright">\u00a9 2026 Value Unbound Solutions. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>`;
    }

    function getCookieBannerHTML() {
        return `
    <div id="cookie-banner" class="cookie-banner" style="display: none;">
        <div class="cookie-container">
            <div class="cookie-content">
                <h4 data-i18n="cookies.title">Cookie Settings</h4>
                <p data-i18n="cookies.text">
                    We use cookies to analyze traffic and improve your experience. Do you accept?
                </p>
            </div>
            <div class="cookie-actions">
                <button id="cookie-decline" class="btn btn-secondary btn-sm" data-i18n="cookies.decline">Decline</button>
                <button id="cookie-accept" class="btn btn-primary btn-sm" data-i18n="cookies.accept">Accept</button>
            </div>
        </div>
    </div>`;
    }

    function getImpressumModalHTML() {
        return `
    <div id="impressum-modal" class="modal" style="display: none;">
        <div class="modal-overlay" id="impressum-modal-overlay"></div>
        <div class="modal-content" style="max-width: 600px; max-height: 80vh; overflow-y: auto;">
            <button class="modal-close" id="impressum-modal-close" aria-label="Close">\u00d7</button>
            <h2 style="margin-bottom: var(--space-6);" data-i18n="imprint.title">Impressum</h2>

            <div style="line-height: 1.8; color: var(--text-primary);">
                <p style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-4);"
                    data-i18n="imprint.legal_basis">
                    Angaben gem\u00e4\u00df \u00a7 5 Digitale-Dienste-Gesetz (DDG)
                </p>

                <p style="margin-bottom: var(--space-4);">
                    Value Unbound Solutions - Arun Kumar Saini<br>
                    Im Geh\u00f6lz 31, Blankenfelde-Mahlow<br>
                    15827 Brandenburg
                </p>

                <p style="font-weight: var(--font-weight-semibold); margin-top: var(--space-6); margin-bottom: var(--space-2);"
                    data-i18n="imprint.contact_label">
                    Kontakt:
                </p>
                <p style="margin-bottom: var(--space-4);">
                    <span data-i18n="imprint.phone_label">Telefon:</span> +49 162 7469145<br>
                    <span data-i18n="imprint.email_label">E-Mail:</span> <a href="mailto:info@valueunbound.com"
                        style="color: var(--color-primary);">info@valueunbound.com</a><br>
                    <span data-i18n="imprint.website_label">Website:</span> <a href="https://www.valueunbound.com"
                        style="color: var(--color-primary);">www.valueunbound.com</a>
                </p>

                <p style="margin-bottom: var(--space-4);">
                    <strong data-i18n="imprint.vat_label">Umsatzsteuer-Identifikationsnummer:</strong>
                    <span data-i18n="imprint.vat_status">beantragt</span>
                </p>

                <p style="margin-bottom: var(--space-4);">
                    <strong data-i18n="imprint.legal_form_label">Rechtsform:</strong>
                    <span data-i18n="imprint.legal_form_value">Einzelunternehmen</span>
                </p>

                <p style="font-weight: var(--font-weight-semibold); margin-top: var(--space-6); margin-bottom: var(--space-2);"
                    data-i18n="imprint.responsible">
                    Verantwortlich f\u00fcr den Inhalt nach \u00a7 18 Abs. 2 Medienstaatsvertrag (MStV):
                </p>
                <p style="margin-bottom: var(--space-4);">
                    Arun Kumar Saini<br>
                    Im Geh\u00f6lz 31, Blankenfelde-Mahlow<br>
                    15827 Brandenburg
                </p>

                <p style="font-weight: var(--font-weight-semibold); margin-top: var(--space-6); margin-bottom: var(--space-2);"
                    data-i18n="imprint.dispute_heading">
                    Streitschlichtung:
                </p>
                <p style="margin-bottom: var(--space-2);">
                    <span data-i18n="imprint.odr_text">Die EU-Kommission stellt eine Plattform zur
                        Online-Streitbeilegung bereit:</span>
                    <a href="https://consumer-redress.ec.europa.eu/index_en" target="_blank" rel="noopener noreferrer"
                        style="color: var(--color-primary);">https://consumer-redress.ec.europa.eu</a>
                </p>
                <p data-i18n="imprint.dispute_text">
                    Zum Verbraucherschlichtungsverfahren geh\u00f6rt die M\u00f6glichkeit, Streitigkeiten mit einer
                    Verbraucherstreitbeilegungsstelle zu kl\u00e4ren. Wir sind jedoch weder verpflichtet noch bereit,
                    an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
            </div>
        </div>
    </div>`;
    }

    function setActiveNavLink() {
        var path = window.location.pathname;
        var navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        navLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            if (path.startsWith('/blog') && href === '/blog/') {
                link.classList.add('active');
            } else if (path.startsWith('/products') && href === '/products/') {
                link.classList.add('active');
            }
        });
    }

    // Inject components synchronously so subsequent scripts can find the DOM elements
    var headerEl = document.getElementById('site-header');
    var footerEl = document.getElementById('site-footer');
    var cookieEl = document.getElementById('site-cookie-banner');

    if (headerEl) headerEl.innerHTML = getHeaderHTML();
    if (footerEl) footerEl.innerHTML = getFooterHTML();
    if (cookieEl) cookieEl.innerHTML = getCookieBannerHTML();

    // Inject Impressum modal into body (needed for the footer link)
    if (footerEl) {
        var modalDiv = document.createElement('div');
        modalDiv.id = 'site-impressum-modal';
        modalDiv.innerHTML = getImpressumModalHTML();
        document.body.appendChild(modalDiv);
    }

    setActiveNavLink();
})();
