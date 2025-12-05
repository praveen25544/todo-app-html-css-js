const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const filters = document.querySelectorAll(".filter");

let todos = [];

addBtn.addEventListener("click", () => {
  const task = todoInput.value.trim();
  if(task !== "") {
    todos.push({ task, completed: false });
    todoInput.value = "";
    renderTodos();
  }
});

function renderTodos(filter = "all") {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    if(filter === "pending" && todo.completed) return;
    if(filter === "completed" && !todo.completed) return;

    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";
    li.innerHTML = `
      <span>${todo.task}</span>
      <div>
        <button onclick="toggleComplete(${index})">${todo.completed ? "Undo" : "Done"}</button>
        <button onclick="deleteTodo(${index})">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos(getActiveFilter());
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos(getActiveFilter());
}

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderTodos(btn.dataset.type);
  });
});

function getActiveFilter() {
  return document.querySelector(".filter.active").dataset.type;
}