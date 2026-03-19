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

function sortPostsDescending(posts) {
    return [...posts].sort((left, right) => right.date.localeCompare(left.date));
}

function formatPostDate(dateString) {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC"
    }).format(new Date(`${dateString}T00:00:00Z`));
}

function renderPostCard(post) {
    return `
        <article class="entry-card">
            <p class="entry-meta"><time datetime="${post.date}">${formatPostDate(post.date)}</time> · ${post.topic}</p>
            <h3><a class="entry-title-link" href="${post.url}">${post.title}</a></h3>
            <p>${post.excerpt}</p>
            <a class="entry-link" href="${post.url}">Read article</a>
        </article>
    `;
}

function renderPostLists() {
    const posts = Array.isArray(window.POSTS_DATA) ? sortPostsDescending(window.POSTS_DATA) : [];
    if (!posts.length) return;

    document.querySelectorAll("[data-post-list='latest']").forEach((container) => {
        const limit = Number(container.dataset.limit || "3");
        container.innerHTML = posts.slice(0, limit).map(renderPostCard).join("");
    });

    document.querySelectorAll("[data-post-list='category']").forEach((container) => {
        const category = container.dataset.category;
        const filteredPosts = posts.filter((post) => post.category === category);
        container.innerHTML = filteredPosts.map(renderPostCard).join("");
    });

    document.querySelectorAll("[data-post-list='author']").forEach((container) => {
        container.innerHTML = posts.map((post) => `
            <article class="author-post">
                <p><time datetime="${post.date}">${formatPostDate(post.date)}</time> · ${post.categoryLabel} · ${post.topic}</p>
                <a href="${container.dataset.basePath || ""}${post.url}">${post.title}</a>
            </article>
        `).join("");
    });
}

renderPostLists();
