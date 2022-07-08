//todo:
/*
* divide to main page wich shows 20 pokemons and on click shows more
* stats should have a color corresponding to its value
* location to specific pokemon page by id and render by url params (data.id)
* add evolutions clicable divs that take to that pokemon page


// 1: Crete an input box to the client to type a pokemon name and click "search".
// 2: Create an async function that gets a string from the input box. Example : 'bulbasaur'
// 3: Wait for a json from fetch(`https://pokeapi.co/api/v2/pokemon/${clientSearch}/`)
// 4: Save his height, weight, types to variables.
// 5: Make a new object of Pokemon that gets those variables after we save them to an interface of DataOfPokemon.
// 6: Open an HTML page that shows a specific pokemon and render the pokemon that we saved.

* Refactor and order code. 
* Add atribute to  pokeBox called called "poke-type:" and add the type of pokemon to the value.
* Css the pokeBox by this attribute. If grass - green. if poison - puprle. 
pokeBpx[poke-type="grass"] {
  background-color: green;
}
*/




## Pokedex Task

In this task you will build your own pokédex!

A pokédex is a website with a catalog of Pokémon. It shows various information on different species of Pokémon. The name Pokédex is a neologism including "Pokémon" (which itself is a portmanteau of "pocket" and "monster") and "index".

Here's some pokédex examples to give you inspiration:
* https://www.pokemon.com/us/pokedex
* https://pokemondb.net/pokedex/all
* https://pokemon.gameinfo.io

In this project, you will learn how to use an API called https://pokeapi.co, which will provide the pokémon information.

The implementation should be in TypeScript and SCSS.


# Instructions
- Investigate the API. Good starting points are:
https://pokeapi.co/api/v2/pokedex/1
https://pokeapi.co/api/v2/generation/1

  Try to build a mental model in your head of what information is available, how it's connected, and what information you think you'll need, and which API calls need to be made to get that information.

- Build a simple pokédex first with just a list of Pokémon, without information on each one.

- Add a search bar that filters that list based on the Pokémon name.

- Get more information on the Pokémon such as height weight and image via the API.

- Show this information - either on the main search page, or on a specific Pokémon page (such as /pokemon/<id>).

Here's an example for a simple pokédex:
https://pokeapi.co/api/v2/pokemon-species/4


## Submission instructions
In the [cyber4s-4](https://github.com/cyber4s-4) org, create a new repo for the project called `pokedex-<username1>-<username2>` where the usernames are sorted alphabetically (username1 is before username2 in alphabetical order).

Add the project code to this repo.


## Bonus

Go wild! Further investigate the API and see if you can add interesting information and features to your pokédex.