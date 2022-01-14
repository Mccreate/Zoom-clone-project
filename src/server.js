import express from "express";
import path from 'path';

const app = express();
const __dirname = path.resolve()+"/src/";

app.set('view engine', "pug");
app.set("views", __dirname+"public/views");
app.use("/public", express.static(__dirname+"/public"));
app.get("/", (req,res) => res.render("home"));
const handleListen = () => console.log("Listening on http://localhost:3000");
app.listen(3000, handleListen);