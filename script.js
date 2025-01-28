///////loader////////////
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const content = document.querySelector(".content");

  window.onload = function () {
    // Show the floating icons after the page has fully loaded
    document.getElementById("floatingIcons").style.display = "flex";
  };

  // Fade out loading screen
  loadingScreen.style.transition = "opacity 0.5s ease";
  loadingScreen.style.opacity = 0;

  // Remove the loading screen from DOM after fading out
  setTimeout(() => {
    loadingScreen.style.display = "none";
    content.style.display = "block"; // Show the content
  }, 500); // Match the transition duration
});

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("load", () => {
    // Remove the loader
    const loaderWrapper = document.getElementById("loader-wrapper");
    loaderWrapper.style.opacity = "0";
    setTimeout(() => {
      loaderWrapper.style.display = "none";
      // Show the header after loader is removed
      document.querySelector("header").style.display = "block";
    }, 500); // Delay to ensure smooth transition
  });
});

/////toggle menu/////////////////////////////////////////////////////////////////

function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active"); // Toggle the 'active' class
}
document.addEventListener("click", (e) => {
  console.log("Clicked element:", e.target); // Log the clicked element
  const navLinks = document.querySelector(".nav-links");
  const toggleButton = document.querySelector(".toggle-menu");

  // Check if the click is outside the menu and toggle button
  if (
    navLinks.classList.contains("active") &&
    !navLinks.contains(e.target) &&
    !toggleButton.contains(e.target)
  ) {
    navLinks.classList.remove("active"); // Use class-based toggling
  }
});

//////////////home-banner/////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  let currentIndex = 0;
  const items = document.querySelectorAll(".carousel-item");
  const totalItems = items.length;
  const carouselSlide = document.getElementById("carousel-slide");
  let slideInterval;
  const speedDisplay = document.getElementById("speed-display"); // The element to display speed
  let currentSpeed = 5000; // Default speed (1 second)

  // Function to update the position of the carousel
  function updateCarousel() {
    carouselSlide.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Update speed display
  function updateSpeedDisplay() {
    speedDisplay.textContent = `Speed: ${currentSpeed}ms`;
  }

  // Start the auto-slide interval
  function startAutoSlide() {
    slideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }, currentSpeed);
    updateSpeedDisplay();
  }

  // Event listener for the 'next' arrow
  document.getElementById("next").addEventListener("click", function () {
    clearInterval(slideInterval); // Stop the auto-slide
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
    startAutoSlide(); // Restart the auto-slide
    activateArrow("next"); // Activate the next arrow
  });

  // Event listener for the 'prev' arrow
  document.getElementById("prev").addEventListener("click", function () {
    clearInterval(slideInterval); // Stop the auto-slide
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
    startAutoSlide(); // Restart the auto-slide
    activateArrow("prev"); // Activate the previous arrow
  });

  // Function to activate the arrow
  function activateArrow(arrow) {
    const arrows = document.querySelectorAll(".arrow"); // Assuming the arrows have class "arrow"
    arrows.forEach((arrowEl) => arrowEl.classList.remove("active"));
    document.getElementById(arrow).classList.add("active"); // Add "active" class to clicked arrow
  }

  // Start auto-slide on page load
  startAutoSlide();
});

//////////service-card/////////////////////////////

document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("click", () => {
    const content = card.querySelector(".service-content");
    content.style.opacity = content.style.opacity === "1" ? "0" : "1";
  });
});
const cards = document.querySelectorAll(".service-card");

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.05)";
    card.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
    card.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
  });
});

///////////////////////////////counter///////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const animationTime = 4000; // Slower animation time (1 second)
  const updateInterval = 200; // Update every 200ms

  // Function to animate the counter
  const animateCounter = (counter) => {
    const targetValue = +counter.getAttribute("data-target");
    const totalTime = animationTime; // Same time for all counters
    const increment = targetValue / (totalTime / 100); // Adjust increment based on target value and time

    let currentValue = 0;
    const updateCounter = () => {
      if (currentValue < targetValue) {
        currentValue += increment;
        counter.innerText = Math.min(Math.floor(currentValue), targetValue); // Make sure it doesn't exceed the target
        setTimeout(updateCounter, 100); // Update every 100ms (adjust this interval if needed)
      } else {
        counter.innerText = targetValue; // Ensure it finishes exactly at the target
      }
    };

    // Start the animation
    updateCounter();
  };

  // Intersection Observer to detect when the section is 50% visible
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          counters.forEach((counter) => {
            animateCounter(counter);
          });
          observer.unobserve(entry.target); // Stop observing after animation starts
        }
      });
    },
    { threshold: 0.5 }
  ); // Trigger when 50% of the element is visible

  // Observe the counter container
  const counterContainer = document.querySelector(".counter-container");
  observer.observe(counterContainer);
});

/////certificate//////////////////////////////////////////////////
function openPDF(pdfFile) {
  const pdfWindow = window.open(pdfFile, "_blank");
  if (!pdfWindow) {
    alert("Please allow pop-ups to view the PDF.");
  }
}
