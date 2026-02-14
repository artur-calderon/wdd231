import { debounce, saveToLocalStorage, loadFromLocalStorage } from "./main.js";
import { openModal } from "./modal.js";

let allCourses = [];
let filteredCourses = [];

async function fetchCourses() {
	try {
		const response = await fetch("data/courses.json");
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data.courses;
	} catch (error) {
		console.error("Error fetching courses:", error);
		return [];
	}
}

function createCourseCard(course) {
	const firstLetter = course.title.charAt(0).toUpperCase();

	const gradients = {
		"Web Development": "linear-gradient(135deg, #1e88e5 0%, #64b5f6 100%)",
		Programming: "linear-gradient(135deg, #43a047 0%, #66bb6a 100%)",
		Design: "linear-gradient(135deg, #e91e63 0%, #f06292 100%)",
		"Data Science": "linear-gradient(135deg, #8e24aa 0%, #ab47bc 100%)",
		Marketing: "linear-gradient(135deg, #fb8c00 0%, #ffa726 100%)",
		Business: "linear-gradient(135deg, #00acc1 0%, #26c6da 100%)",
		"IT & Security": "linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%)",
		"Mobile Development":
			"linear-gradient(135deg, #3949ab 0%, #5c6bc0 100%)",
	};

	const gradient =
		gradients[course.category] ||
		"linear-gradient(135deg, #1e88e5 0%, #64b5f6 100%)";

	const rating = "⭐".repeat(Math.floor(course.rating));

	return `
    <article class="course-card" data-course-id="${course.id}">
      <div class="course-image" style="background: ${gradient};">
        ${firstLetter}
      </div>
      <div class="course-content">
        <span class="course-category">${course.category}</span>
        <h3 class="course-title">${course.title}</h3>
        <div class="course-meta">
          <span>📚 ${course.level}</span>
          <span>⏱️ ${course.duration}</span>
          <span>${rating} ${course.rating}</span>
        </div>
        <p class="course-description">${course.description}</p>
        <div class="course-footer">
          <button class="btn-view-details" data-course-id="${course.id}">
            View Details
          </button>
        </div>
      </div>
    </article>
  `;
}

function displayCourses(courses, containerId = "coursesGrid") {
	const container = document.getElementById(containerId);
	if (!container) return;

	if (courses.length === 0) {
		container.innerHTML = "";
		const noResults = document.getElementById("noResults");
		if (noResults) {
			noResults.classList.remove("hidden");
		}
		return;
	}

	const noResults = document.getElementById("noResults");
	if (noResults) {
		noResults.classList.add("hidden");
	}

	container.innerHTML = courses
		.map((course) => createCourseCard(course))
		.join("");

	const detailButtons = container.querySelectorAll(".btn-view-details");
	detailButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			const courseId = parseInt(e.target.dataset.courseId);
			const course = allCourses.find((c) => c.id === courseId);
			if (course) {
				openModal(course);
				saveCourseView(course.id);
			}
		});
	});

	updateCourseCount(courses.length);
}

function updateCourseCount(count) {
	const courseCount = document.getElementById("courseCount");
	if (courseCount) {
		courseCount.textContent = `Showing ${count} course${count !== 1 ? "s" : ""}`;
	}
}

function filterCourses(filters) {
	let filtered = [...allCourses];

	if (filters.category && filters.category !== "all") {
		filtered = filtered.filter(
			(course) => course.category === filters.category,
		);
	}

	if (filters.level && filters.level !== "all") {
		filtered = filtered.filter((course) => course.level === filters.level);
	}

	if (filters.search) {
		const searchTerm = filters.search.toLowerCase();
		filtered = filtered.filter(
			(course) =>
				course.title.toLowerCase().includes(searchTerm) ||
				course.description.toLowerCase().includes(searchTerm) ||
				course.instructor.toLowerCase().includes(searchTerm) ||
				course.category.toLowerCase().includes(searchTerm),
		);
	}

	return filtered;
}

function getUniqueCategories(courses) {
	const categories = courses.map((course) => course.category);
	return [...new Set(categories)].sort();
}

function populateCategoryFilter(categories) {
	const categoryFilter = document.getElementById("categoryFilter");
	if (!categoryFilter) return;

	categories.forEach((category) => {
		const option = document.createElement("option");
		option.value = category;
		option.textContent = category;
		categoryFilter.appendChild(option);
	});
}

function setupFilters() {
	const categoryFilter = document.getElementById("categoryFilter");
	const levelFilter = document.getElementById("levelFilter");
	const searchInput = document.getElementById("searchInput");
	const resetButton = document.getElementById("resetFilters");

	const debouncedSearch = debounce(() => {
		applyFilters();
	}, 300);

	if (categoryFilter) {
		categoryFilter.addEventListener("change", () => {
			applyFilters();
			saveFilterPreferences();
		});
	}

	if (levelFilter) {
		levelFilter.addEventListener("change", () => {
			applyFilters();
			saveFilterPreferences();
		});
	}

	if (searchInput) {
		searchInput.addEventListener("input", debouncedSearch);
	}

	if (resetButton) {
		resetButton.addEventListener("click", resetFilters);
	}
}

