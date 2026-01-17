const membersContainer = document.querySelector("#members");
const gridBtn = document.querySelector("#gridView");
const listBtn = document.querySelector("#listView");
const menuBtn = document.querySelector("#menuBtn");
const nav = document.querySelector("#navMenu");

// MENU MOBILE
menuBtn.addEventListener("click", () => {
	nav.style.display = nav.style.display === "flex" ? "none" : "flex";
});

// MOCK DATA (depois vem do JSON)

fetch("data/members.json")
	.then((response) => response.json())
	.then((data) => {
		members = data;
		displayMembers();
	});

function displayMembers() {
	membersContainer.innerHTML = "";

	members.forEach((member) => {
		const card = document.createElement("div");
		card.classList.add("member-card");

		card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
    `;

		membersContainer.appendChild(card);
	});
}

gridBtn.addEventListener("click", () => {
	membersContainer.className = "grid";
});

listBtn.addEventListener("click", () => {
	membersContainer.className = "list";
});

// FOOTER DATES
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

displayMembers();
