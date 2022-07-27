import { PokemonComponent, DataOfPokemon } from "./PokemonComponent";
interface pokemon {
  _id: string;
  data: DataOfPokemon;
}
class App {
  public checkMergePage: boolean = location.href.includes("merge");
  public checkPokemonPage: boolean = location.search.includes("pokemon");
  public pokemons: pokemon[] = [];
  public filteredPokemons: pokemon[] = [];
  public index: number = 0;
  // public lastPokemon: number = 10;
  public pokemonToLoadCount: number = 10;

  public loadAvaiable = true;
  mainParent: HTMLDivElement;
  constructor() {
    this.mainParent = document.createElement("div") as HTMLDivElement;
  }
  async mainSetUp() {
    //set up searchbar
    let searchBarDiv = document.createElement("div") as HTMLDivElement;
    searchBarDiv.classList.add("searchBarDiv");

    let searchBarTextDiv = document.createElement("div") as HTMLDivElement;
    searchBarTextDiv.classList.add("searchBarText");
    let searchBarH2 = document.createElement("h2")! as HTMLHeadingElement;
    searchBarH2.innerText = "Enter a Pokemon name or ID:";
    searchBarTextDiv.appendChild(searchBarH2);
    let inputElement = document.createElement("input")! as HTMLInputElement;
    searchBarTextDiv.appendChild(inputElement);
    searchBarDiv.appendChild(searchBarTextDiv);

    let goButtonElement = document.createElement(
      "button"
    )! as HTMLButtonElement;
    goButtonElement.innerHTML = "Go!";
    // TODO: fix it to send fetch.
    // goButtonElement.addEventListener("click", () => {
    //   this.mainParent.innerHTML = "";
    //   this.pokemons.forEach((pokemon) => {
    //     if (
    //       pokemon.data.name!.includes(inputElement.value) ||
    //       pokemon.data.id!.toString().startsWith("" + inputElement.value)
    //     ) {
    //       this.filteredPokemons.push(pokemon);
    //     }
    //   });
    //   if (this.filteredPokemons.length === 0) {
    //     console.log("no pokemon with that information");
    //   } else if (this.filteredPokemons.length > 1) {
    //     for (let i = 0; i < this.filteredPokemons.length; i++) {
    //       let poke = new PokemonComponent(
    //         this.filteredPokemons[i].data,
    //         this.mainParent
    //       );
    //       poke.renderMiniInfo();
    //     }
    //   } else if (this.filteredPokemons.length === 1) {
    //     window.location.href =
    //       location.origin + `${this.filteredPokemons[0].data.name}`;
    //   }
    // });
    searchBarDiv.appendChild(goButtonElement);
    document.body.appendChild(searchBarDiv);

    //insert pokemon DOM Elements
    document.body.appendChild(this.mainParent);

    this.loadPokemons();
    let loadPokemonsButton = document.createElement(
      "button"
    ) as HTMLButtonElement;
    loadPokemonsButton.innerHTML = "Load More Pokemons";
    loadPokemonsButton.addEventListener("click", () => {
      this.loadPokemons();
    });
    document.body.appendChild(loadPokemonsButton);

    window.onscroll = async function () {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        await app.loadPokemons();
      }
    };
  }
  async loadPokemons() {
    let response;
    if (this.checkMergePage === true) {
      response = await fetch(
        `${location.origin}/load-merged?start=${this.index}&end=${this.index + this.pokemonToLoadCount}`
      );
    } else {
      response = await fetch(
        `${location.origin}/load-pokemons?start=${this.index}&end=${this.index + this.pokemonToLoadCount}`
      );
    }
    let newPokemons = await response.json();
    newPokemons.forEach((pokemon: pokemon) => {
      let poke = new PokemonComponent(pokemon.data, this.mainParent);
      poke.renderMiniInfo();
    });
    // this.pokemons.concat(...(await newPokemons));
    this.index += this.pokemonToLoadCount;
  }
  async pokeSetUp(pokemonName: string) {
    let response = await fetch(
      location.origin + `/pokemon?pokemon=${pokemonName}`
    );
    let pokemon: pokemon = await response.json();
    let poke = new PokemonComponent(pokemon.data, this.mainParent);
    poke.renderFullInfo();

    pokemon.data.evolutionNames.forEach(async (evoPoke) => {
      let response = await fetch(
        location.origin + `/pokemon?pokemon=${evoPoke}`
      );
      let pokemon: pokemon = await response.json();
      let poke = new PokemonComponent(pokemon.data, this.mainParent);
      poke.renderEvolutions();
    });
  }
  //for the header, nav and footer
  basePageSetUp() {
    //set up the header
    let body = document.getElementsByTagName("body")[0] as HTMLBodyElement;
    let header = document.createElement("header") as HTMLElement;

    let logo = document.createElement("img") as HTMLImageElement;
    logo.classList.add("logo");
    logo.src =
      "https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemon-79x45.png";
    header.appendChild(logo);
    let shop = document.createElement("img") as HTMLImageElement;
    shop.classList.add("shop");
    shop.src =
      "https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemoncenter-79x45.png";
    header.appendChild(shop);
    body.appendChild(header);
    //set up the nav
    let nav = document.createElement("nav") as HTMLElement;

    //home button
    let home = document.createElement("div") as HTMLDivElement;
    home.classList.add("home");
    home.innerText = "Home";
    home.addEventListener("click", () => {
      window.location.href = `/`;
    });
    nav.appendChild(home);
    //pokedex button
    let mergePokedex = document.createElement("div") as HTMLDivElement;
    mergePokedex.classList.add("pokedex");
    mergePokedex.innerText = "Merge pokedex";
    mergePokedex.addEventListener("click", () => {
      window.location.href = `/merge`;
    });
    nav.appendChild(mergePokedex);
    //VIdeo Games & Apps button
    let video_games = document.createElement("div") as HTMLDivElement;
    video_games.classList.add("video_games");
    video_games.innerText = "video_games";
    nav.appendChild(video_games);

    body.appendChild(nav);
    document.body.appendChild(this.mainParent);
  }
}
let app = new App();
app.basePageSetUp();
async function main() {
  if (app.checkMergePage === true) {
    let response = await fetch(`${location.origin}/load-merged`);
    app.pokemons = await response.json();
    app.mainSetUp();
  } else {
    let response = await fetch(
      `${location.origin}/load-pokemons?start=${app.index}&end=${app.index + app.pokemonToLoadCount}`
    );
    app.pokemons = await response.json();

    if (app.checkPokemonPage === true) {
      app.pokeSetUp(new URLSearchParams(location.search).get("pokemon")!);
    } else {
      app.mainSetUp();
    }
  }
}

main();
