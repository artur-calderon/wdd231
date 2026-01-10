import { courses } from "./courses.js";

const menuButton = document.getElementById("menuButton");
const navigation = document.querySelector("nav");

if (menuButton) {
	menuButton.addEventListener("click", () => {
		navigation.classList.toggle("open");

		menuButton.textContent = navigation.classList.contains("open")
			? "✖"
			: "☰";
	});
}

document.getElementById("currentyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent =
	"Last Modification: " + document.lastModified;

const courseContainer = document.getElementById("courses");
const totalCredits = document.getElementById("totalCredits");

function displayCourses(courseList) {
	courseContainer.innerHTML = "";

	courseList.forEach((course) => {
		const card = document.createElement("div");
		card.classList.add("course-card");

		if (course.completed) {
			card.classList.add("completed");
		}

		card.textContent = course.subject;
		courseContainer.appendChild(card);
	});

	// Calculate total credits (reduce)
	const credits = courseList.reduce((sum, course) => sum + course.credits, 0);

	totalCredits.textContent = credits;
}

document.querySelectorAll(".course-filters button").forEach((button) => {
	button.addEventListener("click", () => {
		const filter = button.dataset.filter;

		let filteredCourses = courses;

		if (filter === "WDD") {
			filteredCourses = courses.filter((course) =>
				course.subject.startsWith("WDD")
			);
		}

		if (filter === "CSE") {
			filteredCourses = courses.filter((course) =>
				course.subject.startsWith("CSE")
			);
		}

		displayCourses(filteredCourses);
	});
});

displayCourses(courses);
