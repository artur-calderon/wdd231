const modal = document.getElementById("courseModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

export function openModal(course) {
	if (!modal) return;

	if (modalTitle) {
		modalTitle.textContent = course.title;
	}

	if (modalBody) {
		const rating = "⭐".repeat(Math.floor(course.rating));

		modalBody.innerHTML = `
      <div class="modal-info-item modal-category-header">
        <span class="modal-category-label">Category</span>
        <strong class="modal-category-value">${course.category}</strong>
      </div>
      
      <p class="modal-description">${course.description}</p>
      
      <div class="modal-info">
        <div class="modal-info-item">
          <strong>Instructor:</strong>
          <span>${course.instructor}</span>
        </div>
        
        <div class="modal-info-item">
          <strong>Level:</strong>
          <span>${course.level}</span>
        </div>
        
        <div class="modal-info-item">
          <strong>Duration:</strong>
          <span>${course.duration}</span>
        </div>
        
        <div class="modal-info-item">
          <strong>Rating:</strong>
          <span>${rating} ${course.rating} / 5.0</span>
        </div>
      </div>
      
      <div class="modal-learning-section">
        <h3 class="modal-learning-title">What You'll Learn</h3>
        <ul class="modal-learning-list">
          <li class="modal-learning-item">
            <span class="modal-checkmark">✓</span>
            Comprehensive understanding of ${course.category.toLowerCase()} concepts
          </li>
          <li class="modal-learning-item">
            <span class="modal-checkmark">✓</span>
            Hands-on practice with real-world projects and exercises
          </li>
          <li class="modal-learning-item">
            <span class="modal-checkmark">✓</span>
            Expert guidance from ${course.instructor}
          </li>
          <li class="modal-learning-item">
            <span class="modal-checkmark">✓</span>
            Certificate of completion to showcase your achievement
          </li>
        </ul>
      </div>
      
      <div class="modal-enroll-section">
        <button class="cta-button modal-enroll-btn">
          Enroll Now
        </button>
        <p class="modal-enroll-text">
          Join thousands of students learning ${course.category.toLowerCase()}
        </p>
      </div>
    `;

		const enrollButton = modalBody.querySelector(".cta-button");
		if (enrollButton) {
			enrollButton.addEventListener("click", () => {
				alert(
					`Thank you for your interest in "${course.title}"!\n\nThis is a demo. In a production environment, you would be redirected to the enrollment page.`,
				);
			});
		}
	}

	modal.classList.add("active");
	document.body.style.overflow = "hidden";

	if (modalClose) {
		modalClose.focus();
	}
}

export function closeModal() {
	if (!modal) return;

	modal.classList.remove("active");
	document.body.style.overflow = "";
}

if (modalClose) {
	modalClose.addEventListener("click", closeModal);
}

if (modal) {
	modal.addEventListener("click", (event) => {
		if (event.target === modal) {
			closeModal();
		}
	});
}

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && modal && modal.classList.contains("active")) {
		closeModal();
	}
});

if (modal) {
	modal.addEventListener("keydown", (event) => {
		if (event.key === "Tab" && modal.classList.contains("active")) {
			const focusableElements = modal.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
			);
			const firstFocusable = focusableElements[0];
			const lastFocusable =
				focusableElements[focusableElements.length - 1];

			if (event.shiftKey) {
				if (document.activeElement === firstFocusable) {
					event.preventDefault();
					lastFocusable.focus();
				}
			} else {
				if (document.activeElement === lastFocusable) {
					event.preventDefault();
					firstFocusable.focus();
				}
			}
		}
	});
}

export { modal };
