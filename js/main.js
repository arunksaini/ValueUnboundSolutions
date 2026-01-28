console.log('Value Unbound Solutions - Initializing...');

// ==========================================================================
// Header Scroll Effects
// ==========================================================================
const header = document.getElementById('header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

// Add shadow on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
});

// ==========================================================================
// Mobile Menu
// ==========================================================================
if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });
}

// Close mobile menu when clicking links
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// ==========================================================================
// Language Switcher
// ==========================================================================
const languageLabels = {
    'en': '🇺🇸 EN',
    'de': '🇩🇪 DE',
    'fr': '🇫🇷 FR',
    'it': '🇮🇹 IT',
    'es': '🇪🇸 ES'
};

// Function to update language menu visibility
function updateLanguageMenus(currentLang) {
    document.querySelectorAll('.lang-option').forEach(option => {
        const lang = option.dataset.lang;
        if (lang === currentLang) {
            option.style.display = 'none'; // Hide current language
        } else {
            option.style.display = 'flex'; // Show other languages
        }
    });

    // Update all toggle buttons to show current language
    document.querySelectorAll('.lang-toggle span').forEach(span => {
        span.textContent = languageLabels[currentLang] || '🇺🇸 EN';
    });
}

// Toggle language menu
document.querySelectorAll('.lang-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const menu = toggle.parentElement.querySelector('.lang-menu');

        // Close all other language menus
        document.querySelectorAll('.lang-menu').forEach(m => {
            if (m !== menu) m.parentElement.classList.remove('active');
        });

        toggle.parentElement.classList.toggle('active');
    });
});

// Close language menus when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.lang-switcher').forEach(switcher => {
        switcher.classList.remove('active');
    });
});

// Handle language selection
document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = option.dataset.lang;

        // Update menu visibility for all language switchers
        updateLanguageMenus(lang);

        // Close all menus
        document.querySelectorAll('.lang-switcher').forEach(switcher => {
            switcher.classList.remove('active');
        });

        // Trigger language change in i18n
        console.log('Language switched to:', lang);
        if (window.i18n && typeof window.i18n.setLanguage === 'function') {
            window.i18n.setLanguage(lang);
        }
    });
});

// Listen for language changes from i18n
window.addEventListener('languageChanged', (e) => {
    updateLanguageMenus(e.detail.lang);
});

// Initialize language menu on page load
// Wait a bit for i18n to initialize
setTimeout(() => {
    const currentLang = window.i18n?.currentLang || 'en';
    updateLanguageMenus(currentLang);
}, 100);

// ==========================================================================
// Scroll Animations (IntersectionObserver)
// ==========================================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Stop observing once visible to run only once
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up, .fade-in-right').forEach(el => {
    observer.observe(el);
});

// ==========================================================================
// Mobile Menu
// ==========================================================================
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        // Simple toggle animation for hamburger
        mobileBtn.classList.toggle('active'); // CSS for this animation?
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });
}

// ==========================================================================
// Navigation Active State on Scroll
// ==========================================================================
const navSections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const scrollActive = () => {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    let current = '';

    navSections.forEach(section => {
        const sectionTop = section.offsetTop - 150; // Offset adjustments
        const sectionHeight = section.offsetHeight;

        if (scrollY > sectionTop) {
            current = section.getAttribute('id');
        }
    });

    // Special case: If at the very bottom of the page, force 'contact' to be active
    if ((windowHeight + scrollY) >= (documentHeight - 50)) {
        current = 'contact';
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', scrollActive);

// ==========================================================================
// Form Handling (Google Sheets Integration)
// ==========================================================================
// ... (omitted for brevity)

// ==========================================================================
// Virtual Pageview Tracking (for Google Analytics)
// ==========================================================================
// This creates separate URL paths for each section, allowing GA to track
// which sections users view while maintaining smooth scroll experience

const trackingSections = [
    { id: 'hero', path: '/' },
    { id: 'about', path: '/about' },
    { id: 'services', path: '/services' },
    { id: 'vision', path: '/vision' },
    { id: 'founder', path: '/founder' },
    { id: 'contact', path: '/contact' }
];

let currentSection = '/';

// Track when a section becomes visible
const trackSectionView = (sectionId, sectionPath) => {
    // Only track if this is a new section
    if (currentSection === sectionPath) return;

    currentSection = sectionPath;

    // Send virtual pageview to Google Analytics (WITHOUT changing URL)
    // This prevents conflicts with hash-based navigation (#about, #founder, etc.)
    if (typeof gtag === 'function') {
        gtag('config', 'G-52X1CVWHNN', {
            'page_path': sectionPath,
            'page_title': document.title + ' - ' + sectionId.charAt(0).toUpperCase() + sectionId.slice(1)
        });

        console.log('Virtual Pageview:', sectionPath);
    }
};

// Use IntersectionObserver to detect when sections come into view
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Section is at least 50% visible
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionData = trackingSections.find(s => s.id === entry.target.id);
            if (sectionData) {
                trackSectionView(sectionData.id, sectionData.path);
            }
        }
    });
}, {
    threshold: [0.5], // Trigger when 50% of section is visible
    rootMargin: '-10% 0px -10% 0px' // Account for sticky header
});

