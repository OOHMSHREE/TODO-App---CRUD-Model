let addTodo = document.getElementById("add-todo");
let closeBtn = document.getElementById("closeBtn");
let modalContainer = document.getElementById("modal-container");
let todoApp = document.getElementById("todoApp");
let form = document.getElementById("form");
let inputTask = document.getElementById("inputTask");
let taskDes = document.getElementById("taskDes");
let inputTime = document.getElementById("inputTime");
let errorMsg = document.getElementById("errorMsg");
let todo = document.getElementsByClassName("todo");
let todoContainer = document.getElementById("todoContainer");


addTodo.addEventListener("click" , ()=>{
    modalContainer.style.display = "block";
    todoApp.style.display = "none";

})

closeBtn.addEventListener("click" , ()=>{
    inputTask.value = "";
    taskDes.value = "";
    inputTime.value = "";
    modalContainer.style.display = "none";
    todoApp.style.display = "block";

})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
})

let formValidation = () =>{
    if (inputTask.value === "") {
        errorMsg.innerHTML = "Task cannot be blank";
    }
    else{
        errorMsg.innerHTML = "";
        acceptData();
        
    }
}

let task = [{}];

let acceptData = () =>{
    task.push({
        task:inputTask.value,
        description:taskDes.value,
        date:inputTime.value,
    })

    localStorage.setItem("task",JSON.stringify(task));
    
    console.log(task);
    newTask();
}

let newTask = () =>{
    todoContainer.innerHTML ="";
    task.map((x,y) => {
        return (
            todoContainer.innerHTML += `
                <div class="todo" id="todo">
                    <div class="todo-name">${x.task}</div>
                    
                    <div class="todo-description" max = "40">${x.description}</div>
                    <div class="todo-date">${x.date}</div>
                    <div class="options">
                        <i onClick="editTask(this)" class="fa-regular fa-pen-to-square"></i>
                        <i onClick="deleteTask(this)" class="fa-solid fa-trash-can"></i>
                    </div>
                 </div>
    `);
        
    })

    inputTask.value = "";
    taskDes.value = "";
    inputTime.value = "";

    modalContainer.style.display = "none";
    todoApp.style.display = "block";

}

let deleteTask = (e) =>{
    e.parentElement.parentElement.remove();
    task.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("task",JSON.stringify(task));
    console.log(task);
}

let editTask = (e) => {
    modalContainer.style.display = "block";
    
    let selectedTask = e.parentElement.parentElement;
  
    inputTask.value = selectedTask.children[0].innerHTML;
    taskDes.value = selectedTask.children[1].innerHTML;
    inputTime.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
    todoApp.style.display = "none";
    
};

(() => {
    task = JSON.parse(localStorage.getItem("task")) || []
    console.log(task);
    newTask();

})();


