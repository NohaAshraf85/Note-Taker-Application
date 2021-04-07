const express = require("express");
const notesData = require("../db/data/notesData");

module.exports = (app) => {
    app.get("/api/notes", (req, res) => res.json(notesData));

    app.post("/api/notes", (req,res) => {

        notesData.push({
            id: notesData.length.toString(),
            title: req.body.title,
            text: req.body.text,
            
        });
        
        res.json(true);
    })

    app.delete("/api/notes/:noteid", (req,res) => {
        const chosen = req.params.noteid;
        var updated = false;
        var notesTemp = [];
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
            return res.json(true);
          }

          return res.json(false);
    })

    app.get("/api/notes/:noteid", (req, res) => 
    {
        const chosen = req.params.noteid;
        for (let i = 0; i < notesData.length; i++) {
            if (chosen === notesData[i].id) {
              return res.json(notesData[i]);
            }
          }
        
          return res.json(false);

    })
}