// Observe all sections
trackingSections.forEach(({ id }) => {
    const element = document.getElementById(id);
    if (element) {
        sectionObserver.observe(element);
    }
});

// Track initial page load
trackSectionView('hero', '/');

// ==========================================================================
// Form Handling (Google Apps Script Integration)
// ==========================================================================

// IMPORTANT: After deploying the Google Apps Script (see google-apps-script.js),
// replace 'YOUR_SCRIPT_URL_HERE' with your actual Web App URL
const FORM_SUBMIT_URL = 'https://script.google.com/macros/s/AKfycbyMh8XS-sbFVvvNdX68jUP-C5gGxcBLWuj0O1KYUKk_DOQfeWLeSdIw5Xe1eCIjFJxk/exec';

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        const formStatus = document.getElementById('form-status');

        // Collect form data
        const formData = {
            name: contactForm.querySelector('#name')?.value || '',
            email: contactForm.querySelector('#email')?.value || '',
            company: contactForm.querySelector('#company')?.value || '',
            message: contactForm.querySelector('#message')?.value || '',
            _honeypot: contactForm.querySelector('[name="_honeypot"]')?.value || ''
        };

        // Basic client-side validation
        if (!formData.name.trim() || !formData.email.trim()) {
            showFormStatus(formStatus, 'error', 'Please fill in all required fields.');
            return;
        }

        // Disable button and show loading state
        btn.disabled = true;
        btn.textContent = 'Sending...';

        try {
            // Check if form URL is configured
            if (!FORM_SUBMIT_URL || FORM_SUBMIT_URL === 'YOUR_SCRIPT_URL_HERE') {
                // Fallback for development - simulate success
                console.warn('Form submission URL not configured. Using fallback mode.');
                await simulateSubmission(formData);
                handleSubmissionSuccess(btn, originalText, formStatus, contactForm);
                return;
            }

            // Send form data to Google Apps Script
            await fetch(FORM_SUBMIT_URL, {
                method: 'POST',
                mode: 'no-cors', // Google Apps Script requires no-cors
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            // Note: With no-cors mode, we can't read the response
            // We assume success if no error is thrown
            handleSubmissionSuccess(btn, originalText, formStatus, contactForm);

        } catch (error) {
            console.error('Form submission error:', error);
            handleSubmissionError(btn, originalText, formStatus);
        }
    });
}

// Handle successful form submission
function handleSubmissionSuccess(btn, originalText, formStatus, form) {
    // Update button
    btn.disabled = false;
    btn.textContent = 'Message Sent!';

    // Clear form
    form.reset();

    // Show success message
    showFormStatus(formStatus, 'success', 'Thank you! We will get back to you shortly.');

    // Track conversion in Google Analytics
    if (typeof window.gtag_report_conversion === 'function') {
        window.gtag_report_conversion();
    }

    // Reset button text after 5 seconds
    setTimeout(() => {
        btn.textContent = originalText;
        if (formStatus) {
            formStatus.style.display = 'none';
        }
    }, 5000);
}

// Handle form submission error
function handleSubmissionError(btn, originalText, formStatus) {
    btn.disabled = false;
    btn.textContent = originalText;
    showFormStatus(formStatus, 'error', 'An error occurred. Please try again or email us directly.');
}

// Show form status message
function showFormStatus(statusElement, type, message) {
    if (statusElement) {
        statusElement.style.display = 'block';
        statusElement.className = `form-status ${type}`;
        statusElement.textContent = message;
    }
}

// Fallback simulation for development/testing
async function simulateSubmission(data) {
    console.log('Simulated form submission:', data);
    return new Promise(resolve => setTimeout(resolve, 1000));
}
