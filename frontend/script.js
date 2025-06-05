
let tasks = [
  { title: "buy items", description: "milk, eggs, chocobars" },
  { title: "workout", description: "30 mins of exercise" },
  { title: "study web devt", description: "complete events module" },
  { title: "call mom", description: "call at 7pm" }
];

window.onload = () => {
  renderTasks();
};

function addTask() {
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();

  if (title === '' || description === '') {
    alert('Please fill out both fields!');
    return;
  }

  tasks.push({ title, description });
  renderTasks();

  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    taskList.innerHTML += `
      <div class="task">
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <div class="actions">
          <button onclick="editTask(${index})">✏️</button>
          <button onclick="deleteTask(${index})">❌</button>
        </div>
      </div>
    `;
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function clearAll() {
  if (confirm('Are you sure you want to delete all tasks?')) {
    tasks = [];
    renderTasks();
  }
}

function editTask(index) {
  const newTitle = prompt('Edit Task Title:', tasks[index].title);
  const newDesc = prompt('Edit Task Description:', tasks[index].description);

  if (newTitle !== null && newDesc !== null) {
    tasks[index].title = newTitle.trim() || tasks[index].title;
    tasks[index].description = newDesc.trim() || tasks[index].description;
    renderTasks();
  }
}
