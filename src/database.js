//O id é incrementado automaticamente 
const sequence = {
    _id: 1,
    get id() { return this._id++}
}


// recebe vazio pois nã há nenhum cadastro no momento

const pokemons = []

// mostra todos os Pokemons cadastrados
function mostrarPokemons() {
    return Object.values(pokemons)
}

// mostra o Pokemon correspondente ao parâmtro (id) utilizado
function mostrarPokemon(id) {
    return pokemons[id] || {}
}

// salva um novo pokemon no banco de dados 
function salvarPokemons(pokemon) {
    if ( !pokemon.id ) 
        pokemon.id = sequence.id
        
    pokemons[pokemon.id] = pokemon
    return pokemon
}
// atualizar o pokemon no banco de dados  
function atualizarPokemon(id, pokemon) {
    pokemons[id] = pokemon
    return pokemon
}
// deletar pokemon do banco de dados
function deletarPokemon(id) {
    sequence._id = sequence._id - 1 
    const pokemonDeletado = pokemons[id]
    pokemons.splice(id, 1)  //splice mostra qual elemento deve deletar e quantos elementos será deletados a partir do selecionado 
    pokemons.forEach(pokemon =>{
        if(pokemon.id > id ) {
            pokemon.id = pokemon.id - 1 
        }
    })
    return pokemonDeletado
}
// batalha pokemon 
function batalhaPokemon(id1, id2) {
    const superEfetivo = 40
    const efetivo = 20 
    const naoEfetivo = 10 

    const pokemon1 = pokemons[id1]
    const pokemon2 = pokemons[id2]

    if(pokemon1.hp != 0 && pokemon2.hp != 0){
        if (pokemon1.tipo == pokemon2.fraqueza){
            pokemon2.hp = pokemon2 .hp - superEfetivo 
        }
        else if(pokemon1.tipo == pokemon2.resistencia){
            pokemon2.hp = pokemon2.hp - naoEfetivo
        }
        else{
            pokemon2.hp = pokemon2 - efetivo
        }
    }
    if(pokemon1.hp != 0 && pokemon2.hp != 0){
        if (pokemon2.tipo == pokemon1.fraqueza){
            pokemon1.hp = pokemon1 .hp - superEfetivo 
        }
        else if(pokemon2.tipo == pokemon1.resistencia){
            pokemon1.hp = pokemon1.hp - naoEfetivo
        }
        else{
            pokemon1.hp = pokemon1 - efetivo
        }
    }
    if(pokemon1.hp < 0) pokemon1.hp = 0 
    if(pokemon2.hp < 0) pokemon2.hp = 0

    return `${pokemon1.nome}: ${pokemon1.hp} / ${pokemon2.nome}: ${pokemon2.hp}`
}

//curar pokemon 
function curarPokemon(id1) {
    const cura = 20 
    const pokemon1 = pokemons[id1]

    if(pokemon1.hp < 90) {
        pokemon1.hp = pokemon1.hp + cura 
    }
    else if(pokemon1.hp >= 90) {
        pokemon1.hp = 100
    }
    return `${pokemon1.nome}: ${pokemon1.hp}`
}

// criando um módulo para deixar os métodos visíveis para outros arquivos
module.exports = { salvarPokemons, mostrarPokemon, mostrarPokemons, atualizarPokemon, deletarPokemon, batalhaPokemon, curarPokemon }
