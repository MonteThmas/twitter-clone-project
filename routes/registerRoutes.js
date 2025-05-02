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

    res.status(200).render("register");// 200 means "ok"
})

router.post("/", async (req, res, next)=> {

    let firstName = req.body.firstName.trim();
    let lastName = req.body.lastName.trim();
    let username = req.body.username.trim();
    let email = req.body.email.trim();
    let password = req.body.password;

    let payload = req.body;

    if(firstName && lastName && username && email && password) {
        var user = await User.findOne({
            $or: [
                {username: username },
                {email: email }
            ]
        })
        .catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong";
        res.status(200).render("register", payload);// 200 means "ok"
        })

        if(user == null) {
            //no user found

            var data = req.body;

            data.password = await bcrypt.hash(password, 10);
            
            User.create(data)
            .then((user) => {
                req.session.user = user;
                return res.redirect("/"); // redirect user to homepage
            })
        }
        else {
            //user found
            if (email == user.email) {
                payload.errorMessage = "Email already in use";
            }
            else {
                payload.errorMessage = "Username already in use.";
            }
            res.status(200).render("register", payload);
        }

    }
    else {
        payload.errorMessage = "Make sure each field has a value";
        res.status(200).render("register", payload);// 200 means "ok"

    }

})

module.exports = router;