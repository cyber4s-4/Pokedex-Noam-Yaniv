export interface DataOfPokemon {
  id: string;
  name: string;
  height: string;
  weight: string;
  types: any[];
  imgURL: string;
  higherQualityImgURL: string;
  evolutionNames: string[];
  stats: Array<{
    base_stat: string;
    effort: string;
    stat: { name: string; url: string };
  }>;
}

export class PokemonComponent {
  data: DataOfPokemon;
  parent: HTMLDivElement;
  constructor(data: DataOfPokemon, parent: HTMLDivElement) {
    this.data = data;
    this.parent = parent;
  }
  clear() {
    this.parent.innerHTML = "";
  }
  renderFullInfo() {
    let IdDiv = document.createElement("div") as HTMLDivElement;
    IdDiv.innerText = "Pokemon ID. :" + this.data.id;
    this.parent.appendChild(IdDiv);

    let heightDiv = document.createElement("div") as HTMLDivElement;
    heightDiv.innerText = "Pokemon Height. :" + this.data.height;
    this.parent.appendChild(heightDiv);

    let weightDiv = document.createElement("div") as HTMLDivElement;
    weightDiv.innerText = "Pokemon Weight. :" + this.data.weight;
    this.parent.appendChild(weightDiv);

    // types
    let typesContainer = document.createElement("div") as HTMLDivElement;
    typesContainer.className = "typesContainer";

    this.data.types?.forEach((type) => {
      let typesDiv = document.createElement("div") as HTMLDivElement;
      let capitalizedType = type.type.name.toUpperCase(); // + type.type.name.substring(1);
      typesDiv.innerHTML = `
            <div class="typeDiv ${type.type.name}"><span>${capitalizedType}</span></div>`;
      typesContainer.appendChild(typesDiv);
    });
    this.parent.appendChild(typesContainer);

    //image of pokemon
    let pokemonImage = document.createElement("img") as HTMLImageElement;
    pokemonImage.className = "pokemonImageDiv";
    pokemonImage.src = this.data.higherQualityImgURL!;
    this.parent.appendChild(pokemonImage);

    //stats
    let statsContainer = document.createElement("div") as HTMLDivElement;
    statsContainer.className = "pokemonStatDiv";
    this.data.stats?.forEach((stat) => {
      let statDiv = document.createElement("div") as HTMLDivElement;
      statDiv.className = `${stat.stat.name}`;
      statDiv.style.backgroundColor = "red";
      statDiv.style.backgroundColor =
        "rgb(" +
        (20 + Math.floor((parseInt(stat.base_stat) * 250) / 256)) +
        "," +
        (20 + Math.floor(255 - (parseInt(stat.base_stat) * 250) / 256)) +
        ",30)";
      statDiv.style.height = Math.max(parseInt(stat.base_stat), 50) + "px";
      statDiv.innerHTML = `<span>${stat.stat.name}<br>${stat.base_stat}</span>`;
      statsContainer.appendChild(statDiv);
    });
    this.parent.appendChild(statsContainer);
  }
  renderEvolutions() {
    let evoDiv = document.createElement("div") as HTMLDivElement;
    evoDiv.classList.add("pokemonBox");
    let imgElement = document.createElement("img") as HTMLImageElement;
    imgElement.classList.add("pokemonImageDiv");
    imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.data.id}.png`;
    evoDiv.appendChild(imgElement);

    let entryDiv = document.createElement("h3") as HTMLHeadingElement;
    //add zeros to the number
    let numberString =
      "#" + "0".repeat(3 - this.data.id!.toString().length) + this.data.id;
    entryDiv.innerText = numberString;
    evoDiv.appendChild(entryDiv);

    let nameDiv = document.createElement("h2") as HTMLHeadingElement;
    nameDiv.innerText =
      this.data.name!.charAt(0).toUpperCase() + this.data.name!.slice(1);
    evoDiv.appendChild(nameDiv);

    evoDiv.addEventListener("click", () => {
      window.location.href = location.origin + `?pokemon=${this.data.name}`;
    });
    this.parent.appendChild(evoDiv);
  }
  renderMiniInfo() {
    this.parent.classList.add("pokemonContainer");

    let pokeDiv = document.createElement("div") as HTMLDivElement;
    pokeDiv.classList.add("pokemonBox");
    pokeDiv.addEventListener("click", () => {
      window.location.href = location.origin + `?pokemon=${this.data.name}`;
    });
    //create pokemon image DOM element
    let imgElement = document.createElement("img") as HTMLImageElement;
    imgElement.classList.add("pokemonImageDiv");
    imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.data.id}.png`;
    pokeDiv.appendChild(imgElement);

    //create pokemon entry_number DOM element
    let entryDiv = document.createElement("h3") as HTMLHeadingElement;
    //add zeros to the number
    let numberString =
      "#" + "0".repeat(3 - this.data.id!.toString().length) + this.data.id;
    entryDiv.innerText = numberString;
    pokeDiv.appendChild(entryDiv);

    //create pokemon name DOM element
    let nameDiv = document.createElement("h2") as HTMLHeadingElement;
    nameDiv.innerText =
      this.data.name!.charAt(0).toUpperCase() + this.data.name!.slice(1);
    pokeDiv.appendChild(nameDiv);

    this.parent.appendChild(pokeDiv);
  }
}
