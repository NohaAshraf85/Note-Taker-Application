const e = require("express");
const { v4: uuidv4 } = require('uuid');

// const notesData = require("../db/data/notesData");
const util = require("util");
const fs = require('fs');
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

module.exports = (app) => {
  
    app.get("/api/notes", (req, res) => {
      readNotes().then(data => {
        
        //const notesJSON = JSON.stringify(data, null, 2);
        res.writeHead(200, { 'Content-Type': 'application/json' });

        // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
        res.end(data);

      })
     
      
    })

    app.post("/api/notes", (req,res) => {
      readNotes().then(data => {
        
        const notesData = JSON.parse(data);
       // var max = Math.max.apply(Math, notesData.map(function(o){return o.id}));
        notesData.push({
          id:uuidv4(),
          title: req.body.title,
          text: req.body.text,
          
      });
      writeNotes(notesData);
        

      })
  
        res.json(true);
    })

    app.delete("/api/notes/:noteid", (req,res) => {
      var updated = false;
      readNotes().then(data => {
        const notesData = JSON.parse(data);
        const chosen = req.params.noteid;
        
        var notesTemp=[];

        for (let i = 0; i < notesData.length; i++) {
            
          if (chosen != notesData[i].id) {
              notesTemp.push(notesData[i]);
          }
          else
          {
              updated=true;
          }
        }
        if(updated)
          {

            //Since it's const i can't do notesData=notesTemp;
            //instead empty notesData (since the data is in temp already)
            //add notesTemp back in notesData
            notesData.length = 0;
            for (let i = 0; i < notesTemp.length; i++) {
              
              notesData.push(notesTemp[i]);
            }
            writeNotes(notesData);
            //return res.json(true);
          }

      })
     

          return res.json(true);
    })

    app.get("/api/notes/:noteid", (req, res) => 
    {

      readNotes().then(data => {
        const notesData = JSON.parse(data);
        const chosen = req.params.noteid;
        var updated = false;
        for (let i = 0; i < notesData.length; i++) {
            if (chosen === notesData[i].id) {
                //const notesJSON = JSON.stringify(data, null, 2);
            res.writeHead(200, { 'Content-Type': 'application/json' });

            // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
            res.end(JSON.stringify(notesData[i]));
             return;
            }
          }
     
        return res.json(false);
      
      })
      

    })

    function readNotes()
    {
      return readFile(`./Develop/db/db.json`);
    }

    function writeNotes(notesData)
    {
      writeFile(`./Develop/db/db.json`, JSON.stringify(notesData));
    }
   
}