function applyFilters() {
	const categoryFilter = document.getElementById("categoryFilter");
	const levelFilter = document.getElementById("levelFilter");
	const searchInput = document.getElementById("searchInput");

	const filters = {
		category: categoryFilter ? categoryFilter.value : "all",
		level: levelFilter ? levelFilter.value : "all",
		search: searchInput ? searchInput.value : "",
	};

	filteredCourses = filterCourses(filters);
	displayCourses(filteredCourses);
}

function resetFilters() {
	const categoryFilter = document.getElementById("categoryFilter");
	const levelFilter = document.getElementById("levelFilter");
	const searchInput = document.getElementById("searchInput");

	if (categoryFilter) categoryFilter.value = "all";
	if (levelFilter) levelFilter.value = "all";
	if (searchInput) searchInput.value = "";

	applyFilters();
	clearFilterPreferences();
}

function saveFilterPreferences() {
	const categoryFilter = document.getElementById("categoryFilter");
	const levelFilter = document.getElementById("levelFilter");

	const preferences = {
		category: categoryFilter ? categoryFilter.value : "all",
		level: levelFilter ? levelFilter.value : "all",
	};

	saveToLocalStorage("filterPreferences", preferences);
}

function loadFilterPreferences() {
	const preferences = loadFromLocalStorage("filterPreferences");
	if (!preferences) return;

	const categoryFilter = document.getElementById("categoryFilter");
	const levelFilter = document.getElementById("levelFilter");

	if (categoryFilter && preferences.category) {
		categoryFilter.value = preferences.category;
	}
	if (levelFilter && preferences.level) {
		levelFilter.value = preferences.level;
	}
}

function clearFilterPreferences() {
	localStorage.removeItem("filterPreferences");
}

function saveCourseView(courseId) {
	let viewHistory = loadFromLocalStorage("courseViewHistory") || [];

	viewHistory = [courseId, ...viewHistory.filter((id) => id !== courseId)];

	viewHistory = viewHistory.slice(0, 10);

	saveToLocalStorage("courseViewHistory", viewHistory);
}

function checkUrlParameters() {
	const urlParams = new URLSearchParams(window.location.search);
	const category = urlParams.get("category");

	if (category) {
		const categoryFilter = document.getElementById("categoryFilter");
		if (categoryFilter) {
			categoryFilter.value = category;
			applyFilters();
		}
	}
}

async function initCoursesPage() {
	allCourses = await fetchCourses();

	if (allCourses.length === 0) {
		const container = document.getElementById("coursesGrid");
		if (container) {
			container.innerHTML =
				'<p style="text-align: center; padding: 2rem; color: var(--error);">Unable to load courses. Please try again later.</p>';
		}
		return;
	}

	const categories = getUniqueCategories(allCourses);
	populateCategoryFilter(categories);
	setupFilters();

	checkUrlParameters();

	loadFilterPreferences();

	applyFilters();
}

async function initHomePage() {
	allCourses = await fetchCourses();

	if (allCourses.length === 0) return;

	const featuredContainer = document.getElementById("featuredCourses");
	if (featuredContainer) {
		const featuredCourses = allCourses.slice(0, 6);
		displayCourses(featuredCourses, "featuredCourses");
	}

	const categoryContainer = document.getElementById("categoryList");
	if (categoryContainer) {
		const categories = getUniqueCategories(allCourses);
		const categoryCards = categories
			.slice(0, 6)
			.map((category, index) => {
				const gradients = [
					"linear-gradient(135deg, #1e88e5 0%, #64b5f6 100%)",
					"linear-gradient(135deg, #43a047 0%, #66bb6a 100%)",
					"linear-gradient(135deg, #e91e63 0%, #f06292 100%)",
					"linear-gradient(135deg, #8e24aa 0%, #ab47bc 100%)",
					"linear-gradient(135deg, #fb8c00 0%, #ffa726 100%)",
					"linear-gradient(135deg, #00acc1 0%, #26c6da 100%)",
				];
				const gradient = gradients[index % gradients.length];
				const courseCount = allCourses.filter(
					(c) => c.category === category,
				).length;

				return `
        <article class="course-card">
          <div class="course-image" style="background: ${gradient};">
            📚
          </div>
          <div class="course-content">
            <h3 class="course-title">${category}</h3>
            <p class="course-description">${courseCount} course${courseCount !== 1 ? "s" : ""} available</p>
            <a href="courses.html?category=${encodeURIComponent(category)}" class="cta-button" style="display: inline-block; margin-top: 1rem;">
              Browse ${category}
            </a>
          </div>
        </article>
      `;
			})
			.join("");

		categoryContainer.innerHTML = categoryCards;
	}
}

if (window.location.pathname.includes("courses.html")) {
	initCoursesPage();
} else if (
	window.location.pathname.includes("index.html") ||
	window.location.pathname.endsWith("/")
) {
	initHomePage();
}

export { fetchCourses, allCourses, displayCourses };
