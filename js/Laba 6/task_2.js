
let tasks = [];


const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const sortDateButton = document.getElementById('sort-date');
const sortCompletedButton = document.getElementById('sort-completed');


const addTask = (taskText) => {
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    tasks = [...tasks, task];
    renderTasks();
};


const deleteTask = (taskId) => {
    tasks = tasks.filter((task) => task.id !== taskId);
    renderTasks();
};


const editTask = (taskId, newText) => {
    tasks = tasks.map((task) =>
        task.id === taskId
            ? { ...task, text: newText, updatedAt: new Date() }
            : task
    );
    renderTasks();
};


const toggleTaskCompletion = (taskId) => {
    tasks = tasks.map((task) =>
        task.id === taskId
            ? { ...task, completed: !task.completed, updatedAt: new Date() }
            : task
    );
    renderTasks();
};


const sortByDate = () => {
    tasks = [...tasks].sort((a, b) => b.createdAt - a.createdAt);
    renderTasks();
};


const sortByCompletion = () => {
    tasks = [...tasks].sort((a, b) => b.completed - a.completed);
    renderTasks();
};


const renderTasks = () => {
    taskList.innerHTML = ''; 
    tasks.forEach((task) => {
        const taskItem = document.createElement('li');
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        const editButton = document.createElement('button');
        editButton.textContent = 'Редагувати';
        editButton.onclick = (event) => {
            event.stopPropagation(); 
            handleEdit(task.id);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Видалити';
        deleteButton.onclick = (event) => {
            event.stopPropagation(); 
            handleDelete(task.id);
        };

        
        taskItem.addEventListener('click', (event) => {
            if (event.target !== editButton && event.target !== deleteButton) {
                toggleTaskCompletion(task.id);
            }
        });

        taskItem.appendChild(taskText);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
};


taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText);
        taskInput.value = ''; 
    }
});


const handleEdit = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    const newText = prompt('Редагувати завдання:', task.text);
    if (newText && newText.trim() !== '') {
        editTask(taskId, newText.trim());
    }
};


const handleDelete = (taskId) => {
    deleteTask(taskId);
};


sortDateButton.addEventListener('click', sortByDate);


sortCompletedButton.addEventListener('click', sortByCompletion);


renderTasks();
