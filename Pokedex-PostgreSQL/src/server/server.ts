import path from "path";
import express, { Express } from "express";
import cors from "cors";
import { json } from "body-parser";
// @ts-ignore
import { Server } from "http";
// @ts-ignore
const { Client } = require("pg");

const app: Express = express();
app.use(cors());
app.use(json());
const root: string = path.join(__dirname, "dist");

app.use(express.static(root));

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

app.get("/", (_req, res) => {
  res.status(200).sendFile(path.join(root, "index.html"));
});

app.get("/pokemons", (_req, res) => {
  // let allPokemons = JSON.parse(fs.readFileSync("./pokemonsObj.json"));
  // res.send(JSON.stringify(allPokemons));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Hosted: http://localhost:" + port);
});
