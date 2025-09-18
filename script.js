// ==========================================================================
// P2P2P Project - Advanced Interactive Features
// ==========================================================================

class P2P2PWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupParticles();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupTypingEffect();
        this.setupProgressAnimation();
        this.setupHoverEffects();
        this.setupMobileMenu();
        this.setupLazyLoading();
    }

    // ==========================================================================
    // Particle System
    // ==========================================================================
    setupParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        // Create particles
        this.createParticles(particlesContainer, 50);

        // Add mouse interaction
        this.setupMouseParticles(particlesContainer);
    }

    createParticles(container, count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.createSingleParticle(container);
            }, i * 200);
        }

        // Continuously create new particles
        setInterval(() => {
            if (container.children.length < count) {
                this.createSingleParticle(container);
            }
        }, 3000);
    }

    createSingleParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
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

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }

    setupMouseParticles(container) {
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.95) { // Only create particles occasionally
                this.createMouseParticle(container, e.clientX, e.clientY);
            }
        });
    }

    createMouseParticle(container, x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(255, 255, 255, 0.8)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.animation = 'mouseParticle 1s ease-out forwards';

        container.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }

    // ==========================================================================
    // Navigation
    // ==========================================================================
    setupNavigation() {
        const nav = document.querySelector('.nav');
        const navLinks = document.querySelectorAll('.nav-link');

        // Scroll effect for navigation
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Active link highlighting
        this.setupActiveLinks();
    }

    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ==========================================================================
    // Mobile Menu
    // ==========================================================================
    setupMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenu && navMenu) {
            mobileMenu.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    // ==========================================================================
    // Scroll Effects
    // ==========================================================================
    setupScrollEffects() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Special animations for different elements
                    if (entry.target.classList.contains('feature-card')) {
                        this.animateFeatureCards(entry.target);
                    }
                    if (entry.target.classList.contains('team-member')) {
                        this.animateTeamMember(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        const elementsToAnimate = document.querySelectorAll(
            '.feature-card, .team-member, .contact-item, .main-content'
        );
        
        elementsToAnimate.forEach(el => observer.observe(el));

        // Parallax effect for hero section
        this.setupParallax();
    }

    animateFeatureCards(card) {
        const delay = Array.from(card.parentNode.children).indexOf(card) * 200;
        setTimeout(() => {
            card.style.animation = 'slideInUp 0.6s ease forwards';
        }, delay);
    }

    animateTeamMember(member) {
        const delay = Array.from(member.parentNode.children).indexOf(member) * 300;
        setTimeout(() => {
            member.style.animation = 'fadeInScale 0.8s ease forwards';
        }, delay);
    }

    setupParallax() {
        const hero = document.querySelector('.hero');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // ==========================================================================
    // Typing Effect
    // ==========================================================================
    setupTypingEffect() {
        const typingElements = document.querySelectorAll('.typing-text');
        
        typingElements.forEach((element, index) => {
            const text = element.textContent;
            element.textContent = '';
            element.style.opacity = '1';
            
            setTimeout(() => {
                this.typeText(element, text, 50);
            }, index * 1000);
        });
    }

    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // ==========================================================================
    // Progress Animation
    // ==========================================================================
    setupProgressAnimation() {
        const progressFill = document.querySelector('.progress-fill');
        const progressPercentage = document.querySelector('.progress-percentage');
        
        if (progressFill && progressPercentage) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateProgress(progressFill, progressPercentage, 15);
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(progressFill);
        }
    }

    animateProgress(fillElement, percentageElement, targetPercentage) {
        let currentPercentage = 0;
        const increment = targetPercentage / 100;
        
        const timer = setInterval(() => {
            if (currentPercentage < targetPercentage) {
                currentPercentage += increment;
                fillElement.style.width = `${currentPercentage}%`;
                percentageElement.textContent = `${Math.round(currentPercentage)}%`;
            } else {
                clearInterval(timer);
                fillElement.style.width = `${targetPercentage}%`;
                percentageElement.textContent = `${targetPercentage}%`;
            }
        }, 20);
    }

    // ==========================================================================
    // Hover Effects
    // ==========================================================================
    setupHoverEffects() {
        // Enhanced hover effects for cards
        const cards = document.querySelectorAll('.feature-card, .team-member');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createHoverRipple(e.target, e);
            });
        });

        // CTA button effect
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', (e) => {
                this.createClickRipple(e.target, e);
            });
        }
    }

    createHoverRipple(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        ripple.classList.add('hover-ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    createClickRipple(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        ripple.classList.add('click-ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1000);
    }

    // ==========================================================================
    // Lazy Loading
    // ==========================================================================
    setupLazyLoading() {
        // Preload critical assets
        const criticalAssets = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
        ];

        criticalAssets.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = url;
            document.head.appendChild(link);
        });
    }

    // ==========================================================================
    // Utility Functions
    // ==========================================================================
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// ==========================================================================
// Additional CSS Animations (injected via JavaScript)
// ==========================================================================
function injectAdditionalStyles() {
    const styles = `
        <style>
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes mouseParticle {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0) translateY(-50px);
            }
        }
        
        .hover-ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        .click-ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: clickRipple 1s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(1);
                opacity: 0;
            }
        }
        
        @keyframes clickRipple {
            to {
                transform: scale(1);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-link.active {
            color: #f093fb !important;
        }
        
        /* Loading animation for initial page load */
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .loader-logo {
            font-size: 3rem;
            color: white;
            font-weight: bold;
            animation: pulse 1.5s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.05);
                opacity: 0.8;
            }
        }
        
        .page-loader.hide {
            opacity: 0;
            pointer-events: none;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// ==========================================================================
// Page Loader
// ==========================================================================
function setupPageLoader() {
    // Create loader
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-logo">P2P</div>';
    document.body.insertBefore(loader, document.body.firstChild);
    
    // Hide loader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hide');
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }, 1000);
    });
}

// ==========================================================================
// Easter Eggs and Fun Features
// ==========================================================================
function setupEasterEggs() {
    // Konami Code
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                triggerSecretMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function triggerSecretMode() {
        document.body.style.animation = 'rainbow 2s ease-in-out';
        
        // Show success message
        const message = document.createElement('div');
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.background = 'rgba(0, 0, 0, 0.8)';
        message.style.color = 'white';
        message.style.padding = '20px';
        message.style.borderRadius = '10px';
        message.style.zIndex = '10000';
        message.style.textAlign = 'center';
        message.innerHTML = '🎉 Easter Egg Found! 🎉<br>¡Desarrollado con amor por el equipo P2P2P!';
        document.body.appendChild(message);
        
        setTimeout(() => {
            document.body.style.animation = '';
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 3000);
        
        // Add rainbow animation
        const rainbowStyle = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        const styleSheet = document.createElement('style');
        styleSheet.textContent = rainbowStyle;
        document.head.appendChild(styleSheet);
    }
}

// ==========================================================================
// Contact Form Enhancement
// ==========================================================================
function setupContactEnhancements() {
    // Add click to copy functionality for email
    const emailElement = document.querySelector('.contact-value');
    if (emailElement && emailElement.textContent.includes('@')) {
        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Click to copy email';
        
        emailElement.addEventListener('click', () => {
            navigator.clipboard.writeText(emailElement.textContent).then(() => {
                // Show success message
                const toast = document.createElement('div');
                toast.textContent = 'Email copied to clipboard!';
                toast.style.position = 'fixed';
                toast.style.top = '20px';
                toast.style.right = '20px';
                toast.style.background = '#4CAF50';
                toast.style.color = 'white';
                toast.style.padding = '10px 20px';
                toast.style.borderRadius = '5px';
                toast.style.zIndex = '10000';
                document.body.appendChild(toast);
                
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 2000);
            });
        });
    }
}

// ==========================================================================
// Initialize Everything
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    injectAdditionalStyles();
    setupPageLoader();
    setupEasterEggs();
    setupContactEnhancements();
    
    // Initialize main website functionality
    new P2P2PWebsite();
    
    // Log a welcome message
    console.log('🚀 P2P2P Project website loaded successfully!');
    console.log('💡 Try the Konami Code for a surprise! ↑↑↓↓←→←→BA');
    console.log('📧 Click on the email to copy it to clipboard!');
});

// Performance monitoring
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = window.performance.timing.loadEventEnd - 
                        window.performance.timing.navigationStart;
        console.log(`⚡ Page loaded in ${loadTime}ms`);
    }
}); 