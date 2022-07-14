// import exp = require("constants");
import { PokemonComponent, DataOfPokemon } from "./PokemonComponent";

class App {
  connection: WebSocket;
  public checkPokemonPage: boolean = location.search.includes("pokemon");
  public pokemonsData: Record<DataOfPokemon["name"], DataOfPokemon> = {};
  public filteredPokemons: Record<DataOfPokemon["name"], DataOfPokemon> = {};
  public index: number = 0;
  public lastPokemon: number = 10;
  mainParent: HTMLDivElement;
  constructor() {
    this.connection = new WebSocket(location.origin.replace(/^https/, "ws"));
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
    goButtonElement.addEventListener("click", () => {
      this.mainParent.innerHTML = "";
      for (const [_, dataOfPokemon] of Object.entries(this.pokemonsData)) {
        if (
          dataOfPokemon.name!.includes(inputElement.value) ||
          dataOfPokemon.id!.toString().startsWith("" + inputElement.value)
        ) {
          this.filteredPokemons = {
            ...this.filteredPokemons,
            [dataOfPokemon.name]: dataOfPokemon,
          };
        }
      }
      let fileteredPokemonsNames = Object.keys(this.filteredPokemons);
      console.log(fileteredPokemonsNames.length);

      if (fileteredPokemonsNames.length === 0) {
        console.log("no pokemon with that information");
      } else if (fileteredPokemonsNames.length > 1) {
        for (let i = 0; i < fileteredPokemonsNames.length; i++) {
          let poke = new PokemonComponent(
            this.filteredPokemons[fileteredPokemonsNames[i]],
            this.mainParent
          );
          poke.renderMiniInfo();
        }
      } else if (fileteredPokemonsNames.length === 1) {
        window.location.href = `http://localhost:4000/?pokemon=${
          this.filteredPokemons[fileteredPokemonsNames[0]].name
        }`;
      }
    });
    searchBarDiv.appendChild(goButtonElement);
    document.body.appendChild(searchBarDiv);

    //insert pokemon DOM Elements
    document.body.appendChild(this.mainParent);

    this.loadPokemons();

    //detect end of page
    window.onscroll = function () {
      if (
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight &&
        !app.filteredPokemons.length
      ) {
        app.lastPokemon += 10;
        app.loadPokemons();
      }
    };
  }
  loadPokemons() {
    let pokemonNames = Object.keys(this.pokemonsData);
    while (this.index < this.lastPokemon) {
      let pokemon = new PokemonComponent(
        this.pokemonsData[pokemonNames[this.index]],
        this.mainParent
      );
      pokemon.renderMiniInfo();
      this.index++;
    }
  }
  pokeSetUp(pokemonName: string) {
    let poke = new PokemonComponent(
      this.pokemonsData[pokemonName],
      this.mainParent
    );
    poke.renderFullInfo();

    for (let evoPoke of this.pokemonsData[pokemonName].evolutionNames) {
      if (evoPoke) {
        let poke = new PokemonComponent(
          this.pokemonsData[evoPoke],
          this.mainParent
        );
        poke.renderEvolutions();
      }
    }
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
      window.location.href = `http://localhost:4000/`;
    });
    nav.appendChild(home);
    //pokedex button
    let pokedex = document.createElement("div") as HTMLDivElement;
    pokedex.classList.add("pokedex");
    pokedex.innerText = "pokedex";
    pokedex.addEventListener("click", () => {
      window.location.href = `http://localhost:4000/`;
    });
    nav.appendChild(pokedex);
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
app.connection.addEventListener("open", () => {
  app.connection.send("get-pokemons");
  app.basePageSetUp();
});
app.connection.addEventListener("message", (serverMessage) => {
  app.pokemonsData = JSON.parse(serverMessage.data);
  if (app.checkPokemonPage === true) {
    app.pokeSetUp(new URLSearchParams(location.search).get("pokemon")!);
  } else {
    app.mainSetUp();
  }
});
