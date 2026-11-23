export function labelMiles(miles) {
    const amount = Number(miles);
    const unit = amount === 1 ? "mile" : "miles";
    return `${amount} ${unit}`;
}

export function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
