const express = require('express'); // declared express dependency
const app = express(); // created instance of express in "app" variable
const router = express.Router(); // created the router
const bodyParser = require("body-parser");
const User = require('../../schemas/UserSchema');


app.use(bodyParser.urlencoded({extended: false}))

//when the user access the root("/") of the site
router.get("/", (req, res, next)=> {

})

router.post("/", async (req, res, next)=> {
    res.status(200).send("Success!")
})

module.exports = router;