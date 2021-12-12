// Creating HTML tags using DOM method
document.body.innerHTML =` <h1>Pokemons</h1>
<div id="mainContainer" class="main-container"></div>`

const mainContainer = document.getElementById('mainContainer');

// Number of pokemon's need to display
const pokemons_numbers = 50;

// Using async/await to fetch the data from APi
// try , catch method to catch the errors
// Used for loop to iterate the number of pokemons

const fetchPokemons = async()=>{
    for(let i=1; i<=pokemons_numbers; i++){
        await getPokemon(i);
    }
}

const getPokemon = async (id)=>{
    try{
        const url=`https://pokeapi.co/api/v2/pokemon/${id}`;
        const result = await fetch(url);
        const pokemon = await result.json();
        createPokemonCard(pokemon);
    } catch{
        console.log("This is any error")
    }
}
fetchPokemons();

function createPokemonCard(pokemon){
    const pokemonElement = document.createElement("div");
    pokemonElement.classList.add('pokemon')

    const name = pokemon.name[0].toUpperCase()+pokemon.name.slice(1);
    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(", ");
    const weight = pokemon.weight;
    
    const pokeInnerHTML = `
    <div class="img-container">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
    </div>
    <div class="info>
    <span class ="number">#${pokemon.id}</span>
    <h5 class="name">Name: ${name}</h5>
    <h6 class="ability">Abilities: ${abilities}</h6>
    <h6 class="weight">Weight: ${weight}</h6>
    </div>`
    pokemonElement.innerHTML = pokeInnerHTML;

    mainContainer.appendChild(pokemonElement);
}