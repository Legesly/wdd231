const latitude = 44.9778;
const longitude = -93.265;
const apiKey = "6f955df3c75a6885ddbb775af7a54e1c";

const currentWeather = document.querySelector("#current-weather");
const forecastHeading = document.querySelector("#forecast-heading");
const forecast = document.querySelector("#forecast");

function showWeatherMessage(message) {
    const paragraph = document.createElement("p");
    paragraph.textContent = message;
    currentWeather.replaceChildren(paragraph);
    forecast.replaceChildren();
    forecastHeading.hidden = true;
}

function capitalize(text) {
    if (!text) {
        return "";
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function weatherIcon(parent, icon, description) {
    const image = document.createElement("img");
    image.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    image.alt = description;
    image.width = 80;
    image.height = 80;
    parent.append(image);
}

function displayCurrent(data) {
    const description = capitalize(data.weather[0].description);
    const temperature = Math.round(data.main.temp);
    const summary = document.createElement("div");
    summary.classList.add("current-summary");

    const temp = document.createElement("p");
    temp.classList.add("temperature");
    temp.textContent = `${temperature}°F`;

    const conditions = document.createElement("p");
    conditions.textContent = description;

    summary.append(temp, conditions);
    currentWeather.replaceChildren();
    weatherIcon(currentWeather, data.weather[0].icon, description);
    currentWeather.append(summary);
}

function displayForecast(list) {
    const days = new Map();

    list.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const key = date.toLocaleDateString("en-CA");
        if (!days.has(key)) {
            days.set(key, []);
        }
        days.get(key).push(item);
    });

    forecast.replaceChildren();
    forecastHeading.hidden = false;

    [...days.entries()].slice(0, 3).forEach(([key, items]) => {
        const midday = items.reduce((closest, item) => {
            const hour = new Date(item.dt * 1000).getHours();
            const closestHour = new Date(closest.dt * 1000).getHours();
            return Math.abs(hour - 15) < Math.abs(closestHour - 15) ? item : closest;
        });
        const high = Math.round(Math.max(...items.map((item) => item.main.temp_max)));
        const label = new Date(`${key}T12:00:00`).toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric"
        });
        const description = capitalize(midday.weather[0].description);
        const day = document.createElement("article");
        const text = document.createElement("div");
        const heading = document.createElement("h4");
        heading.textContent = label;
        const highTemp = document.createElement("p");
        highTemp.textContent = `High ${high}°F`;
        text.append(heading, highTemp);
        weatherIcon(day, midday.weather[0].icon, description);
        day.append(text);
        forecast.append(day);
    });
}

async function loadWeather() {
    if (!apiKey) {
        showWeatherMessage("Add your OpenWeatherMap API key in scripts/weather.js to load Minneapolis weather.");
        return;
    }

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

    try {
        const currentResponse = await fetch(currentUrl);
        const forecastResponse = await fetch(forecastUrl);
        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather data could not be loaded.");
        }
        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();
        displayCurrent(currentData);
        displayForecast(forecastData.list);
    } catch (error) {
        showWeatherMessage("Minneapolis weather could not be loaded right now.");
    }
}

loadWeather();
