var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT||3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

app.get("/api/notes", function(req,res){
    // use the fs module to read the json db file
    fs.readFile ('./db.json','utf8',(err,data)=>{
        if (err){
            console.log(err);
            return
        }
        console.log(data);
        //then parse the file content with json.parse to get the real data (I get an array of objects)
    }).then((data)=>{
        const dbNote = JSON.parse(data); 
        res.JSON
    }) 
    //use send.json to (send the parsed data back to the browser)

})

// this route needs to return the content of notes.html
app.get("/notes",function(req,res){
    res.sendFile(path.join(__dirname,"notes.html"))
});
//this route needs to return the content of index.html
app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,"index.html"))
});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });