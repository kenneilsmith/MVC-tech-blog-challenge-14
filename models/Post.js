const { Model, DataTypes } = require('sequelize')
const db = require('../config/connection')
const moment = require('moment')
const User = require('./User')




class Post extends Model { }

Post.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter a title'
                },
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter content'
                },
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                return moment(this.getDataValue('createdAt')).format('MM/DD/YYYY');
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        }

    },
    {
        sequelize: db,
        modelName: 'post'
    }
)

module.exports = Post
