window.addEventListener('load', () => {
fetch('https://pokeapi.co/api/v2/pokemon-species/4')
.then(response => response.json())
.then(data => console.log(data))
});