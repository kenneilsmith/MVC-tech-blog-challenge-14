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

//render the new comment page
router.get('/newcomment', isLoggedIn, async (req, res) => {

    const user = await User.findByPk(req.session.userID)
    res.render('comment', { user })
})

//create a new comment
router.post('/newcomment', isLoggedIn, async (req, res) => {


    const comment_data = {
        comment: req.body.comment,
        user_id: req.session.userID,
        post_id: 1


    }
    const post = await Post.findByPk(1)
    try {
        const comment = await Comment.create(comment_data)
        console.log(comment_data)
        console.log(comment)
        await post.setComments(comment)
        // console.log(comment)
        // console.log(post)
        res.redirect('/')
    } catch (err) {
        console.log(err)
        // res.redirect('/')
    }


})

module.exports = router