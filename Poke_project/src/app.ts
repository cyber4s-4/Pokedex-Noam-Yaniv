window.onload= ()=>{
    document.body.innerHTML =`<div id="parent">
    <div><label>Enter a Pokemon name:<input id="searchInput" type="text"></label>
      <button id="goButton">Go!</button>
    </div>
    <header>
    </header>
    <div id="mainDiv">
    </div>`
    let goButtonElement = document.getElementById('goButton')! as HTMLButtonElement;
    
    goButtonElement.addEventListener('click',()=>{ goButtonCick()});

}
function goButtonCick()
{
    let inputElement = document.getElementById('searchInput')! as HTMLInputElement
    let input = inputElement.value;
    if(input)
    {
        clearHTML();
        renderData(input.toLocaleLowerCase())
    }
}
function clearHTML (){

<<<<<<< HEAD
class App {
    public checkPokemon: boolean = location.search.includes('pokemon');
    pokeList: HTMLDivElement;
    constructor(pokeList: HTMLDivElement) {
        this.pokeList = pokeList;
    }
    mainSetUp() {
        // window.location.href = `http://localhost:4000/?pokemon=${this.data.id}`;
        let mainDiv = document.createElement('div') as HTMLDivElement;
        mainDiv.innerHTML = 'input box and list of pokemons '
        document.body.appendChild(mainDiv)
    }
    pokeSetUp(pokemonID: string) {
        renderData(pokemonID)
    }
}
let app = new App(document.getElementById('poke-list') as HTMLDivElement)
if (app.checkPokemon === true) {
    app.pokeSetUp((new URLSearchParams(location.search)).get('pokemon')!)
} else {
    app.mainSetUp()
=======
        // document.body..='';
    
>>>>>>> 30a2f8b8494290d33dcc9188d6514dd064f527c5
}


interface DataOfPokemon {
    id?: string;
    name?: string;
    height: string;
    weight: string;
    types?: string[]
    abillities?: string;
    imgURL?: string;
    family?: string[];
    evolutionNames: string[]

    stats?:Array<{base_stat:string, effort:string, stat:{name:string , url:string}}>
}
class PokemonComponent {
    data: DataOfPokemon;
    parent: HTMLDivElement
    constructor(data: DataOfPokemon, parent: HTMLDivElement) {
        this.data = data
        this.parent = parent
    }
    clear(){
        this.parent.innerHTML ='';
    }
    render() {
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
            statDiv.style.backgroundColor= 'red';
            console.log( "rgb(" + Math.floor(parseInt( stat.base_stat) *250/256) + ","+ Math.floor(parseInt( stat.base_stat) *250/256) +",30)");
            statDiv.style.backgroundColor=  "rgb(" + Math.floor(parseInt( stat.base_stat) *250/256) + ","+ Math.floor(256-parseInt(stat.base_stat) *250/256) +",30)";
            statDiv.style.height = Math.max(parseInt(stat.base_stat) ,50)+'px';
            statDiv.innerHTML= `<span>${stat.stat.name}<br>${stat.base_stat}</span>`;
            statsContainer.appendChild(statDiv);
        })
        this.parent.appendChild(statsContainer);
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

let clientSearch = 'chansey';
async function renderData(clientSearch: string) {
    // TODO : go to the spesific pokemon URL ...
    // location(`local:4400/${clientSearch}`)
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${clientSearch}/`)
    const data:any = await result.json()
    // console.log(data);
    // to get the the image url https://pokeapi.co/api/v2/pokemon-form/1/
    //"back_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png"
    // console.log(data.types.map((type: { type: { name: any; }; }) => type.type.name));
    
    let dataOfPokemon: DataOfPokemon = {
        id: data.id,
        name:data.name,
        height: data.height,
        weight: data.weight,
        types: data.types.map((type: { type: { name: any; }; }) => type.type.name),
        imgURL: `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png')`,
        evolutionNames: await getEvoNames(data.species.url),
        stats: data.stats,        
    }
    let parentElement = document.getElementById('mainDiv') as HTMLDivElement;
    let poke = new PokemonComponent(dataOfPokemon, parentElement)
    poke.clear()
    poke.render()
}


// renderData(clientSearch)


