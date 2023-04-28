const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const db = require('../config/connection')
const moment = require('moment')


class User extends Model {
    async validatePassword(provided_password) {
        const isValid = await bcrypt.compare(provided_password, this.password)
        return isValid
    }
}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'Please enter a username'
                },
                len: {
                    args: [3, 20],
                    msg: 'Username must be between 3 and 20 characters'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter a password'
                },

                len: {
                    args: [8, 20],
                    msg: 'Password must be between 8 and 20 characters'
                }
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                return moment(this.getDataValue('createdAt')).format('MM/DD/YYYY hh:mm:ss a');
            }
        }
    },
    {
        sequelize: db,
        modelName: 'user',
        hooks: {
            async beforeCreate(User) {
                const encryptedPassword = await bcrypt.hash(User.password, 10)
                User.password = encryptedPassword
            },
        },

    }
)

module.exports = User


