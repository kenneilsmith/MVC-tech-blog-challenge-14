const { Sequelize } = require('sequelize')
require('dotenv').config()


// Create connection to our db
const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
    // host: process.env.DB_HOST,
    dialect: 'mysql'
})

module.exports = db

