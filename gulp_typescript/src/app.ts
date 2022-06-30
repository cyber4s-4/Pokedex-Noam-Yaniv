let str =''
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(fetch('https://pokeapi.co/api/v2/pokedex/1')
  .then(resolve=>resolve.json())
  .then(data =>{
    str = data.pokemon_entries[2].pokemon_species.name;
    createElement(str);
     return str
  })), 500)), // 2
]).then(console.log); // 2,4,6 when promises are ready: each promise is contributes an array member
// let requests = urls.map(url => fetch(url));

function createElement(value:string){
  let h = document.getElementById('mainDiv') as HTMLDivElement;
  h.innerHTML+= value
}
//   let object = fetch('https://pokeapi.co/api/v2/pokemon-species/4')
//     .then(response => response.json())
//     .then(data => {
//       //  console.log(data) 
//       return data
//       })
//       await object
//       console.log(object.then(resolve=>resolve)+ ' lklokok');
// }
// console.log(getData()+ ' lololo');
// console.log(data)