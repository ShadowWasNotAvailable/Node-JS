
function ask(){
    console.log("clicked button")

    fetch('/ask')
        .then (res => res.json())
        .then (data => {
            console.log(data)
        })
}