
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



    res.json({ message: "You sent a request for /ask",
        ammount: 10,
        success: true,
        woppa: true

    })
});

app.listen(port, (error) =>{
    if (!error)
        console.log("Server is successfully running and app is listening on port "+ port)
    else
        console.log("Error occured, server can't start.", "Error code: ", error);
})