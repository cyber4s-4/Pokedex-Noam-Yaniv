import fetch from 'node-fetch-commonjs'
// const fetch = require('node-fetch');	//npm install node-fetch

// 1: Crete an input box to the client to type a pokemon name and click "search".
// 2: Create an async function that gets a string from the input box. Example : 'bulbasaur'
// 3: Wait for a json from fetch(`https://pokeapi.co/api/v2/pokemon/${clientSearch}/`)
// 4: Save his height, weight, types to variables.
// 5: Make a new object of Pokemon that gets those variables after we save them to an interface of DataOfPokemon.
// 6: Open an HTML page that shows a specific pokemon and render the pokemon that we saved.

interface DataOfPokemon {
    id?: string;
    evolutionNames: string[]
    types?: string[]
    abillities?: string;
    name?: string;
    imgURL?: string;
    family?: string[];
    height: string;
    weight: string;
}
class PokemonComponent {
    data: DataOfPokemon;
    parent: HTMLDivElement
    constructor(data: DataOfPokemon, parent: HTMLDivElement) {
        this.data = data
        this.parent = parent
    }
    render() {
        let height = document.createElement('div') as HTMLDivElement;
        height.innerHTML = this.data.height;
        this.parent.appendChild(height)
        let weight = document.createElement('div') as HTMLDivElement;
        weight.innerHTML = this.data.weight;
        this.parent.appendChild(weight)
    }
}
async function getEvoNames(speciesURL: string) {
    let species: any = await fetch(speciesURL).then(data => data.json());
    let evolutionChain: any = await fetch(species.evolution_chain.url).then(data => data.json())
    let evoNames: string[] = []
    evoNames.push(evolutionChain.chain.species.name)
    let evolvesTo = evolutionChain.chain.evolves_to;
    while(evolvesTo.length) {
        evoNames.push(evolvesTo[0].species.name)
        evolvesTo = evolvesTo[0].evolves_to;
    }
    return evoNames
}

let clientSearch = '4';
async function renderData(clientSearch: string) {
    // TODO : go to the spesific pokemon URL ...
    // location(`local:4400/${clientSearch}`)
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${clientSearch}/`)
    const data: any = await result.json()
    
    let dataOfPokemon: DataOfPokemon = {
        height: data.height,
        weight: data.weight,
        types: data.types.map((type: { type: { name: any; }; }) => type.type.name),
        id: data.id,
        // TODO : Fix problem of id that changes between id of pokemon and id of evolution.
        evolutionNames: await getEvoNames(data.species.url)
    }
    console.log(dataOfPokemon.evolutionNames);
    
//     let parentElement = document.getElementById('parent') as HTMLDivElement;
//     let poke = new PokemonComponent(dataOfPokemon, parentElement)
//     poke.render()
}

renderData(clientSearch)
