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
        if (link.getAttribute('href').includes(current)) {
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
