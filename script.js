
// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function () {
    initializePortfolio();
});

// Typing animation for hero section
const words = ["Software Developer.", "Backend Engineer.", "Problem Solver."];
let i = 0;
let j = 0;
let isDeleting = false;
let currentWord = "";
let lastTime = 0;

function type(timestamp) {
    const typingElement = document.getElementById("typing");

    // Tentukan kecepatan
    const typingSpeed = isDeleting ? 60 : 120;
    if (timestamp - lastTime < typingSpeed) {
        requestAnimationFrame(type);
        return;
    }
    lastTime = timestamp;

    if (!isDeleting && j <= words[i].length) {
        currentWord = words[i].substring(0, j++);
    } else if (isDeleting && j >= 0) {
        currentWord = words[i].substring(0, j--);
    }

    typingElement.textContent = currentWord;

    if (!isDeleting && j > words[i].length) {
        // Selesai mengetik → tunggu sedikit baru hapus
        isDeleting = true;
        lastTime += 1000; // delay sebelum hapus
    } else if (isDeleting && j < 0) {
        // Selesai hapus → kata berikutnya
        isDeleting = false;
        i = (i + 1) % words.length;
    }

    requestAnimationFrame(type);
}

requestAnimationFrame(type);
// Custom cursor effect
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");
const color = [
    "#ffffff",
    "#eeeef7",
    "#dddeef",
    "#cccee8",
    "#bbbee0",
    "#aaafd8",
    "#a0a5d4",
    "#9ca2d4",
    "#989ed4",
    "#949bd4",
    "#8f97d4",
    "#8b94d4"
];
circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = color[index % color.length];
});
window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
});
function animatedCircles() {

    let x = coords.x;
    let y = coords.y;

    circles.forEach(function (circle, index) {
        circle.style.left = x - 24 + "px";
        circle.style.top = y - 24 + "px";

        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.6;
        y += (nextCircle.y - y) * 0.6;
    });
    requestAnimationFrame(animatedCircles);
}
animatedCircles();

// Initialize all portfolio functionality
function initializePortfolio() {
    setupSmoothScrolling();
    setupScrollAnimations();
    setupMobileNavigation();
    setupStatCounters();
    setupFormHandling();

}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations using Intersection Observer
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Add a small delay for each card in a grid
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(`
        .skill-card,
        .portfolio-card,
        .achievement-card,
        .about-content,
        .stats-container
    `);

    animatedElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';

        // Observe element
        observer.observe(el);
    });
}

// Mobile navigation functionality
function setupMobileNavigation() {
    // Create mobile menu toggle button if it doesn't exist
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');

    // Check if we need mobile navigation
    if (window.innerWidth <= 768) {
        createMobileMenuToggle(nav, navLinks);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-toggle')) {
                createMobileMenuToggle(nav, navLinks);
            }
        } else {
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (toggle) {
                toggle.remove();
                navLinks.classList.remove('mobile-active');
            }
        }
    });
}

// Create mobile menu toggle button
function createMobileMenuToggle(nav, navLinks) {
    const existingToggle = document.querySelector('.mobile-menu-toggle');
    if (existingToggle) return;

    const toggle = document.createElement('button');
    toggle.className = 'mobile-menu-toggle';
    toggle.innerHTML = '☰';
    toggle.setAttribute('aria-label', 'Toggle navigation menu');

    // Style the toggle button
    toggle.style.cssText = `
        display: block;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--text-dark);
        cursor: pointer;
        padding: 0.5rem;
    `;

    // Add click event
    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        toggle.innerHTML = navLinks.classList.contains('mobile-active') ? '×' : '☰';
    });

    // Insert toggle button
    nav.appendChild(toggle);

    // Add mobile styles to nav-links
    if (!document.querySelector('#mobile-nav-styles')) {
        const style = document.createElement('style');
        style.id = 'mobile-nav-styles';
        style.textContent = `
            @media (max-width: 768px) {
                .nav-links {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    flex-direction: column;
                    padding: 1rem;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    gap: 1rem;
                }
                .nav-links.mobile-active {
                    display: flex;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Animated counters for statistics
function setupStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Animate counter numbers
function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/[0-9]/g, '');

    let current = 0;
    const duration = 2000; // 2 seconds
    const increment = number / (duration / 16); // 60fps

    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Form handling for contact
function setupFormHandling() {
    // Handle contact button clicks
    const contactButtons = document.querySelectorAll('a[href^="mailto:"]');

    contactButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Add analytics or tracking here if needed
            console.log('Contact button clicked');
        });
    });

    // Handle social media links
    const socialLinks = document.querySelectorAll('.social-links a, .footer-social a');

    socialLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                console.log('Social link clicked:', this.getAttribute('aria-label') || 'Social media');
                // You can replace this with actual social media URLs
                showNotification('Social media links coming soon!');
            }
        });
    });
}

// Show notification (utility function)
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Header scroll effect
function setupHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.style.background = 'rgba(247, 250, 252, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(247, 250, 252, 0.9)';
            header.style.boxShadow = 'none';
        }

        // Hide header when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });

    // Add smooth transition to header
    header.style.transition = 'all 0.3s ease';
}

// Parallax effect for hero section
function setupParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        if (scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed * 0}px)`;
            heroImage.style.transform = `translateY(${scrolled * parallaxSpeed * 0}px)`;
        }
    });
}

// Typing animation for hero text
function setupTypingAnimation() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (!heroTitle) return;

    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    heroTitle.style.opacity = '1';

    let index = 0;
    const speed = 50;

    function typeWriter() {
        if (index < text.length) {
            heroTitle.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        }
    }

    // Start typing animation after page load
    setTimeout(typeWriter, 1000);
}

// Initialize additional effects
function initializeEffects() {
    setupHeaderScroll();
    setupParallaxEffect();
    // setupTypingAnimation(); // Uncomment if you want typing effect
}

// Call additional effects after DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializePortfolio();
    initializeEffects();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        document.title = 'Come back! - Samudra Portfolio';
    } else {
        document.title = 'Samudra - Software Developer';
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function (e) {
    // Press 'h' to go to home/hero section
    if (e.key === 'h' || e.key === 'H') {
        if (e.ctrlKey || e.metaKey) return; // Don't interfere with browser shortcuts
        document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
    }

    // Press 'a' to go to about section
    if (e.key === 'a' || e.key === 'A') {
        if (e.ctrlKey || e.metaKey) return;
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Press 's' to go to skills section
    if (e.key === 's' || e.key === 'S') {
        if (e.ctrlKey || e.metaKey) return;
        const skillsSection = document.querySelector('#skills');
        if (skillsSection) {
            skillsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debouncing to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
    // Any heavy scroll calculations can go here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Console welcome message
console.log(`
🚀 Welcome to Samudra's Portfolio!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👋 Thanks for checking out the code!
💻 Built with vanilla HTML, CSS, and JavaScript
🎨 Designed for performance and accessibility

Keyboard shortcuts:
• Press 'h' to go to Hero section
• Press 'a' to go to About section  
• Press 's' to go to Skills section

Happy exploring! 🎉
`);

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializePortfolio,
        setupSmoothScrolling,
        setupScrollAnimations,
        animateCounter,
        showNotification
    };
}