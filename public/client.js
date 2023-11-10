document.addEventListener('DOMContentLoaded', load())

function ask(){
    console.log("clicked button")
    const input_comment = document.getElementById('comment').value;
    console.log(input_comment)
    

    fetch('/send_comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment_value: input_comment })
    })
    .then (res => res.json())
    .then (data => {
        if(data.success){
            console.log("Comment added on server")
            console.log(data)
        } else{
            console.log(data)
            alert(data.message)    
        }

    });
}

function login(){
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })




    
    .then(res => res.json())
    .then(data => {
      
        if (data.success){
            window.location.href = "index.html";
            
        }else {
            alert("Could not login!")
        }
    })
}

function load(){

    fetch('/load_comments')
    .then(res => res.json())
    .then(data => {
        var EL_P = document.getElementById('messages_box')
        console.log(data.list_of_comments)
        EL_P.innerHTML = ''
        data.list_of_comments.forEach((list_comments, index) => {
            var p = document.createElement('p')
            p.textContent = list_comments
            EL_P.appendChild(p)
        });
    })
    
} // end load

function toBottom(){
        // Scroll to the bottom of the messages_box when the page loads
        var messagesBox = document.getElementById('messages_box');
        messagesBox.scrollTop = messagesBox.scrollHeight;
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
            alert("Could not deleate comment")
        }
    });
}

 setInterval(load, 1000)       