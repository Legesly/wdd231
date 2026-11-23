export async function loadTrails(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Trail data could not be loaded.");
    }
    const trails = await response.json();
    return trails;
}
