const { User, Post, Comment } = require('../models')
const router = require('express').Router()

router.get('/dashboard', async (req, res) => {
    const user = await User.findByPk(req.session.userID)
    const posts = await Post.findAll({
        include: [User, Comment],
        order: [['createdAt', 'DESC']]
    })
    const post = posts.map((post) => post.get({ plain: true }))
    res.render('dashboard', { post, user })
})
router.get('/', async (req, res) => {
    // const user = await User.findByPk(req.session.userID)
    // const comments = await Comment.findAll({
    //     where: {
    //         post_id: 1
    //     },
    // })

    const posts = await Post.findAll({
        include: [User, Comment],

        order: [['createdAt', 'DESC']]

    })
    const comments = await Comment.findAll({
        where: {
            post_id: 1
        },
        include: [User],
        plain: true,

    })

    const post = posts.map((post) => post.get({ plain: true }))
    // console.log(post)
    console.log(comments)
    res.render('index', { post, comments })
})

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.get('/signup', (req, res) => {
    res.render('auth/signup')
})

module.exports = router