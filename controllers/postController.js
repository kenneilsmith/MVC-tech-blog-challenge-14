const { User, Post, Comment } = require('../models')
const router = require('express').Router()


//Check if user is logged in
function isLoggedIn(req, res, next) {
    if (!req.session.userID) {
        res.redirect('/login')
    } else {
        next()
    }
}

//render the new post page
router.get('/newpost', isLoggedIn, async (req, res) => {
    const user = await User.findByPk(req.session.userID)
    res.render('newpost', { user })
})

//create a new post
router.post('/newpost', isLoggedIn, async (req, res) => {
    const post_data = req.body
    post_data.user_id = req.session.userID
    try {
        const post = await Post.create(post_data)
        res.redirect('/')
    } catch (err) {
        res.redirect('/newpost')
    }
})



module.exports = router