// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove background opacity based on scroll
    if (scrollTop > 100) {
        header.style.background = 'rgba(245, 241, 237, 0.98)';
    } else {
        header.style.background = 'rgba(245, 241, 237, 0.95)';
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.featured-card, .article-card, .beauty-card, .lifestyle-card, .top-item, .gallery-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Gallery item hover effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const overlay = item.querySelector('.gallery-overlay');
        if (overlay) {
            overlay.style.opacity = '1';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const overlay = item.querySelector('.gallery-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
        }
    });
});

// Instagram feed items hover effect
document.querySelectorAll('.instagram-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const img = item.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.05)';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const img = item.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    
    typing();
}

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('loading');
                observer.unobserve(img);
            }
        }
    });
});

// Apply lazy loading to all images
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Dynamic year in footer
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
});

// Search functionality (if needed later)
function initializeSearch() {
    const searchInput = document.querySelector('#search-input');
    const searchResults = document.querySelector('#search-results');
    
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            // Implement search logic here
            console.log('Searching for:', query);
        });
    }
}

// Social sharing functions
function shareOnSocial(platform, url, text) {
    const shareUrl = encodeURIComponent(url);
    const shareText = encodeURIComponent(text);
    
    let shareLink = '';
    
    switch(platform) {
        case 'facebook':
            shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
            break;
        case 'twitter':
            shareLink = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;
            break;
        case 'pinterest':
            shareLink = `https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareText}`;
            break;
        case 'linkedin':
            shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
            break;
    }
    
    if (shareLink) {
        window.open(shareLink, '_blank', 'width=600,height=400');
    }
}

// Newsletter subscription (placeholder)
function subscribeNewsletter(email) {
    // Placeholder for newsletter subscription logic
    console.log('Newsletter subscription for:', email);
    alert('Grazie per esserti iscritto alla nostra newsletter!');
}

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Cookie consent (GDPR compliance)
function initializeCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        // Show cookie consent banner
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <p>Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito web.</p>
                <div class="cookie-buttons">
                    <button onclick="acceptCookies()" class="accept-btn">Accetta</button>
                    <button onclick="rejectCookies()" class="reject-btn">Rifiuta</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.querySelector('.cookie-banner').remove();
}

function rejectCookies() {
    localStorage.setItem('cookieConsent', 'rejected');
    document.querySelector('.cookie-banner').remove();
}

// Performance monitoring
function trackPageLoad() {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log('Page loaded in:', loadTime, 'ms');
        
        // Track to analytics (placeholder)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                'value': Math.round(loadTime),
                'custom_parameter': 'load_time'
            });
        }
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Send error to analytics (placeholder)
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
    initializeCookieConsent();
    trackPageLoad();
    
    // Add any other initialization code here
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Utility functions
const utils = {
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle: (func, limit) => {
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
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export utils for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = utils;
}