// Daily trackers

const container = document.getElementById("tracker-container");

for (let day = 1; day <= 75; day++) {
  const col = document.createElement("div");
  col.className = "col-6 col-sm-4 col-md-3 col-lg-2";

  const card = document.createElement("div");
  card.className = "card h-100";

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h4");
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

// Progress bar

function updateProgressBar() {
    let completedDays = 0;
  
    for (let day = 1; day <= 75; day++) {
      const allTasks = Array.from({ length: 6 }, (_, i) => document.getElementById(`day${day}-task${i + 1}`));
      const isComplete = allTasks.every(task => task.checked);
  
      if (isComplete) {
        completedDays++;
      }
    }
  
    const progressBar = document.getElementById("progress-bar");
    const progressLabel = document.getElementById("progress-label");
    const daysLeft = document.getElementById("days-left");
  
    const percent = (completedDays / 75) * 100;
    progressBar.style.width = `${percent}%`;
    progressBar.setAttribute("aria-valuenow", completedDays);
    progressLabel.textContent = `${completedDays} days completed`;
    daysLeft.textContent = `${75 - completedDays} days to go`;
  }