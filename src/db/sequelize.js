/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require("bcrypt")

let sequelize

if (process.env.NODE_ENV === "production") {
    sequelize = new Sequelize('f57viwk41glh8lhj', 'igv0766f82wo66d5', "f6rjfzeysho581sw", {
        host: 'ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        dialect: 'mariadb',
        port: 3306,
        dialectOptions: {
            timezone: 'Etc/GMT-2',
        },
        logging: true
    })
}else {
    sequelize = new Sequelize('pokedex', 'john', process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2',
        },
        logging: true
    })
}

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
        pokemons.map(pokemon => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            })
                .then(pokemon => console.log(pokemon.toJSON()))
        })

        bcrypt.hash('pikachu', 10)
            .then(hash => User.create({ username: 'pikachu', password: hash }))
            .then(user => console.log(user.toJSON()))

        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb, Pokemon, User
}