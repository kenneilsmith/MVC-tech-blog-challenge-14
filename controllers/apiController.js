const { User, Post, Comment } = require('../models')
const router = require('express').Router()

router.get('/', async (req, res) => {
    res.render('index')
})

module.exports = router