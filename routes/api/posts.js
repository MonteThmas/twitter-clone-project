const express = require('express'); // declared express dependency
const app = express(); // created instance of express in "app" variable
const router = express.Router(); // created the router
const bodyParser = require("body-parser");
const User = require('../../schemas/UserSchema');
const Post = require('../../schemas/PostSchema'); 


app.use(bodyParser.urlencoded({extended: false}))

//when the user access the root("/") of the site
router.get("/", (req, res, next)=> {

})

router.post("/", async (req, res, next)=> {

    if(!req.body.content) {
        console.log("content not sent with request")
        res.sendStatus(400);
        return;
    }

    var postData = {
        content: req.body.content,
        postedBy: req.session.user
    }


    Post.create(postData)
    .then(async newPost => {
        newPost = await User.populate(newPost, {path: "postedBy"})

        res.status(201).send(newPost); //'201' means created
    })
    .catch((error) => {
        console.log(error)
        res.sendStatus(400);
    })
})

module.exports = router;