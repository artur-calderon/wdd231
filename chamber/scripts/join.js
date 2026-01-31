document.addEventListener("DOMContentLoaded", function () {
	const timestampField = document.getElementById("timestamp");
	const now = new Date();
	timestampField.value = now.toISOString();

	setupModals();

	const form = document.getElementById("membershipForm");
	form.addEventListener("submit", function (e) {});
});

function setupModals() {
	const modals = document.querySelectorAll(".modal");
	const cardLinks = document.querySelectorAll(".card-link");
	const closeButtons = document.querySelectorAll(".close");

	cardLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();
			const modalId = this.getAttribute("data-modal");
			const modal = document.getElementById(modalId);
			if (modal) {
				modal.classList.add("show");
				document.body.style.overflow = "hidden";
			}
		});
	});

	closeButtons.forEach((btn) => {
		btn.addEventListener("click", function (e) {
			const modal = this.closest(".modal");
			modal.classList.remove("show");
			document.body.style.overflow = "auto";
		});
	});

	modals.forEach((modal) => {
		modal.addEventListener("click", function (e) {
			if (e.target === this) {
				this.classList.remove("show");
				document.body.style.overflow = "auto";
			}
		});
	});

	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape") {
			modals.forEach((modal) => {
				modal.classList.remove("show");
				document.body.style.overflow = "auto";
			});
		}
	});
}

const form = document.getElementById("membershipForm");

if (form) {
	const orgTitleInput = document.getElementById("orgTitle");
	if (orgTitleInput) {
		orgTitleInput.addEventListener("blur", function () {
			if (this.value.length > 0) {
				const pattern = /^[a-zA-Z\s\-]{7,}$/;
				if (!pattern.test(this.value)) {
					this.classList.add("error");
					this.title =
						"Organizational title must be at least 7 characters and contain only letters, hyphens, and spaces";
				} else {
					this.classList.remove("error");
				}
			}
		});
	}

	const descriptionInput = document.getElementById("description");
	if (descriptionInput) {
		descriptionInput.addEventListener("input", function () {});
	}
}
