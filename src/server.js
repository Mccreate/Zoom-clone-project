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
  socket["nickname"] = "Anonymous";
  socket.onAny((event) => console.log(`event: ${event}`));
  socket.on("enter_room", (roomName, userName, done) => {  
    socket.join(roomName);
    socket["nickname"] = userName;
    done();
    socket.to(roomName).emit("welcome", socket.nickname);
  });
  socket.on("disconnecting", ()=>{
    socket.rooms.forEach(room => socket.to(room).emit("bye", socket.nickname));
  });
  socket.on("new_msg", (msg, room, done) => {
    socket.to(room).emit("new_msg", `${socket.nickname}: ${msg}`);
    done();
  });
  socket.on("nickname", nickname => {
    socket["nickname"] = nickname;
  })
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
