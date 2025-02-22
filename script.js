function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}
// Mobile Menu Toggle
function toggleMenu() {
    var menu = document.querySelector(".header-links");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Adjust About Section Based on Screen Space
document.addEventListener("DOMContentLoaded", function () {
    function adjustAboutSection() {
        let aboutSection = document.querySelector(".container");
        let profilePic = document.querySelector(".profile-pic");
        let aboutText = document.querySelector(".about-text");

        let spaceAboveAbout = aboutSection.getBoundingClientRect().top;

        if (spaceAboveAbout < 100) {
            aboutSection.appendChild(aboutText); // Move text below profile pic
        } else {
            aboutSection.insertBefore(aboutText, profilePic.nextSibling); // Default order
        }
    }

    adjustAboutSection();
    window.addEventListener("resize", adjustAboutSection);
});
