// DOM Elements
const loadingScreen = document.getElementById("loading-screen");
const header = document.getElementById("header");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const themeToggle = document.getElementById("theme-toggle");
const scrollToTopBtn = document.getElementById("scroll-to-top");
const typewriterElement = document.getElementById("typewriter");
const currentYearElement = document.getElementById("current-year");

// Typewriter Effect
const texts = [
  "WordPress Developer",
  "Frontend Specialist",
  "UI/UX Enthusiast",
  "Problem Solver",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterTimeout;

function typeWriter() {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    typewriterElement.textContent = currentText.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      isDeleting = true;
      typewriterTimeout = setTimeout(typeWriter, 2000);
      return;
    }
  } else {
    typewriterElement.textContent = currentText.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  }

  const speed = isDeleting ? 50 : 100;
  typewriterTimeout = setTimeout(typeWriter, speed);
}

// Initialize typewriter effect
function initTypewriter() {
  if (typewriterElement) {
    typeWriter();
  }
}

// Loading Screen
function hideLoadingScreen() {
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
    setTimeout(() => {
      loadingScreen.style.display = "none";
      initTypewriter();
    }, 500);
  }, 2500);
}

// Theme Toggle
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}

// Navigation
function toggleNavMenu() {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
}

function closeNavMenu() {
  navMenu.classList.remove("active");
  navToggle.classList.remove("active");
}

// Smooth Scrolling
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (element) {
    const headerHeight = header.offsetHeight;
    const elementPosition = element.offsetTop - headerHeight;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
}

// Scroll Effects
function handleScroll() {
  const scrollY = window.scrollY;

  // Header background on scroll
  if (scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Scroll to top button
  if (scrollY > 300) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }

  // Animate elements on scroll
  animateOnScroll();

  // Animate skill bars
  animateSkillBars();
}

// Animation on Scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("animated");
    }
  });
}

// Animate Skill Bars
function animateSkillBars() {
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    const cardVisible = 150;

    if (cardTop < window.innerHeight - cardVisible) {
      const progressBar = card.querySelector(".skill-progress");
      const percentage = progressBar.getAttribute("data-width");

      if (!progressBar.classList.contains("animated")) {
        progressBar.style.setProperty("--progress-width", percentage + "%");
        progressBar.classList.add("animated");

        // Animate the width
        setTimeout(() => {
          progressBar.style.width = percentage + "%";
        }, 100);
      }
    }
  });
}

// Set Current Year
function setCurrentYear() {
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  // Initialize theme
  initTheme();

  // Set current year
  setCurrentYear();

  // Hide loading screen
  hideLoadingScreen();

  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Navigation toggle
  if (navToggle) {
    navToggle.addEventListener("click", toggleNavMenu);
  }

  // Navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("href");
      smoothScrollTo(target);
      closeNavMenu();
    });
  });

  // Scroll to top button
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Scroll indicator in hero
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      smoothScrollTo("#about");
    });
  }

  // Hero CTA button
  const heroButton = document.querySelector(".hero-buttons .btn-primary");
  if (heroButton) {
    heroButton.addEventListener("click", function (e) {
      e.preventDefault();
      smoothScrollTo("#contact");
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      closeNavMenu();
    }
  });

  // Handle scroll events
  window.addEventListener("scroll", handleScroll);

  // Initial scroll check
  handleScroll();

  // Add animate-on-scroll class to elements
  const elementsToAnimate = document.querySelectorAll(
    ".section-header, .about-content, .stat-card, .feature-card, .project-card, .contact-content"
  );
  elementsToAnimate.forEach((element) => {
    element.classList.add("animate-on-scroll");
  });
});

// Handle form submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    // Form will be submitted to FormSubmit
    // You can add additional validation or loading states here
    const submitButton = this.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                </svg>
                Sending...
            `;
      submitButton.disabled = true;
    }
  });
}

// Intersection Observer for better performance
if ("IntersectionObserver" in window) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");

        // Animate skill bars
        if (entry.target.classList.contains("skill-card")) {
          const progressBar = entry.target.querySelector(".skill-progress");
          const percentage = progressBar.getAttribute("data-width");

          if (!progressBar.classList.contains("animated")) {
            progressBar.style.setProperty("--progress-width", percentage + "%");
            progressBar.classList.add("animated");

            setTimeout(() => {
              progressBar.style.width = percentage + "%";
            }, 100);
          }
        }
      }
    });
  }, observerOptions);

  // Observe elements
  document.addEventListener("DOMContentLoaded", function () {
    const elementsToObserve = document.querySelectorAll(
      ".animate-on-scroll, .skill-card"
    );
    elementsToObserve.forEach((element) => {
      observer.observe(element);
    });
  });
}

// Preload images for better performance
function preloadImages() {
  const images = [
    "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// Initialize preloading
document.addEventListener("DOMContentLoaded", preloadImages);
