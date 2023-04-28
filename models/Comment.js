const { Model, DataTypes } = require('sequelize')
const db = require('../config/connection')
const moment = require('moment')
const User = require('./User')
const Post = require('./Post')

class Comment extends Model { }

Comment.init(
    {
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter a comment'
                },
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                return moment(this.getDataValue('createdAt')).format('mm/dd/yyyy');
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Post,
                key: 'id'
            }
        }
    },
    {
        sequelize: db,
        modelName: 'comment'
    }
)

module.exports = Comment
