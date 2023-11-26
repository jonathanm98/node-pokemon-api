const validTypes = ["Plante", "Poison", "Feu", "Eau", "Insecte", "Vol", "Normal", "Electrik", "Fée"]

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
              msg: "Le nom est déjà pris."
            },
            validate: {
                notEmpty: {msg: "Le nom du pokemon ne peut pas être vide"},
                notNull: {msg: "Le nom du pokemon doit être renseigné"},
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: "La valeur de santé du pokemon doit être un nombre entier"},
                notNull: {msg: "La valeur de santé du pokemon doit être renseignée"},
                min: {
                    args: [0],
                    msg: "La valeur des points de vie du pokemon ne peut pas être inférieure à \"0\""
                },
                max: {
                    args: [999],
                    msg: "La valeur des points de vie du pokemon ne peut pas être supérieure à \"999\""
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: "La valeur de dégats du pokemon doit être un nombre entier"},
                notNull: {msg: "La valeur de dégats du pokemon doit être renseignée"},
                min: {
                    args: [0],
                    msg: "La valeur des dégats du pokemon ne peut pas être inférieure à \"0\""
                },
                max: {
                    args: [99],
                    msg: "La valeur des dégats du pokemon ne peut pas être supérieure à \"99\""
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {msg: "L'url de l'image du pokemon n'est pas valide"},
                notNull: {msg: "L'url de l'image du pokemon doit être renseignée"},
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                isTypesValid(value) {
                    if (!value) {
                        throw new Error("Un pokemon doit posséder au minimum un type.")
                    }
                    if (value.split(",").length > 3) {
                        throw new Error("Le pokemon ne peut posséder plus de 3 types.")
                    }
                    value.split(",").forEach(type => {
                        if (!validTypes.includes(type)) throw new Error(`Un ou plusieurs type renseigné n'est pas valide, voici liste des types valide : ${validTypes}`)
                    })
                }
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}