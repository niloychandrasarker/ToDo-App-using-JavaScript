//Find the elements
const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoAddButton = document.querySelector("#addTodoButton");
const todoLists = document.querySelector("#lists");
const messageElement = document.querySelector("#message");

// Show message
const showMessage = (text, status) => {
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(() => {
        messageElement.textContent = "";
        messageElement.classList.remove(`bg-${status}`);
    }, 1000);
};

// Create todo
const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("li-style");
    todoElement.innerHTML = `
        <span>${todoValue}</span>
        <span><button class="btn" id="deleteButton"> 
            <i class="fa fa-trash"></i></button></span>`;

    todoLists.appendChild(todoElement);

    const deleteButton = todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click", deleteTodo);
};

// Delete todo
const deleteTodo = (event) => {
    const selectedTodo = event.target.closest("li"); // Selecting closest li (todo item)
    todoLists.removeChild(selectedTodo);
    showMessage("Todo is deleted", "danger");

    // Update localStorage
    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
    localStorage.setItem("mytodos", JSON.stringify(todos));
};

// Get todos from localStorage
const getTodosFromLocalStorage = () => {
    return localStorage.getItem("mytodos")
        ? JSON.parse(localStorage.getItem("mytodos"))
        : [];
};

// Add todo
const addTodo = (event) => {
    event.preventDefault();
    const todoValue = todoInput.value.trim();

    if (!todoValue) {
        showMessage("Please enter a valid todo", "warning");
        return;
    }

    // Unique id for the todo
    const todoId = Date.now().toString();

    // Create a new todo object
    const newTodo = {
        todoId: todoId,
        todoValue: todoValue
    };

    // Create the todo in the UI
    createTodo(newTodo.todoId, newTodo.todoValue);
    showMessage("Todo is added", "success");

    // Store the new todo in localStorage
    const todos = getTodosFromLocalStorage();
    todos.push(newTodo);
    localStorage.setItem("mytodos", JSON.stringify(todos));

    // Clear the input
    todoInput.value = "";
};

// Load todos from localStorage when the page loads
const loadTodos = () => {
    const todos = getTodosFromLocalStorage();
    todos.forEach((todo) => createTodo(todo.todoId, todo.todoValue));
};

// Add listeners
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);