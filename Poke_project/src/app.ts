import { PokemonComponent, DataOfPokemon } from "./Pokemon";

async function getEvoNames(speciesURL: string) {
    let species: any = await fetch(speciesURL).then(data => data.json());
    let evolutionChain: any = await fetch(species.evolution_chain.url).then(data => data.json())
    let evoNames: string[] = []
    evoNames.push(evolutionChain.chain.species.name)
    let evolvesTo = evolutionChain.chain.evolves_to;
    while (evolvesTo.length) {
        evoNames.push(evolvesTo[0].species.name)
        evolvesTo = evolvesTo[0].evolves_to;
    }
    return evoNames
}
async function renderData(clientSearch: string, parentElement: HTMLDivElement) {
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${clientSearch}/`)
    const data: any = await result.json()
    let dataOfPokemon: DataOfPokemon = {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        types: data.types.map((type: { type: { name: any; }; }) => type.type.name),
        imgURL: `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png')`,
        evolutionNames: await getEvoNames(data.species.url),
        stats: data.stats,
    }
    let poke = new PokemonComponent(dataOfPokemon, parentElement)
    if (app.checkPokemon === true)
        poke.renderFullInfo()
    else
        poke.renderMinInfo()
}
class App {
    public checkPokemon: boolean = location.search.includes('pokemon');
    mainSetUp() {
        let searchBar = document.createElement('div') as HTMLDivElement;
        searchBar.innerHTML = "Enter a Pokemon name or ID:"
        let inputElement = document.createElement('input')! as HTMLInputElement
        searchBar.appendChild(inputElement)
        let goButtonElement = document.createElement('button')! as HTMLButtonElement;
        goButtonElement.innerHTML = "Go!"
        goButtonElement.addEventListener('click', () => {
            window.location.href = `http://localhost:4000/?pokemon=${inputElement.value}`;
        });
        searchBar.appendChild(goButtonElement)
        document.body.appendChild(searchBar)

        let parentElement = document.createElement('div') as HTMLDivElement;
        document.body.appendChild(parentElement)
        let i = 1;
        let limitOfPokemons = 10;
        while (i < limitOfPokemons) {
            renderData(i.toString(), parentElement)
            i++
        }
        let loadMore = document.createElement('button') as HTMLButtonElement;
        loadMore.innerHTML = 'Load More Pokemons!'
        loadMore.addEventListener('click', () => {
            limitOfPokemons += 10;
            while (i < limitOfPokemons) {
                renderData(i.toString(), parentElement)
                i++
            }
        })
        document.body.appendChild(loadMore)

    }
    pokeSetUp(pokemonID: string) {
        let parentElement = document.createElement('div') as HTMLDivElement;
        document.body.appendChild(parentElement)
        renderData(pokemonID, parentElement)
    }
}
let app = new App()
if (app.checkPokemon === true) {
    app.pokeSetUp((new URLSearchParams(location.search)).get('pokemon')!)
} else {
    app.mainSetUp()
}
