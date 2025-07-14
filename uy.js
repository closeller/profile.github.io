// Navigation
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-item');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navToggle.classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.style.display = 'none';
            navToggle.classList.remove('active');
        }
    });
});

// Active section highlighting
const sections = document.querySelectorAll('section');
const navHeight = navbar.offsetHeight;

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });

    // Add background to navbar when scrolling
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 25, 47, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 25, 47, 0.85)';
    }
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.about-content, .project-card, .skill-category, .contact-content');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// Form validation and submission
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const errors = [];

    // Name validation
    if (nameInput.value.trim().length < 2) {
        isValid = false;
        errors.push('Name must be at least 2 characters long');
        nameInput.classList.add('error');
    } else {
        nameInput.classList.remove('error');
    }

    // Email validation
    if (!validateEmail(emailInput.value)) {
        isValid = false;
        errors.push('Please enter a valid email address');
        emailInput.classList.add('error');
    } else {
        emailInput.classList.remove('error');
    }

    // Message validation
    if (messageInput.value.trim().length < 10) {
        isValid = false;
        errors.push('Message must be at least 10 characters long');
        messageInput.classList.add('error');
    } else {
        messageInput.classList.remove('error');
    }

    if (isValid) {
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        };
        
        console.log('Form submitted:', formData);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Message sent successfully!';
        contactForm.appendChild(successMessage);
        
        // Reset form
        contactForm.reset();
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    } else {
        // Show error messages
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-container';
        errors.forEach(error => {
            const errorMessage = document.createElement('p');
            errorMessage.className = 'error-message';
            errorMessage.textContent = error;
            errorContainer.appendChild(errorMessage);
        });
        
        // Remove existing error container if it exists
        const existingErrorContainer = contactForm.querySelector('.error-container');
        if (existingErrorContainer) {
            existingErrorContainer.remove();
        }
        
        contactForm.appendChild(errorContainer);
        
        // Remove error messages after 3 seconds
        setTimeout(() => {
            errorContainer.remove();
        }, 3000);
    }
});

// Dynamic typing effect for hero subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
const phrases = [
    'Full Stack Developer',
    'AI Enthusiast',
    'Problem Solver',
    'Tech Innovator'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        heroSubtitle.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        heroSubtitle.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start the typing effect
typeEffect();

// Project card hover effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
}); 
