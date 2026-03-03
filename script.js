/* ========================================
   PORTFOLIO - INTERACTIVE SCRIPTS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initNavigation();
    initScrollAnimations();
    initCursorGlow();
    initCountUp();
    initSkillBars();
});

// ========================================
// TYPING EFFECT
// ========================================
function initTypingEffect() {
    const roles = [
        'Mobile Developer',
        'AI-Integrated Mobile Engineer',
        'Android (Kotlin) Developer',
        'Flutter Developer',
        'Clean Architecture Enthusiast'
    ];
    const el = document.getElementById('typedRole');
    if (!el) return;

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseTicks = 0;

    function tick() {
        const current = roles[roleIndex];

        if (pauseTicks > 0) {
            pauseTicks--;
            setTimeout(tick, 60);
            return;
        }

        if (!isDeleting) {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                pauseTicks = 30; // pause at end
            }
        } else {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                pauseTicks = 8;
            }
        }

        const speed = isDeleting ? 35 : 70;
        setTimeout(tick, speed);
    }

    setTimeout(tick, 800);
}

// ========================================
// NAVIGATION
// ========================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Active link highlight
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    // Hero animations on load
    const heroAnimations = document.querySelectorAll('.hero .animate-in');
    heroAnimations.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 200 + (index * 150));
    });

    // Scroll reveal for other elements
    const revealElements = document.querySelectorAll(
        '.section-header, .about-content, .timeline-item, .project-card, ' +
        '.skills-category, .competency-card, .edu-card, .cert-card, .contact-card, ' +
        '.highlight-card'
    );

    revealElements.forEach(el => el.classList.add('scroll-reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
}

// ========================================
// CURSOR GLOW EFFECT
// ========================================
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow) return;

    // Only on non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
        glow.style.opacity = '1';
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                glow.style.left = e.clientX + 'px';
                glow.style.top = e.clientY + 'px';
            });
        });
    }
}

// ========================================
// STAT COUNTER ANIMATION
// ========================================
function initCountUp() {
    const stats = document.querySelectorAll('.stat-value[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.dataset.count);
                const isFloat = target % 1 !== 0;
                const duration = 1500;
                const startTime = performance.now();

                function step(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const currentValue = target * eased;

                    el.textContent = isFloat
                        ? currentValue.toFixed(1)
                        : Math.floor(currentValue);

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        el.textContent = isFloat ? target.toFixed(1) : target;
                    }
                }

                requestAnimationFrame(step);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => counterObserver.observe(stat));
}

// ========================================
// SKILL BAR ANIMATION
// ========================================
function initSkillBars() {
    const fills = document.querySelectorAll('.skill-fill');

    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    fills.forEach(fill => barObserver.observe(fill));
}
