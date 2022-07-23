// const fetchTest = require("node-fetch-commonjs");
// const { MongoClient, Db } = require("mongodb");
// const fs = require("fs");

// let allPokemons = JSON.parse(fs.readFileSync("./pokemonsObj.json"));

// async function main() {
//   we'll add code here soon
//   const uri =
//     "mongodb+srv://noam:2102@cluster0.g6pn2.mongodb.net/?retryWrites=true&w=majority";
//   const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   try {
//     await client.connect();
//     let db = client.db("Pokedex");

//     let pokemonsDataCollection = db.collection("pokemons-data");
//     await pokemonsDataCollection.deleteMany({});
//     let i = 1;
//     while (true) {
//       let fullData = await (
//         await fetchTest(`https://pokeapi.co/api/v2/pokemon/${i}`)
//       ).json();
//       let dataOfPokemon = {
//         id: fullData.id,
//         name: fullData.name,
//         height: fullData.height,
//         weight: fullData.weight,
//         types: fullData.types,
//         imgURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${fullData.id}.png`,
//         higherQualityImgURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${fullData.id}.png`,
//         evolutionNames: await getEvoNames(fullData.species.url),
//         stats: fullData.stats,
//       };
//       await pokemonsDataCollection.insertOne({
//         _id: fullData.name,
//         data: dataOfPokemon,
//       });
//       i++;
//       if (i === 899) break;
//     }
//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close();
//   }
// }

// main().catch(console.error);

// async function getEvoNames(speciesURL) {
//   let species = await fetchTest(speciesURL).then((data) => data.json());
//   let evolutionChain = await fetchTest(species.evolution_chain.url).then(
//     (data) => data.json()
//   );
//   let evoNames = [];
//   evoNames.push(evolutionChain.chain.species.name);
//   let evolvesTo = evolutionChain.chain.evolves_to;
//   while (evolvesTo.length) {
//     evoNames.push(evolvesTo[0].species.name);
//     evolvesTo = evolvesTo[0].evolves_to;
//   }
//   return evoNames;
// }
// // import { getFips } from "crypto";

// const fs = require("fs");

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
//       // abillities: fullData.abillities,
//       imgURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${fullData.id}.png`,
//       higherQualityImgURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${fullData.id}.png`,
//       // family: fullData.family,
//       evolutionNames: await getEvoNames(fullData.species.url),
//       stats: fullData.stats,

//       // pokemon_species: {
//       //     name: fullData.species.name,
//       //     url: fullData.species.url,
//       // },
//       // entry_number: fullData.id,
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
