import { places } from "../data/discover.mjs";

const message = document.querySelector("#visit-message");
const grid = document.querySelector("#discover-grid");
const day = 24 * 60 * 60 * 1000;
const now = Date.now();
const stored = localStorage.getItem("discover-last-visit");
const lastVisit = Number(stored);

if (!stored || Number.isNaN(lastVisit)) {
    message.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const days = Math.floor((now - lastVisit) / day);
    if (days < 1) {
        message.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
        message.textContent = "You last visited 1 day ago.";
    } else {
        message.textContent = `You last visited ${days} days ago.`;
    }
}

localStorage.setItem("discover-last-visit", String(now));

grid.innerHTML = `${places.map((place) => `
    <article class="discover-card area-${place.id}">
        <h2>${place.name}</h2>
        <figure>
            <img src="${place.image}" alt="${place.alt}" width="300" height="200" loading="lazy">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button type="button" data-url="${place.url}">Learn More</button>
    </article>`).join("")}`;

grid.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
        window.open(button.dataset.url, "_blank", "noopener");
    });
});
