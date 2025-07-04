const express = require('express'); // declared express dependency
const app = express(); // created instance of express in "app" variable
const port = 4013;
const middleware = require('./middleware')
const path = require('path')
const server = app.listen(port, ()=> console.log("Server listening on port " + port));
const bodyParser = require("body-parser")
const mongoose = require("./database");
const session = require("express-session");

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))

app.use(session({
    secret: "fried chicken", // hashes session using this secret
    resave: true , //forces session to be saved , even when session wasn't modified during server request
    saveUninitialized: false //prevents from saving the session as uninitialized
}))

//routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const logoutRoute = require('./routes/logout');

//Api routes
const postsApiRoute = require('./routes/api/posts');

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);

app.use("/api/posts", postsApiRoute);



//when the user access the root("/") of the site
app.get("/",middleware.requireLogIn, (req, res, next)=> {

    let payload = {
        pageTitle:"Home",
        userLoggedIn: req.session.user // gives information of user logged
    }
    res.status(200).render("home", payload);// 200 means "ok"
})