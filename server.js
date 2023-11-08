
const express = require('express');
const path = require('path');
const app = express();
var sessions = require('express-session')
const port = 80
const oneDay = 1000 * 60 * 60 * 24;

var session;

var list_comments = []
var users = [
    {username: "Tommy", password: "123"},
    {username: "Tom", password: "123"}
]

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use(sessions({
    secret: "thisismysecrctekey767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.get('/', function (req, res) {
    sesson=req.session

    if(session.username){
        res.sendFile(path.join(__dirname, 'public', 'index.html'))
    } else {
        res.sendFile(path.join(__dirname, 'public', 'login.html'))
    }
        
});

app.post('/login', (req,res) => {
    console.log(req.body.username)
    console.log(req.body.password)
 
    // find user, valg bruker som har det brukernavnet som ble sendt fra client
    var user = users.find(u => u.username === req.body.username)
    if(user){
        if(req.body.password == user.password) {
            session = req.session
            session.username = user.username
            
        }
    } else {
        res.json({ success: false, message: "incorrect username or password"})
    }
        
})

app.post('/send_comment', (req, res) => {
    var comments = req.body.comment_value;
    console.log(1)
    console.log(comments);


    if (comments){
        list_comments.push(comments)
        console.log("Comment added")
        console.log(comments)        
        res.json({ success: true})

    } else {
        res.json({ success: false, message: "no comment sent"})
               
    }
    });

app.get('/load_comments', (req,res) => {
    res.json({list_of_comments: list_comments})
})

app.listen(port, (error) =>{
    if (!error)
        console.log("Server is successfully running and is listening on port "+ port)
    else
        console.log("Error occured, server can't start.", "Error code: ", error);
})