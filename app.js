/* define ui variables */

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const filetr = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

/**
 * load event listeners
 */

loadEventListeners();

function loadEventListeners() {
  //DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);

  //add tasks event
  form.addEventListener("submit", addTask);

  //remove task event
  taskList.addEventListener("click", removeTask);

  //clear task events
  clearBtn.addEventListener("click", clearTask);

  //filter task event
  filetr.addEventListener("keyup", filterTask);
}

/**
 * Get Tasks from loacl storage
 */

function getTasks() {
  let tasks;
  //checking if local storage contains any tasks
  if (localStorage.getItem("tasks") === null) {
    //set tasks in empty array if there isn't
    tasks = [];
  } else {
    //if exists tasks, fetc them
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    /** create li element */
    const li = document.createElement("li");
    //add class
    li.className = "collection-item";

    //create text node and append to li
    li.appendChild(document.createTextNode(task));

    //create new link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
  });
}

/*
 * Add tasks
 */

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }
  /** create li element */
  const li = document.createElement("li");
  //add class
  li.className = "collection-item";
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append link to li
  li.appendChild(link);
  //append li to ul
  taskList.appendChild(li);

  /**
   * store in locl storage
   */
  storeTaskInLocalStorage(taskInput.value);

  //clear the input
  taskInput.value = "";

  e.preventDefault();
}

/**
 * store task in local storage
 */

function storeTaskInLocalStorage(task) {
  let tasks;

  //checking if local storage contains any tasks
  if (localStorage.getItem("tasks") === null) {
    //set tasks in empty array if there isn't
    tasks = [];
  } else {
    //if exists tasks, fetc them
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  //set tasks in local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * remove task
 */

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure")) {
      e.target.parentElement.parentElement.remove();

      //remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

/**
 *
 * remove task from local storage
 */

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  //checking if local storage contains any tasks
  if (localStorage.getItem("tasks") === null) {
    //set tasks in empty array if there isn't
    tasks = [];
  } else {
    //if exists tasks, fetc them
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  //set tasks in local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
/*
 *
 *
 * clear task
 */
function clearTask(e) {
  //option one
  //taskList.innerHTML = '';

  //option two - faster way
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //clear from locl storage
  clearTaskFromLocalStorage();
}

/**
 * clear from locl storage
 */

function clearTaskFromLocalStorage() {
  localStorage.clear();
}

/**
 * filter task
 */

function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
