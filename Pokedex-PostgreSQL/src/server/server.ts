import path from "path";
import express, { Express } from "express";
import cors from "cors";
import { json } from "body-parser";
// @ts-ignore
import { Server } from "http";
import { cli } from "webpack";
// @ts-ignore
const { Client } = require("pg");

const app: Express = express();
app.use(cors());
app.use(json());
const root: string = path.join(__dirname, "dist");

app.use(express.static(root));

const client = new Client({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://nrcyoldkyrzwel:0c0b977d06729e4e5e43a5742adf95aa41c0ac9e2efcc50b62ef8bf5aea1bb87@ec2-44-206-214-233.compute-1.amazonaws.com:5432/d4ucoletga0fci",
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();






app.get("/", (_req, res) => {
  
    res.status(200).sendFile(path.join(root, "index.html"));


});

app.get("/merge", async (_req, res) => {
  res.status(200).sendFile(path.join(root, "index.html"));
});

app.get("/pokemon", async (_req, res) => {
  let pokemonName = _req.query.pokemon as string;
  try {
    if (pokemonName?.toString().includes("~")) {
      let data = await client.query(
        `SELECT * FROM merged_pokemons WHERE data->>'name'='${pokemonName}'`
      );
      res.send(JSON.stringify(data.rows[0]));
    } else {
      let data = await client.query(
        `SELECT * FROM Pokemons WHERE data->>'name'='${pokemonName}'`
      );
      res.send(JSON.stringify(data.rows[0]));
    }
  } catch (e) {
    res.send(e);
  }
});

app.get("/load-pokemons", async (_req, res) => {
  let start = _req.query.start;
  let end = _req.query.end;

  try {
    let data = await client.query(
      `SELECT * FROM Pokemons LIMIT 10 OFFSET ${start}`
    );
    // console.log(JSON.stringify(data.rows));
    res.send(JSON.stringify(data.rows));
  } catch (e) {
    res.send(e);
  }
});

app.get("/load-merged", async (_req, res) => {
  let start = _req.query.start;
  let end = _req.query.end;

  try {
    let data = await client.query(
      `SELECT * FROM merged_pokemons LIMIT 10 OFFSET ${start}`
    );
    // console.log(JSON.stringify(data.rows));
    res.send(JSON.stringify(data.rows));
  } catch (e) {
    res.send(e);
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Hosted: http://localhost:" + port);
});
