import { escapeHtml, labelMiles } from "./labels.js";
import { loadTrails } from "./trails-data.js";

const message = document.querySelector("#visit-message");
const featured = document.querySelector("#featured");
const guideDialog = document.querySelector("#guide-dialog");
const day = 24 * 60 * 60 * 1000;
const now = Date.now();
const stored = localStorage.getItem("guide-last-visit");
const lastVisit = Number(stored);

export function featuredCard(trail) {
    const miles = labelMiles(trail.miles);
    return `<article class="trail-card">
        <p class="neighborhood">${escapeHtml(trail.neighborhood)}</p>
        <h3>${escapeHtml(trail.name)}</h3>
        <p class="facts"><span>${escapeHtml(miles)}</span><span>${escapeHtml(trail.surface)}</span></p>
        <p>${escapeHtml(trail.description)}</p>
        <a href="trails.html#${escapeHtml(trail.id)}">See ${escapeHtml(trail.name)}</a>
    </article>`;
}

if (!stored || Number.isNaN(lastVisit)) {
    message.textContent = "Welcome. Save a favorite on the planner and it will still be here next time.";
} else {
    const days = Math.floor((now - lastVisit) / day);
    if (days < 1) {
        message.textContent = "Back so soon. Your saved trails are on the planner.";
    } else if (days === 1) {
        message.textContent = "You last visited 1 day ago.";
    } else {
        message.textContent = `You last visited ${days} days ago.`;
    }
}

localStorage.setItem("guide-last-visit", String(now));

document.querySelector("#open-guide").addEventListener("click", () => {
    guideDialog.showModal();
});

guideDialog.addEventListener("click", (event) => {
    if (event.target === guideDialog) {
        guideDialog.close();
    }
});

document.querySelector("#close-guide").addEventListener("click", () => {
    guideDialog.close();
});

async function init() {
    try {
        const trails = await loadTrails("data/trails.json");
        const picks = trails.filter((trail) => trail.featured).slice(0, 3);
        featured.innerHTML = picks.map((trail) => featuredCard(trail)).join("");
    } catch (error) {
        featured.textContent = "Featured trails could not be loaded.";
    }
}

init();
