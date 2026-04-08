const mobileNavQuery = window.matchMedia("(max-width: 980px)");

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

const postArchive = document.querySelector("[data-post-archive]");

if (postArchive) {
    const filterButtons = Array.from(postArchive.querySelectorAll("[data-filter]"));
    const archiveCards = Array.from(postArchive.querySelectorAll("[data-post-filter-terms]"));
    const status = postArchive.querySelector("[data-post-filter-status]");
    const emptyState = postArchive.querySelector("[data-post-filter-empty]");
    const selectedFilters = new Set();

    const updateFilterButtons = () => {
        filterButtons.forEach((button) => {
            const filter = button.dataset.filter;
            const isAll = filter === "all";
            const isActive = isAll ? selectedFilters.size === 0 : selectedFilters.has(filter);

            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
    };

    const updateArchive = () => {
        let visibleCount = 0;

        archiveCards.forEach((card) => {
            const terms = (card.dataset.postFilterTerms || "").split("|").filter(Boolean);
            const matches = selectedFilters.size === 0 || terms.some((term) => selectedFilters.has(term));

            card.hidden = !matches;
            if (matches) visibleCount += 1;
        });

        if (status) {
            status.textContent = `Showing ${visibleCount} post${visibleCount === 1 ? "" : "s"}`;
        }

        if (emptyState) {
            emptyState.hidden = visibleCount !== 0;
        }
    };

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            if (filter === "all") {
                selectedFilters.clear();
            } else if (selectedFilters.has(filter)) {
                selectedFilters.delete(filter);
            } else {
                selectedFilters.add(filter);
            }

            updateFilterButtons();
            updateArchive();
        });
    });

    updateFilterButtons();
    updateArchive();
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
