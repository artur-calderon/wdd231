import { discoverItems } from "../data/discover.mjs";

const grid = document.getElementById("discoverGrid");
const visitMessage = document.getElementById("visitMessage");

const areaClasses = [
	"area-1",
	"area-2",
	"area-3",
	"area-4",
	"area-5",
	"area-6",
	"area-7",
	"area-8",
];

discoverItems.forEach((item, index) => {
	const card = document.createElement("article");
	card.className = `discover-card ${areaClasses[index]}`;

	const title = document.createElement("h2");
	title.textContent = item.name;

	const figure = document.createElement("figure");
	const image = document.createElement("img");
	image.src = item.image;
	image.alt = item.alt;
	image.loading = "lazy";
	image.width = 300;
	image.height = 200;
	figure.appendChild(image);

	const address = document.createElement("address");
	address.textContent = item.address;

	const description = document.createElement("p");
	description.textContent = item.description;

	const button = document.createElement("button");
	button.type = "button";
	button.textContent = "Learn more";

	card.appendChild(title);
	card.appendChild(figure);
	card.appendChild(address);
	card.appendChild(description);
	card.appendChild(button);
	grid.appendChild(card);
});

const lastVisit = localStorage.getItem("discoverLastVisit");
const now = Date.now();

let message = "Welcome! Let us know if you have any questions.";

if (lastVisit) {
	const diffMs = now - Number(lastVisit);
	const diffDays = Math.floor(diffMs / 86400000);

	if (diffDays < 1) {
		message = "Back so soon! Awesome!";
	} else if (diffDays === 1) {
		message = "You last visited 1 day ago.";
	} else {
		message = `You last visited ${diffDays} days ago.`;
	}
}

visitMessage.textContent = message;
localStorage.setItem("discoverLastVisit", String(now));
