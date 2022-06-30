let str =''
Promise.all([
  new Promise(resolve => resolve(fetch('https://pokeapi.co/api/v2/pokedex/1')
  .then(resolve=>resolve.json())
  .then(data =>{
    str = data.pokemon_entries[5].pokemon_species.name;
    // str = data.pokemon_entries[5]
    console.log(str);
    
    createElement(str);
     return str
  }
  ))), // 2
]).then(console.log); // 2,4,6 when promises are ready: each promise is contributes an array member
// let requests = urls.map(url => fetch(url));

function createElement(value:string){
  let h = document.getElementById('mainDiv') as HTMLDivElement;
  h.querySelector('.nameDiv')!.innerHTML+= value
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