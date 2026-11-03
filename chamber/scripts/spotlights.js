const spotlights = document.querySelector("#spotlights");

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

function addLine(parent, label, value) {
    const line = document.createElement("p");
    const name = document.createElement("span");
    name.textContent = label;
    line.append(name, value);
    parent.append(line);
}

function shuffle(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
}

function displaySpotlights(members) {
    const eligible = members.filter((member) => member.membership === 2 || member.membership === 3);
    const count = Math.random() < 0.5 ? 2 : 3;
    const chosen = shuffle(eligible).slice(0, count);

    spotlights.replaceChildren();

    chosen.forEach((member) => {
        const card = document.createElement("article");
        card.classList.add("spotlight", membershipClass(member.membership));

        const name = document.createElement("h3");
        name.textContent = member.name;

        const logo = document.createElement("img");
        logo.src = `images/${member.image}`;
        logo.alt = `${member.name} logo`;
        logo.width = 96;
        logo.height = 96;

        const details = document.createElement("div");
        details.classList.add("spotlight-details");

        const phone = document.createElement("a");
        phone.href = `tel:${member.phone.replace(/\D/g, "")}`;
        phone.textContent = member.phone;
        addLine(details, "Phone: ", phone);

        const address = document.createElement("span");
        address.textContent = member.address;
        addLine(details, "Address: ", address);

        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = member.website.replace(/^https?:\/\//, "");
        website.target = "_blank";
        website.rel = "noopener";
        addLine(details, "Website: ", website);

        const level = document.createElement("p");
        level.classList.add("level");
        level.textContent = membershipName(member.membership);

        card.append(name, logo, details, level);
        spotlights.append(card);
    });
}

async function getMembers() {
    const response = await fetch("data/members.json");
    if (!response.ok) {
        throw new Error("Member data could not be loaded.");
    }
    return response.json();
}

async function init() {
    try {
        const members = await getMembers();
        displaySpotlights(members);
    } catch (error) {
        const message = document.createElement("p");
        message.textContent = "Member spotlights could not be loaded.";
        spotlights.replaceChildren(message);
    }
}

init();
