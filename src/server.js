import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
// import { WebSocketServer } from "ws";

const app = express();
const __dirname = path.resolve() + "/src/";

app.set("view engine", "pug");
app.set("views", __dirname + "public/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on ws://localhost:3000");
// app.listen(3000, handleListen);

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  console.log(socket);
});

/*
const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anonymous";
  console.log("Hello Client ✔");
  socket.on("close", onSocketClose);
  socket.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type){
        case "new_msg":
            sockets.forEach((aSocket) => aSocket.send(`${socket.nickname} : ${message.payload}`));
        case "nickname":
            socket["nickname"] = message.payload;
    }
  });
});

function onSocketClose() {
  console.log("Disconnect from the Browser ❌");
}
*/

httpServer.listen(3000, handleListen);
