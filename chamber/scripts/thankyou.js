const params = new URLSearchParams(window.location.search);

function showValue(id, key) {
    const element = document.querySelector(id);
    if (!element) {
        return;
    }
    const value = params.get(key);
    if (key === "timestamp" && value) {
        const parsed = new Date(value);
        element.textContent = Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString();
        return;
    }
    element.textContent = value || "Not provided";
}

const levelNames = {
    np: "NP Membership",
    bronze: "Bronze Membership",
    silver: "Silver Membership",
    gold: "Gold Membership"
};

showValue("#result-firstname", "firstname");
showValue("#result-lastname", "lastname");
showValue("#result-title", "organization-title");
showValue("#result-email", "email");
showValue("#result-phone", "phone");
showValue("#result-organization", "organization");

const levelElement = document.querySelector("#result-level");
const levelValue = params.get("level");
if (levelElement) {
    levelElement.textContent = levelNames[levelValue] || levelValue || "Not provided";
}

showValue("#result-description", "description");
showValue("#result-timestamp", "timestamp");
