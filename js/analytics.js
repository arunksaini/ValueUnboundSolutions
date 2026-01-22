/**
 * SectionEngagementTracker
 * Tracks how much time users spend viewing specific sections of the page.
 * Sends data to Google Analytics 4 as custom events.
 */
class SectionEngagementTracker {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.activeSections = new Map(); // sectionId -> startTime
        this.observer = null;
        this.init();
    }

    init() {
        if (!this.sections.length) return;

        const options = {
            root: null, // use the viewport
            rootMargin: '0px',
            threshold: 0.5 // trigger when 50% of the section is visible
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const sectionId = entry.target.id;

                if (entry.isIntersecting) {
                    // Section entered view
                    if (!this.activeSections.has(sectionId)) {
                        this.activeSections.set(sectionId, Date.now());
                        console.debug(`[Analytics] Started tracking section: ${sectionId}`);
                    }
                } else {
                    // Section left view
                    if (this.activeSections.has(sectionId)) {
                        this.logEngagement(sectionId);
                        this.activeSections.delete(sectionId);
                    }
                }
            });
        }, options);

        this.sections.forEach(section => this.observer.observe(section));

        // Handle page visibility changes (tab backgrounded)
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.logAllActiveSections();
            } else {
                // Resume tracking for currently visible sections
                this.sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    const isVisible = (rect.top < window.innerHeight && rect.bottom >= 0);
                    if (isVisible) {
                        this.activeSections.set(section.id, Date.now());
                    }
                });
            }
        });

        // Log final data before page unload
        window.addEventListener('beforeunload', () => {
            this.logAllActiveSections();
        });
    }

    logAllActiveSections() {
        this.activeSections.forEach((startTime, sectionId) => {
            this.logEngagement(sectionId);
        });
        this.activeSections.clear();
    }

    logEngagement(sectionId) {
        const startTime = this.activeSections.get(sectionId);
        if (!startTime) return;

        const duration = Date.now() - startTime;

        // Only log if they spent at least 1 second on the section
        if (duration >= 1000) {
            const durationSec = Math.round(duration / 1000);

            console.info(`[Analytics] Section: ${sectionId} | Time: ${durationSec}s`);

            // Send to GA4
            if (typeof gtag === 'function') {
                gtag('event', 'section_engagement', {
                    'section_id': sectionId,
                    'engagement_time_msec': duration,
                    'engagement_time_sec': durationSec
                });
            }
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SectionEngagementTracker();
});
