//Gerando lista de pokemons Inicial
const getpokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_,index)=>fetch(getpokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator,{name, id, types}) => {

const Elementtypes = types.map(typeinfo => typeinfo.type.name)

    accumulator += `
    <li class="card ${Elementtypes[0]}" onclick="pokeShow(${id})">
        <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"/>
        <h2 class="card-title">${id}. ${name}</h2>
        <p class="card-subtitle ${Elementtypes[0] + '-element-container'}">${Elementtypes.join(' & ')}</p>
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
    fetch(getpokemonUrl(pokeName.toLowerCase()))
        .then((response)=> response.json())
        .then((pokemon)=>{
            const ul = document.querySelector('[data-js="pokedex"]')
            const Elementtypes = pokemon.types.map(typeinfo => typeinfo.type.name)
            ul.innerHTML = `
            <li class="card ${Elementtypes[0]}" onclick="pokeShow(${pokemon.id})">
                <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"/>
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p class="card-subtitle ${Elementtypes[0] + '-element-container'}">${Elementtypes.join(' & ')}</p>
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
//Mostrando Pokemon
function pokeShow(id){
    fetch(getpokemonUrl(id))
        .then(promises => promises.json())
        .then((pokemon) =>{
            const page = document.body
            const statusBaseExperience = pokemon.base_experience
            const statusWeight = pokemon.weight
            const statusBaseValue = pokemon.stats.map(statsinfo => statsinfo.base_stat)
            const Elementtypes = pokemon.types.map(typeinfo => typeinfo.type.name) 
            page.innerHTML = `
            <div class="pokemonPageContainer ${Elementtypes[0]}">
                <div class="pokemon-container ${Elementtypes[0]}">
                    <div class="headerContainer">
                        <button class="back-button" onclick="backHome()">
                            <img class="back-button-icon" src="https://cdn-icons-png.flaticon.com/64/507/507257.png"/>
                        </button>
                        <h1 class="pokepage-title">${pokemon.name}</h1>
                    </div>
                    <div class="image-container">
                        <img class="card-image-solo" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"/>
                        <div class="info1-container">
                            <p class="info-id">${'#0' + pokemon.id}</p>
                            <h1 class="info-title">${pokemon.name}</h1>
                            <h2 class="${Elementtypes[0] + '-element-container'}">${Elementtypes.join(' & ')}</h2>
                        </div>
                    </div>
                </div>
                <div class="other-stats-container">
                    <div class="base-status-div">
                        <div class="status-div">
                            <div class=" icon-container ${Elementtypes[0] + '-element-container'}">
                                <img class="icon-status" src="https://cdn-icons-png.flaticon.com/512/535/535234.png"/>
                            </div>
                            <h1 class="${Elementtypes[0] + '-color'}">HP</h1>
                            <p>${statusBaseValue[0]}</p>
                        </div>
                        <div class="status-div">
                            <div class="  icon-container ${Elementtypes[0] + '-element-container'}">
                                <img class="icon-status" src="https://cdn-icons-png.flaticon.com/512/842/842082.png"/>
                            </div>
                            <h1 class="${Elementtypes[0] + '-color'}">ATTACK</h1>
                            <p>${statusBaseValue[1]}</p>
                        </div>
                        <div class="status-div">
                            <div class=" icon-container  ${Elementtypes[0] + '-element-container'}">
                                <img class="icon-status" src="https://cdn-icons-png.flaticon.com/512/786/786346.png"/>
                            </div>
                            <h1 class="${Elementtypes[0] + '-color'}">DEFENSE</h1>
                            <p>${statusBaseValue[2]}</p>
                        </div>
                        <div class="status-div">
                            <div class=" icon-container  ${Elementtypes[0] + '-element-container'}">
                                <img class="icon-status" src="https://cdn-icons-png.flaticon.com/512/6997/6997647.png"/>
                            </div>
                            <h1 class="${Elementtypes[0] + '-color'}">SPECIAL-ATTACK</h1>
                            <p>${statusBaseValue[3]}</p>
                        </div>
                        <div class="status-div">
                            <div class=" icon-container  ${Elementtypes[0] + '-element-container'}">
                                <img class="icon-status" src="https://cdn-icons-png.flaticon.com/512/2919/2919703.png"/>
                            </div>
                            <h1 class="${Elementtypes[0] + '-color'}">SPECIAL-DEFENSE</h1>
                            <p>${statusBaseValue[4]}</p>
                        </div>
                        <div class="pokedex-data">
                            <div class=" icon-container  ${Elementtypes[0] + '-element-container'}">
                                <img class="icon-status" src="https://cdn-icons-png.flaticon.com/512/626/626075.png"/>
                            </div>
                            <h1 class="${Elementtypes[0] + '-color'}">BASE-XP</h1>
                            <p>${statusBaseExperience}</p>
                        </div>
                        <div class="pokedex-data">
                            <div class=" icon-container  ${Elementtypes[0] + '-element-container'}">
                                <img class="icon-status" src="https://cdn-icons-png.flaticon.com/512/65/65512.png"/>
                            </div>
                            <h1 class="${Elementtypes[0] + '-color'}">WEIGHT</h1>
                            <p>${statusWeight}</p>
                        </div>
                    </div>
                </div>
            </div>`
            scrollReset()
        });
}
//Voltar Home
function backHome(){
    const page = document.body
    page.innerHTML = `
    <h1>Pokedex</h1>
    <p>Search for Pokémon by name or using the National Pokédex number.</p>
    <div class="search-menu-content">
        <input class="search" placeholder="What Pokémon are you looking for?" oninput="searchVerify()"/>
        <button class="search-btn" onclick="search()"><img src="https://cdn-icons-png.flaticon.com/512/54/54481.png" alt="Pesquisar"></button>
    </div>
    <ul data-js="pokedex" class="pokedex"></ul>`

    const getpokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const generatePokemonPromises = () => Array(50).fill().map((_,index)=>fetch(getpokemonUrl(index + 1)).then(response => response.json()))

    const generateHTML = pokemons => pokemons.reduce((accumulator,{name, id, types}) => {const Elementtypes = types.map(typeinfo => typeinfo.type.name)
    
        accumulator += `
        <li class="card ${Elementtypes[0]}" onclick="pokeShow(${id})">
            <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"/>
            <h2 class="card-title">${id}. ${name}</h2>
            <p class="card-subtitle ${Elementtypes[0] + '-element-container'}">${Elementtypes.join(' & ')}</p>
        </li>`
        return accumulator
    }, '')


    const insertPokemons = pokemons =>{
    const ul = document.querySelector('[data-js="pokedex"]')
    
        ul.innerHTML = pokemons
    }
        
    const pokemonPomises = generatePokemonPromises()
    
    Promise.all(pokemonPomises).then(generateHTML).then(insertPokemons)
}
//Voltar ao topo quando carregar pokemon
function scrollReset(){
    window.scrollTo(0, 0);
}