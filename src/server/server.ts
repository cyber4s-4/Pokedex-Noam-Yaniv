import path from "path";
import express, { Express } from "express";
import cors from "cors";
import { json } from "body-parser";
// @ts-ignore
import { Server } from "http";
// @ts-ignore
const { WebSocketServer, WebSocket, Server } = require("ws");
const fs = require("fs");

const app: Express = express();
app.use(cors());
app.use(json());
const root: string = path.join(__dirname, "dist");

app.use(express.static(root));

app.get("/", (_req, res) => {
  res.status(200).sendFile(path.join(root, "index.html"));
});
app.get("/pokemons", (_req, res) => {
  let allPokemons = JSON.parse(fs.readFileSync("../pokemonsObj.json"));
  res.send(JSON.stringify(allPokemons));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Hosted: http://localhost:" + port);
});

// const wss: Server = new Server({ server: app });
// // @ts-ignore
// wss.on("connention", (client) => {
//   // @ts-ignore
//   client.on("message", (msg) => {
//     if (msg.toString() === "get-pokemons") {
//       let allPokemons = JSON.parse(fs.readFileSync("../pokemonsObj.json"));
//       client.send(JSON.stringify(allPokemons));
//     }
//   });

//   client.on("close", () => {
//     console.log("Websocket disconnected");
//   });
// });
// console.log("Websocket: ws://localhost:" + 4040);
