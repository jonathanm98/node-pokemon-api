const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = (app) => {
    app.post('/api/login', (req, res) => {

        User.findOne({ where: { username: req.body.username } }).then(user => {
            if (!user) {
                const message = `L'utilisateur n'existe pas.`;
                return res.status(404).json({message})
            }
            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if(isPasswordValid) {
                    const token = jwt.sign(
                        {userId: user.id},
                        process.env.JWT_TOKEN,
                        {expiresIn: "24h"}
                    )

                    const message = `L'utilisateur a été connecté avec succès.`;
                    return res.json({ message, data: user, token })
                }
                else {
                    const message = `Le nom d'utilisateur ou le mot de passe est invalide.`;
                    return res.status(401).json({message})
                }
            })
                .catch(err => {
                    const message = "Nous n'avons pas réussi à vous connecter, veuillez réessayer plus tard."
                    res.status(500).json({message, data: err})
                })
        })
    })
}