import { PokemonComponent, DataOfPokemon ,PokemonInfo} from "./Pokemon";

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
        imgURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
        higherQualityImgURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        evolutionNames: await getEvoNames(data.species.url),
        stats: data.stats,
    }
    let poke = new PokemonComponent(dataOfPokemon, parentElement)
    if (app.checkPokemon === true)
        poke.renderFullInfo()
    // else
    //     {poke.renderMiniInfo()}
}
class App {
    public checkPokemon: boolean = location.search.includes('pokemon');
    pokemons: Array<any>;
    constructor() {
        this.pokemons = [];
    }
    async mainSetUp() {
        this.pokemons = await getPokemons();
        // function loadMorePokemon(limitOfPokemons: number, parentElement: HTMLDivElement): number {
        //     // console.log('loadMorePokemon');
        //     let index = limitOfPokemons
        //     limitOfPokemons += 10;
        //     while (index < limitOfPokemons && localMiniData.length > 0) {
        //         let element = localMiniData.shift() as PokemonInfo;
        //         renderMiniInfo(element, parentElement)
        //         index++
        //     }
        //     // while (index < limitOfPokemons && index<localMiniData.length) {
        //     //     let element = localMiniData[index] as PokemonInfo;
        //     //     renderMiniInfo(element, parentElement)
        //     //     index++
        //     // }
        //     return limitOfPokemons;
        // }



        //save all pokemon entry numbers and names
        // let miniData: Array<any> = await getMiniData();
        // let localMiniData: Array<any> = miniData;

        // console.log(miniData);

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
            // localMiniData = [];

            for (const pokemon of this.pokemons) {
                if ((pokemon.pokemon_species.name.includes(inputElement.value) || pokemon.pokemon_number.toString().startsWith('' + inputElement.value))) {
                    console.log((pokemon.pokemon_species.name.includes(inputElement.value) || pokemon.pokemon_number.toString().startsWith('' + inputElement.value)));
                    console.log(pokemon);
                    pokemonCount++;
                    searchValue = pokemon.pokemon_species.name;
                    // localMiniData.push(pokemon);
                }

            }
            if (pokemonCount == 0) {
                console.log('no pokemon with that information');
            }
            if (pokemonCount == 1) {
                console.log(searchValue);

                window.location.href = `http://localhost:4000/?pokemon=${searchValue}`;
            }
            else if (pokemonCount > 1) {
                
                // Check what does it do. Cuase log "h" doesnt happened and web works even when shut down.
                // while (localMiniData.length > 0) {
                //     renderMiniInfo(localMiniData.shift(), parentElement);
                //     console.log('h');
                    
                // }
            }
        });
        searchBarDiv.appendChild(goButtonElement)
        document.body.appendChild(searchBarDiv)

        //insert pokemon DOM Elements
        let parentElement = document.createElement('div') as HTMLDivElement;
        document.body.appendChild(parentElement)


        let limitOfPokemons = 10;
        let index = 0
        // while(index < limitOfPokemons/*miniData.length*/) {
        //     let pokemonInfo = miniData[index] as PokemonInfo;
        //     console.log(pokemonInfo);
        //     renderMiniInfo(pokemonInfo, parentElement)
        //     index++
        //     //image url `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png')`

        // }
        this.loadPokemons(index, limitOfPokemons, parentElement)

        //load more data button 
        // let loadMore = document.createElement('button') as HTMLButtonElement;
        // loadMore.innerHTML = 'Load More Pokemons!'
        // loadMore.addEventListener('click', () => {
        //     limitOfPokemons = loadMorePokemon(limitOfPokemons, parentElement);

        // })
        // document.body.appendChild(loadMore)
        //detect end of page
        window.onscroll = function () {
            if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
                //The load time is artificial LOL
                // setTimeout(() => { limitOfPokemons = loadMorePokemon(limitOfPokemons, parentElement) }, 200);
                limitOfPokemons += 10;
                app.loadPokemons(index, limitOfPokemons, parentElement)
                
            }
        }
    }
    loadPokemons(index: number, limitOfPokemons: number, parentElement: HTMLDivElement) {
        while(index < limitOfPokemons/*miniData.length*/) {
            let pokemonInfo = this.pokemons[index] as PokemonInfo;
            console.log(pokemonInfo);
            renderMiniInfo(pokemonInfo, parentElement)
            index++
            //image url `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png')`

        }
    }
    pokeSetUp(pokemonID: string) {
        let parentElement = document.createElement('div') as HTMLDivElement;
        document.body.appendChild(parentElement)
        renderData(pokemonID, parentElement)



    }
    //for the header, nav and footer
    basePageSetUp() {
        //set up the header
        console.log('basePageSetUp');
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
        console.log('basePageSetUp');
        let nav = document.createElement('nav') as HTMLElement;

        //home button
        let home = document.createElement('div') as HTMLDivElement;
        home.classList.add('home');
        home.innerText = 'Home'
        nav.appendChild(home)
        //pokedex button
        let pokedex = document.createElement('div') as HTMLDivElement;
        pokedex.classList.add('pokedex');
        pokedex.innerText = 'pokedex';
        pokedex.addEventListener('click', () =>{
            window.location.href = `http://localhost:4000/`;
    
            })
        nav.appendChild(pokedex)
        //VIdeo Games & Apps button
        let video_games = document.createElement('div') as HTMLDivElement;
        video_games.classList.add('video_games');
        video_games.innerText = 'video_games'
        nav.appendChild(video_games)

        body.appendChild(nav)
    }
}
let app = new App()
app.basePageSetUp();
if (app.checkPokemon === true) {
    app.pokeSetUp((new URLSearchParams(location.search)).get('pokemon')!)
} else {
    app.mainSetUp()
}



async function getPokemons() {
    // console.log('getMiniData');
    let response = await fetch('https://pokeapi.co/api/v2/pokedex/1');
    let data= (await response.json()).pokemon_entries;
    // console.log(data);
    
    return data
}

function renderMiniInfo(pokemon: PokemonInfo, parent: HTMLDivElement) {
    parent.classList.add('pokemonContainer')

    let pokeDiv = document.createElement('div') as HTMLDivElement;
    pokeDiv.classList.add('pokemonBox');
    pokeDiv.addEventListener('click', () => {
        window.location.href = `http://localhost:4000/?pokemon=${pokemon.entry_number}`;
    })
    //create pokemon image DOM element
    let imgElement = document.createElement('img') as HTMLImageElement
    imgElement.classList.add('pokemonImageDiv');
    imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.entry_number}.png`

    pokeDiv.appendChild(imgElement)

    //create pokemon entry_number DOM element
    let entryDiv = document.createElement('h3') as HTMLHeadingElement
    //add zeros to the number
    // console.log('zeros : ' + '0'.repeat(3 - pokemon.entry_number.toString().length) + ' for ' + pokemon.entry_number);
    let numberString = '#' + '0'.repeat(3 - pokemon.entry_number.toString().length) + pokemon.entry_number
    entryDiv.innerText = numberString;
    pokeDiv.appendChild(entryDiv)

    //create pokemon name DOM element
    let nameDiv = document.createElement('h2') as HTMLHeadingElement
    nameDiv.innerText = pokemon.pokemon_species.name.charAt(0).toUpperCase() +  pokemon.pokemon_species.name.slice(1)
    pokeDiv.appendChild(nameDiv)

    parent.appendChild(pokeDiv)
}