// Formspree Configuration
const FORMSPREE_CONFIG = {
    contact: "https://formspree.io/f/xeokqyje",        // General contact form endpoint
    tech_support: "https://formspree.io/f/xkgbgzrp",   // Tech support form endpoint
    website_project: "https://formspree.io/f/xvgrgqad" // Website project form endpoint
};

// Generic form submission handler
function handleFormSubmit(formId, formType) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Send form data using Formspree
        fetch(FORMSPREE_CONFIG[formType], {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'alert alert-success';
                successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! We\'ll get back to you soon.';
                form.insertBefore(successMsg, form.firstChild);
                
                // Reset form
                form.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => successMsg.remove(), 5000);
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            // Show error message
            const errorMsg = document.createElement('div');
            errorMsg.className = 'alert alert-error';
            errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Sorry, there was an error. Please try again.';
            form.insertBefore(errorMsg, form.firstChild);
        })
        .finally(() => {
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
    });
}

// Initialize forms when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Contact form
    handleFormSubmit('contact-form', 'contact');
    
    // Tech support form
    handleFormSubmit('tech-support-form', 'tech_support');
    
    // Website project form
    handleFormSubmit('website-project-form', 'website_project');
}); 