const router = require('express').Router()
const { User, Post, Comment } = require('../models')

//route to receive the login form information - Triggered by the Login page form
router.post('/login', async (req, res) => {
    // The form data - username, password
    const user_data = req.body

    // Find the user by the provided username
    const user = await User.findOne({
        where: {
            username: user_data.username
        }
    })

    // If no user object is found, we redirect them to the register page
    if (!user) return res.redirect('/signup')

    // Check that the provided password matches the encrypted pass stored in the database
    const valid_pass = await user.validatePassword(user_data.password)

    // If the password is not a match, we redirect them to the login page
    if (!valid_pass) return res.redirect('/login')

    // if the password is a match, store user id to the session and then redirect to the dashboard
    req.session.userID = user.id

    res.redirect('/')
    console.log(req.session.userID)
})

router.post('/signup', async (req, res) => {
    // The form data - username, password
    const user_data = req.body
    try {
        // Create a new user
        const user = await User.create(user_data)

        // Store the user id to the session
        req.session.userID = user.id

        // Redirect to the dashboard
        res.redirect('/',)
    } catch (err) {
        res.redirect('/signup')
    }
})

router.get('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy()

    // Redirect to thhe homepage
    res.redirect('/')
})

module.exports = router