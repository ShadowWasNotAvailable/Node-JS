
const express = require('express');
const path = require('path');
const app = express();
//var sessions = require(express-session)
const port = 80

var list_comments = []
app.use(express.static('public'))
app.use(express.json())

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/hei', function (req, res) {
    res.send("woppa");
});

app.post('/send_comment', (req, res) => {
    var comments = req.body.comment_value;
    console.log(1)
    console.log(comments);


    if (comments){
        list_comments.push(comments)
        res.json({ success: true})
        console.log("Comment added")
        console.log(comments)
    } else {
        res.json({ success: false})
                message: "no comment sent"
    }
    });

app.get('/load_tasks', (req,res) => {
    res.json({list_of_comments: list_comments})
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
        console.log("Server is successfully running and is listening on port "+ port)
    else
        console.log("Error occured, server can't start.", "Error code: ", error);
})