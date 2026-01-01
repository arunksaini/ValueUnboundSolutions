import './styles/variables.css';
import './styles/global.css';
import './styles/layout.css';

console.log('Value Unbound Solutions - Website Loaded');

// Mobile Menu Toggle (To be implemented fully if needed)
document.addEventListener('DOMContentLoaded', () => {
  // Navigation active state
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    // Check if the link href ends with the current path (handling / and index.html)
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '/' && href === '/index.html') || (currentPath === '/' && href === './') || (currentPath.endsWith('/') && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
