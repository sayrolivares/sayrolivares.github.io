const desktopHoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

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
