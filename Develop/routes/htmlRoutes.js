const path = require("path");

module.exports = (app) => {

    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    app.get("/assets/js/index.js", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/assets/js/index.js"));
    });
    app.get("/assets/css/styles.css", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/assets/css/styles.css"));
    });
    
};