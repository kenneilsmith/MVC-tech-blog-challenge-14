const { User, Post, Comment } = require('../models')
const router = require('express').Router()

function isLoggedIn(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/')
    }
}
module.exports = router