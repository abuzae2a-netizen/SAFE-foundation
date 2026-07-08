// ============================================
// SAFE Foundation Website - JavaScript
// ============================================

// ============================================
// MOBILE MENU TOGGLE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    const navLinks = mainNav ? mainNav.querySelectorAll('a') : [];
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
        });
    });
});

// ============================================
// MODAL FUNCTIONS
// ============================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// NAVIGATE TO LOCKED SECTION
// ============================================

function navigateToLockedSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
        section.scrollIntoView({ behavior: 'smooth' });
    }
    return false;
}

// ============================================
// FORM SUBMISSION
// ============================================

function submitForm(event, formType) {
    event.preventDefault();
    
    const form = event.target;
    const responseDiv = document.getElementById(formType + 'Response');
    
    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission (in real implementation, this would send to a backend)
    console.log(`${formType} form submitted:`, data);
    
    // Show success message
    if (responseDiv) {
        responseDiv.style.display = 'block';
        responseDiv.innerHTML = `✓ Thank you for joining! We'll contact you soon at ${data.email || 'your email'}.`;
    }
    
    // Reset form
    form.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        if (responseDiv) {
            responseDiv.style.display = 'none';
        }
    }, 5000);
}

// ============================================
// DONATION SIMULATION
// ============================================

function simulateDonation() {
    const modal = document.getElementById('donateModal');
    
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        const originalContent = modalContent.innerHTML;
        
        // Show thank you message
        modalContent.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-heart" style="font-size: 3rem; color: var(--accent); margin-bottom: 20px; animation: pulse 1.5s ease-in-out infinite;"></i>
                <h2 style="color: var(--primary); margin: 16px 0;">Thank You!</h2>
                <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 24px;">Your donation helps us build safer communities.</p>
                <p style="color: var(--secondary); font-weight: 700; font-size: 1rem;">Donation will be processed shortly.</p>
                <button onclick="closeAndRestore()" class="btn btn-primary" style="margin-top: 24px; width: auto;">Close</button>
            </div>
            <style>
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                }
            </style>
        `;
        
        // Store original content for restoration
        window.modalOriginalContent = originalContent;
    }
}

function closeAndRestore() {
    const modal = document.getElementById('donateModal');
    if (modal && window.modalOriginalContent) {
        modal.querySelector('.modal-content').innerHTML = window.modalOriginalContent;
        closeModal('donateModal');
    }
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's a javascript:void(0) link
        if (href === '#' || href === 'javascript:void(0)') {
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// ANIMATIONS ON SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe mission cards, project cards, and form containers on page load
document.addEventListener('DOMContentLoaded', function() {
    const elementsToObserve = document.querySelectorAll(
        '.mission-card, .project-card, .form-container, .hero-card'
    );
    
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================

function animateCounter(element, target, duration = 2000) {
    if (!element.textContent.match(/\d+/)) {
        return;
    }
    
    const start = parseInt(element.textContent) || 0;
    const increment = (target - start) / (duration / 16);
    let current = start;
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const numbers = entry.target.querySelectorAll('.number');
                    numbers.forEach(num => {
                        const value = parseInt(num.textContent.replace(/\D/g, ''));
                        animateCounter(num, value, 1500);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
});

// ============================================
// DONATION MODAL BUTTONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to donation buttons
    const donateLinks = document.querySelectorAll('a[onclick*="simulateDonation"]');
    donateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openModal('donateModal');
        });
    });
});

// ============================================
// FORM VALIDATION ENHANCEMENT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--accent)';
                } else {
                    input.style.borderColor = 'var(--border)';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
        
        // Reset border color on input
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = 'var(--border)';
                }
            });
        });
    });
});

// ============================================
// WHATSAPP LINK ENHANCEMENT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const whatsappLink = document.querySelector('a[href*="wa.me"]');
    if (whatsappLink && navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {
        // Mobile devices will automatically open WhatsApp
    }
});

console.log('SAFE Foundation Website - All scripts loaded successfully!');
