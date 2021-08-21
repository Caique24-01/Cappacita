// Importando o Express
const express = require('express');

// Instanciando o pacote Express
const app = express();

// Importando database,js
const database = require('./database.js');
// Importando pacote Body-parser 
const bodyParser = require('body-parser');

// Usando o body-parser 
app.use(bodyParser.urlencoded({ extended: true}))


// REQUISIÇÃO GET 
// Acessando a rota '/pokemons', obtemos como resposta o retorno do método .send()
app.get('/pokemons',(req,res) =>  // req (requisição) /  res (resposta)
    res.send(database.mostrarPokemons())
);


app.get('/pokemons/:id',(req,res) => 
    res.send(database.mostrarPokemon(req.params.id))
);

// REQUISIÇÃO POST
app.post('/pokemons',(req,res) => {
    const pokemon = database.salvarPokemons({
        nome: req.body.nome,
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        hp: 100 
    })
    res.send(pokemon)
});

// REQUISIÇÃO PUT 
app.put('/pokemons/:id', (req, res) => {
    const pokemon = database.atualizarPokemon(req.params.id, {
        nome: req.body.nome,
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        hp: 100,
        id: parseInt(req.params.id)
    })
    res.send(pokemon)
})
// REQUISIÇÃO DELETE
app.delete('/pokemons/:id', (req, res) => {
    res.send(database.deletarPokemon(req.params.id))
})
//REQUISIÇÃO POST
app.post('/batalha', (req, res) => {
    res.send(database.batalhaPokemon(req.body.id1, req.body.id2))
})

app.post('/curar', (req, res) => {
    res.send(database.curarPokemon(req.body.id1))
})

// Setando o nº da porta usada para realizar a requisição no Browser
app.listen(3003);