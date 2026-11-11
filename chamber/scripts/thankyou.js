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

showValue("#result-firstname", "firstname");
showValue("#result-lastname", "lastname");
showValue("#result-email", "email");
showValue("#result-phone", "phone");
showValue("#result-organization", "organization");
showValue("#result-timestamp", "timestamp");
