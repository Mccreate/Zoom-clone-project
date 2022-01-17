import express from "express";
import http from "http";
import path from "path";
import { WebSocketServer } from "ws";

const app = express();
const __dirname = path.resolve() + "/src/";

app.set("view engine", "pug");
app.set("views", __dirname + "public/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on ws://localhost:3000");
// app.listen(3000, handleListen);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Hello Client ✔");
  socket.on("close", onSocketClose);
  socket.on("message", (msg) => {
    sockets.forEach((aSocket) => aSocket.send(msg.toString("utf-8")));
  });
});

function onSocketClose() {
  console.log("Disconnect from the Browser ❌");
}

server.listen(3000, handleListen);
