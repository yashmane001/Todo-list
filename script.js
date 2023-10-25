const todoValue = document.getElementById("todoText"),
  listItems = document.getElementById("list-items"),
  addUpdateClick = document.getElementById("AddUpdateClick"),
  AlertMessage = document.getElementById("AlertMessage");

let updateText;
let todoData = JSON.parse(localStorage.getItem("todoData"));
if (!todoData) {
  todoData = [];
}

todoValue.addEventListener("keypress", function (e) {
  SetAlertMessage("");
  if (e.key === "Enter") {
    addUpdateClick.click();
  }
});

ReadToDoItems();
function ReadToDoItems() {
  todoData.forEach((element) => {
    let li = document.createElement("li");
    let style = "";
    if (element.status) {
      style = "style='text-decoration: line-through'";
    }
    const todoItems = `<div ${style} ondblclick="CompleteTodoItem(this)">${
      element.item
    }</div><div>${
      style === ""
        ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/images/pencil.png" />'
        : ""
    }<img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/images/delete.png" /></div></div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);
  });
}

function CreateToDoData() {
  if (todoValue.value === "") {
    SetAlertMessage("Please Enter your todo text!");
    todoValue.focus();
  } else {
    let li = document.createElement("li");
    const todoItems = `<div ondblclick="CompleteTodoItem(this)">${todoValue.value}</div><div><img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/images/pencil.png" /><img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/images/delete.png" /></div>`;

    li.innerHTML = todoItems;
    listItems.appendChild(li);

    if (!todoData) {
      todoData = [];
    }
    let dataItem = { item: todoValue.value, status: false };
    todoData.push(dataItem);
    setLocalStorage();

    todoValue.value = "";
    SetAlertMessage("Todo item Created Successfully.");
  }
}

function CompleteTodoItem(e) {
  if (e.parentElement.querySelector("div").style.textDecoration === "") {
    e.parentElement.querySelector("div").style.textDecoration = "line-through";
    e.parentElement.querySelector("img.edit").remove();

    todoData.forEach((element) => {
      if (
        e.parentElement.querySelector("div").innerText.trim() == element.item
      ) {
        element.status = true;
      }
    });
    setLocalStorage();
    SetAlertMessage("Todo item Completed Successfully");
  }
}

function UpdateOnSelectionItems() {
  todoData.forEach((element) => {
    if (element.item == updateText.innerText.trim()) {
      element.item = todoValue.value;
    }
  });
  setLocalStorage();
  updateText.innerText = todoValue.value;
  addUpdateClick.setAttribute("onclick", "CompleteTodoItem()");
  addUpdateClick.setAttribute("src", "/images/plus.png");
  todoValue.value = "";
  SetAlertMessage("Todo item Updated Successfully");
}

function UpdateToDoItems(e) {
  if (
    e.parentElement.parentElement.querySelector("div").style.textDecoration ===
    ""
  ) {
    todoValue.value =
      e.parentElement.parentElement.querySelector("div").innerText;
    addUpdateClick.setAttribute("onclick", "UpdateOnSelectionItems()");
    addUpdateClick.setAttribute("src", "/images/refresh.png");
    updateText = e.parentElement.parentElement.querySelector("div");
    todoValue.focus();
  }
}

function DeleteToDoItems(e) {
  let deleteValue =
    e.parentElement.parentElement.querySelector("div").innerText;
  if (confirm(`Are you sure you want to delete this task? ${deleteValue}!`)) {
    e.parentElement.parentElement.setAttribute("class", "deleted-item");
    todoValue.focus();

    todoData.forEach((element) => {
      if (element.item == deleteValue.trim()) {
        todoData.splice(element, 1);
      }
    });

    setTimeout(() => {
      e.parentElement.parentElement.remove();
    }, 1000);

    setLocalStorage();
  }
}

function setLocalStorage() {
  localStorage.setItem("todoData", JSON.stringify(todoData));
}

function SetAlertMessage(message) {
  AlertMessage.removeAttribute("class");
  AlertMessage.innerText = message;

  setTimeout(() => {
    AlertMessage.classList.add("toggleMe");
  }, 1000);
}