document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle function
  function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  }

  // Make toggleMenu globally available
  window.toggleMenu = toggleMenu;

  // Typing animation for "Korumilli Aravind Kumar" only
  const element = document.getElementById("typing-text");
  const text = "Korumilli Aravind Kumar"; // Only the part to animate
  let index = 0;

  function type() {
    if (index < text.length) {
      element.innerHTML = text.substring(0, index + 1);
      index++;
      setTimeout(type, 100); // Speed: 100ms per character
    } else {
      // Reset and restart after a delay
      setTimeout(() => {
        index = 0;
        element.innerHTML = ""; // Clear text
        type(); // Start typing again
      }, 1000); // 1-second pause before restarting
    }
  }

  // Start typing when the section is in view (only once)
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        type();
        observer.disconnect(); // Stop observing after starting
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(element);

  // Scroll to section function
  window.scrollToSection = function (sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  };
});
