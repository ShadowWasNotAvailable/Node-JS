
const express = require('express');
const path = require('path');
const app = express();
const port = 80

var tasks = ["Oppvask", "Ta søppla", "Woppa"]



app.use(express.static('public'))
app.use(express.json())

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/hei', function (req, res) {
    res.send("woppa");
});

app.post('/ask', (req, res) => {
    var task = req.body.task;
    console.log(task);


    if (task){
        tasks.push(task)
        res.json({ success: true})
        console.log("Task added")
        console.log(task)
    } else {
        res.json({ success: false})
                message: "no task sent"
    }
    });

app.get('/load_tasks', (req,res) => {
    res.json({list_of_task: tasks})
})

app.delete('/delete/:index', (req, res) => {
    var index = parseInt(req.params.index) // henter param kalt index fra linken
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1) // sletter en task fra listen
        res.json({ success: true})
    }else {
        res.json({ success: false })
    }
})

app.listen(port, (error) =>{
    if (!error)
        console.log("Server is successfully running and app is listening on port "+ port)
    else
        console.log("Error occured, server can't start.", "Error code: ", error);
})