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
      <div class="modal-info-item" style="background-color: var(--primary-color); color: var(--white); padding: 1rem; margin: -1.5rem -1rem 1.5rem; border-radius: 0;">
        <span style="display: block; font-size: 0.9rem; opacity: 0.9; margin-bottom: 0.25rem;">Category</span>
        <strong style="color: var(--white); font-size: 1.2rem;">${course.category}</strong>
      </div>
      
      <p style="font-size: 1.05rem; line-height: 1.8; margin-bottom: 1.5rem;">${course.description}</p>
      
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
      
      <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 2px solid var(--light-gray);">
        <h3 style="margin-bottom: 1rem; color: var(--primary-color);">What You'll Learn</h3>
        <ul style="list-style: none; padding: 0;">
          <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative;">
            <span style="position: absolute; left: 0;">✓</span>
            Comprehensive understanding of ${course.category.toLowerCase()} concepts
          </li>
          <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative;">
            <span style="position: absolute; left: 0;">✓</span>
            Hands-on practice with real-world projects and exercises
          </li>
          <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative;">
            <span style="position: absolute; left: 0;">✓</span>
            Expert guidance from ${course.instructor}
          </li>
          <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative;">
            <span style="position: absolute; left: 0;">✓</span>
            Certificate of completion to showcase your achievement
          </li>
        </ul>
      </div>
      
      <div style="text-align: center; margin-top: 2rem;">
        <button class="cta-button" style="width: 100%; padding: 1rem; font-size: 1.1rem;">
          Enroll Now
        </button>
        <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--dark-gray);">
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
