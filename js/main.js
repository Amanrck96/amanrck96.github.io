// Initialize AOS (Animate On Scroll) with enhanced animations
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    mirror: true,
    offset: 100,
    delay: 100
});

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to section headings
    document.querySelectorAll('section h2').forEach((heading, index) => {
        heading.setAttribute('data-aos', 'fade-down');
        heading.setAttribute('data-aos-delay', (index * 100).toString());
    });
    
    // Add animation to skill items
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.setAttribute('data-aos', 'zoom-in');
        item.setAttribute('data-aos-delay', (index * 50).toString());
    });
    
    // Add animation to contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.setAttribute('data-aos', 'fade-up');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Handle home button click
        if (this.getAttribute('href') === '#home') {
            // Hide all sections except home
            document.querySelectorAll('section:not(#home)').forEach(section => {
                section.style.display = 'block';
            });
        }
        
        // Smooth scroll to section
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
    } else {
        navbar.style.background = 'rgba(44, 62, 80, 0.8)';
    }
});

// Form validation function
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const message = document.getElementById('message').value;
    
    if (name.trim() === '') {
        alert('Please enter your name');
        return false;
    }
    
    if (email.trim() === '') {
        alert('Please enter your email');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (mobile.trim() === '') {
        alert('Please enter your mobile number');
        return false;
    }
    
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
        alert('Please enter a valid 10-digit mobile number');
        return false;
    }
    
    if (message.trim() === '') {
        alert('Please enter your message');
        return false;
    }
    
    return true;
}

// Skill progress animation
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
