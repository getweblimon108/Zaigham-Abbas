// Initialize EmailJS
(function() {
    emailjs.init("4EA6mEl6KI8qCVRWc");
})();

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initTypingEffect();
    initScrollReveal();
    initProgressRingAnimations();
    initWhatsAppCTA();
    initContactForm();
    initSkillFilters();
    initProjectModals();
});

// Mobile Menu Toggle and Focus Trap
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = mobileMenu.querySelectorAll('.nav-link');
    
    if (!hamburger || !mobileMenu) return;
    
    // Set initial ARIA attributes
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    
    // Toggle menu function
    function toggleMenu() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.setAttribute('aria-hidden', isExpanded);
        
        if (!isExpanded) {
            // Open menu
            document.body.style.overflow = 'hidden';
            mobileMenu.classList.add('active'); // Add active class to slide in
            trapFocus(mobileMenu);
        } else {
            // Close menu
            document.body.style.overflow = '';
            mobileMenu.classList.remove('active'); // Remove active class to slide out
            hamburger.focus();
        }
    }
    
    // Hamburger click event
    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            mobileMenu.classList.remove('active'); // Remove active class to slide out
        });
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
            toggleMenu();
        }
    });
    
    // Focus trap function
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        if (firstFocusable) {
            firstFocusable.focus();
        }
        
        element.addEventListener('keydown', function(e) {
            if (e.key !== 'Tab') return;
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        });
    }
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const texts = ['Designer', 'Developer', 'Creative Thinker'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 70;
    let deletingDelay = 50;
    let pauseDelay = 1000;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Delete text
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = deletingDelay;
        } else {
            // Type text
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 70;
        }
        
        // Check if current text is complete
        if (!isDeleting && charIndex === currentText.length) {
            typingDelay = pauseDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex++;
            if (textIndex === texts.length) textIndex = 0;
            typingDelay = 500;
        }
        
        setTimeout(type, typingDelay);
    }
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery || !mediaQuery.matches) {
        setTimeout(type, 1000);
    } else {
        typingText.textContent = 'Designer | Developer | Creative Thinker';
    }
}

// Scroll Reveal Animation
function initScrollReveal() {
    const elementsToReveal = document.querySelectorAll(
        '.timeline-content, .progress-ring, .playground-card, .project-card, .contact-card'
    );
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery && mediaQuery.matches) {
        elementsToReveal.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        return;
    }
    
    function revealElements() {
        elementsToReveal.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        });
    }
    
    // Set initial state
    elementsToReveal.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.willChange = 'transform, opacity';
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', revealElements);
    
    // Initial check
    revealElements();
}

// Progress Ring Animations
function initProgressRingAnimations() {
    const progressRings = document.querySelectorAll('.progress-ring-circle');
    const progressValues = {
        'HTML': 90,
        'CSS': 85,
        'JavaScript': 60,
        'React': 55,
        'Tailwind': 60
    };
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery && mediaQuery.matches) {
        progressRings.forEach(ring => {
            const skillName = ring.parentElement.nextElementSibling.textContent;
            const circumference = 339.292;
            const offset = circumference - (progressValues[skillName] / 100) * circumference;
            ring.style.strokeDashoffset = offset;
        });
        return;
    }
    
    function animateProgressRings() {
        progressRings.forEach(ring => {
            const ringTop = ring.getBoundingClientRect().top;
            
            if (ringTop < window.innerHeight - 100) {
                const skillName = ring.parentElement.nextElementSibling.textContent;
                const circumference = 339.292;
                const offset = circumference - (progressValues[skillName] / 100) * circumference;
                
                ring.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
                ring.style.strokeDashoffset = offset;
                
                // Set accessibility attributes
                ring.setAttribute('aria-valuenow', progressValues[skillName]);
                ring.setAttribute('aria-valuemin', '0');
                ring.setAttribute('aria-valuemax', '100');
            }
        });
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', animateProgressRings);
    
    // Initial check
    animateProgressRings();
}

// WhatsApp CTA Expand on Scroll
function initWhatsAppCTA() {
    const hero = document.getElementById('home');
    const cta = document.getElementById('whatsapp-cta');
    
    if (!hero || !cta) return;
    
    function threshold() {
        return hero ? hero.offsetHeight * 0.6 : 300;
    }
    
    let hideTimeout;
    
    function handleScroll() {
        if (window.scrollY > threshold()) {
            cta.classList.add('expanded');
            
            // Auto-hide the text on mobile after 7 seconds
            if (window.innerWidth < 1024) {
                clearTimeout(hideTimeout);
                hideTimeout = setTimeout(() => {
                    cta.classList.remove('expanded');
                }, 7000);
            }
        } else {
            cta.classList.remove('expanded');
            clearTimeout(hideTimeout);
        }
    }
    
    // Adjust position when keyboard is visible on mobile
    if ('visualViewport' in window) {
        window.visualViewport.addEventListener('resize', function() {
            if (window.visualViewport.height < window.innerHeight * 0.7) {
                cta.style.bottom = `calc(${window.visualViewport.height - 80}px)`;
            } else {
                cta.style.bottom = 'calc(20px + env(safe-area-inset-bottom))';
            }
        });
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Keyboard support for WhatsApp CTA
    cta.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.open('https://wa.me/923191979057', '_blank');
        }
    });
}

