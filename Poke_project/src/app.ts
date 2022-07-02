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

async function getPokemons() {
    // console.log('getMiniData');
    let response = await fetch('https://pokeapi.co/api/v2/pokedex/1');
    let data = (await response.json()).pokemon_entries;
    // console.log(data);

    return data
}
class App {
    public checkPokemon: boolean = location.search.includes('pokemon');
    pokemons: Array<any>;
    filteredPokemons: Array<any>;
    mainParent: HTMLDivElement;
    constructor() {
        this.pokemons = [];
        this.filteredPokemons = [];
        this.mainParent = document.createElement('div') as HTMLDivElement;
    }
    async mainSetUp() {
        this.pokemons = await getPokemons();

        //set up searchbar
        let searchBarDiv = document.createElement('div') as HTMLDivElement;
        searchBarDiv.classList.add('searchBarDiv');

        let searchBarTextDiv = document.createElement('div') as HTMLDivElement;
        searchBarTextDiv.classList.add('searchBarText');
        let searchBarH2 = document.createElement('h2')! as HTMLHeadingElement
        searchBarH2.innerText = "Enter a Pokemon name or ID:"
        searchBarTextDiv.appendChild(searchBarH2)
        let inputElement = document.createElement('input')! as HTMLInputElement
        searchBarTextDiv.appendChild(inputElement)
        searchBarDiv.appendChild(searchBarTextDiv);

        let goButtonElement = document.createElement('button')! as HTMLButtonElement;
        goButtonElement.innerHTML = "Go!"
        goButtonElement.addEventListener('click', () => {

            let pokemonCount = 0;
            let searchValue = '';
            parentElement.innerHTML = '';

            for (const pokemon of this.pokemons) {
                if ((pokemon.pokemon_species.name.includes(inputElement.value) ||
                    pokemon.entry_number.toString().startsWith('' + inputElement.value))) {
                    pokemonCount++;
                    searchValue = pokemon.pokemon_species.name;
                    this.filteredPokemons.push(pokemon);
                }
            }
            if (pokemonCount == 0) {
                console.log('no pokemon with that information');
            }
            else if (pokemonCount > 1) {
                // TODO : fix problem of scrolling down.
                for (let i = 0; i < this.filteredPokemons.length; i++) {
                    let poke = new PokemonComponent(this.filteredPokemons[i], parentElement)
                    poke.renderMiniInfo()
                }
            } else if (pokemonCount === 1)
                window.location.href = `http://localhost:4000/?pokemon=${searchValue}`;
        });
        searchBarDiv.appendChild(goButtonElement)
        document.body.appendChild(searchBarDiv)

        //insert pokemon DOM Elements
        let parentElement = document.createElement('div') as HTMLDivElement;
        document.body.appendChild(parentElement)

        let index = 0
        let limitOfPokemons = 10;
        this.loadPokemons(index, limitOfPokemons, parentElement)

        //detect end of page
        window.onscroll = function () {
            if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight && !app.filteredPokemons.length) {
                limitOfPokemons += 10;
                app.loadPokemons(index, limitOfPokemons, parentElement)
            }
        }
    }
    loadPokemons(index: number, limitOfPokemons: number, parentElement: HTMLDivElement) {
        while (index < limitOfPokemons/*miniData.length*/) {
            let pokemon = new PokemonComponent(this.pokemons[index], parentElement)
            pokemon.renderMiniInfo()
            index++
            //image url `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png')`
        }
    }
    async pokeSetUp(pokemonID: string) {
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
        const data: any = await result.json()
        let dataOfPokemon: DataOfPokemon = {
            id: data.id,
            name: data.name,
            height: data.height,
            weight: data.weight,
            types: data.types.map((type: { type: { name: any; }; }) => type.type.name),
            imgURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
            higherQualityImgURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
            evolutionNames: await getEvoNames(data.species.url),
            stats: data.stats,
        }
        let poke = new PokemonComponent(dataOfPokemon, this.mainParent)
        poke.renderFullInfo()
    }
    //for the header, nav and footer
    basePageSetUp() {
        //set up the header
        let body = document.getElementsByTagName('body')[0] as HTMLBodyElement;
        let header = document.createElement('header') as HTMLElement;

        let logo = document.createElement('img') as HTMLImageElement;
        logo.classList.add('logo');
        logo.src = 'https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemon-79x45.png';
        header.appendChild(logo)
        let shop = document.createElement('img') as HTMLImageElement;
        shop.classList.add('shop');
        shop.src = 'https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemoncenter-79x45.png'
        header.appendChild(shop)
        body.appendChild(header)
        //set up the nav
        let nav = document.createElement('nav') as HTMLElement;

        //home button
        let home = document.createElement('div') as HTMLDivElement;
        home.classList.add('home');
        home.innerText = 'Home'
        home.addEventListener('click', () => {
            window.location.href = `http://localhost:4000/`;
        })
        nav.appendChild(home)
        //pokedex button
        let pokedex = document.createElement('div') as HTMLDivElement;
        pokedex.classList.add('pokedex');
        pokedex.innerText = 'pokedex';
        pokedex.addEventListener('click', () => {
            window.location.href = `http://localhost:4000/`;
        })
        nav.appendChild(pokedex)
        //VIdeo Games & Apps button
        let video_games = document.createElement('div') as HTMLDivElement;
        video_games.classList.add('video_games');
        video_games.innerText = 'video_games'
        nav.appendChild(video_games)

        body.appendChild(nav)
        document.body.appendChild(this.mainParent)
    }
}
let app = new App()
app.basePageSetUp();
if (app.checkPokemon === true) {
    app.pokeSetUp((new URLSearchParams(location.search)).get('pokemon')!)
} else {
    app.mainSetUp()
}
