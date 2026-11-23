import { escapeHtml, labelMiles } from "./labels.js";
import { loadTrails } from "./trails-data.js";

const grid = document.querySelector("#trail-list");
const count = document.querySelector("#trail-count");
const dialog = document.querySelector("#trail-dialog");
const filters = document.querySelector("#filters");
let trails = [];

export function trailCard(trail) {
    const miles = labelMiles(trail.miles);
    return `<article class="trail-card" id="${escapeHtml(trail.id)}">
        <p class="neighborhood">${escapeHtml(trail.neighborhood)}</p>
        <h2>${escapeHtml(trail.name)}</h2>
        <p class="facts"><span>${escapeHtml(miles)}</span><span>${escapeHtml(trail.surface)}</span></p>
        <p>${escapeHtml(trail.activity)}</p>
        <p>${escapeHtml(trail.description)}</p>
        <button type="button" data-id="${escapeHtml(trail.id)}">View ${escapeHtml(trail.name)}</button>
    </article>`;
}

function showTrails(surface) {
    const visible = surface === "all" ? trails : trails.filter((trail) => trail.surface === surface);
    count.textContent = `${visible.length} places`;
    grid.innerHTML = visible.map((trail) => trailCard(trail)).join("");
}

function openTrail(id) {
    const trail = trails.find((item) => item.id === id);
    if (!trail) {
        return;
    }
    document.querySelector("#dialog-title").textContent = trail.name;
    document.querySelector("#dialog-neighborhood").textContent = trail.neighborhood;
    document.querySelector("#dialog-miles").textContent = labelMiles(trail.miles);
    document.querySelector("#dialog-surface").textContent = trail.surface;
    document.querySelector("#dialog-activity").textContent = trail.activity;
    document.querySelector("#dialog-description").textContent = trail.description;
    dialog.showModal();
}

filters.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) {
        return;
    }
    filters.querySelectorAll("button").forEach((item) => {
        item.classList.toggle("active", item === button);
        item.setAttribute("aria-pressed", String(item === button));
    });
    showTrails(button.dataset.surface);
});

grid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-id]");
    if (!button) {
        return;
    }
    openTrail(button.dataset.id);
});

dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});

document.querySelector("#close-dialog").addEventListener("click", () => {
    dialog.close();
});

async function init() {
    try {
        trails = await loadTrails("data/trails.json");
        showTrails("all");
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView();
            }
        }
    } catch (error) {
        grid.textContent = "The trail list could not be loaded.";
    }
}

init();
