const { Pokemon } = require('../db/sequelize')
const { Op } = require("sequelize")
const auth = require("../auth/auth")

module.exports = (app) => {
    app.get('/api/pokemons', auth,  (req, res) => {
        if (req.query.name) {
            const name = req.query.name;
            const limit = parseInt(req.query.limit) || 5

            if (name.length <= 1) {
                const message = "Vous devez saisir au minimum 2 caractères pour que votre requête soit valide."
                return res.status(401).json({message})
            }

            return Pokemon.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`,
                    }
                },
                order: ['name'],
                limit
            })
            .then(({count, rows}) => {
                const message = `Il y a ${count} qui correspondent au terme de recherche ${name}.`
                return res.json({ message, data: rows })
            })
        }
        else {
            Pokemon.findAll({order: ['name']})
                .then(pokemons => {
                    let message = 'La liste des pokémons a bien été récupérée.'
                    if (pokemons.length <= 0) message = "La liste des pokémons est vide."
                    res.json({ message, data: pokemons })
                })
                .catch((error) => {
                    const message = "La liste des pokémons n'a pas pu être recupérée."
                    res.status(500).json({message, error})
                })
        }
    })
}