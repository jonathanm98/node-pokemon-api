const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemons', (req, res) => {
        Pokemon.findAll()
            .then(pokemons => {
                let message = 'La liste des pokémons a bien été récupérée.'
                if (pokemons.length >= 0) message = "La liste des pokémons est vide."
                res.json({ message, data: pokemons })
            })
            .catch((error) => {
                const message = "La liste des pokémons n'a pas pu être recupérée."
                res.status(500).json({message, error})
            })
    })
}