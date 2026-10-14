
const hall = document.querySelector("#hall");
const who = document.querySelector("#who");
const many = document.querySelector("#many");
const status = document.querySelector("#status");
const free = document.querySelector("#free");

if (!hall || !who || !many || !status || !free) {
  throw new Error("A required page element is missing.");
}

hall.addEventListener("click", function (event) {
  const seat = event.target.closest(".seat");

  if (!seat || !hall.contains(seat)) {
    return;
  }

  status.textContent = `You clicked seat ${seat.dataset.n}.`;
});
