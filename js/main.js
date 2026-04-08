const desktopHoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
const mobileNavQuery = window.matchMedia("(max-width: 980px)");

function initNavDropdown(dropdown) {
    const summary = dropdown.querySelector("summary");
    if (!summary) return;

    let closeTimer;

    const clearCloseTimer = () => {
        if (!closeTimer) return;
        window.clearTimeout(closeTimer);
        closeTimer = undefined;
    };

    const openDropdown = () => {
        clearCloseTimer();
        dropdown.open = true;
    };

    const closeDropdown = () => {
        clearCloseTimer();
        closeTimer = window.setTimeout(() => {
            dropdown.open = false;
        }, 80);
    };

    dropdown.addEventListener("mouseenter", () => {
        if (!desktopHoverQuery.matches) return;
        openDropdown();
    });

    dropdown.addEventListener("mouseleave", () => {
        if (!desktopHoverQuery.matches) return;
        closeDropdown();
    });

    dropdown.addEventListener("focusin", openDropdown);

    dropdown.addEventListener("focusout", (event) => {
        if (dropdown.contains(event.relatedTarget)) return;
        closeDropdown();
    });

    summary.addEventListener("click", (event) => {
        if (!desktopHoverQuery.matches) return;
        event.preventDefault();
    });

    dropdown.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        dropdown.open = false;
        summary.focus();
    });

    desktopHoverQuery.addEventListener("change", (event) => {
        if (event.matches) return;
        clearCloseTimer();
        dropdown.open = false;
    });
}

document.querySelectorAll(".nav-dropdown").forEach(initNavDropdown);

const topbar = document.querySelector(".topbar");
const navToggle = document.querySelector(".nav-toggle");

if (topbar && navToggle) {
    const setNavOpen = (open) => {
        topbar.classList.toggle("nav-open", open);
        navToggle.setAttribute("aria-expanded", String(open));
    };

    navToggle.addEventListener("click", () => {
        setNavOpen(!topbar.classList.contains("nav-open"));
    });

    mobileNavQuery.addEventListener("change", (event) => {
        if (event.matches) return;
        setNavOpen(false);
    });

    setNavOpen(false);
}

// Carousel behavior only: the homepage decides which posts appear by editing
// the featured_posts list in index.html.
const carousel = document.querySelector('.carousel-track');
if (carousel) {
    const track = carousel;
    const items = Array.from(carousel.children);
    const prevBtn = document.querySelector('.carousel-nav-left');
    const nextBtn = document.querySelector('.carousel-nav-right');

    let currentIndex = 0;
    let autoScrollTimer;
    let pauseTimer;

    function getItemsToShow() {
        return window.matchMedia("(min-width: 641px)").matches ? 4 : 2;
    }

    function getItemWidth() {
        return items[0] ? items[0].getBoundingClientRect().width : 0;
    }

    function getMaxIndex() {
        return Math.max(0, items.length - getItemsToShow());
    }

    function updateCarousel() {
        const itemWidth = getItemWidth();
        const gap = 20; // 1.2rem gap converted to pixels
        const offset = currentIndex * (itemWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;

        // Update button states
        const maxIndex = getMaxIndex();
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;
    }

    function scrollNext() {
        const maxIndex = getMaxIndex();
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            // Loop back to start
            currentIndex = 0;
        }
        updateCarousel();
    }

    function scrollPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    function startAutoScroll() {
        clearInterval(autoScrollTimer);
        autoScrollTimer = setInterval(scrollNext, 5000);
    }

    function stopAutoScroll(pauseDuration = 10000) {
        clearInterval(autoScrollTimer);
        clearTimeout(pauseTimer);

        if (pauseDuration > 0) {
            pauseTimer = setTimeout(startAutoScroll, pauseDuration);
        }
    }

    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            scrollPrev();
            stopAutoScroll();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            scrollNext();
            stopAutoScroll();
        });
    }

    // Pause on hover
    carousel.addEventListener('mouseenter', function() {
        stopAutoScroll(0);
    });

    carousel.addEventListener('mouseleave', function() {
        startAutoScroll();
    });

    // Initialize
    updateCarousel();
    startAutoScroll();

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            updateCarousel();
        }, 250);
    });
}
