const fetchTest = require("node-fetch-commonjs");
// const { MongoClient, Db } = require("mongodb");
const { Client } = require("pg");
const fs = require("fs");

// let allPokemons = JSON.parse(fs.readFileSync("./pokemonsObj.json"));
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
    // delete table if exists:
    await client.query("DROP TABLE IF EXISTS Pokemons");

    // create table:

    await client.query(`CREATE TABLE IF NOT EXISTS Pokemons (
        ID SERIAL NOT NULL PRIMARY KEY,
        data json NOT NULL
        )`);

    // await pokemonsDataCollection.deleteMany({});
    let i = 1;
    while (true) {
      let fullData = await (
        await fetchTest(`https://pokeapi.co/api/v2/pokemon/${i}`)
      ).json();
      let dataOfPokemon = {
        id: fullData.id,
        name: fullData.name,
        height: fullData.height,
        weight: fullData.weight,
        types: fullData.types,
        imgURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${fullData.id}.png`,
        higherQualityImgURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${fullData.id}.png`,
        evolutionNames: await getEvoNames(fullData.species.url),
        stats: fullData.stats,
      };
      // bug with id column..
      // I think I solved it with the quote '.

      //   await client.query(
      //     ` INSERT INTO Pokemons (ID) values ('${JSON.stringify(
      //       dataOfPokemon.name
      //     )}')`
      //   );

      await client.query(
        `INSERT INTO Pokemons (data) values ('${JSON.stringify(
          dataOfPokemon
        )}')`
      );
      // select :

      //   let data = await client.query(`SELECT * FROM Pokemons`);
      //   console.log(data.rows);

      // select by property of data:

      //   let specificData = await client.query(
      //     `SELECT * FROM Pokemons WHERE data->>'name'='charmeleon'`
      //   );
      //   console.log(data.rows);

      i++;
      //   if (i === 10) {
      //     console.log("done");
      //     let data = await client.query(`SELECT * FROM Pokemons`);
      //     console.log(data.rows[6].data.types);
      //     break;
      //   }
      if (i === 899) {
        console.log("done");
        break;
      }
    }
    await client.query(`SELECT * FROM Pokemons`);
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

main().catch(console.error);

async function getEvoNames(speciesURL) {
  let species = await fetchTest(speciesURL).then((data) => data.json());
  let evolutionChain = await fetchTest(species.evolution_chain.url).then(
    (data) => data.json()
  );
  let evoNames = [];
  evoNames.push(evolutionChain.chain.species.name);
  let evolvesTo = evolutionChain.chain.evolves_to;
  while (evolvesTo.length) {
    evoNames.push(evolvesTo[0].species.name);
    evolvesTo = evolvesTo[0].evolves_to;
  }
  return evoNames;
}
// import { getFips } from "crypto";

// const fs = require("fs");
// const { cli } = require("webpack");

// let pokemonsArray = [];
// let i = 1;
// async function savePokemons() {
//   while (true) {
//     let fullData = await (
//       await fetchTest(`https://pokeapi.co/api/v2/pokemon/${i}`)
//     ).json();
//     let dataOfPokemon = {
//       id: fullData.id,
//       name: fullData.name,
//       height: fullData.height,
//       weight: fullData.weight,
//       types: fullData.types,
//       imgURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${fullData.id}.png`,
//       higherQualityImgURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${fullData.id}.png`,
//       evolutionNames: await getEvoNames(fullData.species.url),
//       stats: fullData.stats,
//     };
//     pokemonsArray.push(dataOfPokemon);
//     fs.writeFile(
//       `./Poke_project/pokemonsDir/${dataOfPokemon.name}.json`,
//       JSON.stringify(dataOfPokemon),
//       (err) => {
//         if (err) {
//           throw err;
//         }
//       }
//     );
//     i++;
//     // break
//     if (i === 899) break;
//   }
// }
// savePokemons();
