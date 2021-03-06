var express = require("express");
var path = require("path");
const fs = require("fs");
const {nanoid} = require ("nanoid")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT||3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

app.get("/api/notes", function(req,res){
    // use the fs module to read the json db file
    fs.readFile (__dirname + '/db/db.json','utf8',(err,data)=>{
        if (err) throw err;
            
        // console.log(data);
        //then parse the file content with json.parse to get the real data (I get an array of objects)
        let dbNote = JSON.parse(data); 
        //use send.json to (send the parsed data back to the browser)
        // console.log(dbNote);
        return res.json(dbNote);
    })
})

app.post("/api/notes", function(req,res){
    //access the POSTED data
    const newNote = {
        title:req.body.title,
        text:req.body.text,
        id:nanoid(),
    };
    //read file wwith fs module
    fs.readFile (__dirname + '/db/db.json','utf8',(err,data)=>{
        if(err) throw  err;
       let dbNote = JSON.parse(data);
       dbNote.push(newNote);
       console.log(dbNote);

       fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(dbNote));
       res.json(dbNote);
    })
});

app.delete("/api/notes/:id", function(req,res){
    //define a new array
    // console.log(req.params);
    let newArr = [];
    // read file with fs and parse it with JSON.parse
    let newDataFile = JSON.parse(fs.readFileSync(__dirname + "/db/db.json"))
    newArr = newDataFile;
    //access the id from req.params.id
    const uniqId = req.params.id;
    console.log(uniqId);
    //use the array.filter() to filer out the matching element
    newArr = newArr.filter(({id})=> id!==uniqId) 
    
    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(newArr));
    res.json(newArr);

});

// this route needs to return the content of notes.html
app.get("/notes",function(req,res){
    res.sendFile(path.join(__dirname,"/public/notes.html"))
});
//this route needs to return the content of index.html
app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,"/public/index.html"))
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });