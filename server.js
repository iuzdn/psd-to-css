const express = require("express");
const connectLivereload = require("connect-livereload");
const livereload = require("livereload");
const path = require("path");
const app = express();

app.use(connectLivereload());
app.use(express.static(__dirname + '/public'));

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

app.get("/", function (req, res){
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000, function (){
    console.log("Server started on port 3000");
});