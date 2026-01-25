document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const API_KEY = "a9f8503cf64ad77ea6f725551d30185f";
const LATITUDE = -10.8798226;
const LONGITUDE = -61.9447746;

async function fetchWeather() {
	try {
		const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric&lang=en`;
		console.log("Fetching weather from:", url);

		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log("Weather data received:", data);

		if (data.list && data.list.length > 0) {
			displayCurrentWeather(data.list[0]);
			displayForecast(data.list);
		} else {
			throw new Error("No weather data available");
		}
	} catch (error) {
		console.error("Error fetching weather:", error);
		document.getElementById("current-weather").innerHTML =
			`<p>Error loading weather: ${error.message}</p>`;
	}
}

function displayCurrentWeather(weather) {
	const weatherDiv = document.getElementById("current-weather");
	const temp = Math.round(weather.main.temp);
	const description = weather.weather[0].description;
	const weatherIcon = getWeatherIcon(weather.weather[0].main);

	weatherDiv.innerHTML = `
		<div class="weather-info">
			<div class="weather-icon">${weatherIcon}</div>
			<p><strong>${temp}°C</strong></p>
			<p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
			<p>Humidity: ${weather.main.humidity}%</p>
		</div>
	`;
}

function displayForecast(list) {
	const forecastDiv = document.getElementById("forecast-weather");
	const forecastData = {};

	list.forEach((item) => {
		const date = new Date(item.dt * 1000);
		const day = date.toLocaleDateString("en-US", { weekday: "short" });
		const maxTemp = Math.round(item.main.temp_max);

		if (!forecastData[day]) {
			forecastData[day] = {
				day,
				temp: maxTemp,
				icon: getWeatherIcon(item.weather[0].main),
			};
		}
	});

	let forecastHTML = "";
	const days = Object.keys(forecastData).slice(0, 3);
	days.forEach((key) => {
		const data = forecastData[key];
		forecastHTML += `
			<div class="forecast-item">
				<p><strong>${data.day}</strong></p>
				<p>${data.icon}</p>
				<p><strong>${data.temp}°C</strong></p>
			</div>
		`;
	});

	forecastDiv.innerHTML = forecastHTML;
}

function getWeatherIcon(condition) {
	const icons = {
		Clouds: "☁️",
		Clear: "☀️",
		Rain: "🌧️",
		Snow: "❄️",
		Thunderstorm: "⛈️",
		Drizzle: "🌦️",
		Mist: "🌫️",
		Smoke: "💨",
		Haze: "🌫️",
		Dust: "🌪️",
		Fog: "🌫️",
		Sand: "🌪️",
		Ash: "🌋",
		Squall: "💨",
		Tornado: "🌪️",
	};
	return icons[condition] || "🌤️";
}

async function loadSpotlights() {
	try {
		const response = await fetch("data/members.json");
		const members = await response.json();

		const goldSilver = members.filter(
			(m) => m.association_level === "2" || m.association_level === "3",
		);

		if (goldSilver.length === 0) {
			document.getElementById("spotlights").innerHTML =
				"<p>No featured members available</p>";
			return;
		}

		const shuffled = goldSilver.sort(() => 0.5 - Math.random());
		const selected = shuffled.slice(0, 3);

		let spotlightsHTML = "";
		selected.forEach((member) => {
			const level = member.association_level === "3" ? "Gold" : "Silver";
			const levelClass = level === "Gold" ? "gold" : "silver";
			const levelLabel = level === "Gold" ? "Gold" : "Silver";

			spotlightsHTML += `
				<div class="spotlight-card">
					<img src="images/${member.image}" alt="${member.name}" />
					<h3>${member.name}</h3>
					<span class="level ${levelClass}">${levelLabel}</span>
					<p>${member.address}</p>
					<p>Phone: ${member.phone}</p>
				</div>
			`;
		});

		document.getElementById("spotlights").innerHTML = spotlightsHTML;
	} catch (error) {
		console.error("Error loading featured members:", error);
		document.getElementById("spotlights").innerHTML =
			"<p>Error loading featured members</p>";
	}
}

function displayEvents() {
	const eventsDiv = document.getElementById("events");
	eventsDiv.innerHTML =
		"<p>Coming soon: Upcoming events will be listed here</p>";
}

fetchWeather();
loadSpotlights();
displayEvents();
