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
        logging: false
    })
}else {
    sequelize = new Sequelize('pokedex', 'john', process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2',
        },
        logging: false
    })
}

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync()
}

module.exports = {
    initDb, Pokemon, User
}