var path = require("path");

function app () {
    app.get("/", function(req, res){
        res.sendFile(path.join(__dirname, "../../public/home.html"));
    });

    app.get("/survey", function(req,res){
        res.sendFile(path.join(__dirname, "../../public/surver.html"));
    });
};

module.exports = app;

