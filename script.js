const getpokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(200).fill().map((_,index)=>fetch(getpokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator,{name, id, types}) => {

const Elementtypes = types.map(typeinfo => typeinfo.type.name)

    accumulator += `
    <li class="card  ${Elementtypes[0]}">
        <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"/>
        <h2 class="card-title">${id}. ${name}</h2>
        <p class="card-subtitle">${Elementtypes.join(' & ')}</p>
    </li>`
    return accumulator
    }, ''
)


const insertPokemon = pokemons =>{
    const ul = document.querySelector('[data-js="pokedex"]')

    ul.innerHTML = pokemons
}

const pokemonPomises = generatePokemonPromises()

Promise.all(pokemonPomises).then(generateHTML).then(insertPokemon)
