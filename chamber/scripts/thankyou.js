document.addEventListener("DOMContentLoaded", function () {
	const urlParams = new URLSearchParams(window.location.search);

	displaySubmittedData(urlParams);

	const timestamp = urlParams.get("timestamp");
	if (timestamp) {
		formatAndDisplayDate(timestamp);
	}
});

function displaySubmittedData(params) {
	const dataMap = {
		firstName: "displayFirstName",
		lastName: "displayLastName",
		email: "displayEmail",
		phone: "displayPhone",
		company: "displayCompany",
		timestamp: "displayTimestamp",
	};

	for (const [paramName, elementId] of Object.entries(dataMap)) {
		const value = params.get(paramName);
		const element = document.getElementById(elementId);

		if (element) {
			if (paramName === "timestamp" && value) {
				element.textContent = formatTimestamp(value);
			} else {
				element.textContent = value || "-";
			}
		}
	}
}

function formatTimestamp(isoString) {
	try {
		const date = new Date(isoString);

		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			timeZoneName: "short",
		};

		return date.toLocaleDateString("en-US", options);
	} catch (error) {
		return isoString;
	}
}

function formatAndDisplayDate(timestamp) {
	const displayTimestampElement = document.getElementById("displayTimestamp");
	if (displayTimestampElement) {
		displayTimestampElement.textContent = formatTimestamp(timestamp);
	}
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute("href"));
		if (target) {
			target.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	});
});
