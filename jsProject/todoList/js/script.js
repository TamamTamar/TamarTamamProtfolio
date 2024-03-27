
const addButton = document.getElementById('add-btn');
const inputField = document.getElementById('input-box');
const taskList = document.getElementById('list-container');

// Function to update local storage

function save() {
    const tasks = [];
    document.querySelectorAll('#list-container li').forEach(taskItem => {
        const taskSpan = taskItem.querySelector('span');
        const isDone = taskSpan.classList.contains('task-done');
        tasks.push({ content: taskSpan.textContent, done: isDone });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadData() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            addTask(task.content, task.done);
        });
    }
}

// Function to add a task
function addTask(taskContent, isDone = false) {
    // Create new task item
    if (taskContent === "") return;

    const taskItem = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = taskContent;
    taskItem.appendChild(taskText);

    // Done button
    const doneButton = document.createElement('span');
    if (isDone) {
        taskText.classList.add('task-done');
    }
    doneButton.className = 'doneTask';
    doneButton.innerHTML = '<i class="bi bi-check-lg"></i>';
    doneButton.addEventListener('click', () => {
        taskText.classList.toggle('task-done');
        save();
    });
    taskItem.appendChild(doneButton);

    // Edit button
    const editButton = document.createElement('span');
    editButton.className = 'editTask';
    editButton.innerHTML = '<i class="bi bi-pencil"></i>';
    editButton.addEventListener('click', () => {
        inputField.value = taskText.textContent;
        inputField.focus();
        taskList.removeChild(taskItem);
        save();
    });
    taskItem.appendChild(editButton);

    // Delete button
    const deleteButton = document.createElement('span');
    deleteButton.className = 'deleteTask';
    deleteButton.innerHTML = '<i class="bi bi-trash3"></i>';
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        save();
    });
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
}

loadData();

// Event listener for the add button
addButton.addEventListener('click', () => {
    addTask(inputField.value);
    inputField.value = '';
    save();
});

// Event listener for the enter key in the input field
inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask(inputField.value);
        inputField.value = ''; // Clear input field
        save(); // Update local storage after adding
    }
});

