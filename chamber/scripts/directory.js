const directory = document.querySelector("#directory");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");

function membershipName(level) {
    if (level === 3) {
        return "Gold member";
    }
    if (level === 2) {
        return "Silver member";
    }
    return "Member";
}

function membershipClass(level) {
    if (level === 3) {
        return "gold";
    }
    if (level === 2) {
        return "silver";
    }
    return "member";
}

function appendBreakable(node, text) {
    const parts = text.split(/(@|\.)/).filter((part) => part !== "");
    parts.forEach((part, index) => {
        if (index > 0) {
            node.append(document.createElement("wbr"));
        }
        node.append(part);
    });
}

function addDetail(parent, label, valueNode, className) {
    const line = document.createElement("p");
    if (className) {
        line.classList.add(className);
    }
    const name = document.createElement("span");
    name.textContent = label;
    line.append(name, valueNode);
    parent.append(line);
}

function displayMembers(members) {
    directory.replaceChildren();

    members.forEach((member) => {
        const card = document.createElement("article");
        card.classList.add("member-card", membershipClass(member.membership));

        const heading = document.createElement("div");
        heading.classList.add("member-heading");

        const name = document.createElement("h2");
        name.textContent = member.name;

        const tagline = document.createElement("p");
        tagline.classList.add("tagline");
        tagline.textContent = member.tagline;

        const level = document.createElement("p");
        level.classList.add("level");
        level.textContent = membershipName(member.membership);

        heading.append(name, tagline, level);

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} logo`;
        image.width = 96;
        image.height = 96;

        const info = document.createElement("div");
        info.classList.add("member-info");

        const address = document.createElement("span");
        address.textContent = member.address;
        addDetail(info, "Address: ", address, "address-line");

        const email = document.createElement("a");
        email.href = `mailto:${member.email}`;
        appendBreakable(email, member.email);
        addDetail(info, "Email: ", email);

        const phone = document.createElement("a");
        phone.href = `tel:${member.phone.replace(/\D/g, "")}`;
        phone.textContent = member.phone;
        addDetail(info, "Phone: ", phone);

        const website = document.createElement("a");
        website.href = member.website;
        appendBreakable(website, member.website.replace(/^https?:\/\//, ""));
        website.target = "_blank";
        website.rel = "noopener noreferrer";
        addDetail(info, "URL: ", website);

        card.append(heading, image, info);
        directory.append(card);
    });
}

function setView(view) {
    const isGrid = view === "grid";
    directory.classList.toggle("grid", isGrid);
    directory.classList.toggle("list", !isGrid);
    gridButton.classList.toggle("active", isGrid);
    listButton.classList.toggle("active", !isGrid);
    gridButton.setAttribute("aria-pressed", String(isGrid));
    listButton.setAttribute("aria-pressed", String(!isGrid));
}

gridButton.addEventListener("click", () => {
    setView("grid");
});

listButton.addEventListener("click", () => {
    setView("list");
});

async function getMembers() {
    const response = await fetch("data/members.json");
    if (!response.ok) {
        throw new Error("Member data could not be loaded.");
    }
    const members = await response.json();
    return members;
}

async function init() {
    setView("grid");
    try {
        const members = await getMembers();
        displayMembers(members);
    } catch (error) {
        const message = document.createElement("p");
        message.textContent = "The member directory could not be loaded.";
        directory.replaceChildren(message);
    }
}

init();
