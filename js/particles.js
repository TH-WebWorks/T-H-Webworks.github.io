const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.querySelector('.hero').appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.setProperty('--delay', `${Math.random() * 5}s`);
        particle.style.setProperty('--size', `${Math.random() * 3 + 1}px`);
        particle.style.left = `${Math.random() * 100}%`;
        particlesContainer.appendChild(particle);
    }
};

document.addEventListener('DOMContentLoaded', createParticles);
