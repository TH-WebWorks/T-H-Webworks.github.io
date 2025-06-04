// Initialize navigation functionality
function initializeNavigation() {
    // Get all the elements we need
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');
    const body = document.body;

    // Function to open/close mobile menu
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }

    // Add click event to hamburger
    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from bubbling to document
            toggleMobileMenu();
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active')) {
            // Check if click is outside menu and hamburger
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                toggleMobileMenu();
            }
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Set active link based on current page
    function setActiveLink() {
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('.nav-links a');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath.split('/').pop() || 
                (currentPath === '/' && href === 'index.html') ||
                (currentPath.endsWith('/') && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // Call setActiveLink on page load
    setActiveLink();

    // Handle mobile menu on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }, 250);
    });
}

// Initialize navigation when the script loads
document.addEventListener('DOMContentLoaded', () => {
    // If components are already loaded, initialize navigation
    if (document.querySelector('.navbar')) {
        initializeNavigation();
    }
}); 