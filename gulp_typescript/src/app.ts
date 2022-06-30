// import fetch from "node-fetch";

// 1: Crete an input box to the client to type a pokemon name and click "search".
// 2: Create an async function that gets a string from the input box. Example : 'bulbasaur'
// 3: Wait for a json from fetch(`https://pokeapi.co/api/v2/pokemon/${clientSearch}/`)
// 4: Save his height, weight, types to variables.
// 5: Make a new object of Pokemon that gets those variables after we save them to an interface of DataOfPokemon.
// 6: Open an HTML page that shows a specific pokemon and render the pokemon that we saved.
interface DataOfPokemon {
    heigh: string;
    weight: string;
    // type: string;
}
class PokemonComponent {
    data: DataOfPokemon;
    parent: HTMLDivElement
    constructor(data: DataOfPokemon, parent: HTMLDivElement) {
        this.data = data
        this.parent = parent
    }
    render() {
        let heigh = document.createElement('div') as HTMLDivElement;
        heigh.innerHTML = this.data.heigh;
        this.parent.appendChild(heigh)
        let weight = document.createElement('div') as HTMLDivElement;
        weight.innerHTML = this.data.weight;
        this.parent.appendChild(weight)

    }
}

let clientSearch = 'bulbasaur';
async function renderData(clientSearch: string) {
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${clientSearch}/`)
    const data = await result.json()
    let dataOfPokemon: DataOfPokemon = {
        heigh: data.heigh,
        weight: data.weight,
        // type: data.type[0].type.name
    }
    // location(`local:4400/${clientSearch}`)
    let parentElement = document.getElementById('parent')
    let poke = new Pokemon(dataOfPokemon, parentElement)
    poke.render()
}
