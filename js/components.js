// Function to load HTML components
async function loadComponent(url, targetId) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        document.getElementById(targetId).innerHTML = html;
        return true;
    } catch (error) {
        console.error('Error loading component:', error);
        return false;
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Load header component
    const headerLoaded = await loadComponent('components/header.html', 'header-placeholder');
    
    // Load footer component
    await loadComponent('components/footer.html', 'footer-placeholder');
    
    // Initialize navigation after header is loaded
    if (headerLoaded) {
        initializeNavigation();
    }
});

function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (!mobileMenuButton || !navLinks) return;

    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
}

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
} 