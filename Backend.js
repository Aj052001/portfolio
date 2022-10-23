const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express();

const port = process.env.PORT || 3004;



app.use(bodyParser.json())
app.use(express.static(path.join(__dirname + '/Public')));

app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://aj052001:ajaysingh@cluster0.cavd7d0.mongodb.net/mern?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var db = mongoose.connection;




app.get("/", (req, res)=>{
    res.statusCode = 200;
    (res.sendFile(path.join(__dirname, '/Public/index.html')));
})
app.get("/index.html", (req, res)=>{
    res.statusCode = 200;
    (res.sendFile(path.join(__dirname, '/Public/index.html')));
})

app.get("/ajay", (req, res)=>{
    res.statusCode = 200;
    res.send("Hey ajay");
})



db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))


//  Store Date For Main Site DB
app.post('/submit', (req, res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var drop_line = req.body.drop_line;

    var data = {
        "name": name,
        "email": email,
        "drop_line": drop_line
    }

    db.collection('portfolio').insertOne(data, (err, collection)=>{
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    setTimeout(() => {
        console.log('Site reload')
        return res.redirect('index.html')   
    }, 3000);
})


app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
});
