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

        

    });
}

function load(){
    fetch('/load_tasks'())
    .then(data => {
        console.log(data.list_of_task)
        data.liste.forEach(element => {
            var body = document.getElementsByName('body')
            var task
        });
    })
}