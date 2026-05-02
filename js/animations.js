// ==========================================================================
// P2P2P Project - Animations and Particles
// ==========================================================================

class AnimationManager {
    constructor() {
        this.initParticles();
        this.initMobileMenu();
    }

    initParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        const count = 50;
        for (let i = 0; i < count; i++) {
            setTimeout(() => this.createParticle(container), i * 200);
        }

        setInterval(() => {
            if (container.children.length < count) {
                this.createParticle(container);
            }
        }, 3000);
    }

    createParticle(container) {
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

    initMobileMenu() {
        const toggle = document.getElementById('mobile-menu');
        const menu = document.querySelector('.nav-menu');

        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                menu.classList.toggle('active');
            });

            // Close when clicking link
            const links = document.querySelectorAll('.nav-link');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.remove('active');
                });
            });
        }
    }
}

export default AnimationManager;
