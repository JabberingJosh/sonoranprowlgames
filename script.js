/* ================================= */
/* ELEMENT SELECTORS */
/* ================================= */

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

const devlogCards = document.querySelectorAll(".devlog-card");
const devlogButtons = document.querySelectorAll(".devlog-toggle");
const loadMoreBtn = document.getElementById("loadMore");

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");


/* ================================= */
/* SLIDER SYSTEM */
/* ================================= */

let currentSlide = 0;
let slideInterval = null;
const slideDuration = 6000;

function showSlide(index)
{
    if (!slides.length) return;
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");

    if (dots[index]) {
        dots[index].classList.add("active");
    }

}


function nextSlide()
{
    if (!slides.length) return;

    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}


function prevSlide()
{
    if (!slides.length) return;

    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
}

function startAutoSlide() {
    stopAutoSlide();
    if (slides.length > 1) {
        slideInterval = setInterval(nextSlide, slideDuration);
    }
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

function resetAutoSlide() {
    startAutoSlide();
}

/* ================================= */
/* SLIDER CONTROLS */
/* ================================= */

if (rightArrow) {
    rightArrow.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
    });
}

if (leftArrow) {
    leftArrow.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
        resetAutoSlide();
    });
});

startAutoSlide();

/* ================================= */
/* DEVLOG CARD EXPAND */
/* ================================= */

devlogButtons.forEach(button => {

    button.addEventListener("click", (e) => {

        e.stopPropagation();

        const card = button.closest(".devlog-card");

        card.classList.toggle("active");

        if (card.classList.contains("active")) {
            button.textContent = "Read Less ↑";
        } else {
            button.textContent = "Read More ↓";
        }

    });

});

/* ================================= */
/* MOBILE NAV MENU */
/* ================================= */

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

/* ================================= */
/* DEVLOG LOAD MORE */
/* ================================= */


if (loadMoreBtn) {
    const allDevlogs = Array.from(document.querySelectorAll(".devlog-card"));
    let devlogsToShow = 3; // number of devlogs initially visible

    // hide extra devlogs
    allDevlogs.forEach((card, index) => {
        if (index >= devlogsToShow) card.style.display = "none";
    });

    loadMoreBtn.addEventListener("click", () => {
        devlogsToShow += 3; // show 3 more at a time
        allDevlogs.forEach((card, index) => {
            if (index < devlogsToShow) card.style.display = "block";
        });

        // hide button if all devlogs are visible
        if (devlogsToShow >= allDevlogs.length) {
            loadMoreBtn.style.display = "none";
        }
    });
}
