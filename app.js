const express = require('express'); // declared express dependency
const app = express(); // created instance of express in "app" variable
const port = 4013;
const middleware = require('./middleware')
const path = require('path')
const server = app.listen(port, ()=> console.log("Server listening on port " + port));
const bodyParser = require("body-parser")
const mongoose = require("./database");

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))

//routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');


app.use("/login", loginRoute);
app.use("/register", registerRoute);


//when the user access the root("/") of the site
app.get("/",middleware.requireLogIn, (req, res, next)=> {

    let payload = {
        pageTitle:"Home"
    }
    res.status(200).render("home", payload);// 200 means "ok"
})