// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                stat.textContent = target + (stat.getAttribute('data-count') === '98' ? '%' : '+');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(count);
            }
        }, 16);
    });
}

// Scroll arrow functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    const servicesSection = document.querySelector('.services-section');
    
    if (scrollArrow && servicesSection) {
        scrollArrow.addEventListener('click', function() {
            servicesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // Run animations
    animateNumbers();
}); 