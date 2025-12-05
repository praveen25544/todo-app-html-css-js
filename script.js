class Todo {
  constructor(text) {
    this.id = Date.now();
    this.text = text;
    this.status = "pending";
  }
}

class App {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    this.filter = "all";

    this.todoInput = document.getElementById("todoInput");
    this.todoList = document.getElementById("todoList");
    this.addBtn = document.getElementById("addBtn");
    this.filterBtns = document.querySelectorAll(".filter");

    this.addBtn.addEventListener("click", () => this.addTodo());
    this.filterBtns.forEach(btn =>
      btn.addEventListener("click", e => this.setFilter(e))
    );

    this.render();
  }

  save() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  addTodo() {
    const text = this.todoInput.value.trim();
    if (!text) return;

    this.todos.push(new Todo(text));
    this.todoInput.value = "";
    this.save();
    this.render();
  }

  toggleStatus(id) {
    this.todos = this.todos.map(t =>
      t.id === id ? { ...t, status: t.status === "pending" ? "completed" : "pending" } : t
    );
    this.save();
    this.render();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.save();
    this.render();
  }

  setFilter(e) {
    this.filterBtns.forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");

    this.filter = e.target.dataset.type;
    this.render();
  }

  render() {
    this.todoList.innerHTML = "";

    const filtered =
      this.filter === "all"
        ? this.todos
        : this.todos.filter(t => t.status === this.filter);

    filtered.forEach(todo => {
      const li = document.createElement("li");
      li.className = todo.status === "completed" ? "completed" : "";

      li.innerHTML = `
        <span onclick="app.toggleStatus(${todo.id})">${todo.text}</span>
        <div class="actions">
          <span onclick="app.deleteTodo(${todo.id})">🗑️</span>
        </div>
      `;

      this.todoList.appendChild(li);
    });
  }
}

const app = new App();