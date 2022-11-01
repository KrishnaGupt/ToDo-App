retrieveTasks()
const addTaskName = document.getElementById('add_task_name')
const addToTask = document.getElementById('add_to_task')
addTaskName.addEventListener('input', ()=>{
    // console.log(addTaskName.value);
    addTaskName.addEventListener('keydown', function(event){
        if (event.key === 'Enter' && addTaskName.value != '') {
            addTask()
        }
    })
})
addToTask.addEventListener('click', function(){
    if(addTaskName.value != ''){
        addTask()
    }
})
function addTask(e){
    let tasks = localStorage.getItem('tasks');
        if(tasks == null){
            taskObj = []
        }
        else{
            taskObj = JSON.parse(tasks);
        }
        let storageObj = {
            taskName: addTaskName.value,
            done: false
        }
        taskObj.push(storageObj)
        localStorage.setItem("tasks", JSON.stringify(taskObj))
        addTaskName.value = '';
        retrieveTasks()
}
function retrieveTasks(){
    let tasks = localStorage.getItem("tasks");
    if(tasks == null){
        taskObj = []
    }
    else{
        taskObj = JSON.parse(tasks);
    }
    let html = '';
    taskObj.forEach((element, index) => {
        html += `<div id="tasks_${index}" class="task_block">
        <div class="task_name">
            <p class="task_p" id="task${index}">${element.taskName}</p>
        </div>
        <div class="task_tools">
            <i class="cursor bi bi-trash" id="${index}" onclick="deleteThisTask(this.id)"></i>
        </div>
    </div>`
    });
    let tasksBlock = document.getElementById('tasks')
    if(taskObj.length != 0){
        tasksBlock.innerHTML = html;
        tasksBlock.style.padding = '20px';
    }else{
        tasksBlock.innerHTML = ""
        tasksBlock.style.padding = '0';
        
    }
}

const deleteButton = document.getElementById('delete');
function deleteThisTask(index){
    let tasks = localStorage.getItem('tasks')
    if (tasks == null) {
        taskObj = []
    }
    else{
        taskObj = JSON.parse(tasks)
    }
    taskObj.splice(index, 1)
    localStorage.setItem("tasks", JSON.stringify(taskObj))
    retrieveTasks()
}
