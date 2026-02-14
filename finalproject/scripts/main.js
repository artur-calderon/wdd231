const navToggle = document.getElementById("navToggle");
const navClose = document.getElementById("navClose");
const mainNav = document.getElementById("mainNav");
const navOverlay = document.getElementById("navOverlay");

function openNav() {
	mainNav.classList.add("active");
	navOverlay.classList.add("active");
	document.body.style.overflow = "hidden";
}

function closeNav() {
	mainNav.classList.remove("active");
	navOverlay.classList.remove("active");
	document.body.style.overflow = "";
}

if (navToggle) {
	navToggle.addEventListener("click", openNav);
}

if (navClose) {
	navClose.addEventListener("click", closeNav);
}

if (navOverlay) {
	navOverlay.addEventListener("click", closeNav);
}

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && mainNav.classList.contains("active")) {
		closeNav();
	}
});

const navLinks = document.querySelectorAll(".nav-menu a");
navLinks.forEach((link) => {
	link.addEventListener("click", () => {
		if (window.innerWidth < 900) {
			closeNav();
		}
	});
});

function setActiveNavLink() {
	const currentPage =
		window.location.pathname.split("/").pop() || "index.html";
	const navLinks = document.querySelectorAll(".nav-menu a");

	navLinks.forEach((link) => {
		link.classList.remove("active");
		const linkPage = link.getAttribute("href");

		if (
			linkPage === currentPage ||
			(currentPage === "" && linkPage === "index.html")
		) {
			link.classList.add("active");
		}
	});
}

setActiveNavLink();

export function formatDate(date) {
	const options = { year: "numeric", month: "long", day: "numeric" };
	return new Date(date).toLocaleDateString("en-US", options);
}

export function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

export function saveToLocalStorage(key, data) {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch (error) {
		console.error("Error saving to localStorage:", error);
	}
}

export function loadFromLocalStorage(key) {
	try {
		const data = localStorage.getItem(key);
		return data ? JSON.parse(data) : null;
	} catch (error) {
		console.error("Error loading from localStorage:", error);
		return null;
	}
}

const timestampField = document.getElementById("timestamp");
if (timestampField) {
	timestampField.value = new Date().toISOString();
}

export { openNav, closeNav };
