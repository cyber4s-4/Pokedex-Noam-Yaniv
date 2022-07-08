
// // import { getFips } from "crypto";

const fetchTest = require('node-fetch-commonjs')
const fs = require('fs')

let pokemonsJSON = {};
let i = 1;
async function savePokemons() {
    while (true) {
        let fullData = await (await fetchTest(`https://pokeapi.co/api/v2/pokemon/${i}`)).json();
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
        }
        let pokemon = {[dataOfPokemon.name]: dataOfPokemon}
        // pokemonsArray.push(pokemon)
        Object.assign(pokemonsJSON, pokemon)
        i++;
        // if (i === 4) break
        if (i === 899) break
    }
    fs.writeFile(`../Poke_project_Noam_server/pokemonsObj.json`, JSON.stringify(pokemonsJSON), (err) => {
        if (err) {
            throw err
        }
    })

}
async function getEvoNames(speciesURL) {
    let species = await fetchTest(speciesURL).then(data => data.json());
    let evolutionChain = await fetchTest(species.evolution_chain.url).then(data => data.json())
    let evoNames = []
    evoNames.push(evolutionChain.chain.species.name)
    let evolvesTo = evolutionChain.chain.evolves_to;
    while (evolvesTo.length) {
        evoNames.push(evolvesTo[0].species.name)
        evolvesTo = evolvesTo[0].evolves_to;
    }
    return evoNames
}
savePokemons()

