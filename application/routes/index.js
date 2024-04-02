var express = require('express');
const { isLoggedIn } = require('../middleware/protectors');
const { getRecentPosts, getPostById, getCommentsForPostByID } = require('../middleware/posts');
var router = express.Router();




/* GET home page. */

router.get('/', getRecentPosts, function(req, res, next) {
    res.render('index', {
        title: 'CSC 317 App',
        name: "Shankar Deuja",
        css: ["style.css"]
    });
});

router.get("/login", function(req, res) {
    res.render('login', { css: ["style.css"] });
});

router.get("/registration", function(req, res) {
    res.render('registration', { css: ["style.css"], js: ["script.js"] });
});

router.get("/postimage", isLoggedIn,
    function(req, res) {
        res.render('postImage', { css: ["style.css"] });
    });




router.get("/posts/:id(\\d+)", getPostById, getCommentsForPostByID, function(req, res) {
    console.log(req.params);
    res.render('viewpost', { css: ["style.css"], js: ["viewpost.js"] });
});



module.exports = router;