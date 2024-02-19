const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const pokemonName = document.getElementById('pokemon-name')
const pokemonId = document.getElementById('pokemon-id')
const pokemonWeight = document.getElementById('weight')
const pokemonHeight = document.getElementById('height')
const pokemonTypes = document.getElementById('types')
const hp = document.getElementById('hp')
const attack = document.getElementById('attack')
const defense = document.getElementById('defense')
const specialAttack = document.getElementById('special-attack')
const specialDefense = document.getElementById('special-defense')
const speed = document.getElementById('speed')
const pokemonImage = document.getElementById('sprite')

searchButton.addEventListener("click", (e) => {

    const pokemonInput = searchInput.value.toLowerCase();

    if (pokemonInput === '') {
        alert("ingrese el nombre de un pokemon");
        return;
    }


    fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon')
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
        .then(data => {
            for (let i = 0; i < data.results.length; i++) {
                if (data.results[i].name === pokemonInput || data.results[i].id == pokemonInput) {            
                    getPokemon(data.results[i].url)
                    return
                } else {
                    continue
                }
            }
            alert('Pokémon not found');
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });

})


const getPokemon = (urlPokemon) => {
    fetch(urlPokemon)
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
        .then(data => {
            const { weight, height, id, name, stats, types, sprites } = data
            pokemonName.innerHTML = name.toUpperCase();
            pokemonId.innerHTML = `#${id}`
            pokemonWeight.innerHTML = `Weight: ${weight}`
            pokemonHeight.innerHTML = `Height: ${height}`
            let tipos = ''
            for (let i = 0; i < types.length; i++) {
                tipoUppercased = types[i].type.name.toUpperCase();
                tipos = tipos.concat(tipoUppercased, '\n');
            }
            pokemonTypes.innerHTML = tipos
            hp.innerHTML = `HP: ${stats[0].base_stat}`
            attack.innerHTML = `Attack: ${stats[1].base_stat}`
            defense.innerHTML = `Defense: ${stats[2].base_stat}`
            specialAttack.innerHTML = `Special Attack: ${stats[3].base_stat}`
            specialDefense.innerHTML = `Special Defense: ${stats[4].base_stat}`
            speed.innerHTML = `Speed: ${stats[5].base_stat}`
            pokemonImage.src = sprites.front_default
        })
        .catch(err => console.error(err))
}



types.forEach(element => {
    let el = element.type.name.toUpperCase()    
    typesStat.innerHTML += `<td id="type">${el}</td><br>`
})