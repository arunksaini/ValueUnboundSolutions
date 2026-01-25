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
const navSections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    navSections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120; // Offset for header (100px) + padding
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
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby2cnGsTz7OC36cF0vsyaJuxwUr4Bwxk_RC5te2jqBsovLifaFxqhOP786Cl29dxaG_/exec';

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        if (!data.name || !data.email || !data.message) {
            showStatus('Please fill in all required fields.', 'error');
            return;
        }

        // Trigger Google Ads Conversion Tracking
        if (typeof gtag_report_conversion === 'function') {
            gtag_report_conversion();
        }


        if (data._honeypot) {
            showStatus('Thank you for your submission!', 'success');
            contactForm.reset();
            return;
        }

        showStatus('Sending...', 'info');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        try {
            const params = new URLSearchParams();
            for (const key in data) {
                params.append(key, data[key]);
            }

            await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
            });

            showStatus('Message sent successfully! We will get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Submission error:', error);
            showStatus('Sorry, there was an error sending your message. Please try again later.', 'error');
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
} else {
    console.error('Contact Form element (#contact-form) NOT found!');
}

function showStatus(message, type) {
    console.log('Status update:', message, type);
    if (!formStatus) {
        // Fallback if status div is missing
        alert(message);
        return;
    }

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

// ==========================================================================
// Virtual Pageview Tracking (for Google Analytics)
// ==========================================================================
// This creates separate URL paths for each section, allowing GA to track
// which sections users view while maintaining smooth scroll experience

const sections = [
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

    // Update URL without page reload (History API)
    if (window.history && window.history.pushState) {
        window.history.pushState(
            { section: sectionId },
            '',
            sectionPath
        );
    }

    // Send virtual pageview to Google Analytics
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
            const sectionData = sections.find(s => s.id === entry.target.id);
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
sections.forEach(({ id }) => {
    const element = document.getElementById(id);
    if (element) {
        sectionObserver.observe(element);
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.section) {
        const element = document.getElementById(event.state.section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Track initial page load
trackSectionView('hero', '/');
