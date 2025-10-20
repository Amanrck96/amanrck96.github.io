// Initialize AOS (Animate On Scroll) with enhanced animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS if it exists
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
            mirror: true,
            offset: 100,
            delay: 100
        });
    }
    
    // Initialize all components
    initAnimations();
    initNavbar();
    initFilterButtons();
    initContactForm();
    initProgressBars();
});

// Add animation classes to elements
function initAnimations() {
    // Add animation to section headings
    document.querySelectorAll('section h2').forEach((heading, index) => {
        heading.setAttribute('data-aos', 'fade-down');
        heading.setAttribute('data-aos-delay', (index * 100).toString());
        heading.classList.add('animate-on-scroll');
    });
    
    // Add animation to skill items
    document.querySelectorAll('.skill-item, .skill-detail-card, .expertise-card, .project-card, .education-card').forEach((item, index) => {
        item.setAttribute('data-aos', 'zoom-in');
        item.setAttribute('data-aos-delay', (index * 50).toString());
        item.classList.add('animate-on-scroll');
    });
    
    // Add animation to contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.setAttribute('data-aos', 'fade-up');
        contactForm.classList.add('animate-on-scroll');
    }
    
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add CSS class for animations
    document.addEventListener('scroll', () => {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    });
}

// Navbar functionality
function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links li a');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if ((currentPage === '' && href === 'index.html') || 
            (href === currentPage)) {
            item.classList.add('active');
        }
    });
    
    // Hamburger menu toggle for mobile
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(44, 62, 80, 0.95)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(44, 62, 80, 0.8)';
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Handle home button click
            if (this.getAttribute('href') === '#home') {
                // Show all sections
                document.querySelectorAll('section:not(#home)').forEach(section => {
                    section.style.display = 'block';
                });
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for navbar
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            }
        });
    });
}

// Project filter buttons
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                // Show/hide projects based on filter
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        const tags = card.getAttribute('data-tags');
                        if (tags && tags.split(',').includes(filter)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
}

// Contact form validation
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // In a real application, you would send the form data to a server here
                // For now, just show a success message
                contactForm.innerHTML = `
                    <div class="form-success">
                        <h3>Thank you for your message!</h3>
                        <p>I'll get back to you as soon as possible.</p>
                        <p class="form-note">Note: This is a demo form. In a live environment, this would connect to a server to process your submission.</p>
                    </div>
                `;
            }
        });
    }
}

// Form validation function
function validateForm() {
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value || document.getElementById('mobile')?.value;
    const message = document.getElementById('message')?.value;
    
    let isValid = true;
    
    if (!name || name.trim() === '') {
        showError(document.getElementById('name'), 'Please enter your name');
        isValid = false;
    } else {
        removeError(document.getElementById('name'));
    }
    
    if (!email || email.trim() === '') {
        showError(document.getElementById('email'), 'Please enter your email');
        isValid = false;
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError(document.getElementById('email'), 'Please enter a valid email address');
            isValid = false;
        } else {
            removeError(document.getElementById('email'));
        }
    }
    
    if (phone) {
        const phoneField = document.getElementById('phone') || document.getElementById('mobile');
        const phoneRegex = /^[\d\s\+\-\(\)]{10,15}$/;
        if (!phoneRegex.test(phone)) {
            showError(phoneField, 'Please enter a valid phone number');
            isValid = false;
        } else {
            removeError(phoneField);
        }
    }
    
    if (!message || message.trim() === '') {
        showError(document.getElementById('message'), 'Please enter your message');
        isValid = false;
    } else {
        removeError(document.getElementById('message'));
    }
    
    return isValid;
}

// Show error message
function showError(input, message) {
    if (!input) return;
    
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    
    errorElement.className = 'error-message';
    errorElement.innerText = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
    }
    
    input.classList.add('error-input');
}

// Remove error message
function removeError(input) {
    if (!input) return;
    
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        formGroup.removeChild(errorElement);
    }
    
    input.classList.remove('error-input');
}

// Initialize progress bars animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    if (progressBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const percentage = progressBar.getAttribute('data-percentage');
                    
                    progressBar.style.width = percentage + '%';
                    progressBar.classList.add('animated');
                    
                    // Add percentage text
                    const percentageText = progressBar.parentElement.querySelector('.percentage');
                    if (percentageText) {
                        percentageText.textContent = percentage + '%';
                    }
                }
            });
        }, { threshold: 0.2 });
        
        progressBars.forEach(bar => {
            observer.observe(bar);
        });
    }
}

// Animate skills function
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const progress = item.querySelector('.progress');
        if (progress) {
            const width = progress.style.width;
            progress.style.width = '0';
            setTimeout(() => {
                progress.style.width = width;
            }, 100);
        }
    });
}

// Call skill animation when skills section is in view
document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(skillsSection);
    }
});