// Contact Form with EmailJS
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Honeypot check
        const honeypot = document.getElementById('url');
        if (honeypot.value !== '') {
            return; // Likely a bot, don't submit
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Send email using EmailJS
        emailjs.sendForm('service_ey9rj7l', 'template_9hccirr', contactForm)
            .then(function() {
                // Success message
                formMessage.textContent = '✅ Message sent successfully!';
                formMessage.className = 'success';
                
                // Reset form
                contactForm.reset();
                
                // Restore button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = '';
                }, 5000);
            }, function(error) {
                // Error message
                formMessage.textContent = '❌ Failed to send message. Please try again.';
                formMessage.className = 'error';
                
                // Restore button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                console.error('EmailJS error:', error);
            });
    });
}

// Skill Filtering (for future implementation)
function initSkillFilters() {
    const skillChips = document.querySelectorAll('.skill-chip');
    
    skillChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // This will be implemented when there are actual projects to filter
            console.log('Filtering by:', this.textContent);
            
            // For now, just show a message
            const projectsSection = document.getElementById('projects');
            const message = document.createElement('div');
            message.textContent = 'Filter functionality will be available when projects are added.';
            message.style.background = 'rgba(45, 186, 106, 0.1)';
            message.style.padding = '1rem';
            message.style.borderRadius = 'var(--radius-xl)';
            message.style.marginTop = '1rem';
            message.style.textAlign = 'center';
            
            // Remove any existing message
            const existingMessage = projectsSection.querySelector('.filter-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            message.className = 'filter-message';
            projectsSection.querySelector('.container').appendChild(message);
            
            // Remove message after 3 seconds
            setTimeout(() => {
                message.remove();
            }, 3000);
        });
    });
}

// Project Modals (for future implementation)
function initProjectModals() {
    const projectButtons = document.querySelectorAll('.project-actions .btn');
    
    projectButtons.forEach(button => {
        if (button.textContent.includes('Demo') || button.textContent.includes('Code')) {
            button.addEventListener('click', function() {
                // Create modal
                const modal = document.createElement('div');
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                modal.style.display = 'flex';
                modal.style.alignItems = 'center';
                modal.style.justifyContent = 'center';
                modal.style.zIndex = '10000';
                modal.style.opacity = '0';
                modal.style.transition = 'opacity 0.3s ease';
                
                // Modal content
                const modalContent = document.createElement('div');
                modalContent.style.background = 'white';
                modalContent.style.padding = '2rem';
                modalContent.style.borderRadius = 'var(--radius-2xl)';
                modalContent.style.textAlign = 'center';
                modalContent.style.maxWidth = '90%';
                modalContent.style.width = '400px';
                
                const modalTitle = document.createElement('h3');
                modalTitle.textContent = 'Coming Soon';
                modalTitle.style.marginBottom = '1rem';
                
                const modalText = document.createElement('p');
                modalText.textContent = 'This feature is not available yet. Please check back later.';
                modalText.style.marginBottom = '1.5rem';
                
                const closeButton = document.createElement('button');
                closeButton.textContent = 'Close';
                closeButton.className = 'btn primary-btn';
                closeButton.addEventListener('click', function() {
                    document.body.removeChild(modal);
                });
                
                modalContent.appendChild(modalTitle);
                modalContent.appendChild(modalText);
                modalContent.appendChild(closeButton);
                modal.appendChild(modalContent);
                
                document.body.appendChild(modal);
                
                // Trigger animation
                setTimeout(() => {
                    modal.style.opacity = '1';
                }, 10);
                
                // Close modal on escape key
                document.addEventListener('keydown', function closeModalOnEscape(e) {
                    if (e.key === 'Escape') {
                        document.body.removeChild(modal);
                        document.removeEventListener('keydown', closeModalOnEscape);
                    }
                });
                
                // Close modal on outside click
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        document.body.removeChild(modal);
                    }
                });
            });
        }
    });
}

// Handle reduced motion preference
(function handleReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (mediaQuery.matches) {
        // Disable or simplify animations
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
    
    mediaQuery.addEventListener('change', () => {
        if (mediaQuery.matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        } else {
            document.documentElement.style.setProperty('--animation-duration', '0.3s');
        }
    });
})();
