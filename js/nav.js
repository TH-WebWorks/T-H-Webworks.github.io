// Initialize navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (!hamburger || !navMenu) {
        console.error('Navigation elements not found');
        return;
    }

    // Toggle mobile menu
    function toggleMenu() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navMenu.setAttribute('aria-hidden', isExpanded);
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    }

    // Close menu when clicking outside
    function handleClickOutside(event) {
        if (navMenu.getAttribute('aria-hidden') === 'false' && 
            !navMenu.contains(event.target) && 
            !hamburger.contains(event.target)) {
            toggleMenu();
        }
    }

    // Close menu on escape key
    function handleEscapeKey(event) {
        if (event.key === 'Escape' && navMenu.getAttribute('aria-hidden') === 'false') {
            toggleMenu();
        }
    }

    // Set active link based on current page
    function setActiveLink() {
        const currentPath = window.location.pathname;
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (currentPath.endsWith(linkPath)) {
                link.setAttribute('aria-current', 'page');
                link.classList.add('active');
            } else {
                link.removeAttribute('aria-current');
                link.classList.remove('active');
            }
        });
    }

    // Event listeners
    hamburger.addEventListener('click', toggleMenu);
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.getAttribute('aria-hidden') === 'false') {
            toggleMenu();
        }
    });

    // Initialize active link
    setActiveLink();
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeNavigation);

// Initialize services dropdown functionality
function initializeServicesDropdown() {
    const dropdown = document.querySelector('.services-dropdown');
    const trigger = document.querySelector('.dropdown-trigger');
    const menu = document.querySelector('.dropdown-menu');

    if (!dropdown || !trigger || !menu) return;

    // Toggle dropdown on button click
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = menu.classList.contains('show');
        
        if (isOpen) {
            menu.classList.remove('show');
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
        } else {
            menu.classList.add('show');
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            menu.classList.remove('show');
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
        }
    });

    // Close dropdown on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            menu.classList.remove('show');
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
        }
    });
}

// Initialize navigation when the script loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize services dropdown
    initializeServicesDropdown();
}); 