require("dotenv").config()
const express = require("express")
PORT = process.env.PORT || 3000
const session = require("express-session")
const { apiController, postController, userController, commentController, authController, publicController } = require("./controllers")
const db = require("./config/connection")
const { engine } = require("express-handlebars")

const app = express()

// Middleware
// enable the shortname extension for handlebars
app.engine(".hbs", engine({ extname: ".hbs" }))

// set the view engine to handlebars
app.set("view engine", ".hbs")

//set the folder for all of the handlebars files
app.set("views", "./views")


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"))

// Parse application body as JSON
app.use(express.json())

// allow to send data from the form
app.use(express.urlencoded({ extended: true }))



// set up session for the app
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
// }))

// Load all routes from the root
app.use('/', [publicController, authController, apiController, postController, commentController, userController])


// Start the server so that it can begin listening to client requests.
db.sync().then(() => {
    app.listen(process.env.PORT || PORT, () => {
        console.log(`App listening on port ${PORT}!`)
    })
}).catch(err => {
    console.log(err)
})





