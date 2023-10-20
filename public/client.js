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

        console.log(data)
        alert(data.message)

    })
}