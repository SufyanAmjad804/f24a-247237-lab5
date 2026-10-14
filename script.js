

const hall = document.querySelector("#hall");
const who = document.querySelector("#who");
const many = document.querySelector("#many");
const status = document.querySelector("#status");
const free = document.querySelector("#free");

if (!hall || !who || !many || !status || !free) {
  throw new Error("A required page element is missing.");
}

function updateFreeSeats() {
  const taken = hall.querySelectorAll(".seat.taken").length;
  free.textContent = String(8 - taken);
}

function clearSeat(seat) {
  const number = seat.dataset.n;

  seat.classList.remove("taken");
  seat.querySelector("span").textContent = number;

  updateFreeSeats();
  status.textContent = `Seat ${number} is now free.`;
}

function fillSeats(startSeat) {
  const name = who.value.trim();
  const countText = many.value.trim();

  if (name === "") {
    status.textContent = String(undefined);
    return;
  }

  const count = Number(countText);
  const validCount =
    countText !== "" &&
    Number.isInteger(count) &&
    count > 0;

  if (!validCount) {
    many.setCustomValidity("not a number");
    many.reportValidity();
    return;
  }

  many.setCustomValidity("");

  const start = Number(startSeat.dataset.n);
  const end = start + count - 1;

  if (end > 8) {
    status.textContent = "The block does not fit in the hall.";
    return;
  }

  const block = [];

  for (let number = start; number <= end; number++) {
    const seat = hall.querySelector(`#seat-${number}`);

    if (!seat || seat.classList.contains("taken")) {
      status.textContent = "The block is not available.";
      return;
    }

    block.push(seat);
  }

  for (const seat of block) {
    seat.classList.add("taken");
    seat.querySelector("span").textContent = name;
  }

  updateFreeSeats();
  status.textContent = `${name} has been assigned ${count} seat(s).`;
}

hall.addEventListener("click", function (event) {
  const seat = event.target.closest(".seat");

  if (!seat || !hall.contains(seat)) {
    return;
  }

  if (seat.classList.contains("taken")) {
    clearSeat(seat);
    return;
  }

  fillSeats(seat);
});
