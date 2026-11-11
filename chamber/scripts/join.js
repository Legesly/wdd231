const timestamp = document.querySelector("#timestamp");
if (timestamp) {
    timestamp.value = new Date().toISOString();
}

document.querySelectorAll(".benefits-link").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const dialog = document.querySelector(link.getAttribute("href"));
        if (dialog) {
            dialog.showModal();
        }
    });
});

document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});

document.querySelectorAll(".close-dialog").forEach((button) => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});
