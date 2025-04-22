// Daily trackers

const container = document.getElementById("tracker-container");
const congratsModal = new bootstrap.Modal(document.getElementById("congratsModal"));

for (let day = 1; day <= 75; day++) {
  const col = document.createElement("div");
  col.className = "col-6 col-sm-4 col-md-3 col-lg-2";

  const card = document.createElement("div");
  card.className = "card h-100";

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = `Day ${day}`;

  const tasks = [
    "Workout 1",
    "Workout 2",
    "Drink Water",
    "Read 10 pages",
    "Follow diet",
    "Progress photo"
  ];

  body.appendChild(title);

  tasks.forEach((task, i) => {
    const id = `day${day}-task${i + 1}`;
    const checkWrapper = document.createElement("div");
    checkWrapper.className = "form-check";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "form-check-input";
    input.id = id;

    input.addEventListener("change", updateProgressBar);

    const label = document.createElement("label");
    label.className = "form-check-label";
    label.setAttribute("for", id);
    label.textContent = task;

    checkWrapper.appendChild(input);
    checkWrapper.appendChild(label);
    body.appendChild(checkWrapper);
  });

  card.appendChild(body);
  col.appendChild(card);
  container.appendChild(col);
}

// Progress bar and congrats modal

let completedDays = 0;
let previouslyCompleted = new Set();

function updateProgressBar() {
  let currentCompleted = 0;

  for (let day = 1; day <= 75; day++) {
    const tasks = Array.from({ length: 6 }, (_, i) => document.getElementById(`day${day}-task${i + 1}`));
    const isComplete = tasks.every(task => task.checked);

    if (isComplete) {
      currentCompleted++;
      if (!previouslyCompleted.has(day)) {
        // Show modal for newly completed day
        congratsModal.show();
        previouslyCompleted.add(day);
      }
    } else {
      previouslyCompleted.delete(day); // Reset if a box is unchecked later
    }
  }

  const percent = (currentCompleted / 75) * 100;
  document.getElementById("progress-bar").style.width = `${percent}%`;
  document.getElementById("progress-label").textContent = `${currentCompleted} days completed`;
  document.getElementById("days-left").textContent = `${75 - currentCompleted} days to go`;
}

// Reset modal

const resetModal = new bootstrap.Modal(document.getElementById("resetModal"));
const startOverLink = document.getElementById("startOverLink");
const confirmResetBtn = document.getElementById("confirmReset");

startOverLink.addEventListener("click", (e) => {
  e.preventDefault();
  resetModal.show();
});

confirmResetBtn.addEventListener("click", () => {
  // Uncheck all checkboxes
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  allCheckboxes.forEach(checkbox => checkbox.checked = false);

  // Clear previously completed
  previouslyCompleted.clear();

  // Update progress bar
  updateProgressBar();

  // Hide modal
  resetModal.hide();
});