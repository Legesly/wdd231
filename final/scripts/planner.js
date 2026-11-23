import { escapeHtml, labelMiles } from "./labels.js";
import { loadTrails } from "./trails-data.js";

const storageKey = "trail-favorites";
const saved = document.querySelector("#saved-trails");
const choices = document.querySelector("#trail-choices");
const timestamp = document.querySelector("#timestamp");
let trails = [];

export function readFavorites() {
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
        return [];
    }
    try {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
}

function writeFavorites(ids) {
    localStorage.setItem(storageKey, JSON.stringify(ids));
}

function favoriteCard(trail) {
    return `<article class="saved-card">
        <h3>${escapeHtml(trail.name)}</h3>
        <p>${escapeHtml(trail.neighborhood)} · ${escapeHtml(labelMiles(trail.miles))} · ${escapeHtml(trail.surface)}</p>
        <button type="button" data-remove="${escapeHtml(trail.id)}">Remove</button>
    </article>`;
}

function choiceCard(trail, ids) {
    const pressed = ids.includes(trail.id);
    return `<button type="button" class="choice${pressed ? " active" : ""}" data-save="${escapeHtml(trail.id)}" aria-pressed="${pressed}">
        <span>${escapeHtml(trail.name)}</span>
        <span>${escapeHtml(labelMiles(trail.miles))}</span>
    </button>`;
}

function render() {
    const ids = readFavorites();
    const favorites = trails.filter((trail) => ids.includes(trail.id));
    saved.innerHTML = favorites.length
        ? favorites.map((trail) => favoriteCard(trail)).join("")
        : `<p class="empty">No saved trails yet. Choose a place below and it stays in this browser.</p>`;
    choices.innerHTML = trails.map((trail) => choiceCard(trail, ids)).join("");
}

choices.addEventListener("click", (event) => {
    const button = event.target.closest("[data-save]");
    if (!button) {
        return;
    }
    const id = button.dataset.save;
    const ids = readFavorites();
    const next = ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
    writeFavorites(next);
    render();
});

saved.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove]");
    if (!button) {
        return;
    }
    const next = readFavorites().filter((item) => item !== button.dataset.remove);
    writeFavorites(next);
    render();
});

if (timestamp) {
    timestamp.value = new Date().toISOString();
}

async function init() {
    try {
        trails = await loadTrails("data/trails.json");
        render();
    } catch (error) {
        choices.textContent = "The trail list could not be loaded.";
    }
}

init();
