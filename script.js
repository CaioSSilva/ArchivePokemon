//Gerando lista de pokemons Inicial
const getpokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(100).fill().map((_,index)=>fetch(getpokemonUrl(index + 1)).then(response => response.json()))

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


const insertPokemons = pokemons =>{
    const ul = document.querySelector('[data-js="pokedex"]')

    ul.innerHTML = pokemons
}

const pokemonPomises = generatePokemonPromises()

Promise.all(pokemonPomises).then(generateHTML).then(insertPokemons)


//Funçao de pesquisa
function search(){
    pokeName = document.querySelector('.search').value
    pokeName.toLowerCase()
    fetch(getpokemonUrl(pokeName))
        .then((response)=> response.json())
        .then((pokemon)=>{
            const ul = document.querySelector('[data-js="pokedex"]')
            const Elementtypes = pokemon.types.map(typeinfo => typeinfo.type.name)
            ul.innerHTML = `
            <li class="card  ${Elementtypes[0]}">
                <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"/>
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p class="card-subtitle">${Elementtypes.join(' & ')}</p>
            </li>`
        })
        .catch((erro) =>{
            alert("Nome ou Numero não encontrado"); 
        })
}
//Verifica escrita do campo de pesquisa  
function searchVerify(){
    const campoPesquisa = document.querySelector('.search').value
    if(campoPesquisa.length == 0){
        Promise.all(pokemonPomises).then(generateHTML).then(insertPokemons)
    }
}
