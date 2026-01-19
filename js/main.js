import { i18n } from './i18n.js';

console.log('Value Unbound Solutions - Initializing...');

// ==========================================================================
// Theme Handling
// ==========================================================================
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

// Function to set theme
const setTheme = (theme) => {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('vus_theme', theme);
};

// Initialize Theme
const savedTheme = localStorage.getItem('vus_theme') || 'dark';
setTheme(savedTheme);

// Toggle Event
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = htmlEl.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}

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
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100; // Offset for header
        const sectionId = current.getAttribute('id');
        const link = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link?.classList.add('active');
        } else {
            link?.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', scrollActive);

// ==========================================================================
// Form Handling (Google Sheets Integration)
// ==========================================================================
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby2cnGsTz7OC36cF0vsyaJuxwUr4Bwxk_RC5te2jqBsovLifaFxqhOP786Cl29dxaG_/exec'; // User needs to update this

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Basic validation
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        if (!data.name || !data.email || !data.message) {
            showStatus('Please fill in all required fields.', 'error');
            return;
        }

        // 2. Honeypot check (redundant but good practice)
        if (data._honeypot) {
            console.warn('Bot detected via honeypot');
            showStatus('Thank you for your submission!', 'success'); // Fake success for bots
            contactForm.reset();
            return;
        }

        // 3. Submit to Google Apps Script
        showStatus('Sending...', 'info');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;

        try {
            // Check if URL is configured
            if (APPS_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                throw new Error('Form endpoint not configured. Please add the Apps Script URL in js/main.js');
            }

            const response = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Use no-cors for GAS to avoid preflight issues if not handled
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Note: with no-cors, we can't read the response body, but we can assume success if no error is thrown
            showStatus('Message sent successfully! We will get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Submission error:', error);
            showStatus('Sorry, there was an error sending your message. Please try again later or email us directly.', 'error');
        } finally {
            submitBtn.disabled = false;
        }
    });
}

function showStatus(message, type) {
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.style.display = 'block';

    // Reset styles
    formStatus.style.backgroundColor = '';
    formStatus.style.color = '';
    formStatus.style.border = '';

    if (type === 'success') {
        formStatus.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
        formStatus.style.color = '#4caf50';
        formStatus.style.border = '1px solid #4caf50';
    } else if (type === 'error') {
        formStatus.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
        formStatus.style.color = '#f44336';
        formStatus.style.border = '1px solid #f44336';
    } else {
        formStatus.style.backgroundColor = 'rgba(33, 150, 243, 0.1)';
        formStatus.style.color = '#2196f3';
        formStatus.style.border = '1px solid #2196f3';
    }
}
