document.addEventListener('DOMContentLoaded', load())

function ask(){
    console.log("clicked button")
    //const text_field = document.getElementById('text_field')
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


function load(){

    fetch('/load_comments')
    .then(res => res.json())
    .then(data => {
        var EL_P = document.getElementById('Comment_box')
        console.log(data.list_of_comments)
        EL_P.innerHTML = ''
        data.list_of_comments.forEach((list_comments, index) => {
            var p = document.createElement('p')
            p.textContent = list_comments
           


            var btn = document.createElement('button')
            btn.textContent = 'Deleate'
            btn.onclick = function() {
                deleteTask(index)
            }
            p.appendChild(btn)
            EL_P.appendChild(p)
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
            alert("Could not deleate comment")
        }
    });
}