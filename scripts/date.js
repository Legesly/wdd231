const yearElement = document.querySelector("#currentyear");
const modifiedElement = document.querySelector("#lastModified");

yearElement.textContent = new Date().getFullYear();
modifiedElement.textContent = `Last Modification: ${document.lastModified}`;
