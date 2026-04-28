// Script simple solo para partículas
document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createParticle(particlesContainer);
            }, i * 200);
        }
    }
});

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 6 + 2;
    const duration = Math.random() * 10 + 15;
    const startX = Math.random() * window.innerWidth;
    const opacity = Math.random() * 0.5 + 0.2;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${startX}px`;
    particle.style.opacity = opacity;
    particle.style.animationDuration = `${duration}s`;

    container.appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, duration * 1000);
}

