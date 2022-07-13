// import path from 'path';
// import express, { Express } from 'express';
// import cors from 'cors';
// import { json } from 'body-parser';

// const app: Express = express();
// app.use(cors());
// app.use(json());
// const root: string = path.join(process.cwd(), 'dist');

// app.use(express.static(root));

// app.get('*', (_req, res) => {
//   res.sendFile(path.join(root, 'index.html'));
// });

// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//   console.log('Hosted: http://localhost:' + port);
// });
// @ts-ignore
const { WebSocketServer, WebSocket } = require("ws");
const fs = require("fs");

const wss = new WebSocketServer({ port: 4040 });
// @ts-ignore
wss.on("connentin", (client) => {
  // @ts-ignore
  client.on("message", (msg) => {
    if (msg.toString() === "get-pokemons") {
      let allPokemons = JSON.parse(fs.readFileSync("./pokemonsObj.json"));
      client.send(JSON.stringify(allPokemons));
    }
  });

  client.on("close", () => {
    console.log("Websocket disconnected");
  });
});
console.log("Websocket: ws://localhost:" + 4040);
