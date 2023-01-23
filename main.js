let tasksDiv = document.querySelector(".tasks");

// Empty Array To Store Tasks
let arrayOfTasks = []

// Check If There Is Data
if (window.localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"))
}

getDataFromLocalStorage()

// Add Task
add.addEventListener("click", function () {
    if (input.value) {

        addTaskToArr(input.value);  // Add Task To Array

        input.value = '';           // Empty Input Field
    }
})

// Click On Task Element
tasksDiv.addEventListener("click", e => {
    // Delete Button
    if (e.target.classList.contains("del")) {
        // Remove Task Fomr Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // Remove Element From Page
        e.target.parentElement.remove();
    }
    // Task Element
    if (e.target.classList.contains("task")) {
        // Toggle Completed For The Task
        toggleTaskStatusWith(e.target.getAttribute("data-id"))
        // Toggle Done Class
        e.target.classList.toggle("done");
    }

})

function addTaskToArr(taskText) {
    // Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    }
    // Push Task To Array
    arrayOfTasks.push(task);
    // Add Tasks To Page
    addElementsToPageFrom(arrayOfTasks);
    // Add Tasks To Local Storage
    addDataToLocalStorageFrom(arrayOfTasks)
}

function addElementsToPageFrom(arrayOfTasks) {
    // Empty Tasks Div
    tasksDiv.innerHTML = ''

    // Looping on Array Of Tasks
    arrayOfTasks.forEach(task => {
        let div = document.createElement("div");
        div.className = "task";
        // Check If Task Is Done
        if (task.completed) {
            div.classList.add("done");
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        
        // Delete Button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));

        // Add Span To Div
        div.appendChild(span);
        
        // Add Task Div To Tasks Div
        tasksDiv.appendChild(div);
    });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter(task => {
        return task.id != taskId;
    })
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleTaskStatusWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++){
        if (arrayOfTasks[i].id == taskId) {
            (arrayOfTasks[i].completed == false) ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false); 
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}