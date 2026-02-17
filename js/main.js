const topicDescriptions = {
    data: "I am currently building practical data projects in health-tech contexts and improving experiment design workflows.",
    research: "I am interested in research methods that connect software engineering with measurable product and social outcomes.",
    writing: "I use technical writing to clarify architecture decisions, communicate ideas, and keep teams aligned on execution.",
    books: "I like reading books about technology, behavior, and long-term thinking. Recommendations are always welcome."
};

const topicButtons = Array.from(document.querySelectorAll("[data-topic]"));
const topicContent = document.querySelector("[data-topic-content]");

if (topicButtons.length > 0 && topicContent) {
    let fadeTimer;

    const setActiveTopic = (button) => {
        topicButtons.forEach((item) => {
            const isActive = item === button;
            item.classList.toggle("is-active", isActive);
            item.setAttribute("aria-pressed", String(isActive));
        });

        const nextText = topicDescriptions[button.dataset.topic] || "";

        topicContent.classList.add("is-fading");
        window.clearTimeout(fadeTimer);
        fadeTimer = window.setTimeout(() => {
            topicContent.textContent = nextText;
            topicContent.classList.remove("is-fading");
        }, 120);
    };

    topicButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            setActiveTopic(button);
        });

        button.addEventListener("keydown", (event) => {
            if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
                return;
            }

            event.preventDefault();
            const lastIndex = topicButtons.length - 1;
            let nextIndex = index;

            if (event.key === "ArrowRight") {
                nextIndex = index === lastIndex ? 0 : index + 1;
            }

            if (event.key === "ArrowLeft") {
                nextIndex = index === 0 ? lastIndex : index - 1;
            }

            if (event.key === "Home") {
                nextIndex = 0;
            }

            if (event.key === "End") {
                nextIndex = lastIndex;
            }

            const nextButton = topicButtons[nextIndex];
            nextButton.focus();
            setActiveTopic(nextButton);
        });
    });

    const initialActive = topicButtons.find((button) => button.classList.contains("is-active")) || topicButtons[0];
    setActiveTopic(initialActive);
}
