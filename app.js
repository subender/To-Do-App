const inputFieldEl = document.querySelector(".input__field");
const addButton = document.querySelector(".btn");
const todoListEl = document.querySelector(".todo__list");
const filterTaskEl = document.querySelector(".filter__tasks");
let taskArr;

// To get Data from local storage
const tasks = JSON.parse(localStorage.getItem("tasks"));
if (tasks) {
  tasks.forEach((task) => {
    createTask(task);
  });
}

// Event Listners

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputFieldEl.value !== "") createTask(inputFieldEl.value);
});

todoListEl.addEventListener("click", deleteTask);

todoListEl.addEventListener("click", markComplete);

filterTaskEl.addEventListener("click", filterTasks);

//Functions

function createTask(value) {
  // Creates task container
  const task = document.createElement("div");
  task.classList.add("todo");

  task.innerHTML = `
    <li class="todo__item">${value}</li>
    <button class="task__btn done">
       <ion-icon class="comp" name="checkmark-done-circle-outline"></ion-icon>
    </button>
    <button class="task__btn delete">
        <ion-icon class="del" name="trash-outline"></ion-icon>
    </button>
    `;

  todoListEl.appendChild(task);

  // Adding task to local storage
  addToLS(inputFieldEl.value);

  // Clear input field value
  inputFieldEl.value = "";
}

//Performing Deletion of a Task

function deleteTask(e) {
  //   console.log(e.target);
  const item = e.target;
  //   console.log(item.classList);

  if (item.classList[1] === "delete") {
    const task = item.closest(".todo");
    //Delete Animation

    task.classList.add("drop");
    removeFromLS(task);

    //waiting for the delete animation to complete.
    task.addEventListener("transitionend", () => {
      //Removing the task.
      task.remove();
    });
  }
}

//Mark completed task.
function markComplete(e) {
  const item = e.target;

  if (item.classList[1] === "done") {
    const task = item.closest(".todo");
    task.style.color = "#000";
    task.classList.toggle("completed");
  }
}

// Filtering tasks.
function filterTasks(e) {
  const tasks = todoListEl.childNodes;
  tasks.forEach((task) => {
    switch (e.target.value) {
      case "all":
        task.style.display = "flex";
        break;

      case "completed":
        if (task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;

      case "incomplete":
        if (!task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
    }
  });
}

// Checks for Existing Local Storage Array
function createLS(task) {
  if (localStorage.getItem("tasks") === null) {
    taskArr = [];
  } else {
    taskArr = JSON.parse(localStorage.getItem("tasks"));
  }
}

//Adds Items To Local Storage
function addToLS(task) {
  createLS(task);

  if (task !== "") {
    taskArr.push(task);
  }

  localStorage.setItem("tasks", JSON.stringify(taskArr));
}

//Removes items from Local Storage
function removeFromLS(task) {
  createLS(task);
  const taskIndex = task.children[0].innerText;
  taskArr.splice(taskArr.indexOf(taskIndex), 1);
  localStorage.setItem("tasks", JSON.stringify(taskArr));
}
