const express = require('express'); // declared express dependency
const app = express(); // created instance of express in "app" variable
const router = express.Router(); // created the router



app.set("view engine", "pug");
app.set("views", "views");

//when the user access the root("/") of the site
router.get("/", (req, res, next)=> {
    res.status(200).render("Login");// 200 means "ok"
})

module.exports = router;