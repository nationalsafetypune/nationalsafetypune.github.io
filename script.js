/* Loader */
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const content = document.querySelector(".content");

  window.onload = function () {
    const floatingIcons = document.querySelector(".floating-icons");
    if (floatingIcons) floatingIcons.style.display = "flex";
  };

  loadingScreen.style.transition = "opacity 0.5s ease";
  loadingScreen.style.opacity = 0;

  setTimeout(() => {
    loadingScreen.style.display = "none";
    content.style.display = "block";
  }, 500);
});

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("load", () => {
    const loaderWrapper = document.getElementById("loader-wrapper");
    if (loaderWrapper) {
      loaderWrapper.style.opacity = "0";
      setTimeout(() => {
        loaderWrapper.style.display = "none";
        const header = document.querySelector("header");
        if (header) header.style.display = "block";
      }, 500);
    }
  });
});

/* Mobile nav toggle */
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}

document.addEventListener("click", (e) => {
  const navLinks = document.querySelector(".nav-links");
  const toggleButton = document.querySelector(".toggle-menu");
  if (
    navLinks.classList.contains("active") &&
    !navLinks.contains(e.target) &&
    !toggleButton.contains(e.target)
  ) {
    navLinks.classList.remove("active");
  }
});

/* Home banner carousel */
document.addEventListener("DOMContentLoaded", function () {
  let currentIndex = 0;
  const items = document.querySelectorAll(".carousel-item");
  const totalItems = items.length;
  const carouselSlide = document.getElementById("carousel-slide");
  let slideInterval;
  const speedDisplay = document.getElementById("speed-display");
  let currentSpeed = 5000;

  function updateCarousel() {
    carouselSlide.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function updateSpeedDisplay() {
    speedDisplay.textContent = `Speed: ${currentSpeed}ms`;
  }

  function startAutoSlide() {
    slideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }, currentSpeed);
    updateSpeedDisplay();
  }

  document.getElementById("next").addEventListener("click", function () {
    clearInterval(slideInterval);
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
    startAutoSlide();
    activateArrow("next");
  });

  document.getElementById("prev").addEventListener("click", function () {
    clearInterval(slideInterval);
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
    startAutoSlide();
    activateArrow("prev");
  });

  function activateArrow(arrow) {
    document.querySelectorAll(".arrow").forEach((el) => el.classList.remove("active"));
    document.getElementById(arrow).classList.add("active");
  }

  startAutoSlide();
});

/* Service cards */
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("click", () => {
    const content = card.querySelector(".service-content");
    content.style.opacity = content.style.opacity === "1" ? "0" : "1";
  });
});

document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.05)";
    card.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
    card.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
  });
});

/* Counter animation */
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const animationTime = 4000;

  const animateCounter = (counter) => {
    const targetValue = +counter.getAttribute("data-target");
    const increment = targetValue / (animationTime / 100);
    let currentValue = 0;

    const updateCounter = () => {
      if (currentValue < targetValue) {
        currentValue += increment;
        counter.innerText = Math.min(Math.floor(currentValue), targetValue);
        setTimeout(updateCounter, 100);
      } else {
        counter.innerText = targetValue;
      }
    };

    updateCounter();
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          counters.forEach((counter) => animateCounter(counter));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const counterContainer = document.querySelector(".counter-container");
  observer.observe(counterContainer);
});

/* Open certificate PDF */
function openPDF(pdfFile) {
  const pdfWindow = window.open(pdfFile, "_blank");
  if (!pdfWindow) {
    alert("Please allow pop-ups to view the PDF.");
  }
}

/* AOS init */
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 700,
    easing: "ease-out",
    once: true,
    offset: 80,
  });
});

/* Active nav highlight on scroll */
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("#home, #about, #services, #why-us, #certifications, #contact");
  const navLinks = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
});