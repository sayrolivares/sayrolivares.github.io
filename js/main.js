// ── Topic descriptions ───────────────────────────────────────────────────────

const topicDescriptions = {
    // "Available now" panel
    seo: "I build and execute SEO strategies that connect content to real business outcomes: keyword research, on-page optimisation, technical audits, and tracking what actually moves the needle.",
    content: "I write and structure content that is built to rank and built to convert. From briefs to full articles, I align every piece with a clear search intent and business goal.",
    automation: "I automate repetitive workflows using Zapier, Make, and SaaS integrations. At Smarts Health I cut repetitive task load by 95% and led an infrastructure migration that reduced costs by 85%.",
    ops: "I have led tech operations end-to-end: vendor decisions, tool selection, SOPs, and cross-functional alignment with C-level stakeholders. I translate technical feasibility into business decisions.",

    // "Building toward" panel
    ds: "I have completed data projects with Python and Pandas: sales analysis for top US companies, correlation studies on unemployment data, and visualisations for non-profit reporting. This is the domain I am investing in most right now.",
    ml: "I am actively studying machine learning fundamentals and following applied AI developments in healthcare and industry. My goal is to apply ML to real-world data problems, not just academic exercises.",
    cloud: "Cloud computing is central to my long-term direction. I have hands-on experience with AWS from my Tech Lead role and I am building toward architecture and deployment skills for data workloads.",
    cs: "I am pursuing a Bachelor of Science in Computer Science at the University of the People (2024–2027). The degree is giving me the foundations (algorithms, systems, theory) to work seriously in data science and AI."
};

// ── Generic panel initialiser ─────────────────────────────────────────────────

function initPanel(groupEl) {
    const buttons = Array.from(groupEl.querySelectorAll("[data-topic]"));
    // Each panel lives in the same .focus-block as the button group
    const block   = groupEl.closest(".focus-block");
    const content = block.querySelector("[data-topic-content]");

    if (!buttons.length || !content) return;

    let fadeTimer;

    const setActive = (button) => {
        buttons.forEach((btn) => {
            const active = btn === button;
            btn.classList.toggle("is-active", active);
            btn.setAttribute("aria-pressed", String(active));
        });

        content.classList.add("is-fading");
        clearTimeout(fadeTimer);
        fadeTimer = setTimeout(() => {
            content.textContent = topicDescriptions[button.dataset.topic] ?? "";
            content.classList.remove("is-fading");
        }, 120);
    };

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => setActive(button));

        button.addEventListener("keydown", (e) => {
            const last = buttons.length - 1;
            let next = index;

            if      (e.key === "ArrowRight") { e.preventDefault(); next = index === last ? 0 : index + 1; }
            else if (e.key === "ArrowLeft")  { e.preventDefault(); next = index === 0 ? last : index - 1; }
            else if (e.key === "Home")       { e.preventDefault(); next = 0; }
            else if (e.key === "End")        { e.preventDefault(); next = last; }
            else return;

            buttons[next].focus();
            setActive(buttons[next]);
        });
    });

    // Initialise with whatever chip is already marked active (or the first one)
    const initial = buttons.find((b) => b.classList.contains("is-active")) ?? buttons[0];
    setActive(initial);
}

// ── Boot both panels ──────────────────────────────────────────────────────────

document.querySelectorAll(".topic-switcher").forEach(initPanel);