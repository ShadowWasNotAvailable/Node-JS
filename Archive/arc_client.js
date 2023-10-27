document.addEventListener('DOMContentLoaded', load())

function ask(){
    console.log("clicked button")
    const text_field = document.getElementById('text_field')
    const task = document.getElementById('task').value;
    console.log(task)
    

    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: task })
    })
    .then (res => res.json())
    .then (data => {
        if(data.success){
            console.log("Task added on server")
            console.log(data)
        } else{
            console.log(data)
            alert(data.message)    
        }

        load()

    });
}

function load(){

    fetch('/load_tasks')
    .then(res => res.json())
    .then(data => {
        var EL_ul = document.getElementById('task_ul')
        console.log(data.list_of_task)
        EL_ul.innerHTML = ''
        data.list_of_task.forEach((tasks, index) => {
            var li = document.createElement('li')
            li.textContent = tasks
           


            var btn = document.createElement('button')
            btn.textContent = 'Deleate'
            btn.onclick = function() {
                deleteTask(index)
            }
            li.appendChild(btn)
            EL_ul.appendChild(li)
        });
    })
}

function deleteTask(index){
    fetch(`/delete/${index}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        if (data.success){
            load()
        }else {
            alert("Could not deleate task")
        }
    })
}

