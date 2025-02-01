const faqCategories = {
    'General': document.querySelectorAll('.faq-item[data-category="general"]'),
    'Process': document.querySelectorAll('.faq-item[data-category="process"]'),
    'Technical': document.querySelectorAll('.faq-item[data-category="technical"]'),
    'Pricing': document.querySelectorAll('.faq-item[data-category="pricing"]')
};

document.addEventListener('DOMContentLoaded', () => {
    // FAQ Category Filtering
    const categoryButtons = document.querySelectorAll('.faq-category');
    const faqItems = document.querySelectorAll('.faq-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedCategory = button.textContent.toLowerCase();

            // Show/hide FAQ items based on category
            faqItems.forEach(item => {
                if (selectedCategory === 'general' || item.dataset.category === selectedCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all other FAQ items
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });

            // Toggle current FAQ item
            faqItem.classList.toggle('active');
        });
    });
}); 