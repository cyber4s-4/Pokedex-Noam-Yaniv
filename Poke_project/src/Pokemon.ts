export interface DataOfPokemon {
    id?: string;
    name?: string;
    height: string;
    weight: string;
    types?: string[]
    abillities?: string;
    imgURL?: string;
    higherQualityImgURL?: string;
    family?: string[];
    evolutionNames: string[]

    stats?: Array<{ base_stat: string, effort: string, stat: { name: string, url: string } }>
}

export class PokemonComponent {
    data: DataOfPokemon;
    parent: HTMLDivElement
    constructor(data: DataOfPokemon, parent: HTMLDivElement) {
        this.data = data
        this.parent = parent
    }
    clear() {
        this.parent.innerHTML = '';
    }
    renderFullInfo() {

        let IdDiv = document.createElement('div') as HTMLDivElement;
        IdDiv.innerText = 'Pokemon ID. :' + this.data.id;
        this.parent.appendChild(IdDiv)

        let heightDiv = document.createElement('div') as HTMLDivElement;
        heightDiv.innerText = 'Pokemon Height. :' + this.data.height;
        this.parent.appendChild(heightDiv)

        let weightDiv = document.createElement('div') as HTMLDivElement;
        weightDiv.innerText = 'Pokemon Weight. :' + this.data.weight;
        this.parent.appendChild(weightDiv);

        //types
        let typesContainer = document.createElement('div') as HTMLDivElement;
        typesContainer.className = 'typesContainer';
        this.data.types?.forEach((type) => {
            let typesDiv = document.createElement('div') as HTMLDivElement;
            let capitalizedType = type[0].toUpperCase() + type.substring(1);
            typesDiv.innerHTML = `
            <div class="typeDiv ${type}"><span>${capitalizedType}</span></div>
            `
            typesContainer.appendChild(typesDiv);
        })
        this.parent.appendChild(typesContainer);


                //image of pokemon
                let pokemonImage = document.createElement('img') as HTMLImageElement;
                pokemonImage.className = 'pokemonImageDiv';
                console.log(this.data.higherQualityImgURL);
                
                // if(this.data.higherQualityImgURL)
                // {
                    // pokemonImage.src = `${this.data.higherQualityImgURL}`;
                    pokemonImage.src = this.data.higherQualityImgURL!;

        
                // }
                // else 
                // {
                //     pokemonImageDiv.style.backgroundImage = this.data.imgURL!;
        
                // }
                this.parent.appendChild(pokemonImage);


        //stats
        let statsContainer = document.createElement('div') as HTMLDivElement;
        statsContainer.className = 'pokemonStatDiv';
        this.data.stats?.forEach((stat) => {
            let statDiv = document.createElement('div') as HTMLDivElement;
            statDiv.className = `${stat.stat.name}`;
            statDiv.style.backgroundColor = 'red';
            statDiv.style.backgroundColor =
                "rgb(" + (20 + Math.floor(parseInt(stat.base_stat) * 250 / 256)) + ","
                +  (20 + Math.floor(255- parseInt(stat.base_stat) * 250 / 256))
                + ",30)";
            statDiv.style.height = Math.max(parseInt(stat.base_stat), 50) + 'px';
            statDiv.innerHTML = `<span>${stat.stat.name}<br>${stat.base_stat}</span>`;
            statsContainer.appendChild(statDiv);
        })
        this.parent.appendChild(statsContainer);

        console.log('evonames ' + this.data.evolutionNames);
        //evo
        let evoDiv = document.createElement('div') as HTMLDivElement;
        evoDiv.innerText = 'Pokemon evolutions: ' + this.data.evolutionNames;
        this.parent.appendChild(evoDiv);
    }
    // renderMiniInfo() {
    //     this.parent.className = 'gallery'
    //     let pokeBlock = document.createElement('div') as HTMLDivElement;
    //     pokeBlock.classList.add('poke-block')

    //     let pokeImg = document.createElement('div') as HTMLDivElement;
    //     pokeImg.className = 'poke-little-img';
    //     pokeImg.style.backgroundImage = this.data.imgURL!;
    //     pokeBlock.appendChild(pokeImg)

    //     let pokeName = document.createElement('div') as HTMLDivElement;
    //     pokeName.innerHTML = `Name: ${this.data.name!} <br>ID: ${this.data.id!}`
    //     pokeImg.appendChild(pokeName)

    //     pokeBlock.addEventListener('click', () => {
    //        window.location.href = `http://localhost:4000/?pokemon=${this.data.id}`;
    //     })
    //     this.parent.appendChild(pokeBlock)
    //     /* TODO :
    //         change this.parent class name to gallery, gallery will have space around flex
    //         create pokeblock that contains img, name and id.
    //         add pokeblock listener of click that change location to ?pokemon=${poke.id}
    //     */
    // }
}