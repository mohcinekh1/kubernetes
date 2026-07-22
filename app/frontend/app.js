const apiBaseUrl = window.API_BASE_URL || "";

const statusBox = document.querySelector("#statusBox");
const refreshButton = document.querySelector("#refreshButton");
const healthPill = document.querySelector("#healthPill");
const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const commandButton = document.querySelector("#commandButton");
const commandDialog = document.querySelector("#commandDialog");
const commandSearch = document.querySelector("#commandSearch");
const commandList = document.querySelector("#commandList");

const commands = [
  {
    title: "Architecture",
    description: "Afficher le flux frontend -> backend -> PostgreSQL",
    target: "#architecture"
  },
  {
    title: "Runtime",
    description: "Voir les ports utilisés par Docker Compose",
    target: "#runtime"
  },
  {
    title: "Tâches",
    description: "Tester la lecture depuis PostgreSQL",
    target: "#tasks"
  }
];

refreshButton.addEventListener("click", loadData);
taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = taskInput.value.trim();

  if (!title) {
    taskInput.setAttribute("aria-invalid", "true");
    return;
  }

  taskInput.removeAttribute("aria-invalid");
  taskForm.querySelector("button").disabled = true;

  await fetch(`${apiBaseUrl}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  });

  taskInput.value = "";
  taskForm.querySelector("button").disabled = false;
  await loadTasks();
});

taskInput.addEventListener("input", () => {
  if (taskInput.value.trim()) {
    taskInput.removeAttribute("aria-invalid");
  }
});

commandButton.addEventListener("click", openCommandDialog);
commandSearch.addEventListener("input", () => renderCommands(commandSearch.value));
commandList.addEventListener("click", (event) => {
  const item = event.target.closest(".command-item");
  if (!item) {
    return;
  }
  runCommand(item.dataset.target);
});

document.addEventListener("keydown", (event) => {
  const isShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
  if (isShortcut) {
    event.preventDefault();
    openCommandDialog();
  }
});

async function loadData() {
  await Promise.all([loadStatus(), loadTasks()]);
}

async function loadStatus() {
  try {
    const response = await fetch(`${apiBaseUrl}/api/info`);
    const data = await response.json();
    statusBox.textContent = JSON.stringify(data, null, 2);
    healthPill.textContent = "200 OK";
  } catch (error) {
    statusBox.textContent = `Backend indisponible: ${error.message}`;
    healthPill.textContent = "offline";
  }
}

async function loadTasks() {
  taskList.innerHTML = "";

  try {
    const response = await fetch(`${apiBaseUrl}/api/tasks`);
    const tasks = await response.json();

    if (!response.ok) {
      throw new Error(tasks.detail || tasks.error || "Erreur API");
    }

    for (const task of tasks) {
      const item = document.createElement("li");
      item.className = task.done ? "done" : "";
      item.textContent = `#${task.id} ${task.title}`;
      taskList.appendChild(item);
    }
  } catch (error) {
    const item = document.createElement("li");
    item.textContent = `Base de données indisponible: ${error.message}`;
    taskList.appendChild(item);
  }
}

function openCommandDialog() {
  renderCommands(commandSearch.value);
  commandDialog.showModal();
  commandSearch.focus();
}

function renderCommands(query = "") {
  const normalizedQuery = query.trim().toLowerCase();
  const filteredCommands = commands.filter((command) => {
    return `${command.title} ${command.description}`.toLowerCase().includes(normalizedQuery);
  });

  commandList.innerHTML = "";

  for (const [index, command] of filteredCommands.entries()) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "command-item";
    button.dataset.target = command.target;
    button.setAttribute("role", "option");
    button.setAttribute("aria-selected", String(index === 0));
    button.innerHTML = `<strong>${command.title}</strong><span>${command.description}</span>`;
    commandList.appendChild(button);
  }
}

function runCommand(target) {
  commandDialog.close();
  document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

loadData();
