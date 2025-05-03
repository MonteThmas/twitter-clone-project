const express = require('express'); // declared express dependency
const app = express(); // created instance of express in "app" variable
const router = express.Router(); // created the router
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema');




app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}))

//when the user access the root("/") of the site
router.get("/", (req, res, next)=> {
    res.status(200).render("Login");// 200 means "ok"
})

router.post("/", async (req, res, next)=> {

    var payload = req.body;

    if(req.body.logUsername && req.body.logPassword) {
        var user = await User.findOne({
            $or: [
                { username: req.body.logUsername },
                { email: req.body.logUsername }
            ]
        })
        .catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong";
            res.status(200).render("login", payload);// 200 means "ok"
        });

        if(user != null) {
            //"bcrypt.compare" allows me to compare unencrypted passwords w/ an encrypted one
            var result = await bcrypt.compare(req.body.logPassword, user.password);

            if(result === true) {
                req.session.user = user;
                return res.redirect("/");

            }

        }

        payload.errorMessage = "Login credentials incorrect.";
        return res.status(200).render("login", payload);// 200 means "ok"
        
    }

    payload.errorMessage = "Make sure each field has a valid value";
    res.status(200).render("login");// 200 means "ok"
})

module.exports = router;