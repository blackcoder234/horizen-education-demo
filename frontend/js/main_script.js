//   main Script for the frontend of the website
//   This script handles mobile menu toggling, navbar scroll effects, animations on scroll,

// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    mobileMenu.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.classList.toggle('overflow-hidden');
});

// Close mobile menu when clicking on the overlay
document.querySelector('.mobile-menu-overlay').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.classList.remove('overflow-hidden');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
        const mobileMenu = document.getElementById('mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        
        mobileMenu.classList.remove('open');
        overlay.classList.remove('open');
        document.body.classList.remove('overflow-hidden');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementPosition < windowHeight - 50) {
            element.classList.add('active');
        }
    });
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Hide loader when page is loaded
window.addEventListener('load', function () {
    const loader = document.querySelector('.loader');
    setTimeout(function () {
        loader.classList.add('hidden');
    }, 800);

    // Initialize animations
    animateOnScroll();

    // Start counter animations when statistics section is in view
    const statsSection = document.querySelector('.counter').closest('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
});

// Listen for scroll events to trigger animations
window.addEventListener('scroll', animateOnScroll);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            const overlay = document.querySelector('.mobile-menu-overlay');
            if (mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                overlay.classList.remove('open');
                document.body.classList.remove('overflow-hidden');
            }
        }
    });
});