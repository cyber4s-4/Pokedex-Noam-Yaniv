// 1: Crete an input box to the client to type a pokemon name and click "search".
// 2: Create an async function that gets a string from the input box. Example : 'bulbasaur'
// 3: Wait for a json from fetch(`https://pokeapi.co/api/v2/pokemon/${clientSearch}/`)
// 4: Save his height, weight, types to variables.
// 5: Make a new object of Pokemon that gets those variables after we save them to an interface of DataOfPokemon.
// 6: Open an HTML page that shows a specific pokemon and render the pokemon that we saved.

interface DataOfPokemon {
    id?: string;
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
        weight.innerHTML = this.data.types;
        this.parent.appendChild(weight)
    }
}

let clientSearch = 'bulbasaur';
async function renderData(clientSearch: string) {
    // TODO : go to the spesific pokemon URL ...
    // location(`local:4400/${clientSearch}`)
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${clientSearch}/`)
    const data = await result.json()
    console.log(data.types.map((type: { type: { name: any; }; }) => type.type.name));
    
    let dataOfPokemon: DataOfPokemon = {
        height: data.height,
        weight: data.weight,
        // TODO : add more data
        // types[]: data.type
        types: data.types.map((type: { type: { name: any; }; }) => type.type.name)
    }
    let parentElement = document.getElementById('parent') as HTMLDivElement;
    let poke = new PokemonComponent(dataOfPokemon, parentElement)
    poke.render()
}

renderData(clientSearch)
