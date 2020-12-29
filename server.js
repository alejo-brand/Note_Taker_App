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
    const newNote = req.body;
    //read file wwith fs module
    fs.readFile (__dirname + '/db/db.json','utf8',(err,data)=>{
        if(err) throw  err;
       let dbNote = JSON.parse(data);
       dbNote.push(newNote);
       console.log(dbNote);

       fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(dbNote));
    })
})

// this route needs to return the content of notes.html
app.get("/notes",function(req,res){
    res.sendFile(path.join(__dirname,"/public/notes.html"))
});
//this route needs to return the content of index.html
app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,"index.html"))
});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });