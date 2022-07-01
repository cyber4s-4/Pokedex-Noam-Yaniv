<<<<<<< HEAD
// 1: Crete an input box to the client to type a pokemon name and click "search".
// 2: Create an async function that gets a string from the input box. Example : 'bulbasaur'
// 3: Wait for a json from fetch(`https://pokeapi.co/api/v2/pokemon/${clientSearch}/`)
// 4: Save his height, weight, types to variables.
// 5: Make a new object of Pokemon that gets those variables after we save them to an interface of DataOfPokemon.
// 6: Open an HTML page that shows a specific pokemon and render the pokemon that we saved.

interface DataOfPokemon {
    id?: string;
    evolutionNames: string[]

=======
window.onload= ()=>{
    let goButtonElement = document.getElementById('goButton')! as HTMLButtonElement;
    
    goButtonElement.addEventListener('click',()=>{ goButtonCick()});

}
function goButtonCick()
{
    let inputElement = document.getElementById('searchInput')! as HTMLInputElement
    let input = inputElement.value;
    if(input)
    {
        renderData(input.toLocaleLowerCase())
    }
}



interface DataOfPokemon {
    id?: string;
    name?: string;
    height: string;
    weight: string;
>>>>>>> 86207b2c4e53935bbe2efba801e236c6204175d9
    types?: string[]
    abillities?: string;
    imgURL?: string;
    family?: string[];
<<<<<<< HEAD
    height: string;
    weight: string;
=======
    evolutionNames: string[]

    stats?:Array<{base_stat:string, effort:string, stat:{name:string , url:string}}>
>>>>>>> 86207b2c4e53935bbe2efba801e236c6204175d9
}
class PokemonComponent {
    data: DataOfPokemon;
    parent: HTMLDivElement
    constructor(data: DataOfPokemon, parent: HTMLDivElement) {
        this.data = data
        this.parent = parent
    }
    render() {
<<<<<<< HEAD
        let height = document.createElement('div') as HTMLDivElement;
        height.innerHTML = this.data.height;
        this.parent.appendChild(height)
        let weight = document.createElement('div') as HTMLDivElement;
        weight.innerHTML = this.data.weight;
        this.parent.appendChild(weight)
=======
        let IdDiv = document.createElement('div') as HTMLDivElement;
        IdDiv.innerText = 'Pokemon ID. :' +this.data.id;
        this.parent.appendChild(IdDiv)

        let heightDiv = document.createElement('div') as HTMLDivElement;
        heightDiv.innerText = 'Pokemon Height. :' +this.data.height;
        this.parent.appendChild(heightDiv)

        let weightDiv = document.createElement('div') as HTMLDivElement;
        weightDiv.innerText = 'Pokemon Weight. :' +this.data.weight;
        this.parent.appendChild(weightDiv);

        //types
        let typesContainer = document.createElement('div') as HTMLDivElement;
        typesContainer.className='typesContainer';
        this.data.types?.forEach((type)=>{
            let typesDiv = document.createElement('div') as HTMLDivElement;
            console.log(type);
            typesDiv.innerHTML = `
            <div class="typeDiv ${type}">${type}</div>
            `
            typesContainer.appendChild(typesDiv);
        })
        this.parent.appendChild(typesContainer);
        
        //image of pokemon
        let pokemonImageDiv = document.createElement('div') as HTMLDivElement;
        pokemonImageDiv.className='pokemonImageDiv';
        pokemonImageDiv.style.backgroundImage = this.data.imgURL!;
        this.parent.appendChild(pokemonImageDiv);


        console.log(this.data.stats)

        //stats
        let statsContainer = document.createElement('div') as HTMLDivElement;
        statsContainer.className='pokemonStatDiv';
        this.data.stats?.forEach((stat)=>{
            console.log(stat.base_stat);
            let statDiv = document.createElement('div') as HTMLDivElement;
            statDiv.className = `${stat.stat.name}`;
            // statDiv.style.backgroundColor= `rgb( ${stat.base_stat *250},${stat.base_stat *250},${stat.base_stat *250})`
            statDiv.innerText= stat.stat.name;
            statsContainer.appendChild(statDiv);
        })
        this.parent.appendChild(statsContainer);
>>>>>>> 86207b2c4e53935bbe2efba801e236c6204175d9
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

let clientSearch = 'chansey';
async function renderData(clientSearch: string) {
    // TODO : go to the spesific pokemon URL ...
    // location(`local:4400/${clientSearch}`)
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${clientSearch}/`)
<<<<<<< HEAD
    const data = await result.json()
=======
    const data:any = await result.json()
    console.log(data);
    // to get the the image url https://pokeapi.co/api/v2/pokemon-form/1/
    //"back_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png"
>>>>>>> 86207b2c4e53935bbe2efba801e236c6204175d9
    console.log(data.types.map((type: { type: { name: any; }; }) => type.type.name));
    
    let dataOfPokemon: DataOfPokemon = {
        id: data.id,
        name:data.name,
        height: data.height,
        weight: data.weight,
        types: data.types.map((type: { type: { name: any; }; }) => type.type.name),
<<<<<<< HEAD
        id: data.id,
        evolutionNames: await getEvoNames(data.species.url)
=======
        imgURL: `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png')`,
        evolutionNames: await getEvoNames(data.species.url),
        stats: data.stats,        
>>>>>>> 86207b2c4e53935bbe2efba801e236c6204175d9
    }
    let parentElement = document.getElementById('parent') as HTMLDivElement;
    let poke = new PokemonComponent(dataOfPokemon, parentElement)
    poke.render()
}


renderData(clientSearch)


