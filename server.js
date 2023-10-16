
var express = require('express');
var path = require('path');

var app = express();
const port = 80

app.get(express.static('public'))
app.use(express.json())

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/hei', function (req, res) {
    res.send("woppa");
});

app.get('/ask', (req, res) => {
    res.json({ message: "You send a request for /ask"});
});

app.listen(port, (error) =>{
    if (!error)
        console.log("Server is successfully running and app is listening on port "+ port)
    else
        console.log("Error occured, server can't start.", "Error code: ", error);
})