const fetch = require("node-fetch-commonjs");
// const { MongoClient, Db } = require("mongodb");
// const fs = require("fs");
// const { cli } = require("webpack");
const { Client } = require("pg");
const { cli } = require("webpack");

const client = new Client({
  connectionString:
    "postgres://nrcyoldkyrzwel:0c0b977d06729e4e5e43a5742adf95aa41c0ac9e2efcc50b62ef8bf5aea1bb87@ec2-44-206-214-233.compute-1.amazonaws.com:5432/d4ucoletga0fci", // process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();
async function main() {
  try {
    await client.query("DROP TABLE IF EXISTS merged_pokemons");
    await client.query(`CREATE TABLE IF NOT EXISTS merged_pokemons (
        ID SERIAL NOT NULL PRIMARY KEY,
        data json NOT NULL
        )`);
    // let mergedPokemonsCollection = db.collection("merged-pokemons");
    // mergedPokemonsCollection.deleteMany({});
    for (let i = 1; i < 50; i++) {
      let poke_A = await client.query(
        `SELECT * FROM Pokemons WHERE data->>'id'='${i}'`
      );
      for (let k = 2; k < 50; k++) {
        if (i !== k) {
          //   console.log(poke_A.rows);
          let poke_B = await client.query(
            `SELECT * FROM Pokemons WHERE data->>'id'='${k}'`
          );
          //   console.log(poke_B.rows);
          let newPokeData = mergeTwoPokemons(
            poke_A.rows[0].data,
            poke_B.rows[0].data
          );
          await client.query(
            `INSERT INTO merged_pokemons (data) values ('${JSON.stringify(
              newPokeData
            )}')`
          );
        }
      }
    }
    console.log("done");
    // let test = await client.query(`SELECT * FROM merged_pokemons`);
    // console.log(test.rows);
    // let newPokeData = mergeTwoPokemons(poke_A.data, poke_B.data);
    // let mergedPokemonsCollection = db.collection("merged-pokemons");
    // await mergedPokemonsCollection.insertOne({
    //   _id: newPokeData.name,
    //   data: newPokeData,
    // });
  } catch (e) {
    console.error(e);
  } finally {
    client.end();
  }
}
main();

let p2 = {
  id: "4",
  name: "charmander",
  height: "20",
  weight: "40",
  types: ["fire", "fire"],
  imgURL: "http://localh",
  stats: [],
};
let p1 = {
  id: "2",
  name: "pikachu",
  height: "30",
  weight: "50",
  types: ["grass", "dragon"],
  imgURL: "http://localh",
  stats: [],
};
//the inputs are the Data of both pokemon, not the whole entry
// mergeTwoPokemons(p1, p2);
//merges 2 pokemons and returns the merged, -- DOES NOT PUSH TO MONGODB --
function mergeTwoPokemons(p1, p2) {
  let p3 = {
    id: p1.id + "." + p2.id,
    name:
      p1.name.substring(0, Math.ceil(p1.name.length / 2)) +
      "~" +
      p2.name.substring(Math.ceil(p2.name.length / 2)),
    height: (Number(p1.height) + Number(p2.height)) / 2,
    weight: (Number(p1.weight) + Number(p2.weight)) / 2,
    types: [p1.types[0], p2.types[0]],
    imgURL: `https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/${p1.id}/${p1.id}.${p2.id}.png`,
    //NOTE: no given higherQualityImgURL
    higherQualityImgURL: `https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/${p1.id}/${p1.id}.${p2.id}.png`,
    evolutionNames: [p1.name, p2.name],
    stats: [],
  };
  //toDo: check for double of same type
  if (p3.types[0] === p3.types[1]) {
    //if same type, and p1 has a diffrent second type, copy second type of p1 pokemon
    if (p1.types[1] && p1.types[1] != p1.types[0]) {
      // console.log(true);
      p3.types[1] = p1.types[1];
    }
    //else if same type, and p2 has a diffrent second type, copy second type of p2 pokemon
    else if (p2.types[1] && p2.types[1] != p2.types[0]) {
      p3.types[1] = p2.types[1];
    } else {
      p3.types = [p1.types[0]];
    }
  }
  //Push new stats
  for (let index = 0; index < p1.stats.length; index++) {
    const s1 = p1.stats[index];
    const s2 = p2.stats[index];
    //copy the stat from the first pokemon and change it's value to the average value
    // let s3 = s1;
    let s3_base_stat = (s1.base_stat + s2.base_stat) / 2;
    let s3_effort = (s1.effort + s2.effort) / 2;
    let s3 = { base_stat: s3_base_stat, effort: s3_effort, stat: s1.stat };
    p3.stats.push(s3);
  }
  //push to
  // console.log(p2);
  // console.log(p3);
  return p3;
}
// function merge(poke_A, poke_B) {
//   return {
//     id: (+poke_A.id + +poke_B.id).toString(),
//     name:
//       poke_A.name.slice(0, poke_A.name.length / 2) +
//       poke_B.name.slice(poke_B.name.length / 2),
//     height: ((+poke_A.height + +poke_B.height) / 2).toString(),
//     weight: ((+poke_A.weight + +poke_B.weight) / 2).toString(),
//     types: [poke_A.types[0], poke_B.types[0]],
//     imgURL: `https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/${poke_A.id}/${poke_A.id}.${poke_B.id}.png`,
//     higherQualityImgURL: `https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/${poke_A.id}/${poke_A.id}.${poke_B.id}.png`,
//     evolutionNames: [],
//     stats: poke_A.stats,
//   };
// }
// export interface DataOfPokemon {
//   id: string;
//   name: string;
//   height: string;
//   weight: string;
//   types: any[];
//   imgURL: string;
//   higherQualityImgURL: string;
//   evolutionNames: string[];
//   stats: Array<{
//     base_stat: string;
//     effort: string;
//     stat: { name: string; url: string };
//   }>;
// }
// ("https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/4/4.1.png